'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function BookService() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    issue: '',
    location: '',
    date: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, issue, location, date, message } = form;

    if (!name || !email || !issue || !location || !date || !message) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      issue: '',
      location: '',
      date: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:ml-[20%] md:flex-row-reverse items-center justify-between gap-10 md:gap-24 py-10 px-4 bg-white mt-20 sm:mt-54  md:mt-44">
      {/* Image Side */}
      <div className="flex justify-center  w-full md:w-1/2 mb-6 md:mb-0">
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
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-gradient-to-br from-green-50 via-white to-green-100 border border-green-200 rounded-3xl shadow-2xl px-4  lg:px-6 md:p-10 flex flex-col items-center mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-2 text-center drop-shadow">
          Book a Service
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-700 rounded-full mb-4"></div>
        <p className="text-green-700 text-base md:text-lg mb-6 text-center font-medium">
          Fill out the form below and our team will get in touch with you soon!
        </p>

        <form className="w-full flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-center text-sm md:text-base font-semibold shadow">
              {error}
            </div>
          )}
          {submitted && (
            <div className="bg-green-100 text-green-700 p-2 rounded text-center text-sm md:text-base font-semibold shadow">
              Thank you! Your request has been submitted.
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-green-800">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-2xl bg-green-50 text-black focus:ring-2 focus:ring-green-400 border border-green-200 shadow-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-green-800">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-3 rounded-2xl bg-green-50 text-black focus:ring-2 focus:ring-green-400 border border-green-200 shadow-sm"
              required
            />
          </div>

          {/* Select Issue */}
          <div>
            <label htmlFor="issue" className="block mb-1 font-semibold text-green-800">Select Issue</label>
            <select
              id="issue"
              name="issue"
              value={form.issue}
              onChange={handleChange}
              className="w-full p-3 rounded-2xl bg-green-50 text-black focus:ring-2 focus:ring-green-400 border border-green-200 shadow-sm"
              required
            >
              <option value="">-- Select an Issue --</option>
              <option>Battery Problem</option>
              <option>Engine Issue</option>
              <option>Brake Failure</option>
              <option>AC Not Working</option>
              <option>General Service</option>
              <option>Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block mb-1 font-semibold text-green-800">Location for Service</label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="Service Location"
              className="w-full p-3 rounded-2xl bg-green-50 text-black focus:ring-2 focus:ring-green-400 border border-green-200 shadow-sm"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block mb-1 font-semibold text-green-800">Preferred Service Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-3 rounded-2xl bg-green-50 text-black focus:ring-2 focus:ring-green-400 border border-green-200 shadow-sm"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-1 font-semibold text-green-800">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us more details..."
              className="w-full p-3 rounded-2xl bg-green-50 text-black focus:ring-2 focus:ring-green-400 border border-green-200 shadow-sm"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-3 rounded-2xl font-bold hover:from-green-600 hover:to-green-800 shadow-xl transition text-lg tracking-wide transform hover:scale-105 focus:scale-105 duration-200"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
