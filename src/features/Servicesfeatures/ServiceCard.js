'use client';
import { motion } from 'framer-motion';

export default function ServiceCard({ service, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
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
  );
}
