import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

// Utility function to format dates consistently for SSR
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

// Static example blog posts from admin and superadmin
const staticBlogPosts = [
  {
    id: 1,
    title: "GridaNeo Bharat: Leading the EV Revolution in India",
    excerpt: "Discover how GridaNeo Bharat is transforming the electric vehicle landscape across India with cutting-edge technology, exceptional service, and sustainable solutions.",
    content: "As India moves towards a sustainable future, GridaNeo Bharat stands at the forefront of the electric vehicle revolution...",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=400&fit=crop",
    category: "Company News",
    tags: ["EV Revolution", "Sustainability", "Innovation", "India"],
    author: "Rajesh Kumar",
    authorRole: "superadmin",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    views: 2450,
    likes: 189,
    readTime: "5 min read",
    createdAt: "2024-01-20"
  },
  {
    id: 2,
    title: "Customer Success: 40% Cost Reduction with EV Fleet Transition",
    excerpt: "Learn how our enterprise client achieved remarkable cost savings and improved operational efficiency by transitioning their entire fleet to electric vehicles.",
    content: "When a major logistics company approached us with the challenge of reducing operational costs while maintaining service quality...",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    category: "Success Stories",
    tags: ["Cost Reduction", "Fleet Management", "Case Study", "ROI"],
    author: "Priya Sharma",
    authorRole: "admin",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    views: 1890,
    likes: 156,
    readTime: "7 min read",
    createdAt: "2024-01-18"
  },
  {
    id: 3,
    title: "Advanced EV Maintenance: Best Practices for Optimal Performance",
    excerpt: "Essential maintenance guidelines and advanced techniques from our expert technicians to ensure your electric vehicle delivers peak performance and longevity.",
    content: "Electric vehicles require specialized maintenance approaches that differ significantly from traditional combustion engines...",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop",
    category: "Maintenance Tips",
    tags: ["Maintenance", "Best Practices", "Performance", "Technical"],
    author: "Dr. Amit Patel",
    authorRole: "admin",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    views: 3200,
    likes: 287,
    readTime: "6 min read",
    createdAt: "2024-01-15"
  },
  {
    id: 4,
    title: "Expanding Horizons: 50 New Service Centers Across India",
    excerpt: "GridaNeo Bharat announces massive expansion with 50 new service centers, bringing world-class EV maintenance and support closer to customers nationwide.",
    content: "We're thrilled to announce our largest expansion yet, with 50 new service centers opening across India...",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
    category: "Company News",
    tags: ["Expansion", "Service Centers", "Growth", "Nationwide"],
    author: "Anita Desai",
    authorRole: "superadmin",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    views: 4100,
    likes: 342,
    readTime: "4 min read",
    createdAt: "2024-01-12"
  },
  {
    id: 5,
    title: "EV Charging Infrastructure: Complete Guide to Fast Charging",
    excerpt: "Comprehensive guide to understanding EV charging infrastructure, from home charging solutions to ultra-fast DC charging networks across India.",
    content: "Understanding the evolving landscape of EV charging infrastructure is crucial for both current and prospective EV owners...",
    image: "https://images.unsplash.com/photo-1593941707874-ef2d9e8e3d5d?w=800&h=400&fit=crop",
    category: "Education",
    tags: ["Charging", "Infrastructure", "Fast Charging", "Guide"],
    author: "Vikram Singh",
    authorRole: "admin",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    views: 2780,
    likes: 234,
    readTime: "8 min read",
    createdAt: "2024-01-10"
  },
  {
    id: 6,
    title: "Client Testimonial: Achieving 99.9% Vehicle Uptime",
    excerpt: "Hear from our valued enterprise client about how GridaNeo Bharat's comprehensive maintenance services helped them achieve industry-leading vehicle uptime.",
    content: "We've been partnering with GridaNeo Bharat for over three years, and the results have been exceptional...",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "Testimonials",
    tags: ["Testimonial", "Uptime", "Reliability", "Partnership"],
    author: "Sunita Reddy",
    authorRole: "admin",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    views: 1650,
    likes: 128,
    readTime: "5 min read",
    createdAt: "2024-01-08"
  },
  {
    id: 7,
    title: "Future of Electric Mobility: AI-Powered Predictive Maintenance",
    excerpt: "Explore how GridaNeo Bharat is leveraging artificial intelligence and IoT technology to revolutionize electric vehicle maintenance through predictive analytics.",
    content: "The future of electric vehicle maintenance lies in predictive analytics and AI-powered solutions...",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    category: "EV Technology",
    tags: ["AI", "Predictive Maintenance", "IoT", "Future Tech"],
    author: "Dr. Kiran Mehta",
    authorRole: "superadmin",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    views: 3850,
    likes: 298,
    readTime: "9 min read",
    createdAt: "2024-01-05"
  },
  {
    id: 8,
    title: "Sustainable Transportation: Environmental Impact Report 2024",
    excerpt: "GridaNeo Bharat's comprehensive environmental impact report showcasing how our services contribute to reducing carbon emissions and promoting sustainable transportation.",
    content: "Our commitment to sustainability goes beyond just maintaining electric vehicles...",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
    category: "Sustainability",
    tags: ["Environment", "Sustainability", "Carbon Reduction", "Report"],
    author: "Arjun Gupta",
    authorRole: "admin",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    views: 2100,
    likes: 175,
    readTime: "6 min read",
    createdAt: "2024-01-03"
  }
];

