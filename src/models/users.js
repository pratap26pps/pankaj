import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String,default: ""},
        image: { type: String, default: "/images/avatar.png" }, 
        
        password: { type: String ,default: "" },  
        role: { type: String, enum: ["Admin", "User","Partner"], default: "User" },
        accountType: {
            type: String,
            enum: ["Admin", "Partner", "User"],
            required: true,
            default: "User",
          },
          extra1: { type: String, default: "" },
          extra2: { type: String, default: "" },
          extra3: { type: String, default: "" },
          extra4: { type: String, default: "" },
          
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
