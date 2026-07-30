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
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-6 overflow-x-auto">
        <Link href="/" className="hover:text-primary whitespace-nowrap">Home</Link>
        <span className="whitespace-nowrap">/</span>
        <Link href="/shop" className="hover:text-primary whitespace-nowrap">Shop</Link>
        <span className="whitespace-nowrap">/</span>
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-primary whitespace-nowrap">{product.category}</Link>
        <span className="whitespace-nowrap">/</span>
        <span className="text-primary whitespace-nowrap">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            {product.discount && (
              <Badge variant="danger" className="absolute top-4 left-4 text-sm md:text-base">
                -{product.discount}%
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-blue-600 shadow-md scale-105' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-4">
            <Badge variant="success" className="text-xs md:text-sm">{product.category}</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-sm md:text-base text-gray-600">({product.rating})</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-6">
            <span className="text-2xl md:text-3xl font-bold text-primary">{formatPrice(finalPrice)}</span>
            {product.discount && (
              <>
                <span className="text-lg md:text-xl text-gray-400 line-through">{formatPrice(product.price)}</span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">{product.description}</p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold text-primary mb-3 text-sm md:text-base">Color: <span className="text-blue-600">{selectedColor}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-2 md:px-4 md:py-2 rounded-lg border-2 transition-all text-sm ${
                      selectedColor === color 
                        ? 'border-blue-600 bg-blue-50 text-blue-600 font-medium' 
                        : 'border-gray-200 hover:border-gray-300'
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
            <div className="mb-5">
              <h3 className="font-semibold text-primary mb-3 text-sm md:text-base">Size: <span className="text-blue-600">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 md:px-4 md:py-2 rounded-lg border-2 transition-all text-sm ${
                      selectedSize === size 
                        ? 'border-blue-600 bg-blue-50 text-blue-600 font-medium' 
                        : 'border-gray-200 hover:border-gray-300'
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
            <h3 className="font-semibold text-primary mb-3 text-sm md:text-base">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 md:p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 md:py-3 font-semibold text-base md:text-lg min-w-[50px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 md:p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs md:text-sm text-gray-500">{product.stock} in stock</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              size="lg"
              className="flex-1 py-4 text-base md:text-lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 py-4 text-base md:text-lg"
              onClick={() => setShowOrderModal(true)}
            >
              Order Now
            </Button>
          </div>

          <div className="flex gap-3 mb-6">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 py-3"
              onClick={handleWishlist}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="ml-2 hidden sm:inline">Wishlist</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 py-3"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Share</span>
            </Button>
          </div>

          {/* Stock Status */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-medium">
                {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div className="border-t pt-6 mt-auto">
              <h3 className="font-semibold text-primary mb-4 text-sm md:text-base">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">{String(value)}</span>
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
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id}>
                <Link href={`/product/${relatedProduct.slug}`}>
                  <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="font-semibold text-primary mb-2 text-sm md:text-base line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-base md:text-lg font-bold">{formatPrice(relatedProduct.price)}</p>
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
