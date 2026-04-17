"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import StepIllustration from "../visuals/StepIllustration";
import { HOW_TO_STEPS } from "@/lib/pitch-constants";

export default function HowToWorkWithOtto() {
  const t = useTranslations("Pitch.HowToWorkWithOtto");

  return (
    <SlideWrapper variant="cool">
      <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-3">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[36px] font-bold leading-[1.15] tracking-tight mb-2">
        {t("headline")}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#666] text-sm md:text-base mb-8 max-w-[600px]">
        {t("description")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {HOW_TO_STEPS.map((step) => (
          <motion.div
            key={step.key}
            variants={itemVariants}
            className="hover-card bg-white shadow-sm rounded-lg p-5 md:p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1e2a4a] text-white text-xs font-bold mb-3">
              {step.num}
            </span>
            <p className="font-bold text-base mb-1.5 text-[#111]">{t(`${step.key}Title`)}</p>
            <p className="text-[#555] text-sm leading-relaxed mb-3">{t(`${step.key}Desc`)}</p>
            <div className="max-w-[220px]">
              <StepIllustration step={step.num as 1 | 2 | 3} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
