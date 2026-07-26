import mongoose, { Schema, Model } from 'mongoose'

export interface ISubscriber {
  email: string
}

const SubscriberSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

const Subscriber: Model<ISubscriber> = mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema)

export default Subscriber
