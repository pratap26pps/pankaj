"use client";

import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Ban, Pencil, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct,removeProduct } from "@/redux/slices/productSlice";
import { addCategory } from "@/redux/slices/categorySlice";
 
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import toast from "react-hot-toast";



export default function ProductHistory() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.category.categories)
console.log("products",products)
console.log("categories",categories)
    const user = useSelector((state) => state.auth.user);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const [selectedImageIdx, setSelectedImageIdx] = useState(null);
 console.log("product",products)
 
 const uniqueCategories = Array.from(
    new Map(
      categories
        .flat() // flatten in case of nested arrays
        .map(cat => [cat._id, cat]) // use _id as key for uniqueness
    ).values()
  );
console.log("uniqueCategories",uniqueCategories)
      // Fetch all categories from backend on mount
      useEffect(() => {
        async function fetchCategories() {
          try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            if (data.success && Array.isArray(data.categories)) {
           
              dispatch(addCategory(data.categories));
            }
          } catch (err) {
           console.log(err)
          }
        }
        fetchCategories();
      }, [dispatch]);

      

    const filteredProducts = products.filter(
        (p) =>
            p?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p?.category && p?.category?.name && p?.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = async (id) => {
        if (id) {
            try {
                const res = await fetch('/api/admin/deleteproduct', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    dispatch(removeProduct(id));
                    toast.success("product deleted")


                }
            } catch (err) {
               console.log(err)
            }
            setDeleteId(null);
        }
    };
 
    const handleUpdateProduct = async (id) => {
        if (!id) return;
        console.log("editproduct",editProduct)
          const updatedProduct = { ...editProduct, id };
            console.log("Sending to backend:", updatedProduct);
        try {
            setloading(true)
            const res = await fetch('/api/admin/editproduct', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });
            const data = await res.json();
            if (res.ok && data.success) {

                dispatch(updateProduct(data.product));
                toast.success("updated successfully")
            }
        } catch (err) {
            console.error(err)
            toast.error(err)
            toast.error("Update failed");
        }finally{
            setloading(false)
            setIsDialogOpen(false);
        }
    
    };

    return (
        <div className="w-full px-1 sm:px-4    min-h-screen transition-colors duration-300">
            <div className="w-full max-w-7xl mx-auto  ">
                {/* Search */}
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-center items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search by product or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md h-10 border border-gray-300 dark:border-gray-700 w-full focus:ring-2 focus:ring-blue-400   "
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200  ">
                    <div className="min-w-full">
                        <div className="lg:h-[500px] overflow-y-auto">
                            <Table>
                                <TableHeader className="sticky top-0   z-10">
                                    <TableRow >
                                        <TableHead className="min-w-[80px] text-gray-900 border-b border-gray-200 dark:border-gray-700">Image</TableHead>
                                        <TableHead className="min-w-[150px] text-gray-900  border-b border-gray-200 dark:border-gray-700">Product</TableHead>
                                        <TableHead className="min-w-[140px] text-gray-900  border-b border-gray-200 dark:border-gray-700">Category</TableHead>
                                        <TableHead className="min-w-[100px] text-gray-900  border-b border-gray-200 dark:border-gray-700">Duration</TableHead>
                                        <TableHead className="min-w-[80px] text-gray-900  border-b border-gray-200 dark:border-gray-700">Warranty</TableHead>
                                        <TableHead className="min-w-[130px] text-gray-900  border-b border-gray-200 dark:border-gray-700">Date Added</TableHead>
                                        <TableHead className="text-center text-gray-900  min-w-[180px] border-b border-gray-200 dark:border-gray-700">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProducts?.length > 0 ? (
                                        filteredProducts?.map((product) => (
                                            <TableRow key={product.id} className="hover:bg-blue-50  transition-colors">
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">
                                                    <img
                                                        src={product?.images[0]}
                                                        alt={product?.name}
                                                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200 dark:border-gray-700 mx-auto"
                                                    />
                                                </TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product?.name}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product?.category?.name || product?.category || ""}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product?.duration}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{product?.warranty}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800">{new Date(product?.updatedAt).toLocaleDateString('en-GB')}</TableCell>
                                                <TableCell className="border-b border-gray-100 dark:border-gray-800 text-center">
                                                    <div className="flex justify-center gap-2">
                                                    
                                                   

                                                        {/* edit conformation dialog */}
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => {
                                                                setEditProduct(product);
                                                                setIsDialogOpen(true);
                                                            }}
                                                            className="flex items-center gap-1 border border-blue-400 text-blue-600 bg-white cursor-pointer"
                                                        >
                                                            <Pencil className="w-4 h-4" /> Edit
                                                        </Button>
                                                        {/* edit modal - custom, not Dialog */}
                                                        {isDialogOpen && editProduct?._id === product._id && (
                                                            <Modal isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Edit Product">
                                                                <div className="space-y-4">
                                                                    <div>
                                                                    <Label className="mb-1 text-gray-800">Product Images</Label>
                                                                    <div className="flex gap-2 mb-2 flex-wrap">
                                                                        {editProduct?.images?.map((img, idx) => (
                                                                            <img
                                                                                key={idx}
                                                                                src={img}
                                                                                alt={`Product ${idx + 1}`}
                                                                                className={`w-20 h-20 object-cover rounded border-2 cursor-pointer ${selectedImageIdx === idx ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'}`}
                                                                                onClick={() => setSelectedImageIdx(idx)}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                    <Input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={async (e) => {
                                                                            const files = Array.from(e.target.files);
                                                                            if (!files.length) return;
                                                                            const formData = new FormData();
                                                                            files.forEach(file => formData.append('image', file));
                                                                            try {
                                                                                const response = await fetch('/api/uploadproductimages', {
                                                                                    method: 'POST',
                                                                                    body: formData,
                                                                                });
                                                                                const result = await response.json();
                                                                                if (response.ok && result.urls && result.urls[0]) {
                                                                                    setEditProduct((prev) => {
                                                                                        const newImages = [...(prev.images || [])];
                                                                                        if (typeof selectedImageIdx === 'number' && selectedImageIdx >= 0) {
                                                                                            newImages[selectedImageIdx] = result.urls[0];
                                                                                        }
                                                                                        return { ...prev, images: newImages };
                                                                                    });
                                                                                }
                                                                            } catch (error) {
                                                                                console.error('Error uploading images:', error);
                                                                            }
                                                                        }}
                                                                        className="cursor-pointer"
                                                                    />
                                                                    </div>

                                                                    <div>
                                                                        <Label className="mb-1  text-gray-800">Product Name</Label>
                                                                        <Input
                                                                            value={editProduct?.name || ""}
                                                                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label className="mb-1 text-gray-800">Description</Label>
                                                                        <textarea
                                                                            type="text"
                                                                            value={editProduct?.description || ""}
                                                                            onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
                                                                            placeholder="Enter product description"
                                                                            className="w-full border-1 p-1 text-gray-700"
                                                                        />
                                                                    </div>
                                                                    <div >
                                                                        <Label className="mb-1  text-gray-800">Category</Label>
                                                                        <Select
                                                                            value={editProduct?.category?.id}
                                                                            onValueChange={(value) => setEditProduct({ ...editProduct, category: value })}
                                                                        >
                                                                            <SelectTrigger className="w-[100%]  ">
                                                                                <SelectValue className=" text-black " placeholder="Select category"  />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {uniqueCategories.map((cat) => (
                                                                                
                                                                                    <SelectItem className=" text-black bg-green-50 w-[110%]" key={cat?._id} value={cat?._id}>
                                                                                        <div className="flex items-center gap-2 hover:bg-green-100">
                                                                                            <img src={cat?.catImage} alt={cat?.name} className="w-8 h-8 rounded-full" />
                                                                                            <span>{cat.name}</span>
                                                                                        </div>
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div>
                                                                        <Label className="mb-1 text-gray-800">warranty</Label>
                                                                        <Input
                                                                            type="text"
                                                                            value={editProduct?.warranty  || ""}
                                                                            onChange={(e) => setEditProduct({ ...editProduct, warranty: e.target.value })}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label className="mb-1 text-gray-800">duration</Label>
                                                                        <Input
                                                                            type="text"
                                                                            value={editProduct?.duration || ""}
                                                                            onChange={(e) => setEditProduct({ ...editProduct, duration: e.target.value })}
                                                                        />
                                                                    </div>
                                                                    
                                                                    <div className="flex  justify-end gap-2 mt-6">
                                                                        <Button className="cursor-pointer" onClick={() => setIsDialogOpen(false)}>
                                                                            Cancel
                                                                        </Button>
                                                                        <Button onClick={()=>handleUpdateProduct(editProduct._id)} className="bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700">
                                                                          {loading ?"updating...":"Save"}  
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                        )}
                                                     
                                                        
                                                        {/* delete confirmation dialog */}
                                                        {user?.accountType !== 'Admin' && (
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => setDeleteId(product.id)}
                                                                    className="flex items-center gap-1 border border-red-400 text-red-600  bg-red-100 cursor-pointer   "
                                                                >
                                                                    <Trash2 className="w-4 h-4" /> Delete
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white border border-gray-200  ">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle className="text-gray-900 ">Delete Product</AlertDialogTitle>
                                                                    <AlertDialogDescription className="text-gray-600 ">
                                                                        Are you sure you want to delete <b>{product.name}</b>? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel className="dark:bg-gray-800 dark:text-cyan-200 cursor-pointer dark:border-gray-700">Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={()=>handleDelete(product._id)} className="bg-red-600 cursor-pointer dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800">Delete</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                             )} 
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-gray-400 dark:text-gray-500">
                                                No products found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Modal component 
const Modal = ({ isOpen, onClose, title, children, modalClassName }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className={`fixed inset-0  pt-20 flex items-center justify-center px-4 ${modalClassName || 'z-50'}`}
      style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }}>
      <div
        className="bg-white rounded-xl shadow-2xl ring-4 ring-blue-400/20 w-full max-w-lg transform transition-all overflow-hidden focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900" id="modal-title">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

ProductHistory.requiredRole = 'admin';
