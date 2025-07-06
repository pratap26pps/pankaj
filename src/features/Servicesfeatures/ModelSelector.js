'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function ModelSelector({ service, selectedModel, setSelectedModel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-gray-50 p-6 rounded-xl shadow-inner"
    >
      <h2 className="text-xl font-bold text-green-700 mb-4">{service.name} Models</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {service.models.map((model) => (
          <Button
            key={model}
            variant={selectedModel === model ? 'default' : 'outline'}
            onClick={() => setSelectedModel(model)}
          >
            {model}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
