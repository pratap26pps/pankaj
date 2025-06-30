'use client';

import '../styles/globals.css';
import Navbaar from '../features/Navbaar';
import Footer from '../features/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Navbaar /> */}
      <AboutPage/>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
