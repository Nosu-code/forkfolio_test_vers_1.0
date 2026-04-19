/**
 * layout.js — Root application layout (Next.js App Router)
 *
 * WHAT CHANGED from the original:
 *   The navbar is now `position: fixed` (see navbar.jsx). A fixed element
 *   is removed from the normal document flow, which means the page content
 *   would start at the very top of the viewport and be hidden behind the
 *   navbar. To compensate, we add `pt-20` (padding-top: 5rem / 80px) to
 *   the <main> element. Adjust this value if you change the navbar height.
 *
 * HOW NEXT.JS LAYOUTS WORK:
 *   In the Next.js App Router, `layout.js` wraps every page in the same
 *   directory (and subdirectories). It is rendered once and persists across
 *   route changes — components like <Navbar> and <Footer> are therefore
 *   only mounted once, which is why the scroll-listener in the navbar
 *   survives page navigation without being re-registered.
 *   See: https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates
 *
 * LIBRARIES:
 *   • `@next/third-parties/google` – GoogleTagManager  
 *       Official Next.js helper to load GTM without blocking rendering.
 *   • `next/font/google`  – Downloads and self-hosts Google Fonts at build
 *       time, avoiding runtime network requests to Google's CDN (better
 *       performance & privacy).
 *   • `react-toastify`    – Toast notification system. <ToastContainer> is
 *       a singleton that renders all toasts triggered anywhere in the app.
 */

import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

// Inter font subset — only latin characters are downloaded, keeping the
// font bundle small.
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Noellie SUOS",
  description: "This is a testing portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />

        {/*
          <Navbar> is now fixed-position (see navbar.jsx), so it floats
          above the page content. It lives OUTSIDE <main> so it spans the
          full viewport width independently of <main>'s max-width constraint.
        */}
        <Navbar />

        <main
          className="
            min-h-screen relative mx-auto px-6 sm:px-12
            lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]
            text-white
            pt-20
          "
          {/*
            pt-20 = padding-top: 5rem (80px).
            This pushes the page content below the fixed navbar so nothing
            is hidden behind it. If you make the navbar taller, increase
            this value to match.
          */}
        >
          {children}
          <ScrollToTop />
        </main>

        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
