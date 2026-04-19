/**
 * app/projects-carousel/page.jsx  — Full-screen project carousel
 *
 * FEATURE 3 — Carousel page accessible from the navbar link "PROJETS".
 *
 * WHAT THIS PAGE DOES:
 *   Displays one project at a time, enlarged, with Previous / Next buttons
 *   and a dot indicator showing which slide is active. The user can also
 *   swipe left/right on touch devices.
 *
 * HOW THE CAROUSEL WORKS:
 *   • All project cards are rendered in a horizontal strip (flexbox).
 *   • CSS `transform: translateX(...)` shifts the strip left/right to bring
 *     the active card into view. The amount to shift is:
 *       activeIndex × -100vw   (each card takes exactly 100vw)
 *   • `transition: transform 500ms ease` makes the slide animated.
 *   • Touch events (touchstart / touchend) detect swipe direction and
 *     call the same goToNext / goToPrevious functions.
 *
 * WHY "use client":
 *   The carousel needs useState (to track the active slide index) and
 *   event handlers (buttons, touch), which are browser-only. Next.js App
 *   Router components are Server Components by default; "use client" opts
 *   this file into client-side rendering.
 *
 * DATA:
 *   Imported from the same `projectsData` array used in the homepage
 *   projects section, so there is a single source of truth.
 *
 * LIBRARIES:
 *   • `react` (useState, useRef)  – state management & DOM refs
 *   • `next/link`                 – back-navigation link (pre-fetched)
 *   • `react-icons/fa`            – arrow icons for Previous/Next buttons
 */

"use client";

