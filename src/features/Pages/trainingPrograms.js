'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Play, Pause, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const trainingPrograms = [
  {
    id: 1,
    name: 'EV Service Center Expert Training',
    description: 'Comprehensive 6-week training program for EV service professionals. Learn diagnostics, repair techniques, and safety protocols with hands-on experience.',
    price: '₹19,999',
    image: '/images/training/service-expert.jpg',
    videoId: 'akPmmy1QslQ',
    recommended: true,
  },
  {
    id: 2,
    name: 'EV Technology Fundamentals',
    description: 'Perfect 4-week beginner course to understand EV technology from ground up. Covers battery tech, charging systems, and safety protocols.',
    price: '₹12,999',
    image: '/images/training/fundamentals.jpg',
    videoId: 'dQw4w9WgXcQ',
    recommended: false,
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    rotateY: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

const videoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 200
    }
  }
}

export default function Others() {
  const [playingVideo, setPlayingVideo] = useState(null)
  const [shareDropdown, setShareDropdown] = useState(null)

  // Share functionality
  const shareProgram = (program, platform) => {
    const url = window.location.href;
    const text = `Check out this amazing EV training program: ${program.name} - ${program.description}`;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${text} - ${url}`);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
    setShareDropdown(null);
  };

  const handleVideoPlay = (videoId) => {
    setPlayingVideo(videoId)
  }

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Header Section with proper alignment */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-8 pb-6 px-4 md:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4"
          >
            EV Training Programs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Master the future of automotive technology with our comprehensive training courses
          </motion.p>
        </div>
      </motion.div>

      {/* Cards Section with proper spacing and alignment */}
      <div className="px-4 md:px-10 pb-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 justify-items-center">
            <AnimatePresence>
              {trainingPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="w-full max-w-md"
                  style={{ perspective: 1000 }}
                >
                  <Card className="relative shadow-2xl bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-xl rounded-3xl border border-white/50 hover:border-white/70 transition-all duration-500 h-full flex flex-col overflow-hidden group">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Recommended Badge with animation */}
                    {program.recommended && (
                      <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="absolute top-4 right-4 z-10"
                      >
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                          ⭐ Recommended
                        </div>
                      </motion.div>
                    )}

                    <CardContent className="flex flex-col gap-4 p-6">
                      {/* Enhanced Video Section */}
                      <motion.div 
                        variants={videoVariants}
                        className="relative group/video"
                      >
                        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg relative">
                          {/* Mobile-friendly video with play button overlay */}
                          <iframe
                            src={`https://www.youtube.com/embed/${program.videoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                            title={program.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                            allowFullScreen
                            className="w-full h-full transition-transform duration-300 group-hover/video:scale-105"
                            loading="lazy"
                          />
                          
                          {/* Gradient overlay for better mobile interaction */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        
                        {/* Video play indicator */}
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-lg"
                        >
                          ▶ HD Video
                        </motion.div>
                      </motion.div>

                      {/* Enhanced Title & Description */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col gap-3 text-left"
                      >
                        <h3 className="font-bold text-lg md:text-xl text-gray-800 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                          {program.name}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3">
                          {program.description}
                        </p>
                      </motion.div>

                      {/* Enhanced Bottom Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-auto flex items-center justify-between pt-4 gap-3 border-t border-white/20"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Final Price</span>
                          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            {program.price}
                          </span>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex gap-2 w-full">
                            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                              <Play className="w-5 h-5 mr-2" />
                              Start Learning
                            </Button>
                            <div className="relative">
                              <Button 
                                onClick={() => setShareDropdown(shareDropdown === program.id ? null : program.id)}
                                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                              >
                                <Share2 className="w-5 h-5" />
                              </Button>
                              
                              {shareDropdown === program.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                  className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-3 z-50 min-w-[200px]"
                                >
                                  <div className="text-sm font-semibold text-gray-800 mb-2">Share this program</div>
                                  <div className="flex flex-col gap-2">
                                    <button
                                      onClick={() => shareProgram(program, 'facebook')}
                                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors text-left"
                                    >
                                      <Facebook className="w-4 h-4 text-blue-600" />
                                      <span className="text-sm text-gray-700">Facebook</span>
                                    </button>
                                    <button
                                      onClick={() => shareProgram(program, 'twitter')}
                                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-sky-50 transition-colors text-left"
                                    >
                                      <Twitter className="w-4 h-4 text-sky-500" />
                                      <span className="text-sm text-gray-700">Twitter</span>
                                    </button>
                                    <button
                                      onClick={() => shareProgram(program, 'linkedin')}
                                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors text-left"
                                    >
                                      <Linkedin className="w-4 h-4 text-blue-700" />
                                      <span className="text-sm text-gray-700">LinkedIn</span>
                                    </button>
                                    <button
                                      onClick={() => shareProgram(program, 'copy')}
                                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                                    >
                                      <Copy className="w-4 h-4 text-gray-600" />
                                      <span className="text-sm text-gray-700">Copy Link</span>
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Call to Action Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white py-16 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Start Your EV Career?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 opacity-90"
          >
            Join thousands of professionals transforming their careers
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300">
              Get Started Today 🚀
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
