'use client'

import { motion } from 'framer-motion'
import { Users, Package, Star, MapPin } from 'lucide-react'

const stats = [
  { icon: Users, value: '10K+', label: 'Happy Customers' },
  { icon: Package, value: '5000+', label: 'Products Sold' },
  { icon: Star, value: '4.8', label: 'Average Rating' },
  { icon: MapPin, value: '47', label: 'Counties Served' },
]

export default function Statistics() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
            <div className="text-4xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm opacity-80">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
