import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { clearUser } from '../redux/slices/authSlice';
import ProductHistory from './admin/products/productlist';
import AddCategoryProduct from './admin/products/addcategoryproduct';
import CustomerManagement from './admin/userlist';
import OrderManagement from './admin/order/orderlist';
 import MicroBookings from './microadmin/booking';
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Plus, 
  Package, 
  ClipboardList,
  Edit,
  Trash2,
  AlertTriangle,
  Menu,
  X,
  HelpCircle,
  ChevronRight,
  MoreVertical,
  
} from "lucide-react";
import MyShoppingCart from './cart';
import AddReview from './admin/addreview';
import MicroAdminManagement from './admin/microadmin';
import OrderHistory from './customer/orderhistory';
import Overview from './superadmin/overview';
import ManageUserPage from './superadmin/manageuser';
import VerifyPartner from './superadmin/verifypatner';
import LiveBookingPage from './superadmin/livebooking';
import UserOverview from './user/overview';
import ServiceHistory from './user/serviceHistory';
import EVBookingForm from './ServiceForm';
import PartnerOverview from './partner/overview';
import CustomersPage from './partner/customer';
import Bookings from './partner/bookings';
 


const Dashboard = () => {

  const allOrders = useSelector(state => state.order.orders);
  const user = useSelector((state) => state.auth.user);
  console.log("User in Dashboard:", user);
  const router = useRouter();
  const [confirm, setConfirm] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
   const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    image: "",
    email: "",
    // Admin/Partner specific fields
    emergencyContact: "",
    alternatecontact: "",
    bloodgroup: "",
    adharNumber: "",
    panNumber: "",
    address: "",
    pincode: "",
    yearofexperience: "",
    bankaccountnumber: "",
    ifsc: "",
    bankname: "",
    typeOfEntity: "",
    vehicalRegistrationNumber: ""
  });
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approvalModalVisible, setApprovalModalVisible] = useState(false);
  const dispatch = useDispatch();
 
  
 useEffect(() => {
  if (user) {
    const firstName = user.firstName || user.name?.split(" ")[0] || "";
    const lastName = user.lastName || user.name?.split(" ").slice(1).join(" ") || "";
    const email = user.email
    setProfileForm({
      firstName,
      lastName,
      email,
      mobile: user.mobile || "",
      image: user.image || "",
      // Admin/Partner specific fields
      emergencyContact: user.emergencyContact || "",
      alternatecontact: user.alternatecontact || "",
      bloodgroup: user.bloodgroup || "",
      adharNumber: user.adharNumber || "",
      panNumber: user.panNumber || "",
      address: user.address || "",
      pincode: user.pincode || "",
      yearofexperience: user.yearofexperience || "",
      bankaccountnumber: user.bankaccountnumber || "",
      ifsc: user.ifsc || "",
      bankname: user.bankname || "",
      typeOfEntity: user.typeOfEntity || "",
      vehicalRegistrationNumber: user.vehicalRegistrationNumber || ""
    });
  }
}, [user]);

 
  
  const SuperAdminItems = [
    { key: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { key: 'manage-users', label:'ManageUsers&Centers', icon: <Users className="w-5 h-5" /> },
    { key: 'verify-partners', label: 'Verify Partners', icon: <Users className="w-5 h-5" /> },
    { key: 'Total Users', label: 'Total Users', icon: <Users className="w-5 h-5" /> },
    { key: 'live-bookings', label: 'LiveBookings&Disputes', icon: <Users className="w-5 h-5" /> },r
    { key: 'AddReview', label: 'AddReview', icon: <Users className="w-5 h-5" /> },
    { key: 'Battery Inventory', label: 'Battery Inventory', icon:< Users className="w-5 h-5" />  },
   
  ];

    const PatnerItems = [
      { key: 'overview', label: 'Overview',icon:< Users className="w-5 h-5" /> },
      { key: 'bookings', label: 'Bookings', icon:< Users className="w-5 h-5" />  },
      { key: 'customers', label: 'Customers',icon:< Users className="w-5 h-5" />  },
      { key: 'earnings', label: 'Earnings',icon:< Users className="w-5 h-5" /> },
      { key: 'services', label: 'Services',icon:< Users className="w-5 h-5" />  },
      
    ];
 
     const AdminItems = [
    { key: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { key: 'orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { key: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { key: 'Add Review', label: 'Add Review', icon: <Plus className="w-5 h-5" /> },
    { key: 'Product-History', label: 'Product-History', icon: <Package className="w-5 h-5" /> },
   
  ];

    const CustomerItems = [
    { key: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { key: 'orders', label: 'My Orders', icon: <ClipboardList className="w-5 h-5" /> },
    { key: 'cart', label: 'My Cart', icon: <ShoppingCart className="w-5 h-5" /> },
   
      { key: 'service-history', label: 'Service History', icon: <ClipboardList className="w-5 h-5" />  },
      { key: 'book-service', label: 'Book Service', icon: <ClipboardList className="w-5 h-5" />  },
      { key: 'buy-battery', label: 'Buy Battery',icon: <ClipboardList className="w-5 h-5" /> },
  ];
 
 
   const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
  ...profileForm,
  email: user.email,  
};
      console.log("Form data before submit:", payload);

      const res = await axios.patch("/api/auth/update-profile", payload,);
      toast.success(res.data.message || "Profile updated!");
      const updatedUser = {
        ...res.data.user,
        name: `${profileForm.firstName} ${profileForm.lastName}`
      };
      dispatch(setUser(updatedUser));
      setProfileModalVisible(false)
    } catch (err) {
      toast.error(err.response || "Update failed!");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteAccount = async(e) => {
       e.preventDefault();
    setDeleteModalVisible(false);
 
  
    if (confirm !== "DELETE") {
      toast.error("You must type DELETE to confirm.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.delete("/api/auth/delete-account");
      toast.success(res.data.message || "Account deleted.");
    
       dispatch(clearUser());
       setUser(null);
      await signOut({ redirect: false });
      router.push("/authpage");
    } catch (err) {

      toast.error(err.data || "Delete failed!");
    } finally {
      setLoading(false);
    }
  };
 
  

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
 
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackOrder, setTrackOrder] = useState(null);
 
console.log("trackOrder",trackOrder)

const Modal = ({ isOpen, onClose, title, children, modalClassName }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="dash relative -mt-[45%] inset-0 flex items-center justify-center px-4  z-50">
      <div
        className="  rounded-xl shadow-2xl bg-gray-50 w-full max-w-lg transform transition-all overflow-hidden focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-6 py-4 border-b  flex items-center justify-between">
          <h3
            className="text-lg font-semibold text-gray-900  "
            id="modal-title"
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
 
const handleChange = (e) => {
  const { name, value } = e.target;
  setProfileForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadForm = new FormData();
    uploadForm.append("image", file);

    try {
      setLoading2(true);
      const res = await axios.post("/api/upload", uploadForm);
      const imageUrl = res.data.url;
      console.log("Image uploaded successfully:", imageUrl);
      setProfileForm((prev) => ({ ...prev, image: imageUrl }));
      dispatch(setUser( {
        ...user,
        image: imageUrl,
      }));
    
      toast.success("Image uploaded!");
    } catch (err) {
      console.error("Image upload failed:", err);
    
    } finally {
      setLoading2(false);
    }
  };


  // Check for pending approval accounts
  useEffect(() => {
    if (user?.accountType === "Patner" || user?.accountType === "Admin") {
      setApprovalModalVisible(true);
    } else {
      setApprovalModalVisible(false);
    }
  }, [user?.accountType]);

  const renderContent = () => {
    
    if ((user?.accountType === "Partner"  || user?.accountType === "Admin") && (user?.status === "Pending" || user?.status === "Rejected"))  {
      return (
        
        <div className="flex items-center justify-center min-h-screen z-50 bg-gray-50">
          <div className="text-center p-8">
            <div className="mb-4">
              <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Pending Approval,It will take 24 hours to approve your account.</h2>
            <div className="text-2xl font-bold text-gray-800 mb-2">Current Status: {user?.status}</div>

            <p className="text-gray-600">Please contact SuperAdmin for approval to access your dashboard.</p>

                  Contact: 9821907223
          </div>
        </div>
      )
    }

     if (user?.accountType === "SuperAdmin") {

    switch (selectedMenuItem) {
      case 'overview':
        return <div className='pt-4'><Overview /> <div className='pt-11'> < ManageUserPage/> </div></div>;
      case 'manage-users':
        return (
         < ManageUserPage/>
        );
      case 'verify-partners':
        return (
          <VerifyPartner/>
        );
         case 'Total Users':
        return (
          <MicroAdminManagement/>
        );
      case 'live-bookings':
        return (
          <LiveBookingPage/>
        );
         case 'AddReview':
        return (
          <AddReview/>
        );
     
          case 'Battery Inventory':
        return (
               <AddCategoryProduct/>      
        );
 
      default:
        return <Overview />;
    }
 
    }

     if (user?.accountType === "Partner") {

    switch (selectedMenuItem) {
      case 'overview':
        return <PartnerOverview />;
      case 'customers':
        return (
         < CustomersPage/>
        );
      case 'bookings':
        return (
          <Bookings/>
        );
         case 'services':
        return (
          <MicroAdminManagement/>
        );
      case 'earnings':
        return (
          <LiveBookingPage/>
        );
   
 
      default:
        return <Overview />;
    }
 
    }

   if (user?.accountType === "Admin"){
    switch (selectedMenuItem) {
      case 'overview':
        return <MicroBookings />;
      case 'orders':
        return (
         <MicroBookings/>
        );
      case 'customers':
        return (
          <MicroBookings/>
        );
         
         case 'Add Review':
        return (
          <MicroBookings/>
        );
      case 'Product-History':
        return (
            <MicroBookings/>        
        );
     
      default:
        return <MicroBookings />;
    }

  }

// customer or ev owner

      switch (selectedMenuItem) {
        case 'overview':
          return (
           <UserOverview/>
          );
        case 'orders':
          return (
            <OrderHistory/>
          );
        case 'cart':
          return ( 
            <div className='-mt-24 -ml-6'>
            <MyShoppingCart/>
            </div>
          );
        case 'service-history':
          return ( 
            <div className='-mt-24 -ml-6'>
            <ServiceHistory/>
            </div>
          );
           case 'book-service':
          return ( 
            <div className='-mt-24 -ml-6'>
            <EVBookingForm/>
            </div>
          );
           case 'service-history':
          return ( 
            <div className='-mt-24 -ml-6'>
            <MyShoppingCart/>
            </div>
          );
           case 'buy-battery':
          return ( 
             router.push('/ServiceSelector?service=lithium-batteries')
          );
 
        default:
          return <UserOverview/>;
      }
  };

 


 if (!user)
  return (
    <div className="min-h-screen flex items-center justify-center   relative">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className='min-h-screen w-full bg-green-50 pb-24 pt-7 relative'>
      {(orderModalOpen || trackModalOpen || profileModalVisible || deleteModalVisible) && (
        <div className="fixed inset-0 z-50  bg-white/10 backdrop-blur-sm transition-all"></div>
      )}

      <div className="flex h-screen relative  top-20 z-10">
        {/* Sidebar */}
        <div className={`lg:relative  h-[88%] fixed inset-y-0 left-0 z-50  backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 transform ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          sidebarOpen ? 'translate-x-0 top-20' : '-translate-x-full lg:translate-x-0 lg:top-0'
        }`}>
          <div className="flex flex-col h-full">
            {/* User Profile Section */}
            <div className="p-4 border-b flex justify-between border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                {!collapsed && (
                  <div>
                    <h3 className="font-semibold text-gray-800 ">{ user?.name || `${user?.firstName} ${user?.lastName}` }</h3>
                    <p className="text-sm text-gray-700">{user?.accountType}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(!sidebarOpen);
                  } else {
                    setCollapsed(!collapsed);
                  }
                }}
                className="p-2 rounded-lg   text-gray-900 transition-colors"
              >
                {collapsed ? <Menu className="w-5 cursor-pointer h-5" /> : <X className="w-5 cursor-pointer h-5" />}
              </button>
            </div>

            {/* Navigation */}
        {/* Navigation */}
<nav className="flex-1 p-4 overflow-y-auto">
  {user?.accountType === "SuperAdmin" ? (
    <ul className="space-y-2">
      {SuperAdminItems?.map((item) => (
        <li key={item.key}>
          <button
            onClick={() => {
              setSelectedMenuItem(item.key);
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedMenuItem === item.key
                ? " text-white bg-gray-700 shadow-lg"
                : "text-black hover:bg-gray-700 hover:text-white cursor-pointer hover:translate-x-1"

            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        </li>
      ))}
    </ul>
  ) : user?.accountType === "Admin" ? (
    <ul className="space-y-2">
      {AdminItems.map((item) => (
        <li key={item.key}>
          <button
            onClick={() => {
              setSelectedMenuItem(item.key);
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedMenuItem === item.key
                ? " text-white bg-gray-700 shadow-lg"
                : "text-black hover:bg-gray-700 hover:text-white cursor-pointer hover:translate-x-1"

            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        </li>
      ))}
    </ul>
  ) : user?.accountType === "Partner" ? (
    <ul className="space-y-2">
      {PatnerItems.map((item) => (
        <li key={item.key}>
          <button
            onClick={() => {
              setSelectedMenuItem(item.key);
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedMenuItem === item.key
                ? "  text-white bg-gray-700 shadow-lg"
                : "text-black hover:bg-gray-700 hover:text-white cursor-pointer hover:translate-x-1"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        </li>
      ))}
    </ul>
  ) :(
    <ul className="space-y-2">
      {CustomerItems.map((item) => (
        <li key={item.key}>
          <button
            onClick={() => {
              setSelectedMenuItem(item.key);
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedMenuItem === item.key
                ? " text-white bg-gray-700 shadow-lg"
                : "text-black hover:bg-gray-700 hover:text-white cursor-pointer hover:translate-x-1"

            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        </li>
      ))}
    </ul>
  )}
</nav>


            {/* Profile Actions - Bottom of Sidebar */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              {!collapsed ? (
                <>
                <button
                  onClick={() => setProfileModalVisible(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => setDeleteModalVisible(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </button>
                </>
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <button
                    onClick={() => setProfileModalVisible(true)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    title="Edit Profile"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteModalVisible(true)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="Delete Account"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0  bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
           <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(!sidebarOpen);
                  } else {
                    setCollapsed(!collapsed);
                  }
                }}
                className="p-2 rounded-lg   text-gray-900 transition-colors"
              >
                {collapsed ? <X className="w-5 lg:hidden  cursor-pointer h-5" /> : <ChevronRight className="w-5 lg:hidden mt-6 ml-3 font-bold cursor-pointer h-5" />}
              </button> 
          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Place global modals here, after all dashboard content and overlay */}
      <Modal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        title={selectedOrder ? `Order Details - ${selectedOrder._id}` : 'Order Details'}
        modalClassName="z-[110]"
      >
        {selectedOrder && (
          <div className="space-y-4 text-gray-900">
            <div>
              <div className="mb-2"><span className="font-semibold">Order ID:</span> {selectedOrder._id}</div>
              <div className="mb-2"><span className="font-semibold">Status:</span> {selectedOrder.status}</div>
              <div className="mb-2"><span className="font-semibold">Total:</span> ₹{selectedOrder.totalAmount}</div>
              <div className="mb-2"><span className="font-semibold">Date:</span> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : ''}</div>
              <div className="mb-2"><span className="font-semibold">Shipping Address:</span> {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.country} - {selectedOrder.shippingAddress?.postalCode}</div>
              <div className="mt-4">
                <span className="font-semibold">Products:</span>
                <ul className="mt-2 space-y-2">
                  {selectedOrder?.items?.map((item, idx) => (
                    <li key={item._id || idx} className="flex items-center gap-3 border-b pb-2 last:border-b-0">
                      {item.product?.images?.[0] && (
                        <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 object-cover rounded border" />
                      )}
                      <div>
                        <div className="font-semibold">{item.product?.name}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity} | Price: ₹{item.price}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          </div>
        )}
      </Modal>
      
      {/* Profile Modal */}
      <Modal
        isOpen={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        title="Edit Profile"
        modalClassName="z-[120]"
      >
        <div className="space-y-4">
           <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {loading2 && (
              <div className="mt-2 text-blue-600">Uploading image...</div>
            )}
            {profileForm.image && typeof profileForm.image === "string" && (
           <img
         src={profileForm.image}
         alt="Profile Preview"
          className="mt-4 w-24 h-24 rounded-full object-cover border border-gray-300 shadow-md"
        />
         )}

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profileForm.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder={user?.firstName || ""}
            />
          </div>

           <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>

            <input
              type="text"
              name="lastName"
              value={profileForm.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder={user?.lastName || ""}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="mobile"
              value={profileForm.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder={user?.mobile || ""}
            />
          </div>

          {/* Admin-specific fields */}
          {user?.accountType === "Admin" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    name="adharNumber"
                    value={profileForm.adharNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter Aadhaar number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={profileForm.panNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter PAN number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <input
                    type="text"
                    name="bloodgroup"
                    value={profileForm.bloodgroup}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter blood group"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input
                    type="text"
                    name="yearofexperience"
                    value={profileForm.yearofexperience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter years of experience"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Contact</label>
                  <input
                    type="tel"
                    name="alternatecontact"
                    value={profileForm.alternatecontact}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter alternate contact"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={profileForm.emergencyContact}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter emergency contact"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={profileForm.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  placeholder="Enter address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={profileForm.pincode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  placeholder="Enter pincode"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankname"
                    value={profileForm.bankname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter bank name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    name="bankaccountnumber"
                    value={profileForm.bankaccountnumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter bank account number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  name="ifsc"
                  value={profileForm.ifsc}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  placeholder="Enter IFSC code"
                />
              </div>
            </>
          )}

          {/* Partner-specific fields */}
          {user?.accountType === "Partner" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    name="adharNumber"
                    value={profileForm.adharNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter Aadhaar number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Contact</label>
                  <input
                    type="tel"
                    name="alternatecontact"
                    value={profileForm.alternatecontact}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Enter alternate contact"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={profileForm.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  placeholder="Enter address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={profileForm.pincode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  placeholder="Enter pincode"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Entity</label>
                <select
                  name="typeOfEntity"
                  value={profileForm.typeOfEntity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">Select entity type</option>
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                  <option value="franchise">Franchise</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          {/* User-specific fields */}
          {user?.accountType === "User" && (
            <>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address (Optional)</label>
              <input
                type="text"
                name="address"
                value={profileForm.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Enter address"
              />
            </div> 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Registration Number (Optional)</label>
              <input
                type="text"
                name="vehicalRegistrationNumber"
                value={profileForm.vehicalRegistrationNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Enter vehicle registration number"
              />
            </div>
            </>
        
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setProfileModalVisible(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProfileUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
            {loading ? "Updating...":"Update Profile"}  
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="Delete Account"
        modalClassName="z-[120]"
      >
        <div className="text-center space-y-4">
          <div className="text-6xl text-yellow-500"><AlertTriangle className="w-24 h-24 mx-auto" /></div>
          <h3 className="text-lg font-semibold text-gray-900">Are you absolutely sure?</h3>
          <p className="text-gray-600">
            This action cannot be undone. This will permanently delete your account
            and remove all associated data from our servers.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type 'DELETE' to confirm:
              </label>
              <input
                type="text"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="DELETE"
              />
            </div>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setDeleteModalVisible(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                disabled={confirm !== "DELETE"}
              >
                Delete Account
                  </button>
                </div> 

                </div>
                </div>
      </Modal>

      </div>
  )
}
  export default Dashboard;

