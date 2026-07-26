import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import { Toaster } from '@/components/ui/toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Kinjo Bales Wholesalers - Premium Home & Kitchen Products',
  description: 'Your trusted wholesale partner for bedding, blankets, duvets, curtains, carpets, kitchenware, and home essentials in Kenya.',
  keywords: 'wholesale, bedding, blankets, duvets, curtains, carpets, kitchenware, Kenya, home products',
  openGraph: {
    title: 'Kinjo Bales Wholesalers',
    description: 'Premium home and kitchen products at wholesale prices',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Toaster />
      </body>
    </html>
  )
}
