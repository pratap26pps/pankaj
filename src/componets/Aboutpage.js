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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-10">About Us & Contact</h1>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        {/* About Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-green-700">About EV Service Center</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Welcome to <span className="font-bold">EV Service Center Pvt. Ltd.</span> <br />
            We provide affordable, fast, and eco-friendly electric vehicle services.
          </p>

          <div className="flex items-start space-x-3 text-sm">
            <Image src="/images/logo.png" alt="Company Logo" width={80} height={80} className="object-contain" />
            <div>
              <p><strong>Address:</strong> 123 Green Road, New Delhi</p>
              <p><strong>Phone:</strong> +91 9876543210</p>
              <p><strong>Email:</strong> support@evservicecenter.com</p>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-52 rounded overflow-hidden shadow">
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
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-4">Contact Us</h2>

            {animationData && (
              <div className="w-full h-40 mb-4">
                <Lottie animationData={animationData} loop={true} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block mb-1 font-medium">Full Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Mobile Number:</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Your Mobile Number"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Vehicle Model:</label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="Example: Tata Nexon EV"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Your Message..."
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-500 transition"
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
