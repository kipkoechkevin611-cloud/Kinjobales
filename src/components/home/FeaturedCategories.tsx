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
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((category, index) => {
          const Icon = iconMap[category.icon] || Package
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <Icon className="w-8 h-8 text-secondary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-center font-semibold text-primary group-hover:text-secondary transition-colors">
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
