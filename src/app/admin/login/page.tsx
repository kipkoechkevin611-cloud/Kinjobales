'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Lock, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useToast } from '@/components/ui/toast'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, accept any admin credentials
      if (data.email === 'admin@kinjobales.co.ke' && data.password === 'admin123') {
        // Store token in localStorage (in production, use httpOnly cookies)
        localStorage.setItem('admin_token', 'demo-token')
        addToast('success', 'Login successful!')
        router.push('/admin/dashboard')
      } else {
        addToast('error', 'Invalid credentials')
      }
    } catch (error) {
      addToast('error', 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">KB</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
          <p className="text-gray-600 mt-2">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="admin@kinjobales.co.ke"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button type="submit" loading={loading} size="lg" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p>Email: admin@kinjobales.co.ke</p>
          <p>Password: admin123</p>
        </div>
      </motion.div>
    </div>
  )
}
