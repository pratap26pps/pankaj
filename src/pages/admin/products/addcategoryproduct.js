import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "@/redux/slices/categorySlice";
import { addProduct } from "@/redux/slices/productSlice";

import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function AddCategoryProduct() {

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categoryImg, setCategoryImg] = useState([]);
  
  const user = useSelector((state) => state.auth.user);
 

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    images: [],
    duration: "",
    warranty: "",
    recommended: "",
    problems: [""],
    isTopSeller: false
  });
  
  const [catProducts, setCatProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [allCategories, setAllCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryDesc, setEditCategoryDesc] = useState("");
  const [editCategoryImg, setEditCategoryImg] = useState("");
  const [editUploading, setEditUploading] = useState(false);

 

  // Close dropdown on outside click 
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);
 
 
 
  // Add a new category
  const handleAddCategory = async(e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    const newCategory = {
      name: categoryName,
      description: categoryDesc,
 
      
      catImage:categoryImg,
    };
    try {
    const res = await fetch("/api/admin/addcategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });

    const data = await res.json();
    if (data.success) {
      setAllCategories(data.categories);
      dispatch(setCategories(data.categories));
      setCategoryName("");
      setCategoryDesc("");
      setCategoryImg("");
      setMessage({ type: 'success', text: 'Category added successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } else {
      console.warn(data.message);
      toast.error(data.message)
    }
  } catch (error) {
    console.error("Add category error:", error);
    toast.error("internal server error")
  }
  };

  // Add a product to the selected category (local redux)
  const handleAddProduct = (e) => {
    console.log("productForm",productForm)
    console.log("selectedCategory",selectedCategory)
    e.preventDefault();
    const {
        name, duration, warranty, recommended, problems, images
    } = productForm;
  
    if ( !name || !duration || !warranty || !recommended || problems.length === 0) return;
  
    const newProduct = {
      ...productForm,
      category: selectedCategory,
      images,
    };
  
    setCatProducts(prev => [...prev, newProduct]);
  
    // Reset
    setProductForm({
      name: "",
      duration: "",
      warranty: "",
      recommended: "",
      problems: [""],
      images: [],
      description: "",
      isTopSeller: false,
      
    });
  
    setMessage({ type: 'success', text: 'Service added successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };
  

    const handleImageChangeforcategory = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading2(true);
    const formData = new FormData();
    files.forEach(file => formData.append('image', file));
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok && (result.url )) {
        // Accept both array and single url
        setCategoryImg(result.url);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading2(false);
    }
  };

  // Handle image upload (multiple)
  const handleImageChange = async (e) => {
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
      if (response.ok && (result.urls || result.url)) {
        // Accept both array and single url
        setProductForm((prev) => ({ ...prev, images: result.urls || [result.url] }));
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };


  // Add all products for this category to DB
  const handleAddAllToDB = async ( ) => {
    console.log("selectedCategory",selectedCategory)
    if (!selectedCategory || catProducts.length === 0) return;

    setIsLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch('/api/admin/addcatprod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
             categoryId: selectedCategory,
             products: catProducts,
        })
      });
      const result = await response.json();
      if (response.ok && result.products && result.products.length > 0) {
        setMessage({ type: 'success', text: 'Categories and products processed successfully' });
        dispatch(addProduct(result.products))
        toast.success('Categories and products processed successfully');
        
        setProductForm({ name: "", price: "", quantity: "", images: [], description: "", flipkartLink: "", amazonLink: "" });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to add products' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Edit handlers
  const openEditModal = (cat) => {
    setEditCategory(cat);
    setEditCategoryName(cat.name);
    setEditCategoryDesc(cat.description || "");
    setEditCategoryImg(cat.catImage || "");
 
    setEditModalOpen(true);
  };
  const handleEditImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setEditUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('image', file));
    try {
      const response = await fetch('/api/uploadproductimages', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok && (result.urls || result.url)) {
        setEditCategoryImg(result.urls || result.url);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setEditUploading(false);
    }
  };
  const handleEditCategorySave = async () => {
    if (!editCategoryName.trim()) return;
    const updatedCategory = {
      ...editCategory,
      name: editCategoryName,
      description: editCategoryDesc,
      catImage: editCategoryImg,
    };
    // Backend or local update
    if (allCategories.some(c => c._id === editCategory._id)) {
      // Backend update
      try {
        const res = await fetch(`/api/admin/${editCategory._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedCategory),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setAllCategories(prev => prev.map(c => c._id === editCategory._id ? updatedCategory : c));
          toast.success('Category updated');
        }
      } catch (err) {
        toast.error('Update failed');
      }
    } else {
      // Local redux update
      dispatch(setCategories(categories.map(c => c._id === editCategory._id ? updatedCategory : c)));
      toast.success('Category updated');
    }
    setEditModalOpen(false);
  };

  return (
    <>
    
    
   
 <div className="w-full px-2 sm:px-6 transition-colors duration-300">

      <div className="max-w-4xl mx-auto">
        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300' 
              : 'bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300'
          }`}>
            {message.text}
          </div>
        )}

<Card className="mb-10 p-6 sm:p-8 bg-white/90 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 shadow-2xl rounded-2xl transition-colors">
  <div className="flex flex-col lg:flex-row gap-8 w-full">
    
    {/* Category Form */}
    <form onSubmit={handleAddCategory} className="flex flex-col gap-4 w-full lg:w-3/5">
      <h3 className="text-xl font-bold text-blue-600 dark:text-cyan-300">Add New Category</h3>
 
    
      {/* Image Input */}
      <div>
        <Label htmlFor="categoryImage" className="font-semibold pb-1">Category Image</Label>
        <Input
          id="categoryImage"
          type="file"
          accept="image/*"
          multiple
          required
          onChange={handleImageChangeforcategory}
          className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {uploading2 ? (
          <p className="text-sm text-gray-500 mt-2">Uploading... please wait</p>
        ) : (
          categoryImg.length !== 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              <img src={categoryImg} alt="category" className="w-14 h-14 object-cover rounded border border-blue-200 dark:border-cyan-700 shadow" />
            </div>
          )
        )}
      </div>

      {/* Name Input */}
      <div>
        <Label htmlFor="categoryName" className="font-semibold pb-1">Category Name</Label>
        <Input
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="e.g. RO Purifier"
          className="mt-1 border-blue-200 dark:border-gray-700 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <Label htmlFor="categoryDesc" className="font-semibold pb-1">Description</Label>
        <textarea
          id="categoryDesc"
          value={categoryDesc}
          onChange={e => setCategoryDesc(e.target.value)}
          className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Optional description"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="h-12 w-full cursor-pointer sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-700 dark:to-blue-800 text-white font-bold shadow-md hover:from-blue-600 hover:to-cyan-600"
      >
        Add Category
      </Button>
    </form>

    {/* Existing Categories Dropdown */}
    <div className="w-full lg:w-2/5">
      <h3 className="text-xl font-bold text-blue-600 dark:text-cyan-300 mb-2">Select Existing Category</h3>
    
      <div className="relative w-full max-w-xs" ref={dropdownRef}>
        <div
          className="p-2 border border-blue-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer select-none flex justify-between items-center"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <span>
            {(() => {
              if (!selectedCategory) return 'Select a category';
              const cat = categories?.find(c => c._id === selectedCategory);
              return cat ? cat.name : 'Select a category';
            })()}
          </span>
          <svg className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>

        {/* Dropdown Items */}
        {dropdownOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
        
          
              {
                categories?.map(cat =>(
                  <li key={cat._id} className="flex items-center justify-between px-3 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer border-b border-blue-50 dark:border-gray-700 last:border-b-0">
                    <span
                      className={`flex-1 ${selectedCategory === cat._id ? 'font-semibold text-blue-700 dark:text-cyan-300' : ''}`}
                      onClick={() => { setSelectedCategory(cat._id); setDropdownOpen(false); }}
                    >
                      {cat.name}
                    </span>
                     <Button
                      size="sm"
           
                      className="ml-2 px-2 py-1 text-xs"
                      onClick={e => {
                        e.stopPropagation();
                        openEditModal(cat);
                      }}
                    >
                      Edit
                    </Button>
                    {user?.role !== 'microadmin' && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="ml-2 px-2 py-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setCategories(categories.filter(c => c._id !== cat._id)));
                        if (selectedCategory === cat._id) setSelectedCategory(null);
                      }}
                    >Delete</Button>
                    )}
                  </li>
                ))
              }                
      
          </ul>
        )}
      </div>
    </div>
  </div>
