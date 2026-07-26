export interface Product {
  _id: string
  name: string
  slug: string
  category: string
  description: string
  price: number
  retailPrice?: number
  discount?: number
  images: string[]
  colors: string[]
  sizes: string[]
  stock: number
  featured: boolean
  newArrival: boolean
  flashDeal?: {
    enabled: boolean
    discount: number
    endDate: Date
  }
  specifications?: Record<string, string>
  reviews: Review[]
  rating: number
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  _id: string
  name: string
  slug: string
  icon: string
  description?: string
  image?: string
}

export interface Review {
  _id: string
  user: string
  rating: number
  comment: string
  date: Date
}

export interface User {
  _id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: Date
}

export interface Order {
  _id: string
  customer: {
    name: string
    phone: string
    email: string
    county: string
    town: string
    address: string
  }
  items: OrderItem[]
  specialInstructions?: string
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  createdAt: Date
}

export interface OrderItem {
  product: string
  productName: string
  category: string
  quantity: number
  color?: string
  size?: string
  price: number
}

export interface Testimonial {
  _id: string
  name: string
  location: string
  rating: number
  comment: string
  image?: string
  featured: boolean
}

export interface HeroBanner {
  _id: string
  title: string
  subtitle: string
  image: string
  link?: string
  buttonText?: string
  order: number
  active: boolean
}

export interface Subscriber {
  _id: string
  email: string
  createdAt: Date
}
