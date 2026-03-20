"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import EmailMockup from "../visuals/EmailMockup";

export default function LiveDemo() {
  const t = useTranslations("Pitch.LiveDemo");

  return (
    <SlideWrapper variant="glow">
      <motion.p variants={itemVariants} className="text-[#4a5578] text-sm font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-6 text-white">
        {t("headline1")}
        <br />
        <span className="text-white/50">{t("headline2")}</span>
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#a3a3a3] text-sm md:text-base mb-10 max-w-[650px]">
        {t("description")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          variants={itemVariants}
          className="hover-card bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-lg p-8 md:p-12 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,42,74,0.2)]"
        >
          <p className="font-bold text-xl md:text-2xl mb-4">{t("boxTitle")}</p>
          <p className="text-[#ccc] text-sm leading-relaxed">
            {t("boxDescription")}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <EmailMockup variant="inbox" />
        </motion.div>
      </div>

      <motion.p variants={itemVariants} className="text-white/40 text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
