'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We currently accept orders via WhatsApp. Payment arrangements are made directly with our team. We accept M-Pesa, bank transfers, and cash on delivery for eligible locations.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Delivery times vary by location. For Nakuru and surrounding areas, delivery is typically 1-2 business days. For other counties, delivery takes 3-5 business days depending on your location.',
  },
  {
    question: 'Do you offer wholesale pricing?',
    answer: 'Yes! We are primarily a wholesale supplier. Our prices are already competitive for bulk purchases. For very large orders, please contact us directly for special pricing.',
  },
  {
    question: 'Can I return or exchange products?',
    answer: 'Returns and exchanges are accepted within 7 days of purchase for defective products. Products must be in their original condition. Please contact us via WhatsApp to initiate a return.',
  },
  {
    question: 'Do you deliver outside Kenya?',
    answer: 'Currently, we only deliver within Kenya. We serve all 47 counties. For international orders, please contact us directly to discuss options.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is confirmed, our team will provide you with delivery updates via WhatsApp. You can also contact us anytime for status updates.',
  },
  {
    question: 'Are your products genuine and high quality?',
    answer: 'Absolutely! We source all our products directly from reputable manufacturers and distributors. Quality is our top priority, and we stand behind every product we sell.',
  },
  {
    question: 'Do you offer installation services?',
    answer: 'For certain products like curtains and carpets, we may offer installation services depending on your location. Please inquire when placing your order.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our products, services, and policies.
        </p>
      </motion.div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-primary">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mt-16 bg-primary text-white rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-gray-300 mb-6">
          Can't find the answer you're looking for? Please contact our team directly.
        </p>
        <a
          href="/contact"
          className="inline-block bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
        >
          Contact Us
        </a>
      </motion.div>
    </div>
  )
}
