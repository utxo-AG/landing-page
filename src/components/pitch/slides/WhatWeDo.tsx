"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function WhatWeDo() {
  const t = useTranslations("Pitch.WhatWeDo");

  const chipKeys = ["pillar1Chip1", "pillar1Chip2", "pillar1Chip3", "pillar1Chip4"] as const;

  return (
    <SlideWrapper variant="warm">
      <div className="max-w-[760px] mb-10 md:mb-14">
        <motion.p
          variants={itemVariants}
          className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
        >
          {t("label")}
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-tight mb-4"
        >
          {t("headline")}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-[#555] text-base md:text-lg leading-relaxed max-w-[700px]"
        >
          {t("description")}
        </motion.p>
      </div>

      <div className="grid grid-cols-12 gap-5 md:gap-6 mb-8">
        {/* Hero pillar */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 md:col-span-7 bg-white border border-[#ebe4d8] rounded-2xl p-7 md:p-9 relative overflow-hidden"
          style={{ boxShadow: "0 1px 0 rgba(30,42,74,0.04)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1e2a4a]" />
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1e2a4a] text-white text-sm font-bold">
              1
            </span>
            <p className="text-[#1e2a4a] text-[11px] md:text-xs font-mono tracking-[0.18em] uppercase">
              {t("pillar1Label")}
            </p>
          </div>
          <p className="font-bold text-2xl md:text-3xl text-[#111] leading-tight mb-3">
            {t("pillar1Title")}
          </p>
          <p className="text-[#555] text-[15px] md:text-base leading-relaxed">
            {t("pillar1Desc")}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {chipKeys.map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#ebe4d8] bg-white text-[12px] md:text-[13px] text-[#1e2a4a] font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4a882]" />
                {t(key)}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Secondary pillars stacked */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-5 md:gap-6">
          <motion.div
            variants={itemVariants}
            className="flex-1 bg-white border border-[#ebe4d8] rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-[1.5px] border-[#1e2a4a] text-[#1e2a4a] text-[13px] font-bold">
                2
              </span>
              <p className="font-bold text-lg md:text-xl text-[#111] leading-tight">
                {t("pillar2Title")}
              </p>
            </div>
            <p className="text-[#555] text-sm md:text-base leading-relaxed">
              {t("pillar2Desc")}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-1 bg-white border border-[#ebe4d8] rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-[1.5px] border-[#1e2a4a] text-[#1e2a4a] text-[13px] font-bold">
                3
              </span>
              <p className="font-bold text-lg md:text-xl text-[#111] leading-tight">
                {t("pillar3Title")}
              </p>
            </div>
            <p className="text-[#555] text-sm md:text-base leading-relaxed">
              {t("pillar3Desc")}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl border border-[#c4a882]/30 p-6 md:p-7"
        style={{
          background:
            "linear-gradient(135deg, rgba(196,168,130,0.14) 0%, rgba(196,168,130,0.04) 60%, rgba(255,255,255,0) 100%)",
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#c4a882]" />
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <div className="md:max-w-[300px]">
            <p className="text-[#1e2a4a] text-[11px] md:text-xs font-mono tracking-[0.18em] uppercase mb-2">
              {t("footnoteLead")}
            </p>
            <p className="text-[#333] text-sm md:text-base leading-relaxed">
              {t("footnote")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:flex-1 md:justify-end">
            {(["extra1", "extra2", "extra3", "extra4"] as const).map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#ebe4d8] text-[12px] md:text-[13px] text-[#1e2a4a] font-semibold shadow-[0_1px_2px_rgba(30,42,74,0.04)]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <circle cx="6" cy="6" r="6" fill="#c4a882" />
                  <path d="M3.5 6L5.2 7.6L8.5 4.4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t(key)}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
