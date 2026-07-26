import mongoose, { Schema, Model } from 'mongoose'

export interface ICategory {
  name: string
  slug: string
  icon: string
  description?: string
  image?: string
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)

export default Category
