"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const ROI_ITEMS = [
  { key: "item1", dark: false },
  { key: "item2", dark: false },
  { key: "item3", dark: true },
];

export default function ROI() {
  const t = useTranslations("Pitch.ROI");

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {ROI_ITEMS.map((item) => (
          <motion.div
            key={item.key}
            variants={itemVariants}
            className={`hover-card rounded-lg p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 ${
              item.dark ? "bg-[#111] text-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]" : "bg-[#f5f5f5] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            }`}
          >
            <p className="font-bold text-base mb-3">{t(`${item.key}Title`)}</p>
            <p className={`text-sm leading-relaxed ${item.dark ? "text-[#ccc]" : "text-[#666]"}`}>
              {t(`${item.key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#888] text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
