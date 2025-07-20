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
import OverviewContent from './admin/overviewcontent';
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Plus, 
  Package, 
  CheckCircle, 
  Eye, 
  Truck, 
  Clock, 
  ClipboardList,
  Zap,
  Edit,
  Trash2,
  AlertTriangle,
  Menu,
  X,
  FaUserCheck,
  FaBookOpen,
  FaMoneyBill,
  FaChartBar,
  FaBatteryHalf,
  FaImage,
  
  HelpCircle
} from "lucide-react";
import MyShoppingCart from './cart';
import AddReview from './admin/addreview';
import MicroAdminManagement from './admin/microadmin';
import OrderHistory from './customer/orderhistory';
 


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
    email:""
  });
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
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
    });
  }
}, [user]);

 
  
  const AdminItems = [
    { key: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { key: 'manage-users', label: 'Manage Users & Centers', icon: <Users className="w-5 h-5" /> },
    { key: 'verify-partners', label: 'Verify Partners', icon: <FaUserCheck className="w-5 h-5" /> },
    { key: 'Micro Admin', label: 'Micro Admin', icon: <Users className="w-5 h-5" /> },
    { key: 'live-bookings', label: 'Live Bookings & Disputes', icon: <FaBookOpen className="w-5 h-5" /> },
    { key: 'commissions', label: 'Commissions & Payouts', icon: <FaMoneyBill className="w-5 h-5" /> },
    { key: 'offers', label: 'Offers & Promotions', icon: <Package className="w-5 h-5" /> },
    { key: 'Amc-Enquiry', label: 'Enquiry', icon: <HelpCircle className="w-5 h-5" /> },
    { key: 'analytics', label: 'Analytics', icon: <FaChartBar className="w-5 h-5" />  },
    { key: 'inventory', label: 'Battery Inventory', icon:< FaBatteryHalf className="w-5 h-5" />  },
    { key: 'carousel', label: 'Carousel Images', icon: <FaImage className="w-5 h-5" />   },
   
  ];
      
  

 

     const MicroAdminItems = [
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
 
  ];

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-800 border-green-200',
      shipped: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-purple-100 text-purple-800 border-purple-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: <CheckCircle className="w-4 h-4 text-green-600" />,
      shipped: <Truck className="w-4 h-4 text-blue-600" />,
      pending: <Clock className="w-4 h-4 text-yellow-600" />,
      processing: <Zap className="w-4 h-4 text-purple-600" />
    };
    return icons[status] || <Clock className="w-4 h-4 text-gray-600" />;
  };
 
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

  const StatCard = ({ title, value, icon, growth, color }) => (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20 dark:border-gray-700/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value.toLocaleString()}</p>
          {growth && (
            <p className="text-xs text-green-600 mt-1">
              +{growth}% from last month
            </p>
          )}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  

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
    <div className=" relative inset-0 flex items-center justify-center px-4  z-50">
      <div
        className="  rounded-xl shadow-2xl ring-4 ring-blue-400/20 w-full max-w-lg transform transition-all overflow-hidden focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-6 py-4 border-b dark:border-gray-700 flex items-center justify-between">
          <h3
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
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
 




  const renderContent = () => {

     if (user?.role === "superadmin") {

    switch (selectedMenuItem) {
      case 'overview':
        return <OverviewContent />;
      case 'orders':
        return (
         <OrderManagement/>
        );
      case 'customers':
        return (
          <CustomerManagement/>
        );
         case 'Micro Admin':
        return (
          <MicroAdminManagement/>
        );
      case 'Add Category/Product':
        return (
          <AddCategoryProduct/>
        );
         case 'Add Review':
        return (
          <AddReview/>
        );
      case 'Product-History':
        return (
            <ProductHistory/>        
        );
        
     
      default:
        return <OverviewContent />;
    }
 
    }
   if (user?.role === "microadmin"){
    switch (selectedMenuItem) {
      case 'overview':
        return <OverviewContent />;
      case 'orders':
        return (
         <OrderManagement/>
        );
      case 'customers':
        return (
          <CustomerManagement/>
        );
         
         case 'Add Review':
        return (
          <AddReview/>
        );
      case 'Product-History':
        return (
            <ProductHistory/>        
        );
     
      default:
        return <OverviewContent />;
    }

  }



      switch (selectedMenuItem) {
        case 'overview':
          return (
            <div className="space-y-6 animate-fade-in">
              {/* Customer Stats Grid */}
              

              {/* Customer Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                {/* Recent Orders */}
                <div className="xl:col-span-7">
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">My Recent Orders</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Products</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                     
                      </table>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
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
        
        
        default:
          return <OverviewContent />;
      }

  
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

 
  
   
//  if (!user)
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100  relative">
//       <div className="loader"></div>
//     </div>
//   );

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 pb-24 pt-2 relative'>
      {(orderModalOpen || trackModalOpen || profileModalVisible || deleteModalVisible) && (
        <div className="fixed inset-0 z-[100] bg-white/10 backdrop-blur-sm transition-all"></div>
      )}

      <div className="flex h-screen relative top-20 z-10">
        {/* Sidebar */}
        <div className={`lg:relative h-[88%] fixed inset-y-0 left-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 transform ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          sidebarOpen ? 'translate-x-0 top-20' : '-translate-x-full lg:translate-x-0 lg:top-0'
        }`}>
          <div className="flex flex-col h-full">
            {/* User Profile Section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                {!collapsed && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{ user?.name || `${user?.firstName} ${user?.lastName}` }</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user?.role}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
        {/* Navigation */}
<nav className="flex-1 p-4 overflow-y-auto">
  {user?.role === "superadmin" ? (
    <ul className="space-y-2">
      {AdminItems?.map((item) => (
        <li key={item.key}>
          <button
            onClick={() => {
              setSelectedMenuItem(item.key);
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedMenuItem === item.key
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        </li>
      ))}
    </ul>
  ) : user?.role === "microadmin" ? (
    <ul className="space-y-2">
      {MicroAdminItems.map((item) => (
        <li key={item.key}>
          <button
            onClick={() => {
              setSelectedMenuItem(item.key);
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedMenuItem === item.key
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        </li>
      ))}
    </ul>
  ) : (
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
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1"
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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16  bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(!sidebarOpen);
                  } else {
                    setCollapsed(!collapsed);
                  }
                }}
                className="p-2 rounded-lg  text-gray-700 transition-colors"
              >
                {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {user?.role === "admin" 
                  ? AdminItems.find(item => item.key === selectedMenuItem)?.label
                  : CustomerItems.find(item => item.key === selectedMenuItem)?.label
                }
              </h1>
            </div>
            
          
          </header>

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
                  {selectedOrder.items?.map((item, idx) => (
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <input
              type="text"
                  name="firstName" 
              value={profileForm.firstName}
                 onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-gray-500"
              placeholder={user?.firstName || ""}
            />
          </div>

           <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>

            <input
              type="text"
                  name="lastName" 
              value={profileForm.lastName}
               onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
            placeholder={user?.lastName || ""}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700   mb-1">Phone</label>
            <input
              type="tel"
                  name="mobile" 
              value={profileForm.mobile}
                 onChange={handleChange}
              className="w-full px-3 py-2 border  border-gray-600 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500    text-gray-500"
              placeholder={user?.phone}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setProfileModalVisible(false)}
              className="px-4 py-2 text-gray-600   hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProfileUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Are you absolutely sure?</h3>
          <p className="text-gray-600 dark:text-gray-400">
            This action cannot be undone. This will permanently delete your account
            and remove all associated data from our servers.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type 'DELETE' to confirm:
              </label>
              <input
                type="text"
                   onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="DELETE"
              />
            </div>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setDeleteModalVisible(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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

