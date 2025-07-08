'use client'

import React, { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const carModels = [
  { name: 'Swift', img: '/images/swift.png' },
  { name: 'WagonR', img: '/images/wagonr.png' },
  { name: 'Swift Dzire', img: '/images/swiftdzire.png' },
  { name: 'Baleno', img: '/images/baleno.png' },
  { name: 'Alto', img: '/images/alto.png' },
  { name: 'Ritz', img: '/images/ritz.png' },
  { name: 'Celerio', img: '/images/celerio.png' },
  { name: 'Ignis', img: '/images/ignis.png' },
  { name: 'Ertiga', img: '/images/ertiga.png' },
  { name: 'XL6', img: '/images/xl6.png' },
]

export default function ModelSelector({ onSelect }) {
  const [selectedModel, setSelectedModel] = useState(null)
  const [search, setSearch] = useState('')

  const handleSelect = (model) => {
    setSelectedModel(model)
    onSelect(model)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className=" ">
          {selectedModel ? selectedModel.name : 'Select Car Model'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 max-h-[400px] overflow-y-auto">
        <Input
          placeholder="Search Models"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
        <div className="grid grid-cols-3 gap-4">
          {carModels
            .filter((car) => car.name.toLowerCase().includes(search.toLowerCase()))
            .map((car) => (
              <div
                key={car.name}
                onClick={() => handleSelect(car)}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
              >
                <img src={car.img} alt={car.name} className="w-20 h-20 object-contain" />
                <span className="text-sm mt-1">{car.name}</span>
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
