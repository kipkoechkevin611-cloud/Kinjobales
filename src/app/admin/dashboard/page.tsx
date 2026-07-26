'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package, Users, ShoppingCart, TrendingUp, LogOut, Plus, Edit, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

// Mock data - replace with actual API calls
const stats = [
  { label: 'Total Products', value: '156', icon: Package, color: 'bg-blue-500' },
  { label: 'Total Orders', value: '892', icon: ShoppingCart, color: 'bg-green-500' },
  { label: 'Customers', value: '456', icon: Users, color: 'bg-purple-500' },
  { label: 'Revenue', value: 'KES 2.4M', icon: TrendingUp, color: 'bg-orange-500' },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 'KES 8,500', status: 'Pending', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Mary Wanjiku', total: 'KES 12,300', status: 'Confirmed', date: '2024-01-15' },
  { id: 'ORD-003', customer: 'Peter Kamau', total: 'KES 5,600', status: 'Delivered', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Grace Omondi', total: 'KES 9,200', status: 'Pending', date: '2024-01-14' },
]

const recentProducts = [
  { id: '1', name: 'Luxury Cotton Duvet', category: 'Bedding', price: 'KES 8,500', stock: 50 },
  { id: '2', name: 'Premium Fleece Blanket', category: 'Blankets', price: 'KES 3,200', stock: 35 },
  { id: '3', name: 'Thermal Curtains Set', category: 'Curtains', price: 'KES 4,500', stock: 28 },
]

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">KB</span>
            </div>
            <span className="font-bold text-xl text-primary">Admin Dashboard</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-primary">Recent Orders</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-primary">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-primary">Recent Products</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-primary">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{product.price}</p>
                      <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-primary mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Product
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Manage Categories
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                View Customers
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
