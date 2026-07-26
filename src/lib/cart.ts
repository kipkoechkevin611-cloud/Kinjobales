import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

export interface CartItem extends Product {
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1, color, size) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item._id === product._id && 
            item.selectedColor === color && 
            item.selectedSize === size
          )
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === product._id && 
                item.selectedColor === color && 
                item.selectedSize === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          
          return {
            items: [
              ...state.items,
              { ...product, quantity, selectedColor: color, selectedSize: size },
            ],
          }
        })
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }))
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'kinjo-bales-cart',
    }
  )
)
