'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function BookService() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    issues: [],
    village: '',
    city: '',
    homeNo: '',
    date: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const issueOptions = [
    'Battery Problem',
    'Engine Issue',
    'Brake Failure',
    'AC Not Working',
    'General Service',
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleCheckboxChange = (issue) => {
    const updated = form.issues.includes(issue)
      ? form.issues.filter((i) => i !== issue)
      : [...form.issues, issue];
    setForm({ ...form, issues: updated });
  };

  const handleLocationFetch = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const address = data?.address;

          const village =
            address?.suburb ||
            address?.neighbourhood ||
            address?.state_district ||
            '';
          const city =
            address?.city || address?.town || address?.village || '';
          const fullAddress = data?.display_name || '';

          setForm((prev) => ({
            ...prev,
            village,
            city,
            homeNo: fullAddress,
          }));
          toast.success('Address fetched successfully');
        } catch {
          toast.error('Failed to fetch address');
        }
      },
      () => {
        toast.error('Unable to fetch location');
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, issues, village, city, homeNo, date, message } = form;

    if (
      !name ||
      !email ||
      !phone ||
      issues.length === 0 ||
      !village ||
      !city ||
      !homeNo ||
      !date ||
      !message
    ) {
      setError('Please fill in all fields.');
      return;
    }

    toast.success('Service booked successfully!', { duration: 2000 });

    setForm({
      name: '',
      email: '',
      phone: '',
      issues: [],
      village: '',
      city: '',
      homeNo: '',
      date: '',
      message: '',
    });
    setError('');
    setShowDropdown(false);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row-reverse items-center justify-between py-10 px-6 md:px-20 lg:px-32 xl:px-48 mt-16
      bg-no-repeat bg-center bg-cover transition-all duration-500 ease-in-out
      sm:bg-none"
      style={{
        backgroundImage: "url('/images/book.jpg')",
      }}
    >
      {/* Right Side Image */}
      <div className="hidden md:flex justify-center w-full md:w-1/2 mb-6 md:mb-0">
        <Image
          src="/images/Appointment.webp"
          alt="Service Banner"
          width={400}
          height={400}
          className="rounded-2xl object-contain shadow-none"
          priority
        />
      </div>

      {/* Form Side */}
      <div className="w-full md:w-1/2 bg-white bg-opacity-80 p-6 rounded-2xl shadow-xl">
        <h2 className="text-4xl text-center  font-extrabold text-green-700 mb-4">Book a Service</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-center text-sm font-semibold shadow mb-2">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 rounded-lg bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-2 rounded-lg bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit number"
              pattern="[0-9]{10}"
              className="w-full p-2 rounded-lg bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Multi Issue Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-green-900 mb-1">Select Issues</label>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-green-50 border border-green-300 rounded p-2 text-sm cursor-pointer"
            >
              {form.issues.length > 0 ? form.issues.join(', ') : 'Select one or more issues'}
            </div>
            {showDropdown && (
              <div className="absolute bg-white border rounded shadow w-full z-10 mt-1 max-h-40 overflow-y-auto">
                {['Battery Problem', 'Engine Issue', 'Brake Failure', 'AC Not Working', 'General Service'].map(
                  (issue) => (
                    <label key={issue} className="flex items-center p-2 text-sm gap-2 hover:bg-green-50">
                      <input
                        type="checkbox"
                        checked={form.issues.includes(issue)}
                        onChange={() => handleCheckboxChange(issue)}
                      />
                      {issue}
                    </label>
                  )
                )}
              </div>
            )}
          </div>

          {/* Location Fields */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-green-900">Location</label>
              <button
                type="button"
                onClick={handleLocationFetch}
                className="text-xs text-blue-600  font-bold underline"
              >
                Auto Detect Address
              </button>
            </div>

            <input
              type="text"
              name="village"
              value={form.village}
              onChange={handleChange}
              placeholder="Village / Ward No."
              className="w-full p-2 rounded-lg bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400"
              required
            />

            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 rounded-lg bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400"
              required
            />

            <input
              type="text"
              name="homeNo"
              value={form.homeNo}
              onChange={handleChange}
              placeholder="Full Address / Home No. / Street"
              className="w-full p-2 rounded-lg bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">Preferred Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">Describe the Problem</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Explain the problem..."
              rows={3}
              className="w-full p-2 rounded-lg bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
