import React from 'react';
import { useState,useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaUserCheck,FaExclamationTriangle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const Overview = () => {
 const user = useSelector((state) => state.auth.user);
 const [currentTime, setCurrentTime] = useState('');

  // Handle client-side time display
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
 
    return (
        <div>
               {/* Welcome Section */}
            <div className=" ">
              <div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex justify-evenly mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Welcome {user?.name || user?.firstname}👋
                    </h1>
                    <p className="text-gray-600">Manage your EV service platform</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Current Time</div>
                    <div className="text-lg font-mono font-bold text-emerald-600">{currentTime}</div>
                  </div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
                    <FaUserCheck className="text-3xl text-blue-500 mb-2" />
                    <div className="text-xl font-bold">12</div>
                    <div className="text-gray-500">Total Admins</div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
                    <FaUserCheck className="text-3xl text-green-500 mb-2" />
                    <div className="text-xl font-bold">34</div>
                    <div className="text-gray-500">Total Partners</div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
                    <span className="text-3xl text-emerald-500 mb-2">₹</span>
                    <div className="text-xl font-bold">1,20,000</div>
                    <div className="text-gray-500">Total Earnings</div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
                    <FaExclamationTriangle className="text-3xl text-red-500 mb-2" />
                    <div className="text-xl font-bold">₹15,000</div>
                    <div className="text-gray-500">Total Dues</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Overview;