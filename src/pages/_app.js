"use client";

import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useSession, SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import AOS from "aos";
import axios from "axios";

import { store } from "@/redux/store";
import { setUser } from "@/redux/slices/authSlice";
import { setCategories } from "@/redux/slices/categorySlice";
import { setProducts } from "@/redux/slices/productSlice";
import { setOrders } from "@/redux/slices/orderSlice";
import { setCartFromLocalStorage } from "@/redux/slices/cartSlice";

import RouteProtector from "@/components/RouteProtector";
// import CircularSpinner from "@/pages/CircularSpinner";
import PremiumNavigation from "@/features/Navbar";
import GeneralQuestions from "@/features/GeneralQuestions";
import Testimonial from "@/features/Testimonial";
import Footer from "@/features/Footer";
import { Phone } from "lucide-react";


function AuthSyncWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const { data: sessionData, status } = useSession();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    dispatch(setCartFromLocalStorage(savedCart));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        dispatch(setUser(res.data.user));
      } catch {
        dispatch(setUser(null));
      }
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user) {
      dispatch(setUser(sessionData.user));
    } else if (status === "unauthenticated") {
      dispatch(setUser(null));
    }
  }, [status, sessionData, dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          dispatch(setProducts(data.products));
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success && Array.isArray(data.categories)) {
          dispatch(setCategories(data.categories));
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/customer/getorders");
        const data = await res.json();
        if (Array.isArray(data.orders)) {
          dispatch(setOrders(data.orders));
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [dispatch]);

  
  if (loading) {
    return (
      <>
       
        <div className="w-screen h-screen flex items-center justify-center bg-green-50 fixed top-0 left-0 z-[9999]">
            
 <PremiumNavigation />
          <div className="w-[90vw] max-w-[300px] min-w-[120px] ">
    <div className="loader-wrapper flex flex-col items-center justify-center gap-10">
      <div className="loader">
        <span></span>
      </div>
      <p className="text-center text-gray-500 text-sm mt-2">Loading...</p>
    </div>
            
          </div>
        </div>
      </>
    );
  }

  return children;
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-4 right-2 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-opacity duration-300 hover:bg-blue-700 focus:outline-none ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

function FloatingContactButtons() {
  return (
    <div className="fixed right-2 top-1/2 z-50 flex flex-col gap-4 -translate-y-1/2">
      <a
        href="https://wa.me/7982737801"
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
        href="tel:7982737801"
        className="p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700 transition"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}

function MyApp({ Component, pageProps: { session: sessionProp, ...pageProps } }) {
  const { requiredRole, requireAuth } = Component;
  const content = (requireAuth || requiredRole) ? (
    <RouteProtector requiredRole={requiredRole} requireAuth={requireAuth}>
      <Component {...pageProps} />
    </RouteProtector>
  ) : (
    <Component {...pageProps} />
  );

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
          {/* <CircularSpinner /> */}
          <addEventListener/>
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
