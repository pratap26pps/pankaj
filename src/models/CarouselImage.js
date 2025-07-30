import mongoose from "mongoose";

const CarouselImageSchema = new mongoose.Schema({
  imageUrl: [ { type: String, required: true }],
  uploadedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

export default mongoose.models.CarouselImage || mongoose.model("CarouselImage", CarouselImageSchema);
