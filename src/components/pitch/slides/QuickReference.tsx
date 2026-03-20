"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { QUICK_REFERENCE_ITEMS } from "@/lib/pitch-constants";

export default function QuickReference() {
  const t = useTranslations("Pitch.QuickReference");

  return (
    <SlideWrapper variant="rose">
      <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-3">
        {t("headline")}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#666] text-sm md:text-base mb-12 max-w-[600px]">
        {t("description")}
      </motion.p>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {QUICK_REFERENCE_ITEMS.map((item) => (
          <div
            key={item.key}
            className="hover-card bg-white shadow-sm rounded-lg p-5 flex gap-4 items-start transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="flex-1">
              <p className="text-sm font-mono text-[#666] uppercase tracking-wider mb-1">{t(`${item.key}Need`)}</p>
              <p className="font-medium text-sm mb-2 text-[#111]">{t(`${item.key}Need`)}</p>
            </div>
            <div className="text-right flex-1">
              <p className="text-sm font-mono text-[#666] uppercase tracking-wider mb-1">{t("sayThis")}</p>
              <p className="text-sm text-[#333] italic">{t(`${item.key}Prompt`)}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
