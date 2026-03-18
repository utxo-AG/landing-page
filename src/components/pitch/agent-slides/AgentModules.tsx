"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const MODULE_NUMS = ["1", "2", "3"] as const;

export default function AgentModules() {
  const t = useTranslations("AgentDeck.modules");

  return (
    <SlideWrapper>
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline")}
        <br />
        <span className="text-[#999]">{t("subheadline")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {MODULE_NUMS.map((num, i) => (
          <motion.div
            key={num}
            variants={itemVariants}
            className={`hover-card rounded-lg p-8 md:p-10 transition-all duration-300 ${
              i === 0 ? "bg-[#111] text-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]" : "bg-[#f5f5f5] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            }`}
          >
            <p className={`text-xs font-mono tracking-[0.15em] mb-4 ${
              i === 0 ? "text-[#888]" : "text-[#999]"
            }`}>
              {t("moduleLabel", { num })}
            </p>
            <p className="font-bold text-lg mb-3">{t(`module${num}Title`)}</p>
            <p className={`text-sm leading-relaxed ${
              i === 0 ? "text-[#ccc]" : "text-[#666]"
            }`}>
              {t(`module${num}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </SlideWrapper>
  );
}
