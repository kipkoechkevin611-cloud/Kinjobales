import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. The page might have been removed or doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
