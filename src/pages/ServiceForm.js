'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import BookingStepOneForm from '@/features/BookingStepOneForm';
import { updateFormField, setStep, toggleService, resetBookingForm } from '@/redux/slices/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';

const serviceOptions = [
  'General Check-Up',
  'Brake Inspection / Repair',
  'Battery Issue / Swelling / Drain',
  'Tyre Puncture / Replacement',
  'Motor/Controller Issue',
  'Charging Port Problem',
  'Light/Indicator/Electrical Issue',
  'Emergency Breakdown Service',
];

const plans = ['Basic Care Plan', 'Urban Commuter Plan', 'Power Rider Plan', 'Not sure – need recommendation'];
const modes = ['Pick-up & Drop', 'Visit Nearest Service Center', 'On-Site Technician (Doorstep)'];
const timeSlots = ['Morning', 'Afternoon', 'Evening'];

export default function EVBookingForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.booking.form);
  const step = useSelector((state) => state.booking.step);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          dispatch(updateFormField({ name: 'cityState', value: `${data.address.city || data.address.town || ''}, ${data.address.state || ''}` }));
        } catch (error) {
          console.log("error", error);
        }
      });
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateFormField({ name, value: type === 'checkbox' ? checked : value }));
  };

 

  const submitForm = async (e) => {
    e.preventDefault();
    if (
      step === 2 &&
      (!form.vehicleType ||
        (!form.services.length) ||
        !form.date)
    ) {
      toast.error('Please fill all service details');
      return;
    }

    if (step === 2 && !/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(form.regNumber)) {
      toast.error('Please enter a valid registration number (e.g., HR26DK1234)');
      return;
    }
 

    if (!form.agreeTerms || !form.agreeRepair) {
      toast.error('Please agree to both service terms and repair conditions');
      return;
    }

    try {
      const response = await fetch('/api/service-booking/newbooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data) {
        toast.success(`Service booked successfully! Booking ID: ${data?.data?.newBooking?.bookingId}`);
        dispatch(resetBookingForm());
        dispatch(setStep(1));
        router.push('/');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error('Failed to submit booking. Please try again.');
    }
  };
 
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row-reverse items-center justify-between py-10 px-6 md:px-20 lg:px-32 xl:px-48 mt-16 bg-no-repeat bg-center bg-cover transition-all duration-500 ease-in-out sm:bg-none" style={{ backgroundImage: "url('/images/book.jpg')" }}>
      <div className="hidden md:flex justify-center w-full md:w-1/2 mb-6 md:mb-0">
        <Image src="/images/Appointment.webp" alt="Service Banner" width={400} height={410} className="rounded-2xl object-contain shadow-none" priority />
      </div>

      <div className="max-w-xl bg-white mx-auto p-6 rounded-3xl shadow">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">GreenNature Bharat – EV Servicing</h2>

        <form onSubmit={submitForm} className="space-y-2">
          {step === 1 && (
            <BookingStepOneForm form={form} step={step} handleChange={handleChange} />
          )}

          {/* Step 2 - Service & Vehicle Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Vehicle & Service Information
              </h3>
              <select name="vehicleType" value={form.vehicleType} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">Select Vehicle Type</option>
                <option>Two-Wheeler</option>
                <option>Three-Wheeler / E-Rickshaw</option>
                <option>Four-Wheeler</option>
                <option>Commercial EV</option>
              </select>
              <label htmlFor="regNumber">EV Registration Number</label>
            <input
              type="text"
              name="regNumber"
              value={form.regNumber}
              onChange={handleChange}
              placeholder="ex. HR26DK8337"
              className="w-full p-2 border rounded"
              pattern="^[A-Z]{2}[0-9]{2}[A-Z]{1,3}[0-9]{1,4}$"
              title="Enter a valid registration number like HR26DK8337"
              required
            />
              <label className="text-sm font-semibold text-gray-700">Purchase Date</label>
              <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className="w-full p-2 border rounded required" />
            
              <select name="lastService" value={form.lastService} onChange={handleChange} className="w-full p-2 border rounded required">
                <option value="">Last Service Done</option>
                <option>Within 1 month</option>
                <option>3 months</option>
                <option>6+ months</option>
                <option>Never Serviced</option>
              </select>

              {/* Service Dropdown */}
              <div className="relative">
                <label htmlFor="services">Select Service Type</label>
                <div onClick={() => setShowServiceDropdown(!showServiceDropdown)} className="w-full bg-white border rounded p-2 text-sm cursor-pointer">
                  {form.services.length > 0 ? form.services.join(', ') : 'Select one or more services'}
                </div>
                {showServiceDropdown && (
                    <div className="  bg-white border rounded shadow w-full z-10 mt-1 max-h-48 overflow-y-auto">
                      {serviceOptions.map((service) => (
                        <label
                          key={service}
                          className="flex items-center gap-2 p-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={form.services.includes(service)}
                            onChange={() => dispatch(toggleService(service))}
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  )}
              
                 
                <input name="servicesOther" value={form.servicesOther} onChange={handleChange} placeholder="Other" className="w-full mt-2 p-2 border rounded" />
              </div>
              <label htmlFor="plan">Preferred Plan</label>
              <select name="plan" value={form.plan} onChange={handleChange} className="w-full p-2 border rounded required">
                <option value="">Preferred Plan</option>
                {plans.map((p) => <option key={p}>{p}</option>)}
              </select>
              <label htmlFor="mode">Preferred Service Mode</label>
              <select name="mode" value={form.mode} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">Preferred Service Mode</option>
                {modes.map((m) => <option key={m}>{m}</option>)}
              </select>
              <label htmlFor="date">Service Date</label>  
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
              <label htmlFor="timeSlot">Time Slot</label>
              <div className="flex flex-wrap gap-4">
                {timeSlots.map((slot) => (
                  <label key={slot} className="flex gap-2 items-center">
                    <input type="radio" name="timeSlot" value={slot} checked={form.timeSlot === slot} onChange={handleChange} required/>
                    {slot}
                  </label>
                ))}
              </div>

              <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Additional Notes" className="w-full p-2 border rounded" rows={3} />
              

              <div className="flex flex-col gap-2 text-sm text-gray-700 mt-2">
                <label className="flex gap-2 items-start">
                  <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required/>
                  I agree to the service terms and authorize GreenNature Bharat to inspect and service my vehicle.
                </label>
                <label className="flex gap-2 items-start">
                  <input type="checkbox" name="agreeRepair" checked={form.agreeRepair} onChange={handleChange} required/>
                  I understand that any additional parts or repairs needed will be communicated before installation.
                </label>
              </div>
            </div>
          )}

          {/* Step Controls */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button type="button" onClick={() => dispatch(setStep(step - 1))} className="text-green-700 font-semibold">Back</button>
            )}
            {step === 2 && (
              <button type="submit" className="bg-green-700 cursor-pointer text-white px-4 py-2 rounded">Submit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
