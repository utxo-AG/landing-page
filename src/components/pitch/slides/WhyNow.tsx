"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function WhyNow() {
  const t = useTranslations("Pitch.WhyNow");

  return (
    <SlideWrapper variant="rose">
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline1")}
        <br />
        <span className="text-[#999]">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        {[1, 2, 3].map((i) => (
          <motion.div key={i} variants={itemVariants} className="hover-card bg-[#efe8de] rounded-lg p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <p className="text-[24px] md:text-[28px] font-bold tracking-tight mb-3">{t(`item${i}Stat`)}</p>
            <p className="text-[#666] text-sm leading-relaxed">{t(`item${i}Label`)}</p>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#888] text-sm md:text-base mt-4">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
