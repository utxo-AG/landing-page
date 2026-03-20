"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import NavigationDots from "./NavigationDots";
import ProgressBar from "./ProgressBar";
import CustomCursor from "./CustomCursor";

export default function PitchLayout({
  children,
  slideCount,
}: {
  children: ReactNode;
  slideCount: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const searchParams = useSearchParams();
  const isPrintMode = searchParams.get("print") === "true";

  useEffect(() => {
    if (!isPrintMode) return;
    const timer = setTimeout(() => {
      window.print();
    }, 1500);
    return () => clearTimeout(timer);
  }, [isPrintMode]);

  const scrollToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll(":scope > section");
    slides[index]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slides = container.querySelectorAll(":scope > section");
            const index = Array.from(slides).indexOf(
              entry.target as HTMLElement
            );
            if (index >= 0) {
              setActiveSlide(index);
              const theme = (entry.target as HTMLElement).dataset.slideTheme;
              setIsDark(theme === "dark" || entry.target.classList.contains("bg-[#111]"));
            }
          }
        }
      },
      { root: container, threshold: 0.55 }
    );

    const slides = container.querySelectorAll(":scope > section");
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        scrollToSlide(Math.min(activeSlide + 1, slideCount - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSlide(Math.max(activeSlide - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSlide, slideCount, scrollToSlide]);

  const progress =
    slideCount > 1 ? (activeSlide / (slideCount - 1)) * 100 : 0;

  return (
    <div className="pitch-container">
      <div className="pitch-custom-cursor">
        <CustomCursor dark={isDark} />
      </div>
      <div className="pitch-progress-bar">
        <ProgressBar progress={progress} />
      </div>
      <div className="pitch-nav-dots">
        <NavigationDots
          count={slideCount}
          active={activeSlide}
          onDotClick={scrollToSlide}
          dark={isDark}
        />
      </div>
      <button
        onClick={() => window.print()}
        className="pitch-print-btn fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-sm border border-white/20 text-white/60 hover:text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-all"
        aria-label="Download PDF"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
      <div
        ref={containerRef}
        className="h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}
