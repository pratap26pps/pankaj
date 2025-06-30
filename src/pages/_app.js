'use client';

import '../styles/globals.css';
import Navbaar from '../componets/Navbaar';
import Footer from '../componets/Footer';
import AboutPage from '@/componets/Aboutpage';

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
