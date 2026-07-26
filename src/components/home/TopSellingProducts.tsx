'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { products } from '@/data/products'

const topSellingProducts = products.slice(0, 4)

export default function TopSellingProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Top Selling Products</h2>
        <Link href="/shop?sort=popular">
          <Button variant="ghost">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topSellingProducts.map((product, index) => (
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
