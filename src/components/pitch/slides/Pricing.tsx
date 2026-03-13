"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { PRICING_TIERS } from "@/lib/pitch-constants";

export default function Pricing({ footnote }: { footnote?: string }) {
  const t = useTranslations("Pitch.Pricing");

  return (
    <SlideWrapper>
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline")}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        {PRICING_TIERS.map((tier) => (
          <motion.div
            key={tier.key}
            variants={itemVariants}
            className={`hover-card rounded-lg p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 flex flex-col ${
              tier.recommended
                ? "bg-[#111] text-white ring-2 ring-[#111] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                : "bg-[#f5f5f5] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            }`}
          >
            <p className={`text-xs font-mono tracking-[0.15em] uppercase mb-4 ${tier.recommended ? "text-[#888]" : "invisible"}`}>
              {tier.recommended ? t("recommended") : "\u00A0"}
            </p>
            <p className="font-bold text-lg mb-1">{t(`${tier.key}Name`)}</p>
            <p className="mb-6 flex items-baseline">
              <span className="text-[36px] md:text-[44px] font-bold tracking-tight leading-none">{tier.price}</span>
              <span className={`text-sm ml-1 ${tier.recommended ? "text-[#888]" : "text-[#999]"}`}>
                {t(`${tier.key}Unit`)}
              </span>
            </p>
            <p className={`text-sm mt-auto ${tier.recommended ? "text-[#ccc]" : "text-[#666]"}`}>
              {t(`${tier.key}Feature1`)}
            </p>
          </motion.div>
        ))}
        <motion.div
          variants={itemVariants}
          className="hover-card rounded-lg p-8 md:p-10 bg-[#f5f5f5] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center"
        >
          <p className="font-bold text-lg">{t("individualName")}</p>
        </motion.div>
      </div>

      <motion.p variants={itemVariants} className="text-[#888] text-xs font-mono">
        {footnote || t("defaultFootnote")}
      </motion.p>
    </SlideWrapper>
  );
}
