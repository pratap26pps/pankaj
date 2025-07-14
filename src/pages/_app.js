"use client";

import "../styles/globals.css";
import Navbaar from "../features/Navbaar";
import Footer from "../features/Footer";
import { Toaster } from "sonner";
import GeneralQuestions from "../features/GeneralQuestions";
import { ThemeProvider } from "../context/ThemeContext";
// import Otp from "../features/otp";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Navbaar />
      <Component {...pageProps} />
      <Toaster position="top-center" />
      <GeneralQuestions />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
