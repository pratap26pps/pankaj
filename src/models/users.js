import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String,default: ""},
        GstNo: { type: String, default: "",  },
        Area: { type: String, default: "" },
        emergencyContact: { type: String,default: ""},
        alternatecontact: { type: String,default: ""},
        image: { type: String, default: "/images/avatar.png" }, 
        
        password: { type: String ,default: "" },  
        accountType: {
            type: String,
            enum: ["Admin", "Partner", "User"],
            required: true,
            default: "User",
          },
        status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
        bloodgroup: { type: String, default: "" },
        adharNumber: { type: String, default: "" },
        panNumber: { type: String, default: "" },
     
        address: { type: String, default: "" },
        pincode: { type: String, default: "" },
        yearofexperience: { type: String, default: "" },
        bankaccountnumber: { type: String, default: "" },
        ifsc: { type: String, default: "" },
        bankname: { type: String, default: "" },
        typeOfEntity: {
            type: String,
            enum: ["individual", "company", "franchise","other",""],
            default: "",
            required: false,
         
          },
          vehicalRegistrationNumber: { type: String, default: "" },
          
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
