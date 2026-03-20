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
import { PrintContext } from "./PrintContext";
import { generatePitchPdf } from "@/lib/generate-pdf";

export default function PitchLayout({
  children,
  slideCount,
  pdfFilename,
}: {
  children: ReactNode;
  slideCount: number;
  pdfFilename?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [pdfProgress, setPdfProgress] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const isPrintMode = searchParams.get("print") === "true";

  useEffect(() => {
    if (!isPrintMode || !containerRef.current) return;
    const timer = setTimeout(async () => {
      setPdfProgress("Preparing…");
      try {
        await generatePitchPdf(
          containerRef.current!,
          pdfFilename ?? "utxo-AG-deck.pdf",
          (current, total) => setPdfProgress(`Slide ${current}/${total}…`)
        );
      } finally {
        setPdfProgress(null);
        window.close();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isPrintMode, pdfFilename]);

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
    <PrintContext.Provider value={isPrintMode}>
      <div className="pitch-container">
        {pdfProgress && (
          <div className="fixed inset-0 z-[9999] bg-[#111] flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white text-sm font-mono">{pdfProgress}</p>
            </div>
          </div>
        )}
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
        <div
          ref={containerRef}
          className="h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth"
        >
          {children}
        </div>
      </div>
    </PrintContext.Provider>
  );
}
