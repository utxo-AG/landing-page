"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { CTA_STEPS } from "@/lib/pitch-constants";

export default function CTASlide() {
  const t = useTranslations("Pitch.CTASlide");

  return (
    <SlideWrapper>
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline1")}
        <br />
        <span className="text-[#999]">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {CTA_STEPS.map((step) => (
          <motion.div
            key={step.num}
            variants={itemVariants}
            className={`hover-card rounded-lg p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 ${
              step.highlighted ? "bg-[#111] text-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]" : "bg-[#f5f5f5] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            }`}
          >
            <p className={`text-xs font-mono tracking-[0.15em] mb-4 ${
              step.highlighted ? "text-[#888]" : "text-[#999]"
            }`}>
              {step.num}
            </p>
            <p className="font-bold text-lg mb-3">{t(`${step.key}Title`)}</p>
            <p className={`text-sm leading-relaxed ${
              step.highlighted ? "text-[#ccc]" : "text-[#666]"
            }`}>
              {t(`${step.key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#888] text-xs font-mono">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
