"use client";
import "../styles/globals.css";
import Navbaar from "../features/Navbaar";
import Footer from "../features/Footer";
import { Toaster } from "sonner";
import GeneralQuestions from "../features/GeneralQuestions";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import Otp from "../features/otp";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
      <Navbaar />
      <Component {...pageProps} />
      <Toaster position="top-center" />
      <GeneralQuestions />
      <Footer />
    </Provider>
    </>
  );
}

export default MyApp;
