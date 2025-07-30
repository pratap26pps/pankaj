"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Upload, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
const Admanager = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
 

  // Fetch all ads from DB
  const fetchAds = async () => {
    try {
      const res = await fetch("/api/ads"); // ✅ FIXED the endpoint
      const data = await res.json();
      setAds(data.ads || []);
    } catch (error) {
      toast.error("Failed to load ads");
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

 
      // Handle image upload (multiple)
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('image', file));
    try {
      const response = await fetch('/api/uploadproductimages', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Upload result:', result);
      if (response.ok && (result.urls || result.url)) {
        // Accept both array and single url
        setPreview(result.urls || result.url );
        toast.success("Images uploaded successfully!");
        setImageFile(result.urls || result.url);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  // Handle upload
const handleUpload = async (e) => {
  e.preventDefault();
  if (!imageFile) return toast.error("Please select an image");

  setUploading(true);
  try {
    const res = await fetch("/api/ads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urls: imageFile, // send array or string
      }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Ad uploaded successfully!");
      setImageFile(null);
      setPreview(null);
      fetchAds();
    } else {
      toast.error(data.message || "Upload failed");
    }
  } catch (error) {
    console.error("Ad upload failed:", error);
    toast.error("Ad upload error");
  } finally {
    setUploading(false);
  }
};



  // Handle delete
  const deleteAd = async (id) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/ads/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Ad deleted");
        fetchAds();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting ad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">🧾 Add Carousel</h1>

      {/* Upload Card */}
      <form
        onSubmit={handleUpload}
        className="bg-white rounded-lg shadow p-6 border space-y-4"
      >
        <label className="block text-gray-700 font-semibold">Upload Ad Image</label>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600"
          />
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
          >
            <Upload size={18} />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 h-48 rounded-md border object-contain"
          />
        )}
      </form>

      {/* Ads List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ads.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            <ImagePlus size={48} className="mx-auto mb-2" />
            No ads found.
          </div>
        ) : (
          ads.map((ad) => (
            <div
              key={ad._id}
              className="relative bg-white rounded-xl border shadow-md overflow-hidden group"
            >
              <img
                src={ad.imageUrl}
                alt="Ad"
                className="w-full h-56 object-cover"
              />
              <button
                onClick={() => deleteAd(ad._id)}
                disabled={loading}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-md"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admanager;
