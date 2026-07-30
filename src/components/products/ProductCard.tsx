'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatPrice, calculateDiscountedPrice } from '@/lib/utils'
import { useToast } from '@/components/ui/toast'
import { useCart } from '@/lib/cart'

interface ProductCardProps {
  product: {
    _id: string
    name: string
    slug: string
    category: string
    price: number
    discount?: number
    images: string[]
    stock: number
    rating: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToast } = useToast()
  const { addItem } = useCart()

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
    addToast('success', isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (product.stock > 0) {
      addItem(product as any, 1)
      addToast('success', 'Added to cart')
    } else {
      addToast('error', 'Product is out of stock')
    }
  }

  const finalPrice = product.discount ? calculateDiscountedPrice(product.price, product.discount) : product.price

  return (
    <Link href={`/product/${product.slug}`}>
      <Card hover className="group">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discount && (
              <Badge variant="danger">-{product.discount}%</Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="warning">Low Stock</Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="default">Out of Stock</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleWishlist}
              className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
            <button
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h3 className="font-semibold text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 !== 0 && '☆'}
            </div>
            <span className="text-sm text-gray-500">({product.rating})</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-black">{formatPrice(finalPrice)}</span>
              {product.discount && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`p-2 rounded-lg transition-colors ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
