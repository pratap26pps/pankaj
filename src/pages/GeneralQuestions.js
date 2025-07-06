'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
 <section className="bg-green-50 w-full min-h-[600px] py-10 px-4 sm:px-6 md:px-12">
  <div className="  text-center">
    <h2 className="text-4xl font-extrabold text-green-800 mb-4">
      Frequently Asked Questions
    </h2>
    <p className="text-gray-700 mb-10 text-lg">
      Here are some common questions about our EV services at GNB.
    </p>

    {/* FAQ List */}
    <div className="space-y-4 text-left">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white border border-green-100 rounded-xl shadow-md transition-all w-full"
        >
          <button
            className="w-full px-6 py-4 flex justify-between items-center text-left"
            onClick={() => toggleFAQ(index)}
          >
            <span className="text-green-700 font-medium">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="text-green-600" />
            ) : (
              <ChevronDown className="text-green-600" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-gray-700 transition-all">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default GeneralQuestions;
