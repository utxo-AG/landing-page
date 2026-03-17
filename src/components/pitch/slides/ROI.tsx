"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

function SavingsVisual() {
  return (
    <motion.div
      className="hidden md:block"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <div className="w-[260px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#e5e5e5] overflow-hidden">
        <div className="bg-[#fafafa] border-b border-[#eee] px-5 py-3">
          <p className="text-[10px] font-mono text-[#999] tracking-wider uppercase">ROI Calculator</p>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: "Stunden/Woche gespart", value: "15h", accent: false },
            { label: "Kosten/Monat reduziert", value: "40%", accent: false },
            { label: "ROI nach 3 Monaten", value: "3.2x", accent: true },
          ].map((row, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.2, duration: 0.4 }}
            >
              <span className="text-xs text-[#666]">{row.label}</span>
              <span className={`text-sm font-bold ${row.accent ? "text-[#1e2a4a]" : "text-[#333]"}`}>
                {row.value}
              </span>
            </motion.div>
          ))}
          <motion.div
            className="mt-3 pt-3 border-t border-[#eee]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
          >
            <div className="h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1e2a4a] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
            <p className="text-[9px] text-[#bbb] font-mono mt-1.5 text-right">80% Effizienzgewinn</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const ROI_ITEMS = [
  { key: "item1", dark: false, highlighted: true },
  { key: "item2", dark: false, highlighted: false },
  { key: "item3", dark: true, highlighted: false },
];

export default function ROI() {
  const t = useTranslations("Pitch.ROI");

  return (
    <SlideWrapper variant="rose">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-center">
        <motion.div variants={itemVariants}>
          <SavingsVisual />
        </motion.div>

        <div>
          <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
            {t("label")}
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-10">
            {t("headline1")}
            <br />
            <span className="text-[#999]">{t("headline2")}</span>
          </motion.h2>

          <div className="space-y-4 mb-8">
            {ROI_ITEMS.map((item) => (
              <motion.div
                key={item.key}
                variants={itemVariants}
                className={`hover-card rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 ${
                  item.dark
                    ? "bg-[#111] text-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                    : item.highlighted
                      ? "bg-[#1e2a4a] text-white hover:shadow-[0_8px_30px_rgba(30,42,74,0.3)]"
                      : "bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                }`}
              >
                <p className="font-bold text-base mb-2">{t(`${item.key}Title`)}</p>
                <p className={`text-sm leading-relaxed ${item.dark || item.highlighted ? "text-[#ccc]" : "text-[#666]"}`}>
                  {t(`${item.key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={itemVariants} className="text-[#888] text-sm">
            {t("footnote")}
          </motion.p>
        </div>
      </div>
    </SlideWrapper>
  );
}
