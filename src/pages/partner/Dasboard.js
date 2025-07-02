'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

const Dashboard = () => {
  const [progress, setProgress] = useState(30);

  // Dummy profile data
  const profile = {
    name: 'Amit Sharma',
    center: 'Green Wheels EV Service Center',
    contact: '+91 9876543210',
    location: 'Lucknow, UP',
    image: '/images/pankaj.jpg',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex flex-col items-center justify-center py-10 px-2 sm:px-4 pt-44">
      {/* Profile Card with Welcome */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl gap-6 mb-10">
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 bg-white rounded-3xl shadow-2xl px-8 py-7 w-full max-w-2xl border border-green-200">
          <Image src={profile.image} alt="Profile" width={90} height={90} className="rounded-full border-4 border-green-400 shadow-lg" />
          <div className="flex flex-col items-center sm:items-start w-full">
            <h2 className="text-2xl font-extrabold text-green-800 mb-1">{profile.name}</h2>
            <p className="text-green-700 font-semibold mb-1">{profile.center}</p>
            <p className="text-gray-600 text-sm mb-0.5">{profile.location}</p>
            <p className="text-gray-600 text-sm mb-2">{profile.contact}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 drop-shadow mb-1 tracking-tight text-center sm:text-left">Service Center Dashboard</h1>
            <p className="text-green-700 text-base sm:text-lg font-medium mb-2 text-center sm:text-left">Welcome to your partner portal</p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-700 rounded-full mb-2 mx-auto sm:mx-0"></div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-4xl border-b-2 border-green-200 mb-8"></div>

      <div className="w-full max-w-4xl flex flex-col items-center">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl bg-green-200/60 shadow">
            <TabsTrigger value="bookings" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white transition">Manage Bookings</TabsTrigger>
            <TabsTrigger value="training" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white transition">Training & Compliance</TabsTrigger>
          </TabsList>

          {/* Manage Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="rounded-2xl shadow-lg border border-green-100">
              <CardContent className="space-y-5 py-6">
                <h2 className="text-xl font-bold text-green-800">Incoming Bookings</h2>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center justify-between p-3 border rounded-xl bg-green-50">
                    <span className="font-semibold text-green-900">Booking #12345</span>
                    <div className="space-x-2 mt-2 sm:mt-0">
                      <Button variant="outline" className="rounded-lg border-green-400 text-green-700 hover:bg-green-100 font-semibold shadow">Accept</Button>
                      <Button variant="destructive" className="rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow">Reject</Button>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-green-800 mt-4">Update Service Progress</h2>
                <Progress value={progress} className="h-3 rounded-full bg-green-100" />
                <Button onClick={() => setProgress(progress + 10)} className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded-xl shadow transition-all text-lg">Update Progress</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training & Compliance Tab */}
          <TabsContent value="training">
            <Card className="rounded-2xl shadow-lg border border-green-100">
              <CardContent className="space-y-5 py-6">
                <h2 className="text-xl font-bold text-green-800">Training Modules</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  <li><Link href="#">Service Quality Guidelines</Link></li>
                  <li><Link href="#">Safety Compliance</Link></li>
                  <li><Link href="#">Customer Communication Tips</Link></li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl shadow transition-all text-lg">Mark as Completed</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
