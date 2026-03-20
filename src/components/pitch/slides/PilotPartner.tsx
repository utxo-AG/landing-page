"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function PilotPartner() {
  const t = useTranslations("Pitch.PilotPartner");

  return (
    <SlideWrapper variant="glow">
      <motion.p variants={itemVariants} className="text-[#8a9cc5] text-sm font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline1")}
        <br />
        <span className="text-[#8a9cc5]">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <motion.div variants={itemVariants} className="hover-card bg-white/[0.07] border border-white/[0.08] rounded-lg p-8 md:p-10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
          <p className="text-[#8a9cc5] text-sm font-mono tracking-[0.15em] uppercase mb-5">{t("situationLabel")}</p>
          <ul className="space-y-3 text-[#9aa8c7] text-sm leading-relaxed">
            {[1, 2, 3, 4].map((i) => (
              <li key={i}>{t(`situation${i}`)}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="hover-card bg-black/40 border border-white/10 rounded-lg p-8 md:p-10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <p className="text-[#8a9cc5] text-sm font-mono tracking-[0.15em] uppercase mb-5">{t("goalLabel")}</p>
          <ul className="space-y-3 text-[#c8d2e6] text-sm leading-relaxed">
            {[1, 2, 3].map((i) => (
              <li key={i}>{t(`goal${i}`)}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.p variants={itemVariants} className="text-[#6b7a9e] text-xs font-mono">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
