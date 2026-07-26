import mongoose, { Schema, Model } from 'mongoose'

export interface IProduct {
  name: string
  slug: string
  category: string
  description: string
  price: number
  retailPrice?: number
  discount?: number
  images: string[]
  colors: string[]
  sizes: string[]
  stock: number
  featured: boolean
  newArrival: boolean
  flashDeal?: {
    enabled: boolean
    discount: number
    endDate: Date
  }
  specifications?: Record<string, string>
  rating: number
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      maxlength: [200, 'Name cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      default: 0,
    },
    retailPrice: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    flashDeal: {
      enabled: {
        type: Boolean,
        default: false,
      },
      discount: {
        type: Number,
        default: 0,
      },
      endDate: {
        type: Date,
      },
    },
    specifications: {
      type: Map,
      of: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
)

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product
