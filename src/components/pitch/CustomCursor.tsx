"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor({ dark = false }: { dark?: boolean }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 400 });
  const dotRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "button, a, [data-hover], .hover-card, table td, table th"
      );
      if (interactive && dotRef.current) {
        isHovering.current = true;
        dotRef.current.style.transform = "translate(-50%, -50%) scale(2.5)";
        dotRef.current.style.mixBlendMode = "difference";
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "button, a, [data-hover], .hover-card, table td, table th"
      );
      if (interactive && dotRef.current) {
        isHovering.current = false;
        dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        dotRef.current.style.mixBlendMode = "normal";
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <div className={`w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[transform,background-color] duration-200 ${
        dark ? "bg-white" : "bg-[#111]"
      }`} />
    </motion.div>
  );
}
