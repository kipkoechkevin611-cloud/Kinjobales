'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Upload, X, Plus, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Card from '@/components/ui/Card'
import { useToast } from '@/components/ui/toast'
import { CATEGORIES } from '@/lib/constants'

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  retailPrice: z.number().optional(),
  discount: z.number().min(0).max(100).optional(),
  stock: z.number().min(0, 'Stock cannot be negative'),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
})

type ProductFormData = z.infer<typeof productSchema>

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [colorInput, setColorInput] = useState('')
  const [sizeInput, setSizeInput] = useState('')
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      colors: [],
      sizes: [],
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In production, upload to Cloudinary
      // For now, use placeholder URLs
      const newImages = Array.from(files).map((_, i) => 
        `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80`
      )
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addColor = () => {
    if (colorInput.trim()) {
      const currentColors = watch('colors') || []
      setValue('colors', [...currentColors, colorInput.trim()])
      setColorInput('')
    }
  }

  const removeColor = (index: number) => {
    const currentColors = watch('colors') || []
    setValue('colors', currentColors.filter((_, i) => i !== index))
  }

  const addSize = () => {
    if (sizeInput.trim()) {
      const currentSizes = watch('sizes') || []
      setValue('sizes', [...currentSizes, sizeInput.trim()])
      setSizeInput('')
    }
  }

  const removeSize = (index: number) => {
    const currentSizes = watch('sizes') || []
    setValue('sizes', currentSizes.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProductFormData) => {
    if (images.length === 0) {
      addToast('error', 'Please upload at least one image')
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      addToast('success', 'Product created successfully!')
      router.push('/admin/products')
    } catch (error) {
      addToast('error', 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/admin/products')}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold text-primary">Add New Product</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Info */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <Input
                    label="Product Name"
                    placeholder="Luxury Cotton Duvet"
                    {...register('name')}
                    error={errors.name?.message}
                  />

                  <Select
                    label="Category"
                    {...register('category')}
                    error={errors.category?.message}
                    options={[{ value: '', label: 'Select Category' }, ...CATEGORIES.map(c => ({ value: c.name, label: c.name }))]}
                  />

                  <Textarea
                    label="Description"
                    placeholder="Product description..."
                    {...register('description')}
                    error={errors.description?.message}
                    rows={4}
                  />
                </div>
              </Card>

              {/* Images */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Product Images</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-2">Drag and drop images or</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button type="button" variant="outline" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Pricing</h2>
                <div className="space-y-4">
                  <Input
                    label="Wholesale Price (KES)"
                    type="number"
                    placeholder="8500"
                    {...register('price', { valueAsNumber: true })}
                    error={errors.price?.message}
                  />

                  <Input
                    label="Retail Price (Optional)"
                    type="number"
                    placeholder="12000"
                    {...register('retailPrice', { valueAsNumber: true })}
                  />

                  <Input
                    label="Discount (%)"
                    type="number"
                    placeholder="15"
                    {...register('discount', { valueAsNumber: true })}
                  />
                </div>
              </Card>

              {/* Inventory */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Inventory</h2>
                <div className="space-y-4">
                  <Input
                    label="Stock Quantity"
                    type="number"
                    placeholder="50"
                    {...register('stock', { valueAsNumber: true })}
                    error={errors.stock?.message}
                  />
                </div>
              </Card>

              {/* Variants */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Product Variants</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="e.g., Red, Blue"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addColor}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {watch('colors')?.map((color, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {color}
                        <button type="button" onClick={() => removeColor(index)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="e.g., Small, Large"
                      value={sizeInput}
                      onChange={(e) => setSizeInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addSize}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {watch('sizes')?.map((size, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {size}
                        <button type="button" onClick={() => removeSize(index)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
