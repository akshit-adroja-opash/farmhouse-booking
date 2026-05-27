import mongoose, { Schema, model, models } from 'mongoose';

const FarmSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  images: [{ type: String }], // Cloudinary URLs
}, { timestamps: true });

export default models.Farm || model('Farm', FarmSchema);