'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField, setStep } from '@/redux/slices/bookingSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export default function BookingStepOneForm() {

    const dispatch = useDispatch();
    const form = useSelector((state) => state.booking.form);
    const step = useSelector((state) => state.booking.step);
    const router = useRouter();  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      dispatch(updateFormField({ name, value: type === "checkbox" ? checked : value }));
    };
  
    const nextStep = () => {
        if (
            step === 1 &&
            (!form.fullName || !form.phone || !form.email || !form.address || !form.cityState)
          ) {
            toast.error('Please fill all customer details');
            return;
          }
      
          if (!/^[0-9]{10}$/.test(form.phone)) {
            toast.error('Please enter a valid 10-digit mobile number');
            return;
          }

      dispatch(setStep(step + 1));
      router.push('/ServiceForm');
    };




  return (
    <div className="space-y-4 bg-white p-6 rounded-2xl ">
      <h3 className="text-xl font-semibold text-gray-700">
         Book EV Service
      </h3>
      <label htmlFor="fullName">Full Name</label>
      <input
        type="text"
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
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
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
        placeholder="City & State"
        className="w-full p-2 border rounded"
        required
      />
      {step === 1 && (
        <button
          type="button"
          onClick={nextStep}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Continue Booking
        </button>
      )}
    </div>
  );
}
