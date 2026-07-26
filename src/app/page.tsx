import { Suspense } from 'react'
import HeroSlider from '@/components/home/HeroSlider'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import TopSellingProducts from '@/components/home/TopSellingProducts'
import NewArrivals from '@/components/home/NewArrivals'
import FlashDeals from '@/components/home/FlashDeals'
import WhyShopWithUs from '@/components/home/WhyShopWithUs'
import CustomerReviews from '@/components/home/CustomerReviews'
import Brands from '@/components/home/Brands'
import Statistics from '@/components/home/Statistics'
import Newsletter from '@/components/home/Newsletter'
import StoreLocation from '@/components/home/StoreLocation'

export default function Home() {
  return (
    <div className="animate-fade-in">
      <Suspense fallback={<div className="h-[600px] bg-gray-200 animate-pulse" />}>
        <HeroSlider />
      </Suspense>
      
      <div className="container mx-auto px-4 py-8">
        <FeaturedCategories />
      </div>

      <div className="container mx-auto px-4 py-12">
        <TopSellingProducts />
      </div>

      <div className="container mx-auto px-4 py-12">
        <NewArrivals />
      </div>

      <div className="container mx-auto px-4 py-12">
        <FlashDeals />
      </div>

      <div className="bg-blue-900 text-white py-16">
        <WhyShopWithUs />
      </div>

      <div className="container mx-auto px-4 py-12">
        <CustomerReviews />
      </div>

      <div className="container mx-auto px-4 py-12">
        <Brands />
      </div>

      <div className="bg-blue-600 text-white py-16">
        <Statistics />
      </div>

      <div className="container mx-auto px-4 py-12">
        <Newsletter />
      </div>

      <StoreLocation />
    </div>
  )
}
