"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function BusinessModel() {
  const t = useTranslations("Pitch.BusinessModel");

  return (
    <SlideWrapper variant="glow">
      <motion.p variants={itemVariants} className="text-[#4a5578] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12 text-white">
        {t("headline")}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <motion.div variants={itemVariants} className="hover-card bg-white/10 text-white border border-white/10 rounded-xl p-8 md:p-10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,42,74,0.3)]">
          <p className="text-white/50 text-xs font-mono tracking-[0.15em] uppercase mb-3">01</p>
          <p className="font-bold text-lg mb-3">{t("subscriptionTitle")}</p>
          <p className="text-white/60 text-sm leading-relaxed">
            {t("subscriptionDesc")}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="hover-card bg-white text-[#111] rounded-xl p-8 md:p-10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]">
          <p className="text-[#1e2a4a] text-xs font-mono tracking-[0.15em] uppercase mb-3">02</p>
          <p className="font-bold text-lg mb-3">{t("customTitle")}</p>
          <p className="text-[#666] text-sm leading-relaxed">
            {t("customDesc")}
          </p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <p className="text-white/50 text-xs font-mono tracking-[0.15em] uppercase mb-4 text-center">How it works</p>
        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 md:gap-0 flex-1">
              <div className="hover-card bg-white rounded-lg px-4 py-4 text-center flex-1 text-[#111] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]">
                <p className="text-[#999] text-xs font-mono mb-1">{`0${i}`}</p>
                <p className="font-bold text-sm">{t(`step${i}Label`)}</p>
                <p className="text-[#999] text-xs mt-1">{t(`step${i}Sub`)}</p>
              </div>
              {i < 4 && (
                <span className="hidden md:block text-white/30 text-lg mx-2 flex-shrink-0">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
