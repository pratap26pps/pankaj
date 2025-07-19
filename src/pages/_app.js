"use client";
import "../styles/globals.css";
import Navbaar from "../features/Navbaar";
import Footer from "../features/Footer";
import { Toaster } from "sonner";
import GeneralQuestions from "../features/GeneralQuestions";
// import CustomCursor from "../components/CustomCursor";

// import Otp from "../features/otp";
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <CustomCursor /> */}
      <Navbaar />
      <Component {...pageProps} />
      <Toaster position="top-center" />
      <GeneralQuestions />
      <Footer />
    </>
  );
}

export default MyApp;
