"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { CTA_STEPS } from "@/lib/pitch-constants";

export default function CTASlide() {
  const t = useTranslations("Pitch.CTASlide");

  return (
    <SlideWrapper variant="warm">
      <motion.p variants={itemVariants} className="text-[#4a5578] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12 text-[#111]">
        {t("headline1")}
        <br />
        <span className="text-[#111]/50">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {CTA_STEPS.map((step) => (
          <motion.div
            key={step.num}
            variants={itemVariants}
            className={`hover-card rounded-lg p-8 md:p-10 transition-all duration-300 ${
              step.highlighted
                ? "bg-[#1e2a4a] text-white border-2 border-[#1e2a4a] shadow-[0_8px_40px_rgba(30,42,74,0.2)] hover:shadow-[0_12px_50px_rgba(30,42,74,0.3)]"
                : "bg-white text-[#111] border border-[#e0dbd4] hover:shadow-[0_8px_30px_rgba(30,42,74,0.08)]"
            }`}
          >
            <p className={`text-xs font-mono tracking-[0.15em] mb-4 ${
              step.highlighted ? "text-white/60" : "text-[#4a5578]"
            }`}>
              {step.num}
            </p>
            <p className="font-bold text-lg mb-3">{t(`${step.key}Title`)}</p>
            <p className={`text-sm leading-relaxed ${
              step.highlighted ? "text-white/70" : "text-[#555]"
            }`}>
              {t(`${step.key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
