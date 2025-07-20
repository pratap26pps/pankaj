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
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 shadow-lg"
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

              <div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-lg"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={() => setActiveSection('verify-partners')} className="bg-emerald-500 hover:bg-emerald-600">
                    <FaUserCheck className="mr-2" />
                    Verify Partners
                  </Button>
                  <Button onClick={() => setActiveSection('live-bookings')} className="bg-orange-500 hover:bg-orange-600">
                    <FaExclamationTriangle className="mr-2" />
                    Handle Disputes
                  </Button>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Overview;