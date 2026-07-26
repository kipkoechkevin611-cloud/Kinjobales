import mongoose, { Schema, Model } from 'mongoose'

export interface IHeroBanner {
  title: string
  subtitle: string
  image: string
  link?: string
  buttonText?: string
  order: number
  active: boolean
}

const HeroBannerSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    subtitle: {
      type: String,
      required: [true, 'Please provide a subtitle'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image'],
    },
    link: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const HeroBanner: Model<IHeroBanner> = mongoose.models.HeroBanner || mongoose.model<IHeroBanner>('HeroBanner', HeroBannerSchema)

export default HeroBanner
