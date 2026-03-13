"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function UseCases() {
  const t = useTranslations("Pitch.UseCases");

  return (
    <SlideWrapper>
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-3">
        {t("headline")}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#888] text-sm md:text-base mb-12 max-w-[650px]">
        {t("description")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        {[1, 2, 3].map((i) => (
          <motion.div key={i} variants={itemVariants} className="hover-card border-t border-[#111] pt-6 transition-all duration-300 hover:bg-[#f5f5f5] hover:px-4 hover:rounded-lg">
            <p className="font-bold text-lg mb-3">{t(`item${i}Title`)}</p>
            <p className="text-[#666] text-sm leading-relaxed">{t(`item${i}Desc`)}</p>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#888] text-sm md:text-base">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
