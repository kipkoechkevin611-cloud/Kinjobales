'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { products } from '@/data/products'

const newArrivalsProducts = products.slice(4, 8)

export default function NewArrivals() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">New Arrivals</h2>
        <Link href="/shop?new=true">
          <Button variant="ghost">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {newArrivalsProducts.map((product, index) => (
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
