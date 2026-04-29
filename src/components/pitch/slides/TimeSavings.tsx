"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const LEVERS = [
  { key: "lever1" },
  { key: "lever2" },
  { key: "lever3" },
  { key: "lever4" },
] as const;

const METRICS = ["metric1", "metric2"] as const;

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
        {t("headline1")}
        <br />
        <span className="text-[#666]">{t("headline2")}</span>
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-[#555] text-base md:text-lg mb-10 max-w-[820px] leading-relaxed"
      >
        {t("intro")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-8">
        {LEVERS.map((lever, i) => (
          <motion.div
            key={lever.key}
            variants={itemVariants}
            className="hover-card bg-white rounded-xl p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#ebe4d8] transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
          >
            <span className="inline-flex items-center justify-center px-3 h-7 rounded-full bg-[#1e2a4a] text-white text-[11px] font-mono uppercase tracking-wider mb-4">
              0{i + 1} · {t(`${lever.key}Tag`)}
            </span>
            <p className="text-[#111] font-bold text-lg md:text-xl mb-3 leading-tight">
              {t(`${lever.key}Title`)}
            </p>
            <p className="text-[#555] text-[14px] md:text-[15px] leading-relaxed mb-5">
              {t(`${lever.key}Desc`)}
            </p>
            <ul className="space-y-3 pt-4 border-t border-[#ebe4d8]">
              {METRICS.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-3 text-[13px]"
                >
                  <span className="text-[#999] line-through flex-1">
                    {t(`${lever.key}${m}Before`)}
                  </span>
                  <span className="text-[#ccc] shrink-0">→</span>
                  <span className="text-[#1e2a4a] font-medium flex-1 text-right">
                    {t(`${lever.key}${m}After`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm md:text-base"
      >
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
