'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { ArrowRight, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import { products } from '@/data/products'

// Add discount to some products for flash deals
const flashDealsProducts = products.slice(8, 12).map(p => ({
  ...p,
  discount: 20,
}))

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Flash Deals</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Ends in:</span>
            <div className="flex gap-2">
              <span className="bg-primary text-white px-3 py-1 rounded-lg font-mono">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="bg-primary text-white px-3 py-1 rounded-lg font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="bg-primary text-white px-3 py-1 rounded-lg font-mono">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
        <Link href="/offers">
          <Button variant="secondary">
            View All Deals <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {flashDealsProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
