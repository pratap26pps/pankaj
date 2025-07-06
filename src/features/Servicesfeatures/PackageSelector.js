'use client';
import { motion } from 'framer-motion';

export default function PackageSelector({ selectedPackages, handlePackageChange }) {
  const packages = ["Basic Checkup", "Full Service", "Premium Wash", "Custom Package"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6"
    >
      <h3 className="text-lg font-semibold mb-2">Select Packages</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
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
        ))}
      </div>
    </motion.div>
  );
}
