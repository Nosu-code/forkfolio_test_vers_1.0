// @flow strict

/**
 * navbar.jsx — Sticky, scroll-aware navigation bar
 *
 * FEATURE 1 — "Drop down on scroll up":
 *   The navbar hides when the user scrolls DOWN (out of the way) and
 *   reappears instantly when they scroll UP, no matter where they are on
 *   the page. This is a very common UX pattern (sometimes called a
 *   "smart" or "hide-on-scroll" navbar).
 *
 * HOW IT WORKS — React hooks + CSS transition:
 *   • `useState`  – stores whether the navbar should be visible.
 *   • `useEffect` – registers a `scroll` event listener on `window`
 *                   when the component mounts, and cleans it up when
 *                   the component unmounts (the return value of useEffect).
 *   • `useRef`    – stores the previous scroll position WITHOUT triggering
 *                   a re-render (unlike useState). This is crucial because
 *                   we need to compare "where I was" with "where I am now"
 *                   on every scroll event, but we don't want that comparison
 *                   itself to cause extra renders.
 *   • CSS `transform: translateY(-100%)` + `transition` smoothly slides
 *     the navbar off the top of the viewport when hidden.
 *
 * FEATURE 2 — CV / PDF button in the navbar:
 *   A button that opens the CV PDF in a new browser tab (so the browser's
 *   native PDF viewer handles display + download). The PDF file must be
 *   placed in the /public folder of the Next.js project so Next.js serves
 *   it as a static asset at the path "/cv.pdf".
 *   See: https://nextjs.org/docs/app/building-your-application/optimizing/static-assets
 *
 * LIBRARIES USED:
 *   • `next/link`  – Next.js's <Link> component. It pre-fetches the target
 *                    route in the background so navigation feels instant.
 *                    Unlike a plain <a>, it keeps the SPA (Single-Page App)
 *                    behaviour of Next.js (no full page reload for internal routes).
 *   • `react`      – useState, useEffect, useRef are React built-in hooks.
 */

