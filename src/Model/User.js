import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String, required: true },
  vehicleDetails: { type: String, required: true },
  type:      { type: String, enum: ["partner", "service_center"], required: true },
  profilePic:{ type: String, default: "" },
  password:  { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
