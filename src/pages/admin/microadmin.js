"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";

export default function MicroAdminManagement() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
// Filter customers by account type and search term
const customer = customers.filter((c) => {
  const isUser = c.accountType === "User";
  const matchesSearch = searchTerm === "" || 
    (c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.firstName && c.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.lastName && c.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return isUser && matchesSearch;
});
console.log("customer", customer);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/admin/getusers");
        const data = await res.json();
        if (res.ok && data.user) {
          setCustomers(
            data.user
              .map((u) => ({
                id: u._id,
                name: `${u.firstName} ${u.lastName}`,
                email: u.email,
                mobile: u.mobile,
                accountType: u.accountType,
                status: u.status,
                vehicalRegistrationNumber: u.vehicalRegistrationNumber,
                address: u.address,
                adharNumber: u.adharNumber,
                panNumber: u.panNumber,
                emergencyContact: u.emergencyContact,
                alternatecontact: u.alternatecontact,
                bankaccountnumber: u.bankaccountnumber,
                ifsc: u.ifsc,
                bankname: u.bankname,
                typeOfEntity: u.typeOfEntity,
                yearofexperience: u.yearofexperience,
                bloodgroup: u.bloodgroup,
                pincode: u.pincode,
                typeOfEntity: u.typeOfEntity,
                orders: [],  
              }))
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchValue);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

 

  return (
    <div className="min-h-screen   py-10 px-2 sm:px-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-3xl font-extrabold text-blue-700   mb-8 text-center tracking-tight">
        User Management
      </h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-6"
      >
        <Input
          type="text"
          placeholder="Search by user name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full  max-w-xs border border-blue-200   text-gray-900 "
        />
        <Button
          type="submit"
          className="bg-blue-500   text-white font-semibold shadow hover:from-blue-600 hover:to-cyan-600"
        >
          Search
        </Button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto max-w-7xl mx-auto border border-blue-100 rounded-2xl shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50 text-black">
              <TableHead className="text-blue-900">Name</TableHead>
              <TableHead className="text-blue-900">Email</TableHead>
              <TableHead className="text-blue-900">Mobile</TableHead>
              <TableHead className="text-blue-900">Role</TableHead>
              <TableHead className="text-blue-900 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customer?.length > 0 ? (
              customer.map((customer) => (
                <TableRow key={customer?._id} className=" text-black">
                  <TableCell className="font-semibold">{customer?.name}</TableCell>
                  <TableCell>{customer?.email}</TableCell>
                  <TableCell>{customer?.mobile}</TableCell>
                  <TableCell>{customer?.accountType}</TableCell>
                 
                  <TableCell className="text-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => handleUserClick(customer)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  {searchTerm ? `No users found matching "${searchTerm}"` : "No users found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 pt-28 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-200 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">User Details</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.name || selectedUser.firstName + " " + selectedUser.lastName}</p>
                </div>
               
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.mobile || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.accountType || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <p className={`p-2 rounded font-medium ${
                    selectedUser.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    selectedUser.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedUser.status || 'Pending'}
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              {selectedUser.address && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.address}</p>
                </div>
              )}

              {selectedUser.vehicalRegistrationNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Registration Number</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.vehicalRegistrationNumber}</p>
                </div>
              )}

              {(selectedUser.emergencyContact || selectedUser.alternatecontact) && (
                <div className="border-t pt-4">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUser.emergencyContact && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.emergencyContact}</p>
                      </div>
                    )}
                    {selectedUser.alternatecontact && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Contact</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.alternatecontact}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(selectedUser.adharNumber || selectedUser.panNumber || selectedUser.bloodgroup) && (
                <div className="border-t pt-4">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUser.adharNumber && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.adharNumber}</p>
                      </div>
                    )}
                    {selectedUser.panNumber && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.panNumber}</p>
                      </div>
                    )}
                    {selectedUser.bloodgroup && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.bloodgroup}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedUser.pincode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.pincode}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
