"use client";
import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { useSession, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import AOS from "aos";
import axios from "axios";
import RouteProtector from "@/components/RouteProtector"; // ✅ adjust path as needed
import { store } from "../redux/store";
import { setUser } from "../redux/slices/authSlice";
import { setCategories } from "../redux/slices/categorySlice";
import { setProducts } from "../redux/slices/productSlice";
import { setOrders } from "../redux/slices/orderSlice";

import CircularSpinner from "./CircularSpinner";
import PremiumNavigation from "../features/Navbar";
import GeneralQuestions from "../features/GeneralQuestions";
import Footer from "../features/Footer";
import Testimonial from "../features/Testimonial";
import { Phone } from "lucide-react";

function AuthSyncWrapper({ children }) {
  const { data: sessionData, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(setUser(null));
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user) {
      dispatch(setUser({
        name: sessionData.user.name,
        email: sessionData.user.email,
        image: sessionData.user.image,
        accountType: sessionData.user.accountType,
        mobile: sessionData.user.mobile,
        emergencyContact: sessionData.user.emergencyContact,
        alternatecontact: sessionData.user.alternatecontact,
        address: sessionData.user.address,
        pincode: sessionData.user.pincode,
        yearofexperience: sessionData.user.yearofexperience,
        bankaccountnumber: sessionData.user.bankaccountnumber,
        ifsc: sessionData.user.ifsc,
        bankname: sessionData.user.bankname,
        typeOfEntity: sessionData.user.typeOfEntity,
        vehicalRegistrationNumber: sessionData.user.vehicalRegistrationNumber,
        adharNumber: sessionData.user.adharNumber,
        panNumber: sessionData.user.panNumber,
        bloodgroup: sessionData.user.bloodgroup,
        status: sessionData.user.status,
        id: sessionData.user.id,
      }));
    } else if (status === "unauthenticated") {
      dispatch(setUser(null));
    }
  }, [status, sessionData]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          dispatch(setProducts(data.products));
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.success && Array.isArray(data.categories)) {
          dispatch(setCategories(data.categories));
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/customer/getorders');
        const data = await res.json();
        if (Array.isArray(data.orders)) {
          dispatch(setOrders(data.orders));
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    fetchOrders();
  }, [dispatch]);

  return children;
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-4 right-2 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-opacity duration-300 hover:bg-blue-700 focus:outline-none ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

function FloatingContactButtons() {
  return (
    <div className="fixed right-2 top-1/2 z-50 flex flex-col gap-4 -translate-y-1/2">
      <a
        href="https://wa.me/8252590019"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-6 h-6">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05C13.41 27.634 14.686 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.13 0-2.24-.188-3.29-.557l-.235-.08-4.65 1.22 1.24-4.53-.15-.23C7.3 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-7.75c-.28-.14-1.65-.82-1.9-.91-.25-.09-.43-.14-.61.14-.18.28-.7.91-.86 1.09-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.51-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 5.01 4.22.7.24 1.25.38 1.68.48.71.15 1.36.13 1.87.08.57-.06 1.75-.72 2-1.41.25-.69.25-1.28.18-1.41-.07-.13-.25-.2-.53-.34z" />
        </svg>
      </a>
      <a
        href="tel:+8252590019"
        className="p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700 transition"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5 text-white" />
      </a>
    </div>
  );
}
 
function MyApp({ Component, pageProps: { session: sessionProp, ...pageProps } }) {
  const { requiredRole, requireAuth } = Component;

  let content = <Component {...pageProps} />;
  if (requireAuth || requiredRole) {
    content = (
      <RouteProtector requiredRole={requiredRole} requireAuth={requireAuth}>
        {content}
      </RouteProtector>
    );
  }
  
  return (
      <SessionProvider session={sessionProp}>
      <Provider store={store}>
        <AuthSyncWrapper>
          <PremiumNavigation />
          {content}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#4CAF50",
                color: "#fff",
                fontSize: "16px",
              },
            }}
          />
          <CircularSpinner />
          <GeneralQuestions />
          <Testimonial />
          <ScrollToTopButton />
          <FloatingContactButtons />
          <Footer />
        </AuthSyncWrapper>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
