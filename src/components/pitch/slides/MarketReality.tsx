"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { MARKET_STATS } from "@/lib/pitch-constants";

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      variants={itemVariants}
      className="hover-card bg-white rounded-lg p-8 md:p-10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    >
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.5, ease: "easeOut" }}
        className="text-[36px] md:text-[48px] font-bold tracking-tight text-[#1e2a4a]"
      >
        {value}
      </motion.p>
      <p className="text-[#666] text-sm md:text-base mt-2">{label}</p>
    </motion.div>
  );
}

export default function MarketReality() {
  const t = useTranslations("Pitch.MarketReality");

  return (
    <SlideWrapper variant="warm">
      <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-10">
        {t("headline1")}
        <br />
        <span className="text-[#666]">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
        {MARKET_STATS.map((stat, i) => (
          <AnimatedStat key={stat.key} value={stat.value} label={t(`${stat.key}Label`)} delay={i * 0.15} />
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm md:text-base max-w-[700px]">
        {t("footnote")}
      </motion.p>
      <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono mt-4">
        {t("source")}
      </motion.p>
    </SlideWrapper>
  );
}