</Card>

{/* Edit Category Modal */}
<Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
  <DialogContent className="bg-white text-black">
    <DialogHeader>
      <DialogTitle>Edit Category</DialogTitle>
    </DialogHeader>
    <div className="flex flex-col gap-4">
      <label className="font-semibold">Category Name</label>
      <Input value={editCategoryName} onChange={e => setEditCategoryName(e.target.value)} />
      <label className="font-semibold">Description</label>
      <Input value={editCategoryDesc} onChange={e => setEditCategoryDesc(e.target.value)} />
    
      <label className="font-semibold">Image</label>
      <Input type="file" accept="image/*" onChange={handleEditImageChange} />
      {editUploading ? <span>Uploading...</span> : editCategoryImg && <img src={editCategoryImg} alt="preview" className="w-16 h-16 object-cover rounded border mt-2" />}
    </div>
    <DialogFooter>
      <Button onClick={handleEditCategorySave} className="bg-blue-600 text-white">Save</Button>
      <DialogClose asChild>
        <Button  className="cursor-pointer ">Cancel</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>


        {/* Product Form for Selected Category */}

        {selectedCategory && (() => {
          // Find selected category in backend or local
          const cat = allCategories.find(c => c._id === selectedCategory) || categories.find(c => c._id === selectedCategory);
          if (!cat) return null;
          console.log("cat",cat)
     
          return (
            <Card key={cat._id} className="p-6 sm:p-8 bg-white/95 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 shadow-xl rounded-2xl transition-all hover:shadow-2xl mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-blue-50 dark:border-gray-700 pb-4">
                <div>
                  {
                     cat?.catImage &&(
                    <img               
                    src={cat?.catImage}
                    alt={cat?.name}
                    className="w-14 h-14 object-cover rounded border border-blue-200 dark:border-cyan-700 shadow"
                  />
                     )
                  }
                 
                  <h3 className="text-xl font-bold text-blue-700 dark:text-cyan-300 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-blue-400 dark:bg-cyan-400 rounded-full"></span>
                    {cat?.name}
                  </h3>
                 
                  <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">Description: {cat?.description}</p>

                </div>
              </div>
              {/* Product Form for this category */}
               
      <div className="flex flex-col lg:flex-row lg:gap-5">
     
      </div>
      <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 bg-blue-50/40 dark:bg-gray-900/60 p-4 rounded-xl border border-blue-100 dark:border-gray-700 relative">
 
      <div className="flex items-center space-x-2">
  <Input
    type="checkbox"
    id="isTopSeller"
    name="isTopSeller"
    checked={productForm?.isTopSeller}
    onChange={(e) =>
      setProductForm({ ...productForm, isTopSeller: e.target.checked })
    }
    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
  />
  <label htmlFor="isTopSeller" className="text-sm font-medium text-gray-700">
    Is Top Seller
  </label>
</div>

<div>
  <Label className="font-semibold">Title / Name</Label>
  <Input
    value={productForm?.name}
    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
    placeholder="e.g. Basic Service"
    required
  />
</div>

<div>
  <Label className="font-semibold">Duration</Label>
  <Input
    value={productForm?.duration}
    onChange={(e) => setProductForm(prev => ({ ...prev, duration: e.target.value }))}
    placeholder="e.g. 4 Hrs"
    required
  />
</div>

<div>
  <Label className="font-semibold">Warranty</Label>
  <Input
    value={productForm?.warranty}
    onChange={(e) => setProductForm(prev => ({ ...prev, warranty: e.target.value }))}
    placeholder="e.g. 1000 Kms / 3 Months"
    required
  />
</div>

<div>
  <Label className="font-semibold">Recommended</Label>
  <Input
    value={productForm?.recommended}
    onChange={(e) => setProductForm(prev => ({ ...prev, recommended: e.target.value }))}
    placeholder="e.g. Every 5000 Kms / 6 Months"
    required
  />
</div>

<div className="col-span-full">
  <Label className="font-semibold">Problems / Included Services</Label>
  {productForm?.problems?.map((item, idx) => (
    <Input
      key={idx}
      value={item}
      onChange={(e) => {
        const updated = [...productForm.problems];
        updated[idx] = e.target.value;
        setProductForm(prev => ({ ...prev, problems: updated }));
      }}
      placeholder={`Service ${idx + 1}`}
      className="mt-1 mb-2"
      required
    />
  ))}
  <Button
    type="button"
    onClick={() => setProductForm(prev => ({ ...prev, problems: [...prev.problems, ""] }))}
    className="text-sm mt-1"
  >
    + Add More
  </Button>
</div>

<div>
  <Label className="font-semibold">Images</Label>
  <Input
    type="file"
    accept="image/*"
    multiple
    onChange={handleImageChange}
  />
  {uploading ? (
    "Uploading... please wait"
  ) : (
    <div className="flex gap-2 mt-2 flex-wrap">
      {productForm.images?.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`preview-${idx}`}
          className="w-14 h-14 object-cover rounded border border-blue-200"
        />
      ))}
    </div>
  )}
</div>

<div className="col-span-full">
  <Label className="font-semibold">Description</Label>
  <textarea
    value={productForm?.description}
    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
    placeholder="Short description"
    className="block w-full rounded-lg px-3 py-2"
  />
</div>

 

<div className="col-span-full mt-4">
  <Button type="submit">Create Service</Button>
</div>
</form>

              {/* Show Add All to Database button only if there are products for this category */}

              {catProducts?.length > 0 && (
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={() => handleAddAllToDB()}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-700 dark:to-blue-700 text-white font-bold shadow hover:from-green-600 hover:to-blue-600 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Add All to Database'}
                  </Button>
                </div>
              )}
              {/* List products for this category */}

            {catProducts?.filter(p => p.category === selectedCategory)?.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-semibold text-blue-600 dark:text-cyan-300">Products for this Category:</h4>
                {catProducts
                  .filter(p => p?.category === selectedCategory)
                  .map((product, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                        <div>
                          <h5 className="text-md font-bold text-gray-800 dark:text-white">{product?.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">₹ {product?.price} &bull; Qty: {product?.quantity}</p>
                          {product?.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product?.description}</p>
                          )}
                          <div className="flex gap-2 mt-2">
                            {product?.flipkartLink && (
                              <a href={product?.flipkartLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">Flipkart</a>
                            )}
                            {product?.amazonLink && (
                              <a href={product?.amazonLink} target="_blank" rel="noopener noreferrer" className="text-yellow-600 underline text-sm">Amazon</a>
                            )}
                          </div>
                        </div>
                        {product?.images && product?.images?.length > 0 && (
                          <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap">
                            {product?.images?.map((img, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={img}
                                alt={`img-${imgIdx}`}
                                className="w-14 h-14 object-cover rounded border border-blue-200 dark:border-cyan-700"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            </Card>
          );
        })()}
      </div>
    </div>
     </>
  );
} 