"use client"; // This directive is REQUIRED because we use browser-only APIs
              // (window.addEventListener, scroll events). In Next.js App Router,
              // components are Server Components by default. "use client" opts
              // this file into the Client Component model, meaning it is
              // hydrated and runs in the browser.
              // See: https://nextjs.org/docs/app/building-your-application/rendering/client-components

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  /**
   * isNavbarVisible — boolean that controls whether the navbar is on-screen.
   * Starts as `true` so the navbar is visible when the page first loads.
   */
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  /**
   * previousScrollPositionRef — a ref (mutable box) that remembers the last
   * recorded scroll position. We use useRef instead of useState here because:
   *   - We don't need React to re-render the component when this value changes.
   *   - We just need to read and update a number between scroll events.
   * Initialised to 0 (top of the page).
   */
  const previousScrollPositionRef = useRef(0);

  useEffect(() => {
    /**
     * handleScroll — called on every scroll event.
     * Compares the current scroll position to the previous one to determine
     * the scroll direction, then shows or hides the navbar accordingly.
     */
    function handleScroll() {
      // window.scrollY is the number of pixels the document has been
      // scrolled vertically from the top.
      const currentScrollPosition = window.scrollY;

      // If we are near the very top of the page (< 10px), always show the
      // navbar regardless of scroll direction, to avoid it being hidden on
      // initial load or after the user scrolls all the way back up.
      if (currentScrollPosition < 10) {
        setIsNavbarVisible(true);
        previousScrollPositionRef.current = currentScrollPosition;
        return;
      }

      // Scrolling DOWN  → currentScrollPosition > previous → hide navbar.
      // Scrolling UP    → currentScrollPosition < previous → show navbar.
      const isScrollingDown = currentScrollPosition > previousScrollPositionRef.current;
      setIsNavbarVisible(!isScrollingDown);

      // Save the current position so the next event can compare against it.
      previousScrollPositionRef.current = currentScrollPosition;
    }

    // Attach the listener. `{ passive: true }` is a performance hint that
    // tells the browser this listener will never call preventDefault(), so
    // the browser can optimise scrolling (skip waiting for JS to finish).
    window.addEventListener("scroll", handleScroll, { passive: true });

    // CLEANUP — when the Navbar component unmounts (e.g. page navigation),
    // remove the listener to prevent memory leaks.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array → effect runs once on mount only.

  return (
    /**
     * POSITIONING STRATEGY:
     *   `fixed`      – removes the navbar from document flow and locks it
     *                  to the viewport (it no longer scrolls with the page).
     *   `top-0`      – anchors it to the top edge of the viewport.
     *   `left-0 right-0` – stretches it full-width.
     *   `z-50`       – stacks it above all page content (z-index: 50).
     *   `transform`  – we toggle between translateY(0) (visible) and
     *                  translateY(-100%) (slid fully above the viewport).
     *   `transition-transform duration-300` – Tailwind utility that adds
     *                  `transition: transform 300ms ease` so the slide is
     *                  animated rather than instant.
     */
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-[#0d1224]/90 backdrop-blur-md
        border-b border-[#1a1443]/60
        transition-transform duration-300
        ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      {/*
        Inner wrapper: mirrors the max-width constraint used in layout.js
        (px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem])
        so the navbar content aligns with the page content underneath.
      */}
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
        <div className="flex items-center justify-between py-4">

          {/* ── LOGO / HOME LINK ────────────────────────────────────────── */}
          <div className="flex flex-shrink-0 items-center">
            <Link
              href="/"
              className="text-[#16f2b3] text-3xl font-bold"
            >
              Noellie SUOS
            </Link>
          </div>

          {/* ── NAVIGATION LINKS ───────────────────────────────────────── */}
          <ul
            className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0
                       md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:items-center
                       md:space-x-1 md:border-0 md:opacity-100"
          >
            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#about"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  A PROPOS
                </div>
              </Link>
            </li>

            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#education"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  EDUCATION
                </div>
              </Link>
            </li>

            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#projects"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  SITUATION PROFESSIONNELLE
                </div>
              </Link>
            </li>

            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#skills"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  CERTIFICATION
                </div>
              </Link>
            </li>

            {/*
              FEATURE 3 — Link to the full-screen project carousel page.
              This is a new route /projects-carousel that we create separately.
              Using Next.js <Link> ensures the route is pre-fetched on hover.
            */}
            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/projects-carousel"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  PROJETS
                </div>
              </Link>
            </li>

            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/blog"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  VEILLE TECHNOLOGIQUE
                </div>
              </Link>
            </li>

            {/*
              FEATURE 2 — CV / PDF button.
              We use a plain <a> tag (not Next.js <Link>) because:
                - The target is a static file (/cv.pdf), not a Next.js route.
                - Next.js <Link> is meant for client-side navigation between
                  JS routes; static file downloads should use <a>.
              `target="_blank"` opens the PDF in a new tab where the browser's
              built-in PDF viewer lets the user both read and download it.
              `rel="noopener noreferrer"` is a security best-practice when
              using target="_blank": it prevents the new tab from having
              access to the opener window via `window.opener`.

              ⚠️  SETUP REQUIRED: Place your CV file at:
                  /public/cv.pdf
              Next.js automatically serves everything in /public/ as a
              static asset, accessible at the root URL (/cv.pdf).
            */}
            <li>
              <a
                href="/tableau_E7.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block ml-2 px-4 py-1.5 rounded-md
                  bg-gradient-to-r from-pink-600 to-violet-600
                  text-white text-sm font-semibold
                  transition-all duration-300
                  hover:from-violet-600 hover:to-pink-600
                  hover:shadow-lg hover:shadow-violet-500/30
                "
              >
                Grille d'evaluation
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
