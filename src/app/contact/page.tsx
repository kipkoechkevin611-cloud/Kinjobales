'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/toast'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    addToast('success', 'Message sent successfully!')
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Address</h3>
                <p className="text-gray-600">Keringet Centre</p>
                <p className="text-gray-600">Nakuru, Kenya</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Phone</h3>
                <a href="tel:+254700000000" className="text-gray-600 hover:text-primary transition-colors">
                  +254 700 000 000
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Email</h3>
                <a href="mailto:info@kinjobales.co.ke" className="text-gray-600 hover:text-primary transition-colors">
                  info@kinjobales.co.ke
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Business Hours</h3>
                <p className="text-gray-600">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-8 bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>Google Maps Integration</p>
              <p className="text-sm">Keringet Centre, Nakuru</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              required
            />
            <Input
              label="Phone Number"
              placeholder="0712345678"
            />
            <Input
              label="Subject"
              placeholder="How can we help?"
              required
            />
            <Textarea
              label="Message"
              placeholder="Your message..."
              rows={6}
              required
            />
            <Button type="submit" loading={loading} size="lg" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
