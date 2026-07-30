'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'
import { Bed, Feather, Wind, Square, ChefHat, Package, Archive, Shirt, Baby, Sparkles, Home, Percent } from 'lucide-react'

const iconMap: Record<string, any> = {
  Bed, Feather, Wind, Square, ChefHat, Package, Archive, Shirt, Baby, Sparkles, Home, Percent
}

export default function FeaturedCategories() {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
        {CATEGORIES.map((category, index) => {
          const Icon = iconMap[category.icon] || Package
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
                className="group block bg-white rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-1 md:mb-2 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-secondary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-center text-[10px] md:text-xs font-medium text-primary group-hover:text-secondary transition-colors truncate leading-tight">
                  {category.name}
                </h3>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
