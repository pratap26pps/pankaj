'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { bikemodels } from "../Data";
import { models } from "../Data";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from 'react-toastify';

export default function ServiceSelectorProduct() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get("service");

  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  const [selectedProblems, setSelectedProblems] = useState({});
  const [activeModelModal, setActiveModelModal] = useState(null);
  const [activeSubmodelModal, setActiveSubmodelModal] = useState(null);
  const [carSelection, setCarSelection] = useState({});

  const category = categories.find((cat) => cat.slug === serviceSlug);
  const products = category?.products || [];

  const toggleProblem = (pkgId, problem) => {
    setSelectedProblems((prev) => {
      const current = prev[pkgId] || [];
      const updated = current.includes(problem)
        ? current.filter((p) => p !== problem)
        : [...current, problem];
      return { ...prev, [pkgId]: updated };
    });
  };

  const handleModelSelect = (pkgId, model) => {
    setCarSelection((prev) => ({
      ...prev,
      [pkgId]: { model, submodel: null },
    }));
    setActiveModelModal(null);
    setActiveSubmodelModal(pkgId);
  };

  const handleSubmodelSelect = (pkgId, submodel) => {
    setCarSelection((prev) => ({
      ...prev,
      [pkgId]: { ...prev[pkgId], submodel },
    }));
    setActiveSubmodelModal(null);
  };

  const extractPrice = (problem) => {
    const match = problem.match(/₹(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const getTotalPrice = (pkgId) => {
    const selected = selectedProblems[pkgId] || [];
    return selected.reduce((total, problem) => total + extractPrice(problem), 0);
  };

  const getOfferPrice = (pkgId) => {
    const count = selectedProblems[pkgId]?.length || 0;

    if (pkgId === products[0]?._id) {
      if (count === 6) return 2599;
      if (count === 3) return 1499;
      if (count === 2) return 1099;
    }

    if (pkgId === products[1]?._id) {
      if (count === 12) return 2999;
      if (count === 5) return 1499;
      if (count === 4) return 1299;
      if (count === 2) return 349;
    }

    return null;
  };

  const handleAddToCart = (pkg) => {
    const selectedItems = selectedProblems[pkg._id] || [];
    const carInfo = carSelection[pkg._id];

    if (serviceSlug === "erickshaw" || serviceSlug === "electric-bike") {
      if (selectedItems.length === 0) return toast.error("Please select at least one problem.");
      if (!carInfo?.model) return toast.error("Please select a car brand.");
      if (!carInfo?.submodel) return toast.error("Please select a car model.");
    }

    const totalPrice = getTotalPrice(pkg._id);
    const offerPrice = getOfferPrice(pkg._id);
    const finalPrice = offerPrice || totalPrice;

    const cartItem = {
      _id: `${pkg._id}_${Date.now()}`,
      packageId: pkg._id,
      packageName: pkg.name,
      packageImage: pkg.images[0],
      warranty: pkg.warranty,
      duration: pkg.duration,
      recommended: pkg.recommended,
      selectedProblems: selectedItems,
      carBrand: carInfo.model.name,
      carModel: carInfo.submodel,
      carBrandImage: carInfo.model.image,
      originalPrice: totalPrice,
      offerPrice: offerPrice,
      finalPrice,
      serviceSlug,
    };

    dispatch(addToCart(cartItem));
    localStorage.setItem('cartItems', JSON.stringify([cartItem]));
    
    // Optional: Show success message
    alert(`${pkg.name} added to cart successfully!`);
    
    // Optional: Reset selections for this package
    setSelectedProblems(prev => ({ ...prev, [pkg._id]: [] }));
    setCarSelection(prev => ({ ...prev, [pkg._id]: {} }));
  };

  useEffect(() => {
    const closeModalOnEscape = (e) => {
      if (e.key === "Escape") {
        setActiveModelModal(null);
        setActiveSubmodelModal(null);
      }
    };
    window.addEventListener("keydown", closeModalOnEscape);
    return () => window.removeEventListener("keydown", closeModalOnEscape);
  }, []);

  if (!category) {
    return (
      <div className="text-center text-gray-500 py-20">
        No service found for slug: <b>{serviceSlug}</b>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 pb-20 px-2 sm:px-4 md:px-8 lg:px-16 py-4">
      {products.map((pkg) => (
        <div key={pkg._id} className="flex justify-center">
          <Card className="flex flex-col md:flex-row gap-6 w-full max-w-5xl p-5 shadow-xl bg-white/30 backdrop-blur-md rounded-2xl border border-white/40">
            <div className="w-full md:w-1/3 h-40 md:h-auto">
              <img src={pkg.images[0]} alt={pkg.name} className="rounded-2xl w-full h-40 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                {(serviceSlug === "electric-bike" || serviceSlug === "erickshaw") && (
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" onClick={() => setActiveModelModal(pkg._id)}>
                      {carSelection[pkg._id]?.model?.name || "Select Brand"}
                    </Button>
                    {carSelection[pkg._id]?.model && (
                      <Button variant="outline" onClick={() => setActiveSubmodelModal(pkg._id)}>
                        {carSelection[pkg._id]?.submodel || "Select Model"}
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">{pkg.warranty} • {pkg.recommended}</p>
              <p className="flex items-center gap-2 text-sm text-gray-600 mt-1"><Clock size={14} /> {pkg.duration}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {pkg?.problems?.map((problem) => (
                  <label key={problem} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedProblems[pkg._id]?.includes(problem) || false}
                      onChange={() => toggleProblem(pkg._id, problem)}
                      className="accent-blue-600"
                    />
                    {problem}
                  </label>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-md font-semibold text-gray-700">
                  {(() => {
                    const offer = getOfferPrice(pkg._id);
                    const total = getTotalPrice(pkg._id);
                    return offer ? (
                      <>
                        <span className="text-green-600 font-bold">Offer Price:</span>{" "}
                        <span className="line-through text-red-500 mr-2">₹{total}</span>
                        <span className="text-green-600 font-bold">₹{offer}</span>
                      </>
                    ) : (
                      <>Final Price: ₹{total}</>
                    );
                  })()}
                </div>
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleAddToCart(pkg)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>

          {/* Brand Modal */}
          {activeModelModal === pkg._id && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-2">
              <div className="bg-white shadow-xl max-w-[95%] w-[480px] max-h-[90vh] overflow-auto p-4 rounded-xl border mt-20">
                <h4 className="text-lg font-semibold mb-4">
                  Select {serviceSlug === "electric-bike" ? "Bike" : "Car"} Brand
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(serviceSlug === "electric-bike" ? bikemodels : models).map((model) => (
                    <div
                      key={model.name}
                      onClick={() => handleModelSelect(pkg._id, model)}
                      className="cursor-pointer rounded-2xl hover:shadow-md flex flex-col items-center p-2 transition-all hover:scale-105"
                    >
                      <img src={model.image} alt={model.name} className="w-14 h-12 object-contain" />
                      <span className="text-sm mt-1 text-center">{model.name}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => setActiveModelModal(null)} className="mt-4 w-full" variant="outline">
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Submodel Modal */}
          {activeSubmodelModal === pkg._id && carSelection[pkg._id]?.model && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
              <div className="w-full max-w-[360px] bg-white shadow-2xl p-4 rounded-xl border max-h-[90vh] overflow-auto">
                <h4 className="text-lg font-semibold mb-4">Select Submodel</h4>
                <div className="grid grid-cols-2 gap-2">
                  {carSelection[pkg._id].model.submodels.map((sub) => (
                    <div
                      key={sub.name}
                      onClick={() => handleSubmodelSelect(pkg._id, sub.name)}
                      className="cursor-pointer p-2 rounded-2xl hover:shadow-md flex flex-col items-center transition-all hover:scale-105"
                    >
                      <img src={sub.image} alt={sub.name} className="w-10 h-10 object-contain" />
                      <span className="text-xs text-center mt-1">{sub.name}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => setActiveSubmodelModal(null)} className="mt-4 w-full" variant="outline">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
