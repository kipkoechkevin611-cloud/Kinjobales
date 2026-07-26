import mongoose, { Schema, Model } from 'mongoose'

export interface ITestimonial {
  name: string
  location: string
  rating: number
  comment: string
  image?: string
  featured: boolean
}

const TestimonialSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Please provide a comment'],
    },
    image: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)

export default Testimonial
