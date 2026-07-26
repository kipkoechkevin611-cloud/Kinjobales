'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import Input from '@/components/ui/Input'
import { products, searchProducts } from '@/data/products'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim()) {
      setResults(searchProducts(searchQuery))
    } else {
      setResults([])
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Search Products</h1>
          <p className="text-gray-600">Find what you're looking for</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search for products..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 h-14 text-lg"
            autoFocus
          />
        </div>

        {/* Results */}
        {query && (
          <div>
            <p className="text-gray-600 mb-6">
              Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500">Try different keywords or browse our categories</p>
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Start searching</h3>
            <p className="text-gray-500">Enter a product name or category above</p>
          </div>
        )}
      </div>
    </div>
  )
}
