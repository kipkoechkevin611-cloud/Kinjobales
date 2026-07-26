export const SITE_CONFIG = {
  name: 'Kinjo Bales Wholesalers',
  description: 'Your trusted wholesale partner for bedding, blankets, duvets, curtains, carpets, kitchenware, and home essentials in Kenya.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/kinjobales',
    facebook: 'https://facebook.com/kinjobales',
    instagram: 'https://instagram.com/kinjobales',
  },
}

export const CATEGORIES = [
  { id: 'bedding', name: 'Bedding', slug: 'bedding', icon: 'Bed' },
  { id: 'blankets', name: 'Blankets', slug: 'blankets', icon: 'Blanket' },
  { id: 'duvets', name: 'Duvets', slug: 'duvets', icon: 'Feather' },
  { id: 'curtains', name: 'Curtains', slug: 'curtains', icon: 'Window' },
  { id: 'carpets', name: 'Carpets', slug: 'carpets', icon: 'Square' },
  { id: 'kitchenware', name: 'Kitchenware', slug: 'kitchenware', icon: 'ChefHat' },
  { id: 'plastic', name: 'Plastic Products', slug: 'plastic-products', icon: 'Package' },
  { id: 'storage', name: 'Storage Items', slug: 'storage-items', icon: 'Archive' },
  { id: 'laundry', name: 'Laundry Items', slug: 'laundry-items', icon: 'Shirt' },
  { id: 'baby', name: 'Baby Shop', slug: 'baby-shop', icon: 'Baby' },
  { id: 'cleaning', name: 'Cleaning Products', slug: 'cleaning-products', icon: 'Sparkles' },
  { id: 'decor', name: 'Home Decor', slug: 'home-decor', icon: 'Home' },
  { id: 'offers', name: 'Offers', slug: 'offers', icon: 'Percent' },
]

export const COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
  'Kiambu', 'Machakos', 'Kajiado', 'Meru', 'Kakamega',
  'Bungoma', 'Busia', 'Siaya', 'Homa Bay', 'Migori',
  'Kisii', 'Nyamira', 'Nyeri', 'Murang\'a', 'Kirinyaga',
  'Embu', 'Tharaka Nithi', 'Kitui', 'Makueni', 'Marsabit',
  'Isiolo', 'Samburu', 'Turkana', 'West Pokot', 'Baringo',
  'Elgeyo Marakwet', 'Nandi', 'Uasin Gishu', 'Trans Nzoia',
  'Kericho', 'Bomet', 'Narok', 'Kilifi', 'Kwale',
  'Tana River', 'Lamu', 'Taita Taveta', 'Garissa', 'Wajir',
  'Mandera', 'Vihiga', 'Nyandarua'
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
]

export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '254700000000'
