"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function AgentPricing() {
  const t = useTranslations("AgentDeck.pricing");

  return (
    <SlideWrapper>
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline")}
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="hover-card bg-[#111] text-white rounded-lg p-10 md:p-14 max-w-[500px] mb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      >
        <p className="font-bold text-lg mb-2">{t("planName")}</p>
        <p className="mb-6">
          <span className="text-[48px] md:text-[56px] font-bold tracking-tight">{t("price")}</span>
          <span className="text-[#888] text-lg ml-1">{t("unit")}</span>
        </p>
        <ul className="space-y-2 text-[#ccc] text-sm">
          <li>{t("feature1")}</li>
          <li>{t("feature2")}</li>
          <li>{t("feature3")}</li>
        </ul>
      </motion.div>

      <motion.p variants={itemVariants} className="text-[#888] text-xs font-mono">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