import { projectsData } from "@/utils/data/projects-data";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProjectsCarouselPage() {
  /**
   * activeSlideIndex — zero-based index of the currently visible project.
   * Changing this value triggers a re-render which updates the CSS
   * transform and slides the strip to the new position.
   */
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  /**
   * touchStartXRef — stores the X coordinate of the finger when a touch
   * starts. We use a ref so the value persists between the touchstart and
   * touchend events without causing extra renders.
   */
  const touchStartXRef = useRef(null);

  const totalProjects = projectsData.length;

  /** Move to the previous slide, wrapping around to the last slide. */
  function goToPreviousSlide() {
    setActiveSlideIndex((currentIndex) =>
      currentIndex === 0 ? totalProjects - 1 : currentIndex - 1
    );
  }

  /** Move to the next slide, wrapping around to the first slide. */
  function goToNextSlide() {
    setActiveSlideIndex((currentIndex) =>
      currentIndex === totalProjects - 1 ? 0 : currentIndex + 1
    );
  }

  /** Jump directly to a slide by clicking a dot indicator. */
  function goToSlide(index) {
    setActiveSlideIndex(index);
  }

  /**
   * handleTouchStart — records where the finger touched the screen.
   * `e.touches[0].clientX` gives the X position of the first touch point.
   */
  function handleTouchStart(e) {
    touchStartXRef.current = e.touches[0].clientX;
  }

  /**
   * handleTouchEnd — compares the end X position with the start X position.
   * A leftward swipe (start > end + threshold) → go next.
   * A rightward swipe (end > start + threshold) → go previous.
   * The threshold (50px) prevents accidental tiny swipes from changing slides.
   */
  function handleTouchEnd(e) {
    if (touchStartXRef.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartXRef.current - touchEndX;
    const SWIPE_THRESHOLD_PX = 50;

    if (swipeDistance > SWIPE_THRESHOLD_PX) {
      goToNextSlide();
    } else if (swipeDistance < -SWIPE_THRESHOLD_PX) {
      goToPreviousSlide();
    }

    // Reset so the next gesture starts fresh.
    touchStartXRef.current = null;
  }

  return (
    <div className="min-h-screen bg-[#0d1224] flex flex-col">

      {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1443]">
        {/*
          Back link — uses Next.js <Link> for SPA navigation (no reload).
          "← Retour" is a French "Back" label consistent with the rest of
          the site's language.
        */}
        <Link
          href="/#projects"
          className="text-[#16f2b3] hover:text-white transition-colors duration-200 flex items-center gap-2"
        >
          <FaChevronLeft size={14} />
          <span>Retour</span>
        </Link>

        <h1 className="text-white text-xl font-semibold">
          Situation Professionnelle
        </h1>

        {/* Slide counter, e.g. "2 / 5" */}
        <span className="text-[#16f2b3] text-sm font-mono">
          {activeSlideIndex + 1} / {totalProjects}
        </span>
      </div>

      {/* ── CAROUSEL TRACK ───────────────────────────────────────────────── */}
      {/*
        `overflow-hidden` clips the strip so only the active slide is visible.
        The inner flex container is as wide as (number of slides × 100%),
        and we shift it with translateX.
      */}
      <div
        className="flex-1 overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/*
          SLIDE STRIP:
          Each slide takes `min-w-full` (= 100% of the overflow container).
          `translateX(-${activeSlideIndex * 100}%)` moves the strip so the
          active slide sits at x = 0 (i.e. fully visible).
          `transition-transform duration-500 ease-in-out` animates the move.
        */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeSlideIndex * 100}%)` }}
        >
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="min-w-full h-full flex items-center justify-center px-6 py-8"
            >
              {/*
                Each slide contains an enlarged version of the project card.
                We reuse the same code-block visual style from project-card.jsx
                but give it extra space to breathe (max-w-3xl, larger text).
              */}
              <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full max-w-3xl">

                {/* Decorative top gradient lines — same as project-card.jsx */}
                <div className="flex flex-row">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
                  <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
                </div>

                {/* Card title bar with traffic-light dots */}
                <div className="px-6 py-4 relative">
                  <div className="flex flex-row space-x-2 absolute top-1/2 -translate-y-1/2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-200"></div>
                  </div>
                  <p className="text-center ml-3 text-[#16f2b3] text-xl lg:text-2xl font-semibold">
                    {project.name}
                  </p>
                </div>

                {/* Card body — all project fields in code-block style */}
                <div className="overflow-hidden border-t-[2px] border-indigo-900 px-6 lg:px-10 py-6 lg:py-10">
                  <code className="font-mono text-sm md:text-base lg:text-lg leading-relaxed">

                    <div className="blink mb-2">
                      <span className="mr-2 text-pink-500">const</span>
                      <span className="mr-2 text-white">project</span>
                      <span className="mr-2 text-pink-500">=</span>
                      <span className="text-gray-400">{"{"}</span>
                    </div>

                    <div className="ml-6 lg:ml-10 mr-2 mb-1">
                      <span className="text-white">Contexte : </span>
                      <span className="text-gray-400">{`'`}</span>
                      <span className="text-amber-300">{" " + project.contexte}</span>
                      <span className="text-gray-400">{`',`}</span>
                    </div>

                    <div className="ml-6 lg:ml-10 mr-2 mb-1">
                      <span className="text-gray-500"> | </span>
                    </div>

                    <div className="ml-6 lg:ml-10 mr-2 mb-1">
                      <span className="text-white">Besoin : </span>
                      <span className="text-gray-400">{`'`}</span>
                      <span className="text-orange-300">{" " + project.besoin}</span>
                      <span className="text-gray-400">{`',`}</span>
                    </div>

                    <div className="ml-6 lg:ml-10 mr-2 mb-1">
                      <span className="text-gray-500"> | </span>
                    </div>

                    <div className="ml-6 lg:ml-10 mr-2 mb-1">
                      <span className="text-white">Environnement: </span>
                      <span className="text-gray-400">{` ['`}</span>
                      {project.tools.map((tool, i) => (
                        <span key={i}>
                          <span className="text-amber-300">{tool}</span>
                          {project.tools.length - 1 !== i && (
                            <span className="text-gray-400">{`', '`}</span>
                          )}
                        </span>
                      ))}
                      <span className="text-gray-400">{"],"}</span>
                    </div>

                    <div className="ml-6 lg:ml-10 mr-2 mb-1">
                      <span className="text-gray-500"> | </span>
                    </div>

                    <div className="ml-6 lg:ml-10 mr-2 mb-1">
                      <span className="text-white">Réalisation : </span>
                      <span className="text-cyan-400">{" " + project.realisation}</span>
                      <span className="text-gray-400">,</span>
                    </div>

                    <div className="ml-6 lg:ml-10 mr-2 mb-1">
                      <span className="text-gray-500"> | </span>
                    </div>

                    <div className="ml-6 lg:ml-10 mr-2 mb-3">
                      <span className="text-white">Bilan : </span>
                      <span className="text-cyan-300">{" " + project.bilan}</span>
                      <span className="text-gray-400">,</span>
                    </div>

                    <div>
                      <span className="text-gray-400">{`};`}</span>
                    </div>
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── PREVIOUS BUTTON ─────────────────────────────────────────── */}
        {/*
          Positioned absolutely on the left edge of the carousel container.
          Hidden on very small screens (hidden sm:flex) to avoid overlap on
          mobile where swipe gestures are used instead.
        */}
        <button
          onClick={goToPreviousSlide}
          aria-label="Projet précédent"
          className="
            hidden sm:flex
            absolute left-2 top-1/2 -translate-y-1/2
            items-center justify-center
            w-10 h-10 rounded-full
            bg-[#1a1443]/80 border border-[#464c6a]
            text-white
            hover:bg-violet-600 hover:border-violet-400
            transition-all duration-200
          "
        >
          <FaChevronLeft />
        </button>

        {/* ── NEXT BUTTON ─────────────────────────────────────────────── */}
        <button
          onClick={goToNextSlide}
          aria-label="Projet suivant"
          className="
            hidden sm:flex
            absolute right-2 top-1/2 -translate-y-1/2
            items-center justify-center
            w-10 h-10 rounded-full
            bg-[#1a1443]/80 border border-[#464c6a]
            text-white
            hover:bg-violet-600 hover:border-violet-400
            transition-all duration-200
          "
        >
          <FaChevronRight />
        </button>
      </div>

      {/* ── DOT INDICATORS ───────────────────────────────────────────────── */}
      {/*
        One dot per project. The active dot is wider and brighter to provide
        clear visual feedback about the current position.
        Each dot is a button for keyboard accessibility (Tab + Enter works).
      */}
      <div className="flex justify-center items-center gap-2 py-4">
        {projectsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Aller au projet ${index + 1}`}
            className={`
              rounded-full transition-all duration-300
              ${index === activeSlideIndex
                ? "w-6 h-2.5 bg-[#16f2b3]"    // active: wider pill shape
                : "w-2.5 h-2.5 bg-[#464c6a] hover:bg-[#16f2b3]/50"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
