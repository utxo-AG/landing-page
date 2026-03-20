"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { ROADMAP_PROJECTS } from "@/lib/pitch-constants";

export default function Roadmap() {
  const t = useTranslations("Pitch.Roadmap");

  return (
    <SlideWrapper variant="rose">
      <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline1")}
        <br />
        <span className="text-black/40">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {ROADMAP_PROJECTS.map((proj) => (
          <motion.div
            key={proj.key}
            variants={itemVariants}
            className={`hover-card rounded-lg p-8 md:p-10 transition-all duration-300 ${
              proj.highlighted
                ? "bg-[#111] text-white hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                : "bg-[#f5f5f5] text-[#111] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            }`}
          >
            <p className={`text-xs font-mono tracking-[0.15em] uppercase mb-4 ${
              proj.highlighted ? "text-[#888]" : "text-[#999]"
            }`}>
              {t(`${proj.key}Industry`)}
            </p>
            <p className="font-bold text-lg mb-3">{t(`${proj.key}Title`)}</p>
            <p className={`text-sm leading-relaxed ${
              proj.highlighted ? "text-[#ccc]" : "text-[#666]"
            }`}>
              {t(`${proj.key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
