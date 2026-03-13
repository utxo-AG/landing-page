"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { COMPARISON_ROWS, COMPARISON_HEADERS } from "@/lib/pitch-constants";

export default function ComparisonTable() {
  const t = useTranslations("Pitch.ComparisonTable");

  const headers = ["", ...COMPARISON_HEADERS.map((h) => t(`header${h}`))];

  return (
    <SlideWrapper>
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-3">
        {t("headline")}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#888] text-sm md:text-base mb-10 max-w-[600px]">
        {t("description")}
      </motion.p>

      {/* Desktop table */}
      <motion.div variants={itemVariants} className="hover-card hidden md:block overflow-x-auto mb-8 rounded-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={h || "label"}
                  className={`text-left py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 ${
                    i === 1 ? "bg-[#111] text-white rounded-t-lg border-[#111]" : "border-[#eee] text-[#999]"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => {
              const values = COMPARISON_HEADERS.map((h) => t(`row${row.key}${h}`));
              return (
                <tr key={row.key}>
                  <td className="py-3 px-4 font-medium text-[#666] border-b border-[#eee] text-xs uppercase tracking-wider">
                    {t(`row${row.key}`)}
                  </td>
                  {values.map((val, vi) => (
                    <td
                      key={vi}
                      className={`py-3 px-4 border-b ${
                        vi === 0
                          ? "bg-[#111] text-white font-medium border-[#222]"
                          : "text-[#666] border-[#eee]"
                      }`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Mobile cards */}
      <motion.div variants={itemVariants} className="md:hidden space-y-4 mb-8">
        {COMPARISON_ROWS.map((row) => {
          const values = COMPARISON_HEADERS.map((h) => t(`row${row.key}${h}`));
          return (
            <div key={row.key} className="hover-card bg-[#f5f5f5] rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <p className="text-xs font-mono text-[#999] uppercase tracking-wider mb-2">{t(`row${row.key}`)}</p>
              <div className="space-y-2">
                {COMPARISON_HEADERS.map((header, hi) => (
                  <div key={header} className="flex justify-between items-center">
                    <span className={`text-xs ${hi === 0 ? "font-bold" : "text-[#888]"}`}>{t(`header${header}`)}</span>
                    <span className={`text-sm ${hi === 0 ? "font-bold" : "text-[#666]"}`}>{values[hi]}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.p variants={itemVariants} className="text-[#888] text-xs font-mono">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
