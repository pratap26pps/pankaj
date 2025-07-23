'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Lottie from 'lottie-react';
import faqAnimation from '../../public/Animations/faq1.json';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "What services does GNB EV Center provide?",
    answer:
      "We provide servicing, repair, battery replacement, software updates, and genuine spare parts for electric bikes and 3-wheelers.",
  },
  {
    question: "Do I need to book an appointment?",
    answer:
      "Walk-ins are welcome, but we recommend booking an appointment for faster service and priority handling.",
  },
  {
    question: "What types of EVs do you support?",
    answer:
      "We support all major electric bikes and 3-wheeler brands like Hero Electric, Okinawa, Bajaj, and others.",
  },
  {
    question: "Do you offer roadside assistance?",
    answer:
      "Yes, our team provides limited local roadside assistance in case of breakdown or emergency issues.",
  },
  {
    question: "How long does a typical service take?",
    answer:
      "Most basic services are completed within 1-2 hours. Complex repairs may take longer depending on parts availability.",
  },
];

const GeneralQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" bg-green-50 w-full min-h-[600px] py-10 px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-10" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* FAQ Left Side */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2"
      >
        <div className="text-left">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-green-600 to-emerald-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 mb-10 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            Here are some common questions about our EV services at GNB.
          </p>

          {/* FAQ List */}
          <div className="space-y-4 text-left">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white border border-green-100 rounded-xl shadow-md transition-all w-full"
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-green-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="text-green-600" />
                  ) : (
                    <ChevronDown className="text-green-600" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-700 transition-all" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Animation Right Side */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center items-center"
      >
        <div className="w-full max-w-md">
          <Lottie animationData={faqAnimation} loop={true} className="w-full h-auto" />
        </div>
      </motion.div>
    </section>
  );
};

export default GeneralQuestions;
