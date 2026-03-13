"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function CompetitivePressure() {
  const t = useTranslations("Pitch.CompetitivePressure");

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

      <motion.div variants={itemVariants} className="max-w-[600px] space-y-6 mb-8">
        <div className="hover-card p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-[#f5f5f5]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{t("withAI")}</span>
            <span className="text-sm font-bold">76%</span>
          </div>
          <div className="h-10 bg-[#eee] rounded-md overflow-hidden">
            <motion.div
              className="h-full bg-[#111] rounded-md"
              initial={{ width: 0 }}
              whileInView={{ width: "76%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>

        <div className="hover-card p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-[#f5f5f5]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{t("withoutAI")}</span>
            <span className="text-sm font-bold">46%</span>
          </div>
          <div className="h-10 bg-[#eee] rounded-md overflow-hidden">
            <motion.div
              className="h-full bg-[#ccc] rounded-md"
              initial={{ width: 0 }}
              whileInView={{ width: "46%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>

        <p className="text-[#888] text-xs">{t("chartLabel")}</p>
      </motion.div>

      <motion.p variants={itemVariants} className="text-[#888] text-base font-medium mt-6">
        {t.rich("footnote", { em: (chunks) => <em>{chunks}</em> })}
      </motion.p>
      <motion.p variants={itemVariants} className="text-[#bbb] text-xs font-mono mt-4">
        {t("source")}
      </motion.p>
    </SlideWrapper>
  );
}
