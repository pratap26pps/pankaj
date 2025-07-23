"use client";

import { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
 
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CreditCard, Banknote, Wallet } from "lucide-react";

export default function CheckoutPage() {

    const user = useSelector((state) => state.auth.user);
    const { cartItems } = useSelector((state) => state.cart);
    // const searchParams = useSearchParams();
    // const skuid = searchParams.get("skuid");
    // const allProducts = useSelector((state) => state.product.products);
    console.log("User in billingorder:", user);
    console.log("cartItems in billingorder ",cartItems)
 
  //   const [product, setProduct] = useState(null);
  //    const dispatch = useDispatch();

  //   useEffect(() => {
  //   const storedProduct = localStorage.getItem("specific-product");
  //   if (storedProduct) {
  //     try {
  //       const parsed = JSON.parse(storedProduct);
  //       setProduct(parsed);
  //     } catch (error) {
  //       console.error("Failed to parse localStorage product:", error);
  //     }
  //   }
  // }, []);
  
  // If skuid is present, find the product
  // let singleProduct = null;
  // if (skuid) {
  //   singleProduct = allProducts.find((p) => p.skuid === skuid);
  // }

  // If skuid, use that product, else use cart
  const recentproduct =  cartItems;
const total = recentproduct?.reduce((sum, item) => sum + (item.finalPrice || item.price || 0) * (item.quantity || 1), 0) || 0;
 
 

 
 

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!country) newErrors.country = "Country is required";
    if (!address) newErrors.address = "Address is required";
    if (!city) newErrors.city = "City is required";
    if (!postalCode) newErrors.postalCode = "Postal code is required";
    if (!recentproduct || recentproduct.length === 0) newErrors.items = "No items to order";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkouthandler = async () => {
    if (!validate()) return;
    setIsPlacingOrder(true);
    try {
      const itemsToOrder =recentproduct.map((item) => ({
            product: item.packageId || item._id, // Use packageId for service packages, fallback to _id for regular products
            quantity: item.quantity,
            price: item.finalPrice || item.price || 0,
            packageId: item.packageId,
            packageName: item.packageName,
            selectedProblems: item.selectedProblems,
            carBrand: item.carBrand,
            carModel: item.carModel,
            warranty: item.warranty,
            duration: item.duration,
            serviceSlug: item.serviceSlug
          }));

      const res = await fetch("/api/customer/placeorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user?._id || user?.id,
          items: itemsToOrder,
          totalAmount: total,
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
          paymentMethod: "cod",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Order placed successfully!");
        router.push("/customer/orderhistory");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const isFormValid = country && address && city && postalCode && recentproduct && recentproduct.length > 0;

  return (
    <div className="min-h-screen bg-white relative py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <Card className="shadow-lg bg-white border border-gray-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-600 pl-3">
              Billing details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700">First Name</Label>
                <Input placeholder="Full name" value={user?.name || user?.firstName  +  user?.lastName} readOnly className="bg-white border-gray-300 text-black" /> 
              </div>
              <div>
                <Label className="text-gray-700 pb-1">Email</Label>
                <Input placeholder="Email" value={user?.email || ""} readOnly className="bg-white border-gray-300 text-black" /> 
              </div>
             
              <div className="sm:col-span-2">
                <Label className="text-gray-700 pb-1">Country / Region *</Label>
                <Input placeholder="e.g., India" className="bg-white border-gray-300 text-black" value={country} onChange={e => setCountry(e.target.value)} />
                {errors.country && <span className="text-red-500 text-xs">{errors.country}</span>}
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700 pb-1">Street address *</Label>
                <Input placeholder="House number and street name" className="bg-white border-gray-300 text-black" value={address} onChange={e => setAddress(e.target.value)} />
                {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
              </div>
              <div className="sm:col-span-2 ">
                <Label className="text-gray-700 pb-1">Apartment, suite, etc. (optional)</Label>
                <Input placeholder="Apartment, suite, etc." className="bg-white border-gray-300 text-black" />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700 pb-1">City *</Label>
                <Input placeholder="City" className="bg-white border-gray-300 text-black" value={city} onChange={e => setCity(e.target.value)} />
                {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700 pb-1">Postal Code *</Label>
                <Input placeholder="Postal Code" className="bg-white border-gray-300 text-black" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                {errors.postalCode && <span className="text-red-500 text-xs">{errors.postalCode}</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-lg bg-white border border-gray-200">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
              Your order
            </h2>
            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold mb-4 text-gray-700">Order Items</h3>
              {
                recentproduct.map((item) => (
                  <div key={item._id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                    {/* Header with Image and Basic Info */}
                    <div className="flex items-start gap-4 mb-3">
                      <img 
                        src={item?.packageImage || item?.images?.[0]} 
                        alt={item?.packageName || item?.name} 
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200" 
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800">{item.packageName || item.name}</h4>
                        <div className="text-sm text-gray-600 space-y-1 mt-1">
                          {item.warranty && <p>• Warranty: {item.warranty}</p>}
                          {item.duration && <p>• Duration: {item.duration}</p>}
                          {item.recommended && <p>• {item.recommended}</p>}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                          <span className="font-semibold text-blue-600">₹{(item.finalPrice || item.price || 0) * item.quantity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Details */}
                    {item.carBrand && item.carModel && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <h5 className="font-medium text-gray-800 mb-2">Vehicle Details</h5>
                        <div className="flex items-center gap-3">
                          {item.carBrandImage && (
                            <img
                              src={item.carBrandImage}
                              alt={item.carBrand}
                              className="w-10 h-8 object-contain"
                            />
                          )}
                          <div className="text-sm">
                            <p className="font-medium text-gray-700">Brand: {item.carBrand}</p>
                            <p className="text-gray-600">Model: {item.carModel}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Selected Services */}
                    {item.selectedProblems && item.selectedProblems.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h5 className="font-medium text-gray-800 mb-2">Selected Services ({item.selectedProblems.length})</h5>
                        <div className="grid grid-cols-1 gap-1">
                          {item.selectedProblems.map((problem, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-700">{problem}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              }
              <hr className="my-3" />
              <div className="flex justify-between text-blue-700">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
               
              <div className="flex justify-between font-bold text-blue-800 text-lg mt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <RadioGroup value="cod" className="space-y-4 mt-6">
              <div className="flex items-center gap-2 opacity-50 pointer-events-none">
                <RadioGroupItem value="bank" disabled />
                <span className="flex items-center gap-2"><Banknote className="w-5 h-5 text-blue-600" /> Direct bank transfer</span>
              </div>
              <div className="flex items-center gap-2 opacity-50 pointer-events-none">
                <RadioGroupItem value="check" disabled />
                <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-600" /> Check payments</span>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="cod" checked readOnly />
                <span className="flex items-center gap-2"><Wallet className="w-5 h-5 text-blue-600" /> Cash on delivery</span>
              </div>
            </RadioGroup>

            <Button 
               onClick={checkouthandler}
               disabled={isPlacingOrder || !isFormValid}
            className="w-full mt-6 text-white bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold rounded-xl shadow">
              {isPlacingOrder ? "Placing order..." : "Place order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

CheckoutPage.requiredRole = 'customer';
