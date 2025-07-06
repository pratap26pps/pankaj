'use client';
import { motion } from 'framer-motion';

export default function SummaryCard({ selectedService, selectedModel, selectedPackages }) {
  return (
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
  );
}
