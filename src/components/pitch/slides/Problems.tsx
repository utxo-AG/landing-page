"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const emails = [1, 2, 3] as const;

const stoneOffsets = [
  { x: 0, y: 0, rotate: -2 },
  { x: 40, y: 0, rotate: 1.5 },
  { x: 12, y: 0, rotate: -1 },
];

export default function Problems() {
  const t = useTranslations("Pitch.Problems");

  return (
    <SlideWrapper variant="cool" layout="split">
      {/* Left: content */}
      <div>
        <motion.p
          variants={itemVariants}
          className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
        >
          {t("label")}
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12"
        >
          {t("headline1")}
          <br />
          <span className="text-[#666]">{t("headline2")}</span>
        </motion.h2>

        <div className="space-y-6 md:space-y-8 max-w-[700px]">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="hover-card flex gap-5 items-start p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-[#efe8de]"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center text-sm font-bold">
                {i}
              </span>
              <div>
                <p className="font-bold text-lg">{t(`item${i}Title`)}</p>
                <p className="text-[#666] text-sm mt-1">
                  {t(`item${i}Desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: email stepping stones */}
      <div className="hidden md:flex flex-col gap-6 items-center justify-center">
        {/* Winding path SVG behind the cards */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 500"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 160 60 Q 240 120 200 180 Q 140 240 240 300 Q 320 350 212 420"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="2"
            strokeDasharray="8 6"
            fill="none"
          />
        </svg>

        <div className="relative flex flex-col gap-6 w-full max-w-[320px]">
          {emails.map((i, idx) => (
            <motion.div
              key={i}
              variants={itemVariants}
              style={{
                transform: `translateX(${stoneOffsets[idx].x}px) rotate(${stoneOffsets[idx].rotate}deg)`,
              }}
              className="relative bg-white/80 backdrop-blur-sm border border-[#e0d9cf] rounded-xl px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-[#f0ebe3] flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#999"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4L12 13L2 4" />
                  </svg>
                </span>
                <span className="text-[11px] text-[#999] font-mono">
                  {t(`email${i}From`)}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#222] leading-snug">
                {t(`email${i}Subject`)}
              </p>
              <p className="text-sm text-[#666] mt-1 leading-relaxed">
                {t(`email${i}Preview`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
