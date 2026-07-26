'use client'

import { motion } from 'framer-motion'
import { Clock, Tag } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'

const mockProducts = [
  {
    _id: '9',
    name: 'King Size Bed Sheet Set',
    slug: 'king-size-bed-sheet-set',
    category: 'Bedding',
    price: 5500,
    discount: 30,
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80'],
    stock: 15,
    rating: 4.8,
  },
  {
    _id: '10',
    name: 'Winter Weight Blanket',
    slug: 'winter-weight-blanket',
    category: 'Blankets',
    price: 4200,
    discount: 25,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'],
    stock: 8,
    rating: 4.7,
  },
  {
    _id: '11',
    name: 'Blackout Curtains Pair',
    slug: 'blackout-curtains-pair',
    category: 'Curtains',
    price: 3800,
    discount: 20,
    images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80'],
    stock: 12,
    rating: 4.6,
  },
  {
    _id: '12',
    name: 'Kitchen Utensil Set',
    slug: 'kitchen-utensil-set',
    category: 'Kitchenware',
    price: 2500,
    discount: 35,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'],
    stock: 25,
    rating: 4.5,
  },
  {
    _id: '13',
    name: 'Area Carpet Large',
    slug: 'area-carpet-large',
    category: 'Carpets',
    price: 7500,
    discount: 40,
    images: ['https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&q=80'],
    stock: 5,
    rating: 4.9,
  },
  {
    _id: '14',
    name: 'Storage Box Set',
    slug: 'storage-box-set',
    category: 'Storage Items',
    price: 1800,
    discount: 15,
    images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80'],
    stock: 50,
    rating: 4.4,
  },
]

export default function OffersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Tag className="w-8 h-8 text-accent" />
          <h1 className="text-4xl font-bold text-primary">Special Offers</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Don't miss out on these amazing deals! Limited time offers on selected products.
        </p>
      </motion.div>

      {/* Flash Deal Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 mb-12 text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Flash Sale - Up to 50% Off!</h2>
            <p className="opacity-90">Limited time offer. While stocks last.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Ends Soon</span>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product, index) => (
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

      {/* Terms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 bg-gray-50 rounded-xl p-6"
      >
        <h3 className="font-semibold text-primary mb-2">Offer Terms & Conditions</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Offers valid while stocks last</li>
          <li>• Cannot be combined with other promotions</li>
          <li>• Prices shown are before delivery charges</li>
          <li>• We reserve the right to end offers without notice</li>
        </ul>
      </motion.div>
    </div>
  )
}
