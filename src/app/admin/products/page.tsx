'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { useToast } from '@/components/ui/toast'

// Mock data - replace with actual API calls
const mockProducts = [
  { _id: '1', name: 'Luxury Cotton Duvet', category: 'Bedding', price: 8500, stock: 50, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=100&q=80' },
  { _id: '2', name: 'Premium Fleece Blanket', category: 'Blankets', price: 3200, stock: 35, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&q=80' },
  { _id: '3', name: 'Thermal Curtains Set', category: 'Curtains', price: 4500, stock: 28, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=100&q=80' },
  { _id: '4', name: 'Kitchen Storage Set', category: 'Kitchenware', price: 1800, stock: 100, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&q=80' },
]

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const { addToast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p._id !== id))
      addToast('success', 'Product deleted successfully')
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/admin/dashboard')}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold text-primary">Product Management</h1>
          </div>
          <Button onClick={() => router.push('/admin/products/new')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Products Table */}
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-primary">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 font-medium">KES {product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 20 ? 'bg-green-100 text-green-800' :
                      product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/products/${product._id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No products found
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
