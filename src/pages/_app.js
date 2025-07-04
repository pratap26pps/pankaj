"use client";

import "../styles/globals.css";
import Navbaar from "../features/Navbaar";
import Footer from "../features/Footer";
import { Toaster } from 'sonner';

// import Otp from "../features/otp";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbaar />
      <Component {...pageProps} />
      <Toaster position="top-center" />

      <Footer />
    </>
  );
}

export default MyApp;
