import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaExclamationTriangle, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import BlogForm from './BlogForm';
import Admanager from './Admanager'; // Import admanager component
  // Assuming admanager is a component for managing ads

const Overview = () => {
  const user = useSelector((state) => state.auth.user);
  const [currentTime, setCurrentTime] = useState('');
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showAddForm, setAddForm] = useState(false);
  // Update current time every second
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
       <div className="flex">
      {/* Main Content */}
      <div className="flex-1 px-6 py-8 transition-all duration-300 max-w-full">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex justify-between items-start flex-wrap mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome {user?.name || user?.firstName + " " + user?.lastName} 👋
              </h1>
              <h4>Email:{user?.email}</h4>
              <h4>Mobile:{user?.mobile}</h4>
            </div>
            <div className="text-right">
              <button
                className="bg-emerald-500 hover:bg-emerald-700 flex cursor-pointer  text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowBlogForm(true)}
              >
                <FaPlus className="mr-2 mt-1" /> <p>Add Blog</p>
              </button>

              
              <div className="text-sm text-gray-500">Current Time</div>
              <div className="text-lg font-mono font-bold text-emerald-600">{currentTime}</div>
            </div>
            
          </div>

          <p className="text-gray-600 text-2xl text-center">Manage your EV service platform</p>
          

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
              <FaUserCheck className="text-3xl text-blue-500 mb-2" />
              <div className="text-xl font-bold">3</div>
              <div className="text-gray-500">Total Admins</div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
              <FaUserCheck className="text-3xl text-green-500 mb-2" />
              <div className="text-xl font-bold">2</div>
              <div className="text-gray-500">Total Partners</div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
              <span className="text-3xl text-emerald-500 mb-2">₹</span>
              <div className="text-xl font-bold">0.00</div>
              <div className="text-gray-500">Total Earnings</div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
              <FaExclamationTriangle className="text-3xl text-red-500 mb-2" />
              <div className="text-xl font-bold">₹0.00</div>
              <div className="text-gray-500">Total Dues</div>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {showBlogForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center"
          >
            <BlogForm onClose={() => setShowBlogForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Crousal add karna hai  */}
  
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center"
          >
            <admanager onClose={() => setAddForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>
     
      
    </div>
    
        <Admanager/>
    </>
 
  );
};

export default Overview;
