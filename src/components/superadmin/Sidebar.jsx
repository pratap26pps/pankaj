import React from "react";
import { FaPlus, FaBlogger, FaUserEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Sidebar({ onAddBlog, onAddReview }) {
  return (
    <aside className="bg-white shadow-lg h-full w-64 flex flex-col py-8 px-4 border-r border-gray-100 fixed top-0 left-0 z-30 min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">Superadmin</h2>
          <p className="text-gray-500 text-sm">Dashboard Navigation</p>
        </div>
        <Button
          className="flex items-center gap-3 w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white shadow rounded-xl py-3 px-4 text-lg font-semibold transition"
          onClick={onAddBlog}
        >
          <FaBlogger className="text-xl" /> Add Blog
        </Button>
        <Button
          className="flex items-center gap-3 w-full justify-start bg-blue-600 hover:bg-blue-700 text-white shadow rounded-xl py-3 px-4 text-lg font-semibold transition"
          onClick={onAddReview}
        >
          <FaUserEdit className="text-xl" /> Add Review
        </Button>
        {/* Add more sidebar links here if needed */}
      </div>
    </aside>
  );
}