const categoryColors = {
  "EV Technology": "#1890ff",
  "Success Stories": "#52c41a",
  "Maintenance Tips": "#fa8c16",
  "Company News": "#722ed1",
  "Education": "#13c2c2",
  "Testimonials": "#fadb14",
  "Sustainability": "#52c41a",
  "General": "#8c8c8c"
};

const Blog = () => {
  const [filteredPosts, setFilteredPosts] = useState(staticBlogPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Get unique categories from static posts
  const categories = ['All', ...new Set(staticBlogPosts.map(post => post.category))];
  const totalPosts = staticBlogPosts.length;

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredPosts(staticBlogPosts);
    } else {
      setFilteredPosts(staticBlogPosts.filter(post => post.category === category));
    }
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 pt-24 pb-16" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 mb-6 leading-tight"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  letterSpacing: '-0.02em'
                }}
              >
                Our Blog
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mb-4"
                style={{ maxWidth: '200px' }}
              />
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p 
                className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Discover insights, success stories, and the latest developments in electric vehicle technology and sustainable transportation solutions.
              </p>
              
              <div className="flex justify-center items-center gap-6 mt-8 text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">🔥</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>Latest Updates</span>
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⚡</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>Expert Insights</span>
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">🏆</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>Success Stories</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 
              className="text-2xl font-semibold text-gray-800 mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Explore by Category
            </h3>
            <p className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              Filter posts to find exactly what you're looking for
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`rounded-full font-medium transition-all duration-300 px-6 py-3 ${
                    selectedCategory === category 
                      ? 'shadow-lg transform scale-105 text-white' 
                      : 'hover:shadow-md hover:scale-102 border'
                  }`}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    backgroundColor: selectedCategory === category ? categoryColors[category] : 'transparent',
                    borderColor: categoryColors[category],
                    color: selectedCategory === category ? 'white' : categoryColors[category]
                  }}
                >
                  {category}
                  {selectedCategory === category && (
                    <span 
                      className="ml-2 px-2 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.3)', 
                        color: 'white'
                      }} 
                    >
                      {category === 'All' ? totalPosts : staticBlogPosts.filter(post => post.category === category).length}
                    </span>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                {totalPosts}
              </span>
              <h4 className="mb-0 text-gray-700">
                Admin & SuperAdmin Posts
              </h4>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-purple-500">👑</span>
                <span className="text-sm">
                  {staticBlogPosts.filter(post => post.authorRole === 'superadmin').length} SuperAdmin
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">⭐</span>
                <span className="text-sm">
                  {staticBlogPosts.filter(post => post.authorRole === 'admin').length} Admin
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">
              Showing {filteredPosts.length} of {totalPosts} posts
            </p>
          </div>
        </motion.div>

        {/* Blog Cards Grid */}
        <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.div 
                    key={post.id || index}
                    variants={cardVariants}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="h-full shadow-xl rounded-2xl overflow-hidden border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                      {/* Card Cover */}
                      <div className="relative overflow-hidden h-48">
                        <img
                          alt={post.title}
                          src={post.image}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span
                          className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: categoryColors[post.category] || categoryColors.General }}
                        >
                          {post.category}
                        </span>
                        <div className="absolute top-4 right-4">
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-bold text-white"
                            style={{ 
                              backgroundColor: post.authorRole === 'superadmin' ? '#722ed1' : '#1890ff'
                            }}
                          >
                            {post.authorRole === 'superadmin' ? 'Super' : 'Admin'}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="w-10 h-10 rounded-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';
                              }}
                            />
                            <div>
                              <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{post.author}</p>
                              <div className="flex items-center text-gray-500 text-xs">
                                <span className="mr-1">📅</span>
                                {formatDate(post.createdAt)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-xs">
                            <span className="mr-1">📖</span>
                            <span className="text-xs">{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h4 
                          className="mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-lg font-bold"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {post.title}
                        </h4>
                        
                        <p 
                          className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {post.excerpt}
                        </p>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span 
                                key={`${tag}-${tagIndex}`} 
                                className="text-xs rounded-full font-medium px-2 py-1"
                                style={{ 
                                  fontFamily: 'Inter, sans-serif',
                                  backgroundColor: `${categoryColors[post.category] || categoryColors.General}20`,
                                  color: categoryColors[post.category] || categoryColors.General,
                                  border: `1px solid ${categoryColors[post.category] || categoryColors.General}40`
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-gray-500">
                            <div className="flex items-center gap-1">
                              <span>👁️</span>
                              <span className="text-sm">{post.views || 0}</span>
                            </div>
                            <button
                              onClick={() => handleLike(post.id)}
                              className={`flex items-center gap-1 transition-colors duration-300 ${
                                likedPosts.has(post.id) 
                                  ? 'text-red-500' 
                                  : 'text-gray-500 hover:text-red-500'
                              }`}
                            >
                              <span>{likedPosts.has(post.id) ? '❤️' : '🤍'}</span>
                              <span className="text-sm">{(post.likes || 0) + (likedPosts.has(post.id) ? 1 : 0)}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors duration-300">
                              <span>📤</span>
                              <span className="text-sm">Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Blog;
