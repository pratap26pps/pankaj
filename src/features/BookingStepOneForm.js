"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormField, setStep } from "@/redux/slices/bookingSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function BookingStepOneForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.booking.form);
  const step = useSelector((state) => state.booking.step);
  const router = useRouter();
  const [locationLoading, setLocationLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateFormField({ name, value: type === "checkbox" ? checked : value }));
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) return;

      setLocationLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            const address = data.address || {};
            const city =
              address.city ||
              address.town ||
              address.village ||
              address.hamlet ||
              address.county ||
              "";
            const state = address.state || "";

            if (city || state) {
              dispatch(
                updateFormField({
                  name: "cityState",
                  value: `${city}, ${state}`,
                })
              );
            }
          } catch (error) {
            console.error("Location fetch error:", error);
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationLoading(false);
        },
        { timeout: 10000 }
      );
    };

    fetchLocation();
  }, [dispatch]);

  const nextStep = () => {
    if (
      step === 1 &&
      (!form.fullName ||
        !form.phone ||
        !form.email ||
        !form.address ||
        !form.cityState)
    ) {
      toast.error("Please fill all customer details");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    dispatch(setStep(step + 1));
    router.push("/ServiceForm");
  };

  return (
    <div className="space-y-4 bg-white p-6  rounded-3xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Book EV Service</h3>

      <label htmlFor="fullName">Full Name</label>
      <input
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        required
      />

      <label htmlFor="phone">Mobile Number</label>
      <input
        type="tel"
        name="phone"
        maxLength={10}
        minLength={10}
        value={form.phone}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="w-full p-2 border rounded"
        pattern="[0-9]{10}"
        required
      />

      <label htmlFor="email">Email</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />

      <label htmlFor="address">Pickup/Drop Address</label>
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Pickup/Drop Address"
        className="w-full p-2 border rounded"
        required
      />

      <label htmlFor="cityState">City & State</label>
      <input
        name="cityState"
        value={form.cityState}
        onChange={handleChange}
        placeholder={
          locationLoading ? "Detecting your location..." : "City, State"
        }
        className="w-full p-2 border rounded"
        required
      />

      {step === 1 && (
        <button
          type="button"
          onClick={nextStep}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Continue Booking
        </button>
      )}
    </div>
  );
}
