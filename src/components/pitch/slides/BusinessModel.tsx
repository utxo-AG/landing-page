"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function BusinessModel() {
  const t = useTranslations("Pitch.BusinessModel");

  return (
    <SlideWrapper variant="cool">
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline")}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        <motion.div variants={itemVariants} className="hover-card bg-white rounded-lg p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <p className="font-bold text-lg mb-3">{t("subscriptionTitle")}</p>
          <p className="text-[#666] text-sm leading-relaxed">
            {t("subscriptionDesc")}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="hover-card bg-[#111] text-white rounded-lg p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <p className="font-bold text-lg mb-3">{t("customTitle")}</p>
          <p className="text-[#ccc] text-sm leading-relaxed">
            {t("customDesc")}
          </p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 md:gap-0 flex-1">
            <div className="hover-card bg-white rounded-lg px-4 py-4 text-center flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <p className="font-bold text-sm">{t(`step${i}Label`)}</p>
              <p className="text-[#999] text-xs mt-1">{t(`step${i}Sub`)}</p>
            </div>
            {i < 4 && (
              <span className="hidden md:block text-[#ccc] text-lg mx-2 flex-shrink-0">&rarr;</span>
            )}
          </div>
        ))}
      </motion.div>
    </SlideWrapper>
  );
}
