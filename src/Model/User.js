import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop' },
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  readTime: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String, required: true },
  vehicleDetails: { type: String },
  Role:      { type: String,  required: true, default : 'customer' },
  password:  { type: String, required: true },
  avatar:    { type: String },
  blogPosts: [BlogPostSchema],
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
