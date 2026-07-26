'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'
import { useToast } from '@/components/ui/toast'
import { WHATSAPP_NUMBER, COUNTIES } from '@/lib/constants'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { addToast } = useToast()

  // Customer credentials form state
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    county: '',
    town: '',
    deliveryAddress: '',
    specialInstructions: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      addToast('error', 'Your cart is empty')
      return
    }

    // Validate form
    if (!formData.fullName || !formData.phoneNumber || !formData.county || !formData.town || !formData.deliveryAddress) {
      addToast('error', 'Please fill in all required fields')
      return
    }

    setIsCheckingOut(true)

    // Generate WhatsApp message with cart items and customer details
    let message = 'NEW ORDER\n\n'
    message += 'CUSTOMER DETAILS:\n'
    message += '─────────────────\n'
    message += `Full Name: ${formData.fullName}\n`
    message += `Phone: ${formData.phoneNumber}\n`
    if (formData.email) message += `Email: ${formData.email}\n`
    message += `County: ${formData.county}\n`
    message += `Town: ${formData.town}\n`
    message += `Address: ${formData.deliveryAddress}\n`
    if (formData.specialInstructions) message += `Special Instructions: ${formData.specialInstructions}\n`
    message += '\n'

    message += 'ORDER ITEMS:\n'
    message += '─────────────────\n'

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Category: ${item.category}\n`
      if (item.selectedColor) message += `   Color: ${item.selectedColor}\n`
      if (item.selectedSize) message += `   Size: ${item.selectedSize}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Price: KES ${formatPrice(item.price)}\n`
      message += `   Subtotal: KES ${formatPrice(item.price * item.quantity)}\n`
      message += '\n'
    })

    message += '─────────────────\n'
    message += `TOTAL: KES ${formatPrice(getTotalPrice())}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')
    clearCart()
    addToast('success', 'Order sent to WhatsApp!')
    setIsCheckingOut(false)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/shop">
            <Button>
              Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    {item.selectedColor && (
                      <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                    )}
                    {item.selectedSize && (
                      <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                    )}
                    <p className="font-semibold text-primary mt-2">
                      KES {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-semibold text-primary">
                      KES {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary & Customer Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-black">
                  <span>Subtotal</span>
                  <span>KES {formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-black">
                    <span>Total</span>
                    <span>KES {formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-black mb-4">Delivery Details</h3>
                <div className="space-y-4">
                  <Input
                    name="fullName"
                    label="Full Name *"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="phoneNumber"
                    label="Phone Number *"
                    placeholder="e.g., 0712345678"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="email"
                    label="Email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">County *</label>
                    <select
                      name="county"
                      value={formData.county}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      required
                    >
                      <option value="">Select County</option>
                      {COUNTIES.map((county) => (
                        <option key={county} value={county}>
                          {county}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    name="town"
                    label="Town *"
                    placeholder="Enter your town"
                    value={formData.town}
                    onChange={handleInputChange}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Delivery Address *</label>
                    <textarea
                      name="deliveryAddress"
                      placeholder="Enter your full delivery address"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Special Instructions</label>
                    <textarea
                      name="specialInstructions"
                      placeholder="Any special instructions for delivery"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                loading={isCheckingOut}
                className="w-full"
                size="lg"
              >
                Order Now
              </Button>

              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full mt-3"
              >
                Clear Cart
              </Button>

              <Link href="/shop" className="block mt-4 text-center text-sm text-black hover:text-blue-600 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
