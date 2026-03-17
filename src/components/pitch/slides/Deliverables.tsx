"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { DELIVERABLE_FORMATS } from "@/lib/pitch-constants";

const icons: Record<string, React.ReactNode> = {
  email: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="3" width="16" height="12" rx="2" stroke="#1e2a4a" strokeWidth="1.5" fill="none"/><path d="M1 5l8 5 8-5" stroke="#1e2a4a" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  excel: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="1" width="14" height="16" rx="2" stroke="#1e2a4a" strokeWidth="1.5" fill="none"/><line x1="6" y1="6" x2="12" y2="6" stroke="#1e2a4a" strokeWidth="1.2"/><line x1="6" y1="9" x2="12" y2="9" stroke="#1e2a4a" strokeWidth="1.2"/><line x1="6" y1="12" x2="10" y2="12" stroke="#1e2a4a" strokeWidth="1.2"/></svg>
  ),
  summary: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="1" width="14" height="16" rx="2" stroke="#1e2a4a" strokeWidth="1.5" fill="none"/><line x1="5" y1="5" x2="13" y2="5" stroke="#1e2a4a" strokeWidth="1.2"/><line x1="5" y1="8" x2="11" y2="8" stroke="#1e2a4a" strokeWidth="1.2"/><line x1="5" y1="11" x2="9" y2="11" stroke="#1e2a4a" strokeWidth="1.2"/></svg>
  ),
  status: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#1e2a4a" strokeWidth="1.5" fill="none"/><path d="M9 5v4l3 2" stroke="#1e2a4a" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  escalation: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l7 14H2L9 2z" stroke="#1e2a4a" strokeWidth="1.5" fill="none" strokeLinejoin="round"/><line x1="9" y1="7" x2="9" y2="11" stroke="#1e2a4a" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="13.5" r="0.75" fill="#1e2a4a"/></svg>
  ),
};

export default function Deliverables() {
  const t = useTranslations("Pitch.Deliverables");

  return (
    <SlideWrapper variant="rose">
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-3">
        {t("headline")}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#888] text-sm md:text-base mb-12 max-w-[600px]">
        {t("description")}
      </motion.p>

      <motion.div variants={itemVariants} className="hover-card overflow-hidden rounded-lg border border-[#ddd] bg-white mb-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1e2a4a] text-white">
              <th className="text-left py-3 px-5 font-bold text-xs uppercase tracking-wider">{t("colFormat")}</th>
              <th className="text-left py-3 px-5 font-bold text-xs uppercase tracking-wider hidden md:table-cell">{t("colDescription")}</th>
              <th className="text-left py-3 px-5 font-bold text-xs uppercase tracking-wider">{t("colExample")}</th>
            </tr>
          </thead>
          <tbody>
            {DELIVERABLE_FORMATS.map((item) => (
              <tr key={item.key} className="border-b border-[#ddd] hover:bg-[#f5f0ea] transition-colors">
                <td className="py-3 px-5 font-medium text-[#333]">
                  <span className="mr-2 inline-flex align-middle">{icons[item.icon]}</span>
                  {t(`${item.key}Name`)}
                </td>
                <td className="py-3 px-5 text-[#333] hidden md:table-cell">{t(`${item.key}Desc`)}</td>
                <td className="py-3 px-5 text-[#555] text-xs font-mono">{t(`${item.key}Example`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.p variants={itemVariants} className="text-[#888] text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
