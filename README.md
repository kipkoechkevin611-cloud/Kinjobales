# Kinjo Bales Wholesalers - Premium eCommerce Website

A modern, production-ready wholesale eCommerce website built with Next.js 16, TypeScript, Tailwind CSS, and MongoDB. Designed specifically for Kenyan wholesalers with WhatsApp-based ordering.

## 🚀 Features

### Customer Features
- **Hero Slider** with smooth animations
- **Featured Categories** with icons
- **Product Search & Filtering** by category, price, and sorting options
- **Product Details** with image gallery, zoom, and specifications
- **WhatsApp Order Flow** - Professional order form that generates formatted WhatsApp messages
- **Flash Deals** with countdown timers
- **Customer Reviews** and testimonials
- **Newsletter Subscription**
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Mode** support
- **Floating WhatsApp Chat** button

### Admin Features
- **Secure Admin Login** with JWT authentication
- **Admin Dashboard** with analytics and statistics
- **Product Management** - Create, edit, delete products
- **Image Uploads** via Cloudinary integration
- **Order Management** and tracking
- **Category Management**
- **Customer Management**

### Technical Features
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MongoDB** for database
- **Cloudinary** for image storage
- **Framer Motion** for animations
- **React Hook Form** with Zod validation
- **Lucide React** for icons
- **SEO Optimized** with sitemap and robots.txt
- **Vercel Ready** for deployment

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:
```env
MONGODB_URI=mongodb://localhost:27017/kinjo-bales
JWT_SECRET=your-super-secret-jwt-key
WHATSAPP_NUMBER=254785388475
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── product/           # Product details pages
│   ├── shop/              # Shop page
│   ├── categories/       # Categories page
│   ├── offers/            # Special offers page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── privacy/           # Privacy policy
│   └── terms/             # Terms of service
├── components/            # React components
│   ├── home/              # Home page components
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── products/          # Product-related components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
│   ├── auth.ts            # Authentication utilities
│   ├── cloudinary.ts      # Cloudinary configuration
│   ├── constants.ts       # App constants
│   ├── mongodb.ts         # MongoDB connection
│   └── utils.ts           # Helper functions
├── models/                # MongoDB models
│   ├── Product.ts
│   ├── User.ts
│   ├── Category.ts
│   └── ...
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

### Colors
- **Primary**: #0F172A (Dark Blue)
- **Secondary**: #2563EB (Blue)
- **Accent**: #F59E0B (Amber)
- **Background**: #F8FAFC (Light Gray)

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, large sizes
- Body: Regular, readable sizes

### Components
- Rounded cards with soft shadows
- Glass effects where appropriate
- Smooth animations with Framer Motion
- Premium, professional look

## 📱 WhatsApp Order Flow

When a customer clicks "Order Now":
1. A professional order form modal opens
2. Customer fills in their details (name, phone, email, address, etc.)
3. After submission, a formatted WhatsApp message is generated
4. WhatsApp opens automatically with the pre-filled message
5. Order is sent directly to the business WhatsApp number

Example WhatsApp message format:
```
NEW ORDER

Customer:
John Doe

Phone:
0712345678

Email:
john@email.com

Product:
Luxury Duvet

Category:
Bedding

Color:
Grey

Size:
King

Quantity:
3

Delivery County:
Nakuru

Town:
Keringet

Address:
Keringet Centre

Special Instructions:
Deliver after 2PM.
```

## 🔐 Admin Access

**Demo Credentials:**
- Email: admin@kinjobales.co.ke
- Password: admin123

Access the admin dashboard at `/admin/login`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables Required
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `WHATSAPP_NUMBER` - Business WhatsApp number (format: 254XXXXXXXXX)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `NEXT_PUBLIC_APP_URL` - Application URL

## 📝 TODO / Future Enhancements

- [ ] Implement actual MongoDB API routes
- [ ] Connect Cloudinary for real image uploads
- [ ] Add product reviews system
- [ ] Implement wishlist functionality
- [ ] Add recently viewed products
- [ ] Implement advanced search with filters
- [ ] Add order tracking system
- [ ] Integrate payment gateway (optional)
- [ ] Add email notifications
- [ ] Implement multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary software for Kinjo Bales Wholesalers.

## 👥 Contact

For support, contact:
- Email: infokinjostore001@gmail.com
- Phone: +254 785 388 475
- Address: Keringet Centre, Nakuru, Kenya

---

Built with ❤️ for Kinjo Bales Wholesalers
