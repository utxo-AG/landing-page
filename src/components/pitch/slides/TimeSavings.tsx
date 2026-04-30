"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function ProcessIcon() {
  return (
    <svg {...iconProps}>
      <path d="M27 16a11 11 0 1 1-3.2-7.8" />
      <path d="M27 4v6h-6" />
    </svg>
  );
}

function CreativityIcon() {
  return (
    <svg {...iconProps}>
      <path d="M16 4 L18 14 L28 16 L18 18 L16 28 L14 18 L4 16 L14 14 Z" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg {...iconProps}>
      <path d="M19 3 L8 18 H15 L13 29 L24 14 H17 Z" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="11" r="4" />
      <circle cx="22" cy="13" r="3" />
      <path d="M4 26c0-4 3.5-7 8-7s8 3 8 7" />
      <path d="M20 26c0-2.5 2-4.5 5-4.5" />
    </svg>
  );
}

const LEVERS = [
  { key: "lever1", Icon: ProcessIcon },
  { key: "lever2", Icon: CreativityIcon },
  { key: "lever3", Icon: SpeedIcon },
  { key: "lever4", Icon: TeamIcon },
] as const;

export default function TimeSavings() {
  const t = useTranslations("Pitch.TimeSavings");

  return (
    <SlideWrapper variant="rose">
      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
      >
        {t("label")}
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-[28px] md:text-[40px] font-bold leading-[1.1] tracking-tight mb-3"
      >
        {t("headline")}
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-[#555] text-base md:text-lg mb-10 max-w-[760px] leading-relaxed"
      >
        {t("intro")}
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-8">
        {LEVERS.map(({ key, Icon }, i) => (
          <motion.div
            key={key}
            variants={itemVariants}
            className="hover-card bg-white rounded-xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#ebe4d8] transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-5 text-[#1e2a4a]">
              <Icon />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#999]">
                0{i + 1}
              </span>
            </div>
            <p className="font-bold text-[#111] text-[18px] md:text-[20px] leading-[1.2] tracking-tight mb-3">
              {t(`${key}Title`)}
            </p>
            <p className="text-[#555] text-[13px] leading-snug">
              {t(`${key}Caption`)}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
