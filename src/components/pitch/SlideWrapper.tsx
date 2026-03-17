"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

type SlideVariant = "default" | "dark" | "warm" | "glow" | "rose" | "cool";
type SlideLayout = "centered" | "split";

const variantClasses: Record<SlideVariant, string> = {
  default: "text-[#111]",
  dark: "text-white",
  warm: "text-[#111]",
  glow: "text-white",
  rose: "text-[#111]",
  cool: "text-[#111]",
};

const variantBackgrounds: Record<SlideVariant, string | undefined> = {
  default: "linear-gradient(170deg, #ffffff 0%, #f5f0ea 100%)",
  dark: "linear-gradient(165deg, #1e2a4a 0%, #111827 50%, #1e2a4a 100%)",
  warm: "linear-gradient(135deg, #f5f0ea 0%, #efe8de 50%, #f5f0ea 100%)",
  glow: "linear-gradient(165deg, #1e2a4a 0%, #162036 40%, #1e2a4a 100%)",
  rose: "linear-gradient(135deg, #f5f0ea 0%, #f0e8dc 50%, #faf5ef 100%)",
  cool: "linear-gradient(135deg, #f0f2f8 0%, #e8ecf4 50%, #f0f2f8 100%)",
};

const glowOverlay = "radial-gradient(ellipse at 50% 20%, rgba(30,42,74,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(196,168,130,0.08) 0%, transparent 40%)";

export default function SlideWrapper({
  children,
  className = "",
  dark = false,
  variant,
  layout = "centered",
  id,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  variant?: SlideVariant;
  layout?: SlideLayout;
  id?: string;
}) {
  const resolvedVariant = variant ?? (dark ? "dark" : "default");
  const theme = resolvedVariant === "dark" || resolvedVariant === "glow" ? "dark" : "light";
  const bg = variantBackgrounds[resolvedVariant];

  return (
    <section
      id={id}
      data-slide-theme={theme}
      className={`min-h-[100dvh] w-full snap-start flex items-center justify-center px-6 md:px-12 lg:px-20 relative overflow-hidden ${variantClasses[resolvedVariant]} ${className}`}
      style={bg ? { background: bg } : undefined}
    >
      {resolvedVariant === "glow" && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: glowOverlay }} />
      )}
      <motion.div
        className={`w-full max-w-[1100px] py-16 md:py-20 relative z-10 ${
          layout === "split"
            ? "grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
            : ""
        }`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
