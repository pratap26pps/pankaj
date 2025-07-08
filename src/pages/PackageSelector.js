'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import ModelSelector from './ModelSelector'
import SubModelSelector from './SubModelSelector'

const packagesData = [
  {
    id: 1,
    title: 'Basic Service',
    image: '/images/book.jpg',
    problems: [
      'Wiper Fluid Replacement',
      'Car Wash',
      'Engine Oil Replacement',
      'Battery Water Top Up',
      'Interior Vacuuming (Carpet & Seats)',
    ],
  },
  {
    id: 2,
    title: 'Standard Service',
    image: '/images/service-standard.jpg',
    problems: [
      'Car Scanning',
      'Battery Water Top Up',
      'Interior Vacuuming (Carpet & Seats)',
      'Wiper Fluid Replacement',
      'Car Wash',
    ],
  },
  {
    id: 3,
    title: 'Comprehensive Service',
    image: '/images/service-comprehensive.jpg',
    problems: [
      'Engine Tune-up',
      'AC Cleaning',
      'Coolant Top-up',
      'Air Filter Change',
      'Brake Inspection',
    ],
  },
]

const ElectricBike = () => {
  const [selectedProblems, setSelectedProblems] = useState({})
  const [modelData, setModelData] = useState({})
  const [subModelData, setSubModelData] = useState({})
  const [cart, setCart] = useState([])

  const handleProblemToggle = (pkgId, problem) => {
    setSelectedProblems((prev) => {
      const prevArr = prev[pkgId] || []
      return {
        ...prev,
        [pkgId]: prevArr.includes(problem)
          ? prevArr.filter((p) => p !== problem)
          : [...prevArr, problem],
      }
    })
  }

  const handleAddToCart = (pkgId) => {
    const problems = selectedProblems[pkgId]
    const model = modelData[pkgId]
    const subModel = subModelData[pkgId]

    if (!problems || !problems.length) return alert('Select at least one problem.')
    if (!model) return alert('Select a model.')
    if (!subModel) return alert('Select a submodel.')

    setCart((prev) => [
      ...prev,
      {
        id: Date.now(),
        pkg: packagesData.find((p) => p.id === pkgId),
        problems,
        model,
        subModel,
      },
    ])
  }

  return (
    <div className="bg-gray-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Scheduled Packages - Electric Bike</h1>

      {packagesData.map((pkg) => (
        <div key={pkg.id} className="w-full max-w-2xl bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">{pkg.title}</h2>
          <div className="flex flex-col sm:flex-row sm:items-start">
            <img src={pkg.image} alt={pkg.title} className="w-full sm:w-32 h-32 object-cover rounded mb-3 sm:mb-0 sm:mr-4" />

            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                {pkg.problems.map((problem) => (
                  <label key={problem} className="text-sm flex items-center text-gray-700">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedProblems[pkg.id]?.includes(problem) || false}
                      onChange={() => handleProblemToggle(pkg.id, problem)}
                    />
                    {problem}
                  </label>
                ))}
              </div>

              <ModelSelector
                onSelect={(model) =>
                  setModelData((prev) => ({ ...prev, [pkg.id]: model }))
                }
              />
              <SubModelSelector
                selectedModel={modelData[pkg.id]}
                onSelect={(submodel) =>
                  setSubModelData((prev) => ({ ...prev, [pkg.id]: submodel }))
                }
              />

              <Button
                onClick={() => handleAddToCart(pkg.id)}
                className="bg-green-600 text-white mt-2 w-fit"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="w-full max-w-xl bg-white rounded shadow p-4 mt-6">
          <h2 className="text-xl font-bold mb-3">🛒 Cart Items ({cart.length})</h2>
          {cart.map((item) => (
            <div key={item.id} className="border-b last:border-none py-2">
              <p className="font-semibold">{item.pkg.title}</p>
              <p className="text-sm text-gray-600">
                Problems: {item.problems.join(', ')}
              </p>
              <p className="text-sm text-gray-600">
                Model: {item.model?.name} | Submodel: {item.subModel}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ElectricBike
