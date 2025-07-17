"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const UpdatePassword = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-white to-gray-300 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-lg rounded-3xl border border-gray-300 shadow-2xl bg-white/60 backdrop-blur-lg p-6">
          {/* Top logo and heading */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <Image
                src="/images/logo (3).png"
                alt="EV Repair"
                width={90}
                height={36}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Update Password</h1>
          </div>

          {/* Form content */}
          <CardContent className="px-0">
            <form className="flex flex-col space-y-5">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-base font-medium">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className="focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-base font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter password"
                  className="focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:brightness-110 transition-all py-2.5 text-md rounded-xl shadow-lg"
              >
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;
