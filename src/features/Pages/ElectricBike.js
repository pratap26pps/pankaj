'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Trash2 } from 'lucide-react';
import services from '../Data';
const packagesData = [
  {
    id: 1,
    title: 'Basic Service',
    image: '/images/basic-service.jpg',
    duration: '4 Hrs',
    warranty: '1000 Kms / 3 Months',
    recommended: 'Every 5000 Kms / 6 Months',
    problems: ['Engine Oil Change', 'Wiper Fluid Refill', 'Tyre Pressure Check'],
  },
  {
    id: 2,
    title: 'Standard Service',
    image: '/images/standard-service.jpg',
    duration: '6 Hrs',
    warranty: '2000 Kms / 6 Months',
    recommended: 'Every 10,000 Kms / 6 Months',
    problems: ['Air Filter Change', 'AC Checkup', 'Battery Top-up'],
  },
];

const models = [
  { id: 1, name: 'Maruti', submodels: ['Swift', 'Baleno'] },
  { id: 2, name: 'Hyundai', submodels: ['i20', 'Creta'] },
];

export default function EVServiceSelector() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedSubmodel, setSelectedSubmodel] = useState(null);
  const [selectedProblems, setSelectedProblems] = useState({});
  const [cart, setCart] = useState([]);

  const toggleProblem = (pkgId, problem) => {
    setSelectedProblems(prev => {
      const current = prev[pkgId] || [];
      const updated = current.includes(problem)
        ? current.filter(p => p !== problem)
        : [...current, problem];
      return { ...prev, [pkgId]: updated };
    });
  };

  const addToCart = (pkg) => {
    if (!selectedModel || !selectedSubmodel) return alert('Select car & submodel');
    if (!selectedProblems[pkg.id]?.length) return alert('Select at least one service');

    setCart(prev => [...prev, {
      id: Date.now(),
      title: pkg.title,
      problems: selectedProblems[pkg.id],
      model: selectedModel.name,
      submodel: selectedSubmodel,
    }]);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* Car Model Selector */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-xl font-bold">Select Car</h2>
        {models.map((model) => (
          <div key={model.id}>
            <button
              className={`w-full text-left px-4 py-2 rounded border ${selectedModel?.id === model.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              onClick={() => { setSelectedModel(model); setSelectedSubmodel(null); }}
            >
              {model.name}
            </button>
            {selectedModel?.id === model.id && (
              <div className="ml-4 mt-2 space-y-2">
                {model.submodels.map((sub, idx) => (
                  <button
                    key={idx}
                    className={`block w-full text-left px-3 py-1 rounded ${selectedSubmodel === sub ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedSubmodel(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Packages */}
      <div className="lg:col-span-2 space-y-6">
        {packagesData.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-xl shadow p-4 space-y-4">
            <div className="flex gap-4">
              <img src={pkg.image} alt={pkg.title} className="h-24 w-32 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-sm text-gray-600">{pkg.warranty} • {pkg.recommended}</p>
                <p className="flex items-center gap-2 text-sm text-gray-600 mt-1"><Clock size={14} /> {pkg.duration}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {pkg.problems.map(problem => (
                <label key={problem} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedProblems[pkg.id]?.includes(problem) || false}
                    onChange={() => toggleProblem(pkg.id, problem)}
                    className="accent-blue-600"
                  />
                  {problem}
                </label>
              ))}
            </div>

            <div className="text-right">
              <Button onClick={() => addToCart(pkg)} className="bg-blue-600 hover:bg-blue-700 text-white">Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded shadow p-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.model} - {item.submodel}</p>
                <ul className="list-disc ml-4 text-sm mt-1 text-gray-700">
                  {item.problems.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
