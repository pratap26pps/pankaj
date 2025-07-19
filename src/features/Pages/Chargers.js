'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const chargers = [
  {
    id: 1,
    name: 'VoltPro Fast Charger',
    description: 'Compact 3.3kW wall-mounted EV charger with IP65 waterproof protection and universal plug support.',
    price: '₹12,499',
    image: '/images/charger/image.png',
    recommended: true,
  },
  {
    id: 2,
    name: 'Tata Power EZ Charger',
    description: 'Heavy-duty 7.4kW EV charger with Wi-Fi and Bluetooth app control. Best for home and office use.',
    price: '₹19,999',
    image: '/images/charger/image.png',
    recommended: false,
  },
    {
      id: 3,
      name: 'Delta Wallbox Mini',
      description: 'Stylish 5kW charger with fast charging and auto cut-off feature. Smart LED indicators.',
      price: '₹15,799',
  image: '/images/charger/image.png',
      recommended: true,
    },
    {
      id: 4,
      name: 'Exicom SafeCharge',
      description: 'Robust 3kW charger for Indian EVs. Surge protection and overheat control. BIS certified.',
      price: '₹9,999',
      image: '/images/charger/image.png',
      recommended: false,
    },
    {
      id: 5,
      name: 'Magenta ChargeGrid Lite',
      description: 'Smart app-controlled charger with voice alerts and load balancing. Best for 2-wheeler EVs.',
      price: '₹11,299',
    image: '/images/charger/image.png',
      recommended: false,
    },
    {
      id: 6,
      name: 'EVeGO Smart Plug',
      description: 'Portable 3.3kW charger with auto power cut. Ideal for travel and backup usage.',
      price: '₹8,499',
    image: '/images/charger/image.png',
      recommended: true,
    },
]

export default function Chargers() {
  return (
    <div className="w-full py-10 px-4 md:px-10 min-h-screen overflow-x-hidden">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {chargers.map((charger, index) => (
          <motion.div
            key={charger.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            className="overflow-hidden"
          >
            <Card className="relative shadow-xl bg-white/30 backdrop-blur-md rounded-2xl border border-white/40  hover:shadow-xl  transition-all duration-300 h-full flex flex-col">
              {charger.recommended && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow">
                  Recommended
                </div>
              )}
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-center">
                  <img
                    src={charger.image}
                    alt={charger.name}
                    className="w-full rounded-2xl h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left mt-2 text-sm sm:text-base text-gray-800">
                  <h3 className="font-semibold text-sm sm:text-base">{charger.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-snug">{charger.description}</p>
                </div>

                {/* Bottom Row: Add to Cart & Price */}
                <div
                  className={clsx(
                    'mt-auto flex items-center justify-between pt-3 gap-2',
                    'flex-row',
                    'sm:flex-row',
                    'flex-wrap sm:flex-wrap'
                  )}
                >
                  <span className="text-sm font-bold text-gray-600 order-2 sm:order-none ml-auto sm:ml-0">
                    Final Price: {charger.price}
                  </span>
                  <Button
                    size="sm"
                    className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white shadow-md order-1 sm:order-none"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
