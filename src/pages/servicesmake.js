'use client';

import React, { useState } from 'react';
import { GiScooter } from 'react-icons/gi';
import { MdElectricRickshaw } from 'react-icons/md';
import { BatteryCharging, PlugZap, Wrench, PackageCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';


const services = [
  {
    name: 'Electric Bike',
    icon: <GiScooter className="h-10 w-10 text-green-700" />,
    description: 'Repair & maintenance for e-bikes',
    models: ['Ola S1', 'Ather 450X'],
    image: '/ebike.png',
  },
  {
    name: 'Erickshaw',
    icon: <MdElectricRickshaw className="h-10 w-10 text-green-700" />,
    description: 'Services for electric 3-wheelers',
    models: ['Mahindra Treo', 'YC Electric'],
    image: '/erickshaw.png',
  },
  {
    name: 'Lithium Batteries',
    icon: <BatteryCharging className="h-10 w-10 text-green-700" />,
    description: 'Battery checkup & replacement',
    models: ['LithiumPro', 'BatteryKing'],
    image: '/battery.png',
  },
  {
    name: 'Chargers',
    icon: <PlugZap className="h-10 w-10 text-green-700" />,
    description: 'Fast charging solutions',
    models: ['FastCharge V2', 'EcoPlug'],
    image: '/charger.png',
  },
  {
    name: 'Accessories',
    icon: <Wrench className="h-10 w-10 text-green-700" />,
    description: 'All EV-related add-ons',
    models: ['Phone Holder', 'Helmet', 'Gloves'],
    image: '/accessories.png',
  },
  {
    name: 'Others',
    icon: <PackageCheck className="h-10 w-10 text-green-700" />,
    description: 'Miscellaneous EV support',
    models: ['Custom Work', 'Polishing'],
    image: '/others.png',
  },
];

export default function EVServiceSelector() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPackages, setSelectedPackages] = useState([]);

  const handlePackageChange = (pkg) => {
    setSelectedPackages((prev) =>
      prev.includes(pkg)
        ? prev.filter((p) => p !== pkg)
        : [...prev, pkg]
    );
  };

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      {/* Service Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={service.name}
            onClick={() => {
              setSelectedService(service);
              setSelectedModel('');
              setSelectedPackages([]);
            }}
            className="cursor-pointer bg-white p-4 rounded-2xl shadow-md border hover:border-green-500 transition"
          >
            <div className="flex items-center gap-4">
              {service.icon}
              <div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Model and Packages */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gray-50 p-6 rounded-xl shadow-inner"
        >
          <h2 className="text-xl font-bold text-green-700 mb-4">
            {selectedService.name} Models
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedService.models.map((model) => (
              <Button
                key={model}
                variant={selectedModel === model ? 'default' : 'outline'}
                onClick={() => setSelectedModel(model)}
              >
                {model}
              </Button>
            ))}
          </div>

          {selectedModel && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Select Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Basic Checkup", "Full Service", "Premium Wash", "Custom Package"].map(
                  (pkg) => (
                    <label
                      key={pkg}
                      className="flex items-center gap-2 p-3 border rounded-lg bg-white shadow-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPackages.includes(pkg)}
                        onChange={() => handlePackageChange(pkg)}
                      />
                      {pkg}
                    </label>
                  )
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Final Summary */}
      {selectedService && selectedModel && selectedPackages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 p-6 rounded-xl border shadow-md bg-white"
        >
          <h3 className="text-xl font-bold mb-4">Selected Summary</h3>
          <p><strong>Service:</strong> {selectedService.name}</p>
          <p><strong>Model:</strong> {selectedModel}</p>
          <p><strong>Packages:</strong> {selectedPackages.join(', ')}</p>
        </motion.div>
      )}
    </div>
  );
}
