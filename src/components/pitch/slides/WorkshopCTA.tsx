"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function WorkshopCTA() {
  const t = useTranslations("Pitch.WorkshopCTA");
  const chips = [t("chip1"), t("chip2"), t("chip3")];

  return (
    <SlideWrapper variant="glow">
      <div className="max-w-[860px]">
        <motion.p
          variants={itemVariants}
          className="text-white/50 text-xs font-mono tracking-[0.15em] uppercase mb-5"
        >
          {t("label")}
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-[32px] md:text-[52px] font-bold leading-[1.05] tracking-tight text-white mb-5"
        >
          {t("headline")}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-white/70 text-base md:text-xl leading-relaxed mb-10 max-w-[680px]"
        >
          {t("subline")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-7 md:p-9 max-w-[640px]"
        >
          <p className="text-[#888] text-xs font-mono tracking-[0.15em] uppercase mb-3">
            {t("promptLabel")}
          </p>
          <p className="text-[#111] text-[22px] md:text-[28px] font-bold leading-snug mb-6">
            {t("prompt")}
          </p>
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#ebe4d8] bg-[#f5f0ea] text-[12px] md:text-[13px] font-medium text-[#1e2a4a]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4a882]" />
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-white/45 text-xs md:text-sm font-mono mt-8 tracking-[0.05em]"
        >
          {t("footnote")}
        </motion.p>
      </div>
    </SlideWrapper>
  );
}
