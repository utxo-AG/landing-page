"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { usePrintMode } from "./PrintContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
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

function GeometricPattern({ variant }: { variant: SlideVariant }) {
  const isDark = variant === "dark" || variant === "glow";
  const stroke = isDark ? "rgba(255,255,255,0.04)" : "rgba(30,42,74,0.03)";

  if (variant === "warm") {
    return (
      <svg className="absolute top-0 right-0 w-[60%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 600 800" fill="none">
        <defs>
          <linearGradient id="fade-warm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="mask-warm"><rect width="600" height="800" fill="url(#fade-warm)" /></mask>
        </defs>
        <g mask="url(#mask-warm)">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <line key={i} x1={i * 80 - 200} y1="0" x2={i * 80} y2="800" stroke={stroke} strokeWidth="0.8" />
          ))}
        </g>
      </svg>
    );
  }

  if (variant === "rose") {
    return (
      <svg className="absolute top-0 right-0 w-[55%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 500 800" fill="none">
        <defs>
          <linearGradient id="fade-rose" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="35%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="mask-rose"><rect width="500" height="800" fill="url(#fade-rose)" /></mask>
        </defs>
        <g mask="url(#mask-rose)">
          {[
            [320, 80], [420, 160], [280, 260], [380, 340], [340, 440],
            [440, 520], [300, 600], [400, 700], [260, 380], [460, 240],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke={stroke} strokeWidth="0.8" />
              <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke={stroke} strokeWidth="0.8" />
            </g>
          ))}
        </g>
      </svg>
    );
  }

  if (variant === "cool") {
    return (
      <svg className="absolute bottom-0 left-0 w-[50%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 500 800" fill="none">
        <defs>
          <linearGradient id="fade-cool" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="mask-cool"><rect width="500" height="800" fill="url(#fade-cool)" /></mask>
        </defs>
        <g mask="url(#mask-cool)">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <line key={`h-${i}`} x1="0" y1={80 + i * 90} x2="500" y2={80 + i * 90} stroke={stroke} strokeWidth="0.5" />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={`v-${i}`} x1={80 + i * 90} y1="0" x2={80 + i * 90} y2="800" stroke={stroke} strokeWidth="0.5" />
          ))}
        </g>
      </svg>
    );
  }

  if (variant === "default") {
    return (
      <svg className="absolute bottom-0 right-0 w-[45%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 800" fill="none">
        <defs>
          <linearGradient id="fade-default" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="mask-default"><rect width="400" height="800" fill="url(#fade-default)" /></mask>
        </defs>
        <g mask="url(#mask-default)">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
            [0, 1, 2].map((col) => (
              <line key={`${row}-${col}`} x1={180 + col * 70} y1={60 + row * 100} x2={210 + col * 70} y2={60 + row * 100} stroke={stroke} strokeWidth="1" />
            ))
          )}
        </g>
      </svg>
    );
  }

  if (variant === "dark") {
    return null;
  }

  if (variant === "glow") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 800" fill="none">
        <defs>
          <radialGradient id="fade-glow" cx="0.7" cy="0.3" r="0.6">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="mask-glow"><rect width="1000" height="800" fill="url(#fade-glow)" /></mask>
        </defs>
        <g mask="url(#mask-glow)">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <line key={`h-${i}`} x1="0" y1={80 + i * 80} x2="1000" y2={80 + i * 80} stroke={stroke} strokeWidth="0.5" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <line key={`v-${i}`} x1={80 + i * 85} y1="0" x2={80 + i * 85} y2="800" stroke={stroke} strokeWidth="0.5" />
          ))}
        </g>
      </svg>
    );
  }

  return null;
}

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
  const isPrint = usePrintMode();
  const resolvedVariant = variant ?? (dark ? "dark" : "default");
  const theme = resolvedVariant === "dark" || resolvedVariant === "glow" ? "dark" : "light";
  const bg = variantBackgrounds[resolvedVariant];

  const innerClassName = `w-full max-w-[1100px] py-16 md:py-20 relative z-10 ${
    layout === "split"
      ? "grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
      : ""
  }`;

  return (
    <section
      id={id}
      data-slide-theme={theme}
      className={`min-h-[100dvh] w-full snap-start flex items-center justify-center px-6 md:px-12 lg:px-20 relative overflow-hidden ${variantClasses[resolvedVariant]} ${className}`}
      style={bg ? { background: bg } : undefined}
    >
      <GeometricPattern variant={resolvedVariant} />
      {resolvedVariant === "glow" && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: glowOverlay }} />
      )}
      {isPrint ? (
        <div className={innerClassName}>{children}</div>
      ) : (
        <motion.div
          className={innerClassName}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
