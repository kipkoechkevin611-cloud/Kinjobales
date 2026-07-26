'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Mary Wanjiku',
    location: 'Nairobi',
    rating: 5,
    comment: 'Excellent quality products and fast delivery. Will definitely order again!',
  },
  {
    name: 'John Kamau',
    location: 'Nakuru',
    rating: 5,
    comment: 'Best wholesale prices in Kenya. The bedding sets are amazing quality.',
  },
  {
    name: 'Grace Omondi',
    location: 'Mombasa',
    rating: 4,
    comment: 'Great customer service and the products exceeded my expectations.',
  },
]

export default function CustomerReviews() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex text-yellow-400 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">"{review.comment}"</p>
            <div>
              <p className="font-semibold text-primary">{review.name}</p>
              <p className="text-sm text-gray-500">{review.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
