'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useToast } from '@/components/ui/toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    addToast('success', 'Thank you for subscribing!')
    setEmail('')
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-secondary" />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-8">
          Get the latest updates on new products and upcoming promotions.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" loading={loading} size="lg">
            Subscribe
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
