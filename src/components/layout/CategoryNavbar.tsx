'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function CategoryNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <Link
              href="/categories"
              className="text-sm font-medium text-primary hover:text-secondary whitespace-nowrap px-2 py-1"
            >
              All Categories
            </Link>
            {CATEGORIES.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-sm text-gray-600 hover:text-primary whitespace-nowrap px-2 py-1 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-gray-600 hover:text-primary"
            aria-label="Toggle categories"
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        {isOpen && (
          <div className="pb-3 md:hidden">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-xs text-gray-600 hover:text-primary px-2 py-1 bg-gray-50 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
