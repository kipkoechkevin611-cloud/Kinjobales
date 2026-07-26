'use client'

import { motion } from 'framer-motion'

const brands = [
  { name: 'Brand 1', logo: '🏠' },
  { name: 'Brand 2', logo: '🛏️' },
  { name: 'Brand 3', logo: '🧺' },
  { name: 'Brand 4', logo: '🏺' },
  { name: 'Brand 5', logo: '🪑' },
  { name: 'Brand 6', logo: '🛋️' },
]

export default function Brands() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">Trusted Brands</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="w-24 h-24 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-4xl hover:shadow-md transition-shadow"
          >
            {brand.logo}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
