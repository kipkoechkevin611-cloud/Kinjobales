'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ShoppingCart, User, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { CATEGORIES } from '@/lib/constants'
import { useCart } from '@/lib/cart'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { getTotalItems } = useCart()
  const cartItemCount = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">KB</span>
            </div>
            <span className="font-bold text-xl text-black hidden sm:block">
              Kinjo Bales
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-black hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-black hover:text-blue-600 transition-colors font-medium">
              Shop
            </Link>
            <Link href="/categories" className="text-black hover:text-blue-600 transition-colors font-medium">
              Categories
            </Link>
            <Link href="/offers" className="text-black hover:text-blue-600 transition-colors font-medium">
              Offers
            </Link>
            <Link href="/about" className="text-black hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-black hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/search" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-black" />
            </Link>
            
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-black" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-black" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>

            <Link href="/admin/login" className="hidden md:block">
              <User className="w-5 h-5 text-black" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-black hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="text-black hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/categories"
                  className="text-black hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/offers"
                  className="text-black hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Offers
                </Link>
                <Link
                  href="/about"
                  className="text-black hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-black hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/admin/login"
                  className="text-black hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
