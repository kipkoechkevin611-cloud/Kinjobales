'use client'

import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'

export default function WhatsAppFloat() {
  const openWhatsApp = () => {
    const message = encodeURIComponent('Hello! I would like to inquire about your products.')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )
}
