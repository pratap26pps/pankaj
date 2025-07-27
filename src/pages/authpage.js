// app/(auth)/auth/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "next-auth/react";
import { setUser } from "../redux/slices/authSlice";
import { Chrome, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import toast from "react-hot-toast";

// ShadCN UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AuthPage() {
  const user = useSelector((state) => state?.auth?.user);
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    adharNumber: "",
    panNumber: "",
    GstNo: "",
    Area: "",
    bloodgroup: "",
    yearofexperience: "",
    bankaccountnumber: "",
    ifsc: "",
    bankname: "",
    typeOfEntity: "",
    vehicalRegistrationNumber: "",
    alternatecontact: "",
    address: "",
    pincode: "",
    emergencyContact: "",
    status: "Pending",
    
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 console.log(formData);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const adharRegex = /^[0-9]{12}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const vehicleRegistrationRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const yearExperienceRegex = /^[0-9]{1,2}$/;
    const bankNameRegex = /^[a-zA-Z\s]+$/;
    const pincodeRegex = /^[0-9]{6}$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const bankAccountRegex = /^[0-9]{9,18}$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
    const newErrors = {};
    
    // Basic required field validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!mobileRegex.test(formData.mobile)) newErrors.mobile = "Mobile number must be exactly 10 digits";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password)) newErrors.password = "Password must include uppercase, lowercase, number & symbol (min 8 chars)";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.accountType) newErrors.accountType = "Please select an account type";

    // Conditional validation based on account type
    if (formData.accountType === "Admin") {
      if (!formData.adharNumber.trim()) newErrors.adharNumber = "Aadhaar number is required for Admin";
      else if (!adharRegex.test(formData.adharNumber)) newErrors.adharNumber = "Aadhaar number must be exactly 12 digits";
      
      if (!formData.panNumber.trim()) newErrors.panNumber = "PAN number is required for Admin";
      else if (!panRegex.test(formData.panNumber)) newErrors.panNumber = "PAN number format: ABCDE1234F";
      
      if (!formData.bloodgroup.trim()) newErrors.bloodgroup = "Blood group is required for Admin";
      
      if (!formData.yearofexperience.trim()) newErrors.yearofexperience = "Years of experience is required for Admin";
      else if (!yearExperienceRegex.test(formData.yearofexperience)) newErrors.yearofexperience = "Years of experience must be 1-2 digits";
      
      if (!formData.alternatecontact.trim()) newErrors.alternatecontact = "Alternate contact is required for Admin";
      else if (!phoneRegex.test(formData.alternatecontact)) newErrors.alternatecontact = "Alternate contact must be exactly 10 digits";
      
      if (!formData.address.trim()) newErrors.address = "Address is required for Admin";
      
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required for Admin";
      else if (!pincodeRegex.test(formData.pincode)) newErrors.pincode = "Pincode must be exactly 6 digits";
      
      if (!formData.bankname.trim()) newErrors.bankname = "Bank name is required for Admin";
      else if (!bankNameRegex.test(formData.bankname)) newErrors.bankname = "Bank name should contain only letters and spaces";
      
      if (!formData.bankaccountnumber.trim()) newErrors.bankaccountnumber = "Bank account number is required for Admin";
      else if (!bankAccountRegex.test(formData.bankaccountnumber)) newErrors.bankaccountnumber = "Bank account number must be 9-18 digits";
      
      if (!formData.ifsc.trim()) newErrors.ifsc = "IFSC code is required for Admin";
      else if (!ifscRegex.test(formData.ifsc)) newErrors.ifsc = "IFSC code format: ABCD0123456";
    }
    
    if (formData.accountType === "Partner") {
      if (!formData.adharNumber.trim()) newErrors.adharNumber = "Aadhaar number is required for Partner";
      else if (!adharRegex.test(formData.adharNumber)) newErrors.adharNumber = "Aadhaar number must be exactly 12 digits";
      
      if (!formData.address.trim()) newErrors.address = "Address is required for Partner";
      
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required for Partner";
      else if (!pincodeRegex.test(formData.pincode)) newErrors.pincode = "Pincode must be exactly 6 digits";
      
      if (!formData.typeOfEntity.trim()) newErrors.typeOfEntity = "Type of entity is required for Partner";
      
      if (!formData.alternatecontact.trim()) newErrors.alternatecontact = "Alternate contact is required for Partner";
      else if (!phoneRegex.test(formData.alternatecontact)) newErrors.alternatecontact = "Alternate contact must be exactly 10 digits";
      if (!formData.GstNo.trim()) newErrors.GstNo = "GST No  is required for Partner";
       else if (!gstRegex.test(formData.GstNo)) newErrors.GstNo = "GST No format: 22AAAAA0000A1Z5";  
    }
    
    if (formData.accountType === "User") {
      if (formData.vehicalRegistrationNumber && !vehicleRegistrationRegex.test(formData.vehicalRegistrationNumber)) {
        newErrors.vehicalRegistrationNumber = "Vehicle registration format: AB12CD3456";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      console.log("Form Data:", formData);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("OTP sent. Please verify.");
      localStorage.setItem("pendingSignup", JSON.stringify(formData));
      router.push(`/OtpPage?email=${formData.email}`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }
      console.log("user role ",data)
      dispatch(setUser(data.user));
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen bg-green-50 mt-15 py-24 relative flex items-center justify-center p-4 " style={{fontFamily: "sans-serif"}}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl"
      >
            <Card className="backdrop-blur-xl bg-blue-600 border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold  bg-clip-text text-white font-poppins">
              GridaNeo Bharat
            </CardTitle>
            <CardDescription className="text-white/70">Welcome to the future of authentication</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
             <div className="flex justify-center w-full">
            <TabsList className="w-full max-w-md grid grid-cols-2 bg-white/10 rounded-md">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white/20 text-white cursor-pointer"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-white/20 text-white cursor-pointer"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>


              <motion.div className="mt-6">
                <Button
                  onClick={handleGoogleSignIn}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer"
                >
                  <Chrome className="w-5 h-5 mr-2 " /> Continue with Google
                </Button>
              </motion.div>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-white/60">or</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <TabsContent value="login">
                  <motion.form onSubmit={handleLogin} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-white pb-1">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div className="relative">
                      <Label htmlFor="password" className="text-white pb-1">Password</Label>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-7 text-white/60"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                     <Link href='/forgotpassword'>
              <label htmlFor="password" className="block mt-1 pb-3  text-xs sm:text-sm hover:underline cursor-pointer font-medium text-gray-200">
                Forgot Password
              </label>
            </Link>
                    <Button disabled={loading} type="submit" className="w-full cursor-pointer bg-green-600 font-bold  text-white">
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </motion.form>
                </TabsContent>

                <TabsContent value="signup">
                  <motion.form onSubmit={handleSignup} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                      <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange}  className="bg-white/10 border-white/20 text-white placeholder:text-white/60" required />
                      {errors.firstName && <p className="text-sm text-red-400 mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange}  className="bg-white/10 border-white/20 text-white placeholder:text-white/60" required />
                      {errors.lastName && <p className="text-sm text-red-400 mt-1">{errors.lastName}</p>}
                    </div>
                    </div>
                    <div>
                    <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange}  className="bg-white/10 border-white/20 text-white placeholder:text-white/60" required />
                    {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Input name="mobile" type="tel" placeholder="Mobile" value={formData.mobile} onChange={handleInputChange}  className="bg-white/10 border-white/20 text-white placeholder:text-white/60" required />
                    {errors.mobile && <p className="text-sm text-red-400 mt-1">{errors.mobile}</p>}
                  </div>
                    <div>
                    <Label className="text-white">Select Account Type</Label>
                    <select
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleInputChange}
                      className="mt-1 w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 p-2 rounded-md"
                      required
                    >
                      <option value="" className="bg-blue-600">-- Select --</option>
                      <option value="Admin"className="bg-blue-600">Admin</option>
                      <option value="Partner"className="bg-blue-600">Partner</option>
                      <option value="User"className="bg-blue-600">User</option>
                    </select>
                    {errors.accountType && (
                      <p className="text-sm text-red-400">{errors.accountType}</p>
                    )}
                  </div>
                  {(formData.accountType === "Admin" ) && (
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        name="adharNumber"
                        placeholder={`Adhar Number`}
                        value={formData.adharNumber}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                       {errors.adharNumber && (
                      <p className="text-sm text-red-400">{errors.adharNumber}</p>
                    )}
                      <Input
                        name="panNumber"
                        placeholder={`Pan Number`}
                        value={formData.panNumber}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                       {errors.panNumber && (
                      <p className="text-sm text-red-400">{errors.panNumber}</p>
                    )}
                       <Input
                        name="bloodgroup"
                        placeholder={`Blood Group`}
                        value={formData.bloodgroup}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                       {errors.bloodgroup && (
                      <p className="text-sm text-red-400">{errors.bloodgroup}</p>
                    )}
                      <Input
                        name="yearofexperience"
                        placeholder={`Year of Experience`}
                        value={formData.yearofexperience}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                       {errors.yearofexperience && (
                      <p className="text-sm text-red-400">{errors.yearofexperience}</p>
                    )}
                       <Input
                        name="alternatecontact"
                        placeholder={`Alternate Contact`}
                        value={formData.alternatecontact}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                       {errors.alternatecontact && (
                      <p className="text-sm text-red-400">{errors.alternatecontact}</p>
                    )}
                      <Input
                        name="address"
                        placeholder={`Address`}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                       {errors.address && (
                      <p className="text-sm text-red-400">{errors.address}</p>
                    )}
                      <Input
                        name="pincode"
                        placeholder={`Pincode`}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                       {errors.pincode && (
                      <p className="text-sm text-red-400">{errors.pincode}</p>
                    )}
                      <Input
                        name="bankname"
                        placeholder={`Bank Name`}
                        value={formData.bankname}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      <Input
                        name="bankaccountnumber"
                        placeholder={`Bank Account Number`}
                        value={formData.bankaccountnumber}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                       {errors.bankaccountnumber && (
                      <p className="text-sm text-red-400">{errors.bankaccountnumber}</p>
                    )}
                      <Input
                        name="ifsc"
                        placeholder={`IFSC`}
                        value={formData.ifsc}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      {errors.ifsc && (
                        <p className="text-sm text-red-400">{errors.ifsc}</p>
                      )}
                    </div>
                  )}  
                   {( formData.accountType === "Partner") && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                      <Input
                        name="adharNumber"
                        placeholder={`Adhar Number`}
                        value={formData.adharNumber}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      {errors.adharNumber && (
                        <p className="text-sm text-red-400">{errors.adharNumber}</p>
                      )}
                      <Input
                        name="address"
                        placeholder={`Address`}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      {errors.address && (
                        <p className="text-sm text-red-400">{errors.address}</p>
                      )}
                      <Input
                        name="pincode"
                        placeholder={`Pincode`}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      {errors.pincode && (
                        <p className="text-sm text-red-400">{errors.pincode}</p>
                      )}
                      <div>
                        <Input
                          name="alternatecontact"
                          placeholder={`Alternate Contact`}
                          value={formData.alternatecontact}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 text-white  placeholder:text-white/60"
                        />
                        {errors.alternatecontact && (
                          <p className="text-sm text-red-400 mt-1">{errors.alternatecontact}</p>
                        )}
                      </div>
                       <div>
                        <Input
                          name="GstNo"
                          placeholder={`Enter GST No`}
                          value={formData.GstNo}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                        {errors.GstNo && (
                          <p className="text-sm text-red-400 mt-1">{errors.GstNo}</p>
                        )}
                      </div>

                        <div>
                        <Input
                          name="Area"
                          placeholder={`Area Available then Enter Area`}
                          value={formData.Area}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 w-full text-white placeholder:text-white/60"
                        />
                        {errors.Area && (
                          <p className="text-sm text-red-400 mt-1">{errors.Area}</p>
                        )}
                      </div>
                    </div>
                    <label className="block mb-1 text-white">Type of Entity</label>
                      <div className="flex flex-row gap-2  rounded-md">
                        {["individual", "company", "franchise","other"].map((role) => (
                          <label key={role} className="flex items-center text-white space-x-2">
                            <input
                              type="radio"
                              name="typeOfEntity"
                              value={role}
                              checked={formData.typeOfEntity === role}
                              onChange={handleInputChange}
                              className="accent-blue-500"
                            />
                            <span className="capitalize">{role}</span>
                          </label>
                        ))}
                        {errors.typeOfEntity && (
                          <p className="text-sm text-red-400">{errors.typeOfEntity}</p>
                        )}  
                      </div>
                    </>
                  
                    
                  )}
                   {(formData.accountType === "User") && (
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        name="vehicalRegistrationNumber"
                        placeholder={`Vehicle Registration Number (Optional)`}
                        value={formData.vehicalRegistrationNumber}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      {errors.vehicalRegistrationNumber && (
                        <p className="text-sm text-red-400">{errors.vehicalRegistrationNumber}</p>
                      )}
                      
                    </div>
                  )}


                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange}  className="bg-white/10 border-white/20 text-white placeholder:text-white/60" required />
                        <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-2 text-white ">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <div className="relative">
                        <Input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange}  className="bg-white/10 border-white/20 text-white placeholder:text-white/60" required />
                        <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-2 top-2 text-white">
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                    {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword}</p>}
                    <Button disabled={loading} type="submit" className="w-full cursor-pointer bg-green-600 text-white">
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </motion.form>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
AuthPage.requireAuth = false;
