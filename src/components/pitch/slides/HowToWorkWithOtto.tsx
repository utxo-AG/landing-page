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
      <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-tight mb-3">
        {t("headline")}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#555] text-base md:text-lg mb-10 max-w-[700px] leading-relaxed">
        {t("description")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8">
        {HOW_TO_STEPS.map((step) => (
          <motion.div
            key={step.key}
            variants={itemVariants}
            className="hover-card bg-white shadow-sm rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1e2a4a] text-white text-sm font-bold mb-4">
              {step.num}
            </span>
            <p className="font-bold text-lg md:text-xl mb-2 text-[#111] leading-tight">{t(`${step.key}Title`)}</p>
            <p className="text-[#555] text-[15px] md:text-base leading-relaxed mb-4">{t(`${step.key}Desc`)}</p>
            <div className="max-w-[220px]">
              <StepIllustration step={step.num as 1 | 2 | 3} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm md:text-base">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
