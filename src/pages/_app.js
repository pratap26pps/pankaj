'use client';

import '../styles/globals.css';
import Navbaar from '../componets/Navbaar';
import Footer from '../componets/Footer';

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
