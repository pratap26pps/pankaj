import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useSelector } from 'react-redux';
// Utility function to format dates consistently for SSR
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};
 
 

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
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['All']);
  const [pagination, setPagination] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [selectedPost, setSelectedPost] = useState(null);
console.log("blogPosts:", blogPosts);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      if (data.success) {
        setBlogPosts(data.data);
        setFilteredPosts(data.data);
        setPagination(data.pagination);
        
        // Set categories from API response
        const uniqueCategories = ['All', ...data.filters.categories];
        setCategories(uniqueCategories);
        
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const totalPosts = blogPosts.length;

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === category));
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

  const handleUpdatePost = async () => {
    try {
      const res = await fetch(`/api/blog/${selectedPost._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPost)
      });
      const data = await res.json();
  
      if (data.success) {
        // Update UI
        const updated = blogPosts.map((p) => (p._id === selectedPost._id ? selectedPost : p));
        setBlogPosts(updated);
        setFilteredPosts(updated);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error("Error updating post", err);
    }
  };
  
  const handleDeletePost = async () => {
    try {
      const res = await fetch(`/api/blog/${selectedPost._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
  
      if (data.success) {
        const updated = blogPosts.filter((p) => p._id !== selectedPost._id);
        setBlogPosts(updated);
        setFilteredPosts(updated);
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      console.error("Error deleting post", err);
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
      
      <div className="min-h-screen bg-green-50 pt-24 pb-16" style={{ fontFamily: 'poppins, sans-serif' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading blogs...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Blogs</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                  onClick={fetchBlogs}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Main Content - Only show when not loading and no error */}
          {!loading && !error && (
            <>
              {/* Header Section */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h1 
                className="text-4xl sm:text-3xl md:text-4xl  font-semibold text-gray-900 mb-4 mt-10 leading-tight"
                style={{ 
                  fontFamily: 'poppins, serif',
                  letterSpacing: '0.02em'
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
                className="text-sm sm:text-xl text-black max-w-5xl mx-auto leading-relaxed"
style={{ fontFamily: 'Poppins, sans-serif' }}              >
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
style={{ fontFamily: 'Poppins, sans-serif' }}            >
              Explore by Category
            </h3>
            <p className="text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
                      ? 'shadow-lg transform scale-105 t' 
                      : 'hover:shadow-md hover:scale-102 border'
                  }`}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    backgroundColor: selectedCategory === category ? categoryColors[category] : 'transparent',
                    borderColor: categoryColors[category],
                    color: selectedCategory === category ? 'black' : categoryColors[category]
                  }}
                >
                  {category}
                  {selectedCategory === category && (
                    <span 
                      className="ml-2 px-2 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: '', 
                        color: 'black'
                      }} 
                    >
                      {category === 'All' ? totalPosts : blogPosts.filter(post => post.category === category).length}
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
              <h4 className="mb-0 text-gray-700 " style={{ fontFamily: 'Poppins, sans-serif' }}>
                 SuperAdmin Posts
              </h4>
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
                    key={post._id || index}
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
                       
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="w-10 h-10 rounded-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';
                              }}
                            />
                            <div>
                              <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{post.author.toUpperCase()}</p>
                              <div className="flex items-center text-gray-500 text-xs">
                                <span className="mr-1">📅</span>
                                {formatDate(post.createdAt)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-xs">
                            <span className="mr-1">📖</span>
                            <span className="text-xs"style={{ fontFamily: 'Poppins, sans-serif' }}>{post.readTime}</span>
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
                          style={{ fontFamily: 'poppins, sans-serif' }}
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
                                  fontFamily: 'poppins, sans-serif',
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
                              onClick={() => handleLike(post._id)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                                likedPosts.has(post._id)
                                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                              }`}
                            >
                              <span>{likedPosts.has(post._id) ? '❤️' : '🤍'}</span>
                              <span className="text-sm">{(post.likes || 0) + (likedPosts.has(post._id) ? 1 : 0)}</span>
                            </button>
                            <div className="flex items-center gap-2">
                              {
                                user?.accountType === 'SuperAdmin' && (
                                  <>
                                                <button
                                  className="text-blue-500 text-sm hover:underline"
                                  onClick={() => {
                                    setSelectedPost(post);
                                    setIsEditModalOpen(true);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="text-red-500 text-sm hover:underline"
                                  onClick={() => {
                                    setSelectedPost(post);
                                    setIsDeleteModalOpen(true);
                                  }}
                                >
                                  Delete
                                </button>
                                  </>
                    
                                )
                              }

                                 </div>

                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Edit Blog Modal */}
{/* Full Edit Blog Modal */}
{isEditModalOpen && selectedPost && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-2xl space-y-4 overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-semibold text-gray-800">Edit Blog Post</h2>

      {/* Title */}
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Title"
        value={selectedPost.title}
        onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
      />

      {/* Excerpt */}
      <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
        <textarea
        className="w-full border rounded p-2"
        placeholder="Excerpt"
        rows={2}
        value={selectedPost.excerpt}
        onChange={(e) => setSelectedPost({ ...selectedPost, excerpt: e.target.value })}
      />

      {/* Content */}
      <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
      <textarea
        className="w-full border rounded p-2"
        placeholder="Content"
        rows={4}
        value={selectedPost.content}
        onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
      />

      {/* Image URL */}
      <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Image URL"
        value={selectedPost.image}
        onChange={(e) => setSelectedPost({ ...selectedPost, image: e.target.value })}
      />

      {/* Category */}
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Category"
        value={selectedPost.category}
        onChange={(e) => setSelectedPost({ ...selectedPost, category: e.target.value })}
      />

      {/* Tags */}
      <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Comma-separated tags"
        value={selectedPost.tags.join(', ')}
        onChange={(e) =>
          setSelectedPost({ ...selectedPost, tags: e.target.value.split(',').map(tag => tag.trim()) })
        }
      />

      {/* Author */}
      <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
        <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Author Name"
        value={selectedPost.author}
        onChange={(e) => setSelectedPost({ ...selectedPost, author: e.target.value })}
      />

      {/* Author Avatar */}
      <label htmlFor="authorAvatar" className="block text-sm font-medium text-gray-700">Author Avatar</label>
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Author Avatar URL"
        value={selectedPost.authorAvatar}
        onChange={(e) => setSelectedPost({ ...selectedPost, authorAvatar: e.target.value })}
      />

      {/* Author Role */}
      <label htmlFor="authorRole" className="block text-sm font-medium text-gray-700">Author Role</label>
        <select
        className="w-full border rounded p-2"
        value={selectedPost.authorRole}
        onChange={(e) => setSelectedPost({ ...selectedPost, authorRole: e.target.value })}
      >
        <option value="admin">Admin</option>
        <option value="superadmin">Superadmin</option>
        <option value="guest">Guest</option>
      </select>

      {/* Read Time */}
      <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">Read Time</label>
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Read Time (e.g. '5 min read')"
        value={selectedPost.readTime}
        onChange={(e) => setSelectedPost({ ...selectedPost, readTime: e.target.value })}
      />

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          onClick={() => setIsEditModalOpen(false)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdatePost}
          className="px-4 py-2 bg-emerald-600 text-white rounded"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}


{/* Delete Confirmation Modal */}
{isDeleteModalOpen && selectedPost && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md text-center space-y-4">
      <h2 className="text-xl font-semibold">Delete Blog Post</h2>
      <p>Are you sure you want to delete <strong>{selectedPost.title}</strong>?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDeletePost}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

            </motion.div>
          </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
