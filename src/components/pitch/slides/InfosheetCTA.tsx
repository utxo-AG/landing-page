"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const PREVIEW_ITEMS = [
  { key: "demo", num: "01", highlighted: true },
  { key: "takeaway", num: "02", highlighted: false },
  { key: "timeline", num: "03", highlighted: false },
];

export default function InfosheetCTA() {
  const t = useTranslations("Pitch.InfosheetCTA");

  return (
    <SlideWrapper variant="warm">
      <motion.p variants={itemVariants} className="text-[#4a5578] text-sm font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-3 text-[#111]">
        {t("headline1")}
        <br />
        <span className="text-[#111]/50">{t("headline2")}</span>
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#666] text-sm md:text-base mb-12 max-w-[600px]">
        {t("description")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {PREVIEW_ITEMS.map((item) => (
          <motion.div
            key={item.key}
            variants={itemVariants}
            className={`hover-card rounded-lg p-8 md:p-10 transition-all duration-300 ${
              item.highlighted
                ? "bg-[#1e2a4a] text-white border-2 border-[#1e2a4a] shadow-[0_8px_40px_rgba(30,42,74,0.2)] hover:shadow-[0_12px_50px_rgba(30,42,74,0.3)]"
                : "bg-white text-[#111] border border-[#e0dbd4] hover:shadow-[0_8px_30px_rgba(30,42,74,0.08)]"
            }`}
          >
            <p className={`text-xs font-mono tracking-[0.15em] mb-4 ${
              item.highlighted ? "text-white/60" : "text-[#4a5578]"
            }`}>
              {item.num}
            </p>
            <p className="font-bold text-lg mb-3">{t(`${item.key}Title`)}</p>
            <p className={`text-sm leading-relaxed ${
              item.highlighted ? "text-white/70" : "text-[#555]"
            }`}>
              {t(`${item.key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
