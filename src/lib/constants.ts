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
  { id: 'bathrobes', name: 'Bathrobes', slug: 'bathrobes', icon: 'Shirt' },
  { id: 'bedsheets', name: 'Bedsheets', slug: 'bedsheets', icon: 'Bed' },
  { id: 'bottles-thermos', name: 'Bottles And Thermos', slug: 'bottles-thermos', icon: 'Thermometer' },
  { id: 'carpets', name: 'Carpets', slug: 'carpets', icon: 'Square' },
  { id: 'cooking-pot', name: 'Cooking Pot', slug: 'cooking-pot', icon: 'ChefHat' },
  { id: 'corridor-runners', name: 'Corridor Runners', slug: 'corridor-runners', icon: 'Move' },
  { id: 'cups', name: 'Cups', slug: 'cups', icon: 'Coffee' },
  { id: 'curtains-accessories', name: 'Curtains And Accessories', slug: 'curtains-accessories', icon: 'Window' },
  { id: 'decors', name: 'Decors', slug: 'decors', icon: 'Home' },
  { id: 'diapers', name: 'Diapers', slug: 'diapers', icon: 'Baby' },
  { id: 'dispensers', name: 'Dispensers', slug: 'dispensers', icon: 'Droplets' },
  { id: 'duvet-covers', name: 'Duvet Covers', slug: 'duvet-covers', icon: 'Feather' },
  { id: 'duvets', name: 'Duvets', slug: 'duvets', icon: 'Layers' },
  { id: 'mats', name: 'Mats', slug: 'mats', icon: 'Grid' },
  { id: 'pillow-cases', name: 'Pillow And Cases', slug: 'pillow-cases', icon: 'Pillow' },
  { id: 'plates', name: 'Plates', slug: 'plates', icon: 'Circle' },
  { id: 'racks', name: 'Racks', slug: 'racks', icon: 'Shelf' },
  { id: 'serving-dish', name: 'Serving Dish', slug: 'serving-dish', icon: 'Utensils' },
  { id: 'sofa-covers', name: 'Sofa Covers', slug: 'sofa-covers', icon: 'Armchair' },
  { id: 'suit-cases', name: 'Suit Cases', slug: 'suit-cases', icon: 'Suitcase' },
  { id: 'tableware-serveware', name: 'Tableware And Serveware', slug: 'tableware-serveware', icon: 'Dinner' },
  { id: 'towels', name: 'Towels', slug: 'towels', icon: 'Towel' },
  { id: 'blankets', name: 'Blankets', slug: 'blankets', icon: 'Layers' },
  { id: 'blanket-covers', name: 'Blanket Covers', slug: 'blanket-covers', icon: 'Feather' },
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

export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '254785388475'
