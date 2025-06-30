'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';

const AboutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    vehicle: '',
    message: '',
  });

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/Animations/hello.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Thank you! We will contact you soon.');
    setFormData({
      name: '',
      mobile: '',
      email: '',
      vehicle: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:mt-72 md:mt-3.5 pt-50 lg:mt-0 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-green-700 mb-10">
        About Us & Contact
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* About Section */}
        <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-6">
          <h2 className="text-2xl font-bold text-green-700">About EV Service Center</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Welcome to <span className="font-bold">EV Service Center Pvt. Ltd.</span> <br />
            We provide affordable, fast, and eco-friendly electric vehicle services. Our goal is to make your EV maintenance hassle-free.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="Company Logo"
              width={120}
              height={120}
              className="object-contain"
            />
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Address:</strong> 123 Green Road, New Delhi</p>
              <p><strong>Phone:</strong> +91 9876543210</p>
              <p><strong>Email:</strong> support@evservicecenter.com</p>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 rounded overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.2298983923583!2d75.7872707746181!3d26.86142347667581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6a8691878d7%3A0x44c3d28a91cf1dc3!2sJaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-6">
          {/* Contact Heading with Lottie */}
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700">Contact Us</h2>
            {animationData && (
              <div className="w-32 h-32">
                <Lottie animationData={animationData} loop={true} />
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-sm md:text-base">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Your mobile number"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Vehicle Model</label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="Example: Tata Nexon EV"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message here..."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-500 active:scale-95 transition-transform duration-150"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
