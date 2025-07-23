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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
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
              </div>
            </div>
        </div>
    );
};

export default Overview;