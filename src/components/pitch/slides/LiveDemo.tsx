"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function LiveDemo() {
  const t = useTranslations("Pitch.LiveDemo");

  return (
    <SlideWrapper>
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-6">
        {t("headline1")}
        <br />
        <span className="text-[#999]">{t("headline2")}</span>
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#888] text-sm md:text-base mb-10 max-w-[650px]">
        {t("description")}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="hover-card bg-[#111] text-white rounded-lg p-8 md:p-12 max-w-[650px] mb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      >
        <p className="font-bold text-xl md:text-2xl mb-4">{t("boxTitle")}</p>
        <p className="text-[#ccc] text-sm leading-relaxed">
          {t("boxDescription")}
        </p>
      </motion.div>

      <motion.p variants={itemVariants} className="text-[#888] text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
