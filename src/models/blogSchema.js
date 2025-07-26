import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, "Blog excerpt is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    image: {
      type: String,
      default: "", // can validate image URL too
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      required: true,
    },
    authorRole: {
      type: String,
      enum: ["admin", "superadmin", "guest"],
      default: "admin",
    },
    authorAvatar: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: String,
      default: "1 min read",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
