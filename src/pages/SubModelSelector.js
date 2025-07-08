'use client'

import React, { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const subModelsData = {
  Swift: ['LXi', 'VXi', 'ZXi', 'ZXi+'],
  WagonR: ['LXi 1.0', 'VXi 1.2', 'ZXi 1.2'],
  'Swift Dzire': ['LXi', 'VXi', 'ZXi'],
  Baleno: ['Delta', 'Zeta', 'Alpha'],
  Alto: ['800 Std', '800 LXI', '800 VXI'],
  Ritz: ['LXi', 'VXi', 'ZXi'],
  Celerio: ['LXi AMT', 'VXi AMT', 'ZXi AMT'],
  Ignis: ['Sigma', 'Delta', 'Zeta', 'Alpha'],
  Ertiga: ['LXi', 'VXi', 'ZXi'],
  XL6: ['Zeta', 'Alpha', 'Alpha+'],
}

export default function SubModelSelector({ selectedModel, onSelect }) {
  const [selectedSubModel, setSelectedSubModel] = useState(null)
  const [search, setSearch] = useState('')

  if (!selectedModel) return null

  const subModels = subModelsData[selectedModel.name] || []

  const handleSelect = (submodel) => {
    setSelectedSubModel(submodel)
    onSelect(submodel)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedSubModel ? selectedSubModel : 'Select Sub Model'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <Input
          placeholder="Search Sub Models"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />
        <div className="flex flex-col gap-2">
          {subModels
            .filter((sub) => sub.toLowerCase().includes(search.toLowerCase()))
            .map((sub) => (
              <div
                key={sub}
                onClick={() => handleSelect(sub)}
                className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
              >
                {sub}
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
