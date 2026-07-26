'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, Share2, Minus, Plus, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatPrice, calculateDiscountedPrice } from '@/lib/utils'
import { useToast } from '@/components/ui/toast'
import OrderModal from '@/components/products/OrderModal'
import { products } from '@/data/products'
import { useCart } from '@/lib/cart'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const { addToast } = useToast()
  const { addItem } = useCart()

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === params.slug)
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedColor(foundProduct.colors?.[0] || '')
      setSelectedSize(foundProduct.sizes?.[0] || '')
      
      // Get related products from same category
      const related = products
        .filter(p => p.category === foundProduct.category && p._id !== foundProduct._id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [params.slug])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  const finalPrice = product.discount 
    ? calculateDiscountedPrice(product.price, product.discount)
    : product.price

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    addToast('success', isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addItem(product, quantity, selectedColor, selectedSize)
      addToast('success', 'Added to cart')
    } else {
      addToast('error', 'Product is out of stock')
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      addToast('success', 'Link copied to clipboard')
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        <span>/</span>
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
        <span>/</span>
        <span className="text-primary">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-secondary' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Badge variant="success" className="mb-4">{product.category}</Badge>
          <h1 className="text-3xl font-bold text-primary mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-gray-600">({product.rating} rating)</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-primary">{formatPrice(finalPrice)}</span>
            {product.discount && (
              <>
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.price)}</span>
                <Badge variant="danger">-{product.discount}%</Badge>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      selectedColor === color ? 'border-secondary bg-secondary/10' : 'border-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary mb-3">Size: {selectedSize}</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      selectedSize === size ? 'border-secondary bg-secondary/10' : 'border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold text-primary mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-3 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">{product.stock} available</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowOrderModal(true)}
            >
              Order Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleWishlist}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-primary mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id}>
                <Link href={`/product/${relatedProduct.slug}`}>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 relative">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">{relatedProduct.name}</h3>
                    <p className="text-lg font-bold">{formatPrice(relatedProduct.price)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Modal */}
      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        product={{
          ...product,
          selectedColor,
          selectedSize,
          quantity,
          finalPrice,
        }}
      />
    </div>
  )
}
