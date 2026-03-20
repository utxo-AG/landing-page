"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { LIMITATIONS } from "@/lib/pitch-constants";

export default function Limitations() {
  const t = useTranslations("Pitch.Limitations");

  return (
    <SlideWrapper variant="cool">
      <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline1")}
        <br />
        <span className="text-[#666]">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <motion.div variants={itemVariants}>
          <p className="text-sm font-mono text-[#666] uppercase tracking-wider mb-4">{t("cannotLabel")}</p>
          <div className="space-y-3">
            {LIMITATIONS.filter((l) => l.type === "cannot").map((item) => (
              <div key={item.key} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ddd] text-[#666] text-sm flex-shrink-0 mt-0.5">✕</span>
                <p className="text-sm text-[#333] leading-relaxed">{t(`${item.key}`)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-sm font-mono text-[#666] uppercase tracking-wider mb-4">{t("bestAtLabel")}</p>
          <div className="space-y-3">
            {LIMITATIONS.filter((l) => l.type === "best").map((item) => (
              <div key={item.key} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#10B981] text-white text-xs flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-[#111] leading-relaxed font-medium">{t(`${item.key}`)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
