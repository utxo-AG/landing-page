"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const SOLUTIONS = [
  { titleKey: "solution1Title", descKey: "solution1Desc" },
  { titleKey: "solution2Title", descKey: "solution2Desc" },
  { titleKey: "solution3Title", descKey: "solution3Desc" },
] as const;

export default function WhyUtxoAG() {
  const t = useTranslations("Pitch.WhyUtxoAG");

  return (
    <SlideWrapper variant="glow">
      <motion.p
        variants={itemVariants}
        className="text-[#8899bb] text-sm font-mono tracking-[0.15em] uppercase mb-10"
      >
        {t("label")}
      </motion.p>

      <motion.div variants={itemVariants} className="relative mb-6">
        <span
          aria-hidden
          className="absolute -left-2 md:-left-6 -top-6 md:-top-10 text-[96px] md:text-[160px] font-serif text-[#c4a882]/30 leading-none select-none"
        >
          {t("quoteOpen")}
        </span>
        <h2 className="relative z-10 text-[36px] md:text-[64px] lg:text-[72px] font-bold leading-[1.05] tracking-tight text-white max-w-[900px]">
          {t("quoteText")}
        </h2>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex items-start gap-4 mb-10 max-w-[720px]"
      >
        <div className="shrink-0 h-[2px] w-10 bg-[#c4a882] mt-3" />
        <p className="text-[#a3b0c9] text-sm md:text-base italic leading-relaxed">
          {t("quoteAttribution")}
        </p>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-[#c9d1e0] text-base md:text-lg leading-relaxed max-w-[820px] mb-12"
      >
        {t("context")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
        {SOLUTIONS.map((s, i) => (
          <motion.div
            key={s.titleKey}
            variants={itemVariants}
            className="hover-card relative rounded-xl p-6 md:p-7 bg-white/[0.04] border border-white/10 backdrop-blur-sm transition-[transform,background-color,box-shadow] duration-300 hover:bg-white/[0.07] hover:-translate-y-0.5"
          >
            <span className="block text-[11px] font-mono text-[#c4a882] tracking-[0.15em] uppercase mb-3">
              0{i + 1}
            </span>
            <p className="text-white font-bold text-lg md:text-xl mb-2 leading-tight">
              {t(s.titleKey)}
            </p>
            <p className="text-[#a3b0c9] text-sm md:text-[15px] leading-relaxed">
              {t(s.descKey)}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={itemVariants}
        className="text-white/70 text-sm md:text-base"
      >
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
