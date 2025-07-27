import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    skuid: {
    type: String,
    unique: true,
    required: true,
    },
    slug: {
    type: String,
    unique: true,
    required: true,
    },
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    images: [{
        type: String,
        required: true
    }],
    duration: {
          type: String,
          required: true,
        },
    warranty: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
    recommended: {
          type: String,
          required: true,
        },
    description: {
          type: String,
          required: true,
        },
    problems: [
          {
            type: String,
            required: true,
          },
        ],
       
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isTopSeller: {
        type: Boolean,
        default: false
    },
   
}, { 
    timestamps: true 
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
