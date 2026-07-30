'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'
import { Bed, Feather, Wind, Square, ChefHat, Package, Archive, Shirt, Baby, Sparkles, Home, Percent } from 'lucide-react'
import { products } from '@/data/products'

const iconMap: Record<string, any> = {
  Bed, Feather, Wind, Square, ChefHat, Package, Archive, Shirt, Baby, Sparkles, Home, Percent
}

export default function CategoriesPage() {
  // Calculate product count for each category
  const categoryCounts = CATEGORIES.reduce((acc, category) => {
    acc[category.name] = products.filter(p => p.category === category.name).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">All Categories</h1>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our wide range of product categories to find exactly what you need.
        </p>
      </motion.div>

      {/* All Products Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 md:mb-8"
      >
        <Link
          href="/shop"
          className="group block bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors">
                <Package className="w-6 h-6 md:w-8 md:h-8 text-secondary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-primary text-base md:text-lg group-hover:text-secondary transition-colors">
                  All Products
                </h3>
                <p className="text-xs md:text-sm text-gray-500">{products.length} products</p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {CATEGORIES.map((category, index) => {
          const Icon = iconMap[category.icon] || Package
          const count = categoryCounts[category.name] || 0
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group block bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-secondary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-center font-semibold text-primary text-sm md:text-lg group-hover:text-secondary transition-colors">
                  {category.name}
                </h3>
                <p className="text-center text-xs md:text-sm text-gray-500">{count} products</p>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
