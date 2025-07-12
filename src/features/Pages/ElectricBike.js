'use client';

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { bikemodels } from "../Data";

const packagesData = [
  {
    id: 1,
    title: "Basic Service",
    image: "/images/e2.jpg",
    duration: "4 Hrs",
    warranty: "1000 Kms / 3 Months",
    recommended: "Every 5000 Kms / 6 Months",
    problems: [
      "Motor Controller Repair – ₹599",
      "Motor Hallsensor Repair – ₹599",
      "Brake Pump Replacement – ₹599",
      "Disc Replacement – ₹499",
      "Brake – ₹499",
      "Any Wheel Bearing Replacement – ₹499",
    ],
  },
  {
    id: 2,
    title: "Standard Service",
    image: "/images/e.jpeg",
    duration: "6 Hrs",
    warranty: "2000 Kms / 6 Months",
    recommended: "Every 10,000 Kms / 6 Months",
    problems: [
      "Disc Brake Repair – ₹299",
      "Brake Pad Replacement – ₹199",
      "Any Indicator Replacement – ₹299",
      "Front Bulb Replacement – ₹299",
      "Rear Indicator Bulb Replacement – ₹299",
      "Horn Repair – ₹299",
      "Battery Health Check-Up – ₹299",
      "Charger Repair – ₹299",
      "Brake Oil Replacement – ₹299",
      "Converter Change – ₹299",
      "Converter Repair – ₹249",
      "Footrest Rubber – ₹249",
    ],
  },
  {
    id: 3,
    title: "Premium Service",
    image: "/images/moter.png",
    duration: "6 Hrs",
    warranty: "2000 Kms / 6 Months",
    recommended: "Every 10,000 Kms / 6 Months",
    problems: [
      '10" Motor Winding – ₹1999',
      '12" Motor Winding – ₹2199',
      "Handle Bearing Replacement – ₹1499",
      "Display Dashboard Replacement – ₹2299",
    ],
  },
];

export default function ElectricBike() {
  const [selectedProblems, setSelectedProblems] = useState({});
  const [activeModelModal, setActiveModelModal] = useState(null);
  const [activeSubmodelModal, setActiveSubmodelModal] = useState(null);
  const [carSelection, setCarSelection] = useState({});

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
    const selected = selectedProblems[pkgId] || [];
    const count = selected.length;

    if (pkgId === 1) {
      if (count === 6) return 2599;
      if (count === 3) return 1499;
      if (count === 2) return 1099;
    }

    if (pkgId === 2) {
      if (count === 12) return 2999;
      if (count === 5) return 1499;
      if (count === 4) return 1299;
      if (count === 2) return 349;
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-18 pb-20 px-2 sm:px-4 md:px-8 lg:px-16 py-4">
      {packagesData.map((pkg) => (
        <div key={pkg.id}>
          <div className="flex justify-center">
            <Card className="flex flex-col md:flex-row gap-6 w-full max-w-5xl p-5 shadow-xl bg-white/30 backdrop-blur-md rounded-2xl border border-white/40">
              <div className="w-full md:w-1/3 h-40 md:h-auto">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="rounded-xl w-full h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h3 className="text-xl font-bold">{pkg.title}</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      onClick={() => setActiveModelModal(pkg.id)}
                    >
                      {carSelection[pkg.id]?.model?.name || "Select Brand"}
                    </Button>
                    {carSelection[pkg.id]?.model && (
                      <Button
                        variant="outline"
                        onClick={() => setActiveSubmodelModal(pkg.id)}
                      >
                        {carSelection[pkg.id]?.submodel || "Select Model"}
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {pkg.warranty} • {pkg.recommended}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Clock size={14} /> {pkg.duration}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {pkg.problems.map((problem) => (
                    <label key={problem} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedProblems[pkg.id]?.includes(problem) || false}
                        onChange={() => toggleProblem(pkg.id, problem)}
                        className="accent-blue-600"
                      />
                      {problem}
                    </label>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-md font-semibold text-gray-700">
                    {(() => {
                      const offer = getOfferPrice(pkg.id);
                      const total = getTotalPrice(pkg.id);
                      if (offer) {
                        return (
                          <>
                            <span className="text-green-600 font-bold">Offer Price:</span>{" "}
                            <span className="line-through text-red-500 mr-2">₹{total}</span>
                            <span className="text-green-600 font-bold">₹{offer}</span>
                          </>
                        );
                      }
                      return <>Final Price: ₹{total}</>;
                    })()}
                  </div>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Model Modal */}
          {activeModelModal === pkg.id && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-2">
              <div className="bg-white shadow-xl max-w-[95%] w-[480px] max-h-[90vh] overflow-auto p-4 rounded-xl border mt-20">
                <h4 className="text-lg font-semibold mb-4">Select Car Brand</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {bikemodels.map((model) => (
                    <div
                      key={model.name}
                      onClick={() => handleModelSelect(pkg.id, model)}
                      className="cursor-pointer rounded-2xl hover:shadow-md flex flex-col items-center p-2 transition-all hover:scale-105"
                    >
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-14 h-12 object-contain"
                      />
                      <span className="text-sm mt-1 text-center">{model.name}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setActiveModelModal(null)}
                  className="mt-4 w-full"
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Submodel Modal */}
          {activeSubmodelModal === pkg.id && carSelection[pkg.id]?.model && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2">
              <div className="w-full max-w-[360px] bg-white shadow-2xl p-4 rounded-xl border max-h-[90vh] overflow-auto">
                <h4 className="text-lg font-semibold mb-4">Select Car Submodel</h4>
                <div className="grid grid-cols-2 gap-2">
                  {carSelection[pkg.id].model.submodels.map((sub) => (
                    <div
                      key={sub.name}
                      onClick={() => handleSubmodelSelect(pkg.id, sub.name)}
                      className="cursor-pointer p-2 rounded-2xl hover:shadow-md flex flex-col items-center transition-all hover:scale-105"
                    >
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="text-xs text-center mt-1">{sub.name}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setActiveSubmodelModal(null)}
                  className="mt-4 w-full"
                  variant="outline"
                >
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
