'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { COUNTIES, WHATSAPP_NUMBER } from '@/lib/constants'
import { useToast } from '@/components/ui/toast'
import { formatPrice } from '@/lib/utils'

const orderSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  county: z.string().min(1, 'Please select a county'),
  town: z.string().min(2, 'Town must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  specialInstructions: z.string().optional(),
})

type OrderFormData = z.infer<typeof orderSchema>

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    name: string
    category: string
    selectedColor: string
    selectedSize: string
    quantity: number
    finalPrice: number
  }
}

export default function OrderModal({ isOpen, onClose, product }: OrderModalProps) {
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  })

  const onSubmit = async (data: OrderFormData) => {
    setLoading(true)
    
    // Generate WhatsApp message
    const message = `NEW ORDER

Customer:
${data.fullName}

Phone:
${data.phone}

Email:
${data.email}

Product:
${product.name}

Category:
${product.category}

Color:
${product.selectedColor}

Size:
${product.selectedSize}

Quantity:
${product.quantity}

Price:
${formatPrice(product.finalPrice)}

Total:
${formatPrice(product.finalPrice * product.quantity)}

Delivery County:
${data.county}

Town:
${data.town}

Address:
${data.address}

Special Instructions:
${data.specialInstructions || 'None'}`

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    addToast('success', 'Order submitted! Opening WhatsApp...')
    reset()
    setLoading(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Your Order" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-primary mb-2">{product.name}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Color:</span>
              <span className="ml-2 font-medium">{product.selectedColor}</span>
            </div>
            <div>
              <span className="text-gray-600">Size:</span>
              <span className="ml-2 font-medium">{product.selectedSize}</span>
            </div>
            <div>
              <span className="text-gray-600">Quantity:</span>
              <span className="ml-2 font-medium">{product.quantity}</span>
            </div>
            <div>
              <span className="text-gray-600">Total:</span>
              <span className="ml-2 font-bold text-primary">
                {formatPrice(product.finalPrice * product.quantity)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            {...register('fullName')}
            error={errors.fullName?.message}
            placeholder="John Doe"
          />
          <Input
            label="Phone Number"
            {...register('phone')}
            error={errors.phone?.message}
            placeholder="0712345678"
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="john@example.com"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="County"
            {...register('county')}
            error={errors.county?.message}
            options={[{ value: '', label: 'Select County' }, ...COUNTIES.map(c => ({ value: c, label: c }))]}
          />
          <Input
            label="Town"
            {...register('town')}
            error={errors.town?.message}
            placeholder="e.g., Nakuru"
          />
        </div>

        <Textarea
          label="Delivery Address"
          {...register('address')}
          error={errors.address?.message}
          placeholder="Street address, building, floor, etc."
          rows={3}
        />

        <Textarea
          label="Special Instructions (Optional)"
          {...register('specialInstructions')}
          placeholder="Any special delivery instructions..."
          rows={2}
        />

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Submit Order via WhatsApp
          </Button>
        </div>
      </form>
    </Modal>
  )
}
