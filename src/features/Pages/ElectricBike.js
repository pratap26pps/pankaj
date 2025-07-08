'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

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
  {
    id: 1,
    name: 'Mahindra',
    image: '/images/mahindra.png',
    submodels: [
      { name: 'Treo Yaari', image: '/images/submodels/treo-yaari.png' },
      { name: 'Treo Plus', image: '/images/submodels/treo-plus.png' },
      { name: 'E-Alfa Mini', image: '/images/submodels/e-alfa-mini.png' },
      { name: 'E-Alfa Super', image: '/images/submodels/e-alfa-super.png' },
    ],
  },
  {
    id: 2,
    name: 'Bajaj Auto',
    image: '/images/bajaj-auto.png',
    submodels: [
      { name: 'RE E-TEC 9.0', image: '/images/submodels/re-etec-9.0.png' },
    ],
  },
  {
    id: 3,
    name: 'Piaggio',
    image: '/images/piaggio.png',
    submodels: [
      { name: 'Ape E-City', image: '/images/submodels/ape-ecity.png' },
      { name: 'FX Max', image: '/images/submodels/fx-max.png' },
    ],
  },
  {
    id: 4,
    name: 'Atul Auto',
    image: '/images/atul-auto.png',
    submodels: [
      { name: 'Elite Plus', image: '/images/submodels/elite-plus.png' },
    ],
  },
  {
    id: 5,
    name: 'Lohia',
    image: '/images/lohia.png',
    submodels: [
      { name: 'Humsafar IAQ', image: '/images/submodels/humsafar-iaq.png' },
      { name: 'Narain DX', image: '/images/submodels/narain-dx.png' },
      { name: 'Comfort F2F', image: '/images/submodels/comfort-f2f.png' },
    ],
  },
  {
    id: 6,
    name: 'Mayuri',
    image: '/images/mayuri.png',
    submodels: [
      { name: 'Deluxe', image: '/images/submodels/deluxe.png' },
    ],
  },
  {
    id: 7,
    name: 'YC Electric',
    image: '/images/yc-electric.png',
    submodels: [
      { name: 'Yatri Super', image: '/images/submodels/yatri-super.png' },
    ],
  },
  {
    id: 8,
    name: 'Mini Metro',
    image: '/images/mini-metro.png',
    submodels: [
      { name: 'Butterfly XV850', image: '/images/submodels/butterfly-xv850.png' },
    ],
  },
  {
    id: 9,
    name: 'Saarthi',
    image: '/images/saarthi.png',
    submodels: [
      { name: 'DLX', image: '/images/submodels/dlx.png' },
      { name: 'Plus', image: '/images/submodels/plus.png' },
    ],
  },
  {
    id: 10,
    name: 'Kinetic Green',
    image: '/images/kinetic-green.png',
    submodels: [
      { name: 'Safar Smart', image: '/images/submodels/safar-smart.png' },
    ],
  },
  {
    id: 11,
    name: 'Jezza',
    image: '/images/jezza.png',
    submodels: [
      { name: 'J1000', image: '/images/submodels/j1000.png' },
      { name: 'Super J1000', image: '/images/submodels/super-j1000.png' },
    ],
  },
  {
    id: 12,
    name: 'Raft',
    image: '/images/raft.png',
    submodels: [
      { name: 'Raft E-Rickshaw', image: '/images/submodels/raft-e-rickshaw.png' },
    ],
  },
];


export default function EVServiceSelector() {
  const [selectedProblems, setSelectedProblems] = useState({});
  const [activeModelModal, setActiveModelModal] = useState(null);
  const [activeSubmodelModal, setActiveSubmodelModal] = useState(null);
  const [carSelection, setCarSelection] = useState({});

  const toggleProblem = (pkgId, problem) => {
    setSelectedProblems((prev) => {
      const current = prev[pkgId] || [];
      const updated = current.includes(problem)
        ? current.filter((p) => p !== problem)
        : [...current, problem];
      return { ...prev, [pkgId]: updated };
    });
  };

  const handleModelSelect = (pkgId, model) => {
    setCarSelection((prev) => ({ ...prev, [pkgId]: { model, submodel: null } }));
    setActiveModelModal(null);
  };

  const handleSubmodelSelect = (pkgId, submodel) => {
    setCarSelection((prev) => ({
      ...prev,
      [pkgId]: { ...prev[pkgId], submodel },
    }));
    setActiveSubmodelModal(null);
  };

  return (
    <div className="flex flex-col gap-10">
      {packagesData.map((pkg) => (
        <div key={pkg.id} className="flex gap-6">
          {/* Service Package Card */}
          <Card className="flex flex-col max-w-4xl p-5 md:flex-row gap-6 shadow-xl w-full">
            <div className="w-full md:w-1/3 h-24">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{pkg.title}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setActiveModelModal(pkg.id)}>
                    {carSelection[pkg.id]?.model?.name || 'Select Car'}
                  </Button>
                  {carSelection[pkg.id]?.model && (
                    <Button variant="outline" onClick={() => setActiveSubmodelModal(pkg.id)}>
                      {carSelection[pkg.id]?.submodel || 'Select Submodel'}
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500">{pkg.warranty} • {pkg.recommended}</p>
              <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Clock size={14} /> {pkg.duration}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pkg.problems.map((problem) => (
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
              <div className="mt-4 text-right">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>

          {/* Car Model Selector */}
          {activeModelModal === pkg.id && (
            <div className=" bg-white shadow-xl w-[580px] h-[400px] p-4 rounded-xl border">
              <h4 className="text-lg font-semibold mb-4">Select Car Brand</h4>
              <div className="grid grid-cols-4 gap-2">
                {models.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => handleModelSelect(pkg.id, model)}
                    className="cursor-pointer rounded-2xl hover:shadow-md flex flex-col items-center"
                  >
                    <img src={model.image} alt={model.name} className="w-14 h-14 object-contain" />
                    <span className="text-xs text-center mt-1">{model.name}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => setActiveModelModal(null)} className="mt-4 w-full" variant="outline">Close</Button>
            </div>
          )}

          {/* Car Submodel Selector */}
          {activeSubmodelModal === pkg.id && carSelection[pkg.id]?.model && (
            <div className="w-64 bg-white shadow-xl p-4 rounded-xl border h-fit">
              <h4 className="text-lg font-semibold mb-4">Select Car Submodel</h4>
              <div className="grid grid-cols-2 gap-2">
                {carSelection[pkg.id].model.submodels.map((sub) => (
                  <div
                    key={sub.name}
                    onClick={() => handleSubmodelSelect(pkg.id, sub.name)}
                    className="cursor-pointer border p-2 rounded-lg hover:shadow-md flex flex-col items-center"
                  >
                    <img src={sub.image} alt={sub.name} className="w-14 h-14 object-contain" />
                    <span className="text-xs text-center mt-1">{sub.name}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => setActiveSubmodelModal(null)} className="mt-4 w-full" variant="outline">Close</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
