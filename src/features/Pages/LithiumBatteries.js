'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const batteries = [
  {
    id: 1,
    name: 'Amaron Lithium Pro+',
    description: 'Advanced 60Ah lithium-ion battery for long-lasting performance and eco-efficiency. 5-year warranty included.',
    price: '₹7,999',
    image: '/images/battry/image.png',
    recommended: true,
  },
  {
    id: 2,
    name: 'Exide SparkX',
    description: 'Durable 70Ah lithium battery ideal for city and highway use, with 4 years of trusted backup.',
    price: '₹6,499',
    image: '/images/battry/image.png',
    recommended: false,
  },
  {
    id: 3,
    name: 'Luminous DriveMax',
    description: 'Premium 75Ah capacity with excellent power retention. Designed for long journeys. 6-year warranty.',
    price: '₹8,499',
    image: '/images/battry/image.png',
    recommended: false,
  },
  {
    id: 4,
    name: 'Okaya VoltCare',
    description: 'Budget-friendly 65Ah lithium battery perfect for daily use. 3-year warranty and smart design.',
    price: '₹5,999',
    image: '/images/battry/image.png',
    recommended: true,
  },
  {
    id: 5,
    name: 'Tata Green Lithium',
    description: 'Powerful 80Ah battery for high-performance vehicles. Eco-conscious with 5-year backup.',
    price: '₹9,199',
    image: '/images/battry/image.png',
    recommended: false,
  },
  {
    id: 6,
    name: 'SF Sonic E-Lite',
    description: 'Compact and efficient 70Ah battery for smooth performance. Backed by a 5-year warranty.',
    price: '₹7,299',
    image: '/images/battry/image.png',
    recommended: true,
  },
]

export default function LithiumBatteries() {
  return (
    <div className="w-full py-10 px-4 md:px-10 min-h-screen overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {batteries.map((battery, index) => (
          <motion.div
            key={battery.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            className="overflow-hidden"
          >
            <Card className="relative shadow-xl bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              {battery.recommended && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow">
                  Recommended
                </div>
              )}

              <CardContent className="flex flex-col gap-2 p-4">
                {/* Image */}
                <div className="flex items-center justify-center">
                  <img
                    src={battery.image}
                    alt={battery.name}
                    className="rounded-xl w-full h-full object-contain"
                  />
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-1 text-left mt-2 text-sm sm:text-base text-gray-800">
                  <h3 className="font-semibold text-sm sm:text-base">{battery.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-snug">{battery.description}</p>
                </div>

                {/* Bottom Row */}
                <div
                  className={clsx(
                    'mt-auto flex items-center justify-between pt-3 gap-2',
                    'flex-row',
                    'sm:flex-row',
                    'flex-wrap sm:flex-nowrap'
                  )}
                >
                  <span className="text-sm font-bold text-gray-600 order-2 sm:order-none ml-auto sm:ml-0">
                    Final Price: {battery.price}
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
