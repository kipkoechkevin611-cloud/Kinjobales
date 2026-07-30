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
    description?: string
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
      <Card hover className="group h-full flex flex-col overflow-hidden border-2 border-transparent hover:border-blue-200 transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.discount && (
              <Badge variant="danger" className="shadow-lg">-{product.discount}%</Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="warning" className="shadow-lg">Low Stock</Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="default" className="shadow-lg">Out of Stock</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={handleWishlist}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
            <button
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50">
          <h3 className="font-semibold text-primary mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
          )}

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{formatPrice(finalPrice)}</span>
              {product.discount && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-2 rounded-lg transition-all hover:scale-105 text-sm font-medium ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md'
                }`}
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-4 h-4 inline mr-1" />
                Cart
              </button>
              <button
                disabled={product.stock === 0}
                className={`flex-1 py-2 rounded-lg transition-all hover:scale-105 text-sm font-medium ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md'
                }`}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
