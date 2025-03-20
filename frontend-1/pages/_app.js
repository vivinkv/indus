import "@/styles/globals.css";
import "@/styles/theme.css";
import "@/styles/fonts.css";
import Head from 'next/head';
// import { Inter } from 'next/font/google';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// const inter = Inter({ subsets: ['latin'] });
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      document.body.classList.add('index_loaded');
    } else {
      document.body.classList.remove('index_loaded');
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Manrope:wght@200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"></link>
      </Head>
      <GoogleReCaptchaProvider reCaptchaKey={siteKey} >
        <Component {...pageProps} />
      </GoogleReCaptchaProvider >
    </>
  );
}
