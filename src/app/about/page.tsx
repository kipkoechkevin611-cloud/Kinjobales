import { motion } from 'framer-motion'
import { Award, Users, Truck, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">About Kinjo Bales Wholesalers</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your trusted partner for premium home and kitchen products in Kenya since 2010
        </p>
      </motion.div>

      {/* Our Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Kinjo Bales Wholesalers was founded with a simple mission: to provide quality home and kitchen products at affordable wholesale prices to Kenyan families and businesses.
          </p>
          <p className="text-gray-600 mb-4">
            What started as a small shop in Nakuru has grown into one of Kenya's most trusted wholesale suppliers, serving customers across all 47 counties. We believe that every Kenyan deserves access to high-quality home essentials without breaking the bank.
          </p>
          <p className="text-gray-600">
            Today, we offer a wide range of products including bedding, blankets, duvets, curtains, carpets, kitchenware, and much more. Our commitment to quality, competitive pricing, and exceptional customer service remains unchanged.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center"
        >
          <span className="text-gray-500 text-lg">About Image Placeholder</span>
        </motion.div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Award, title: 'Quality First', description: 'We never compromise on quality. Every product is carefully selected to meet our high standards.' },
            { icon: Users, title: 'Customer Focus', description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.' },
            { icon: Truck, title: 'Reliable Service', description: 'Fast and reliable delivery across Kenya, ensuring you get your products on time.' },
            { icon: Heart, title: 'Community', description: 'We are proud to support local communities and contribute to Kenya\'s economic growth.' },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
            >
              <value.icon className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-semibold text-primary mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary text-white rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300">
            To provide high-quality home and kitchen products at competitive wholesale prices while delivering exceptional customer service and building lasting relationships with our customers across Kenya.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary text-white rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-200">
            To be Kenya\'s leading wholesale supplier of home and kitchen products, known for quality, reliability, and customer satisfaction, while contributing to the growth of local businesses and communities.
          </p>
        </motion.div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'John Kinjo', role: 'Founder & CEO', image: '👨‍💼' },
            { name: 'Mary Wanjiku', role: 'Operations Manager', image: '👩‍💼' },
            { name: 'Peter Kamau', role: 'Sales Manager', image: '👨‍💼' },
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-5xl">
                {member.image}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
