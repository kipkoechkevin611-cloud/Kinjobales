'use client'

import { motion } from 'framer-motion'
import { Truck, Shield, HeadphonesIcon, Award } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery across Kenya',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Premium products you can trust',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Always here to help you',
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'Competitive wholesale pricing',
  },
]

export default function WhyShopWithUs() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Kinjo Bales?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
