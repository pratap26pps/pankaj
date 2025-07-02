"use client";

import "../styles/globals.css";
import Navbaar from "../features/Navbaar";
import Footer from "../features/Footer";
import dashboard from "./user/Dashboard";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbaar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
