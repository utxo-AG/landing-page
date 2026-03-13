"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
              setIsDark(entry.target.classList.contains("bg-[#111]"));
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
      <CustomCursor dark={isDark} />
      <ProgressBar progress={progress} />
      <NavigationDots
        count={slideCount}
        active={activeSlide}
        onDotClick={scrollToSlide}
        dark={isDark}
      />
      <div
        ref={containerRef}
        className="h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}
