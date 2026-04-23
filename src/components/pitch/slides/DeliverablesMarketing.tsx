"use client";

import React from "react";
import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const icons: Record<string, React.ReactNode> = {
  email: (
    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="3" width="16" height="12" rx="2" stroke="#1e2a4a" strokeWidth="1.5" fill="none" />
      <path d="M1 5l8 5 8-5" stroke="#1e2a4a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  excel: (
    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="1" width="14" height="16" rx="2" stroke="#1e2a4a" strokeWidth="1.5" fill="none" />
      <line x1="6" y1="6" x2="12" y2="6" stroke="#1e2a4a" strokeWidth="1.2" />
      <line x1="6" y1="9" x2="12" y2="9" stroke="#1e2a4a" strokeWidth="1.2" />
      <line x1="6" y1="12" x2="10" y2="12" stroke="#1e2a4a" strokeWidth="1.2" />
    </svg>
  ),
  pdf: (
    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
      <path d="M4 1h7l5 5v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z" stroke="#1e2a4a" strokeWidth="1.5" fill="none" />
      <path d="M11 1v5h5" stroke="#1e2a4a" strokeWidth="1.5" strokeLinecap="round" />
      <text x="9" y="14" textAnchor="middle" fontSize="5" fontWeight="700" fill="#1e2a4a">PDF</text>
    </svg>
  ),
  landing: (
    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="3" width="16" height="12" rx="1.5" stroke="#1e2a4a" strokeWidth="1.5" fill="none" />
      <line x1="1" y1="6.5" x2="17" y2="6.5" stroke="#1e2a4a" strokeWidth="1.5" />
      <circle cx="3" cy="4.75" r="0.5" fill="#1e2a4a" />
      <circle cx="4.5" cy="4.75" r="0.5" fill="#1e2a4a" />
      <circle cx="6" cy="4.75" r="0.5" fill="#1e2a4a" />
      <line x1="4" y1="9.5" x2="14" y2="9.5" stroke="#1e2a4a" strokeWidth="1.2" opacity="0.5" />
      <line x1="4" y1="11.5" x2="12" y2="11.5" stroke="#1e2a4a" strokeWidth="1.2" opacity="0.5" />
    </svg>
  ),
  social: (
    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
      <path d="M3 7v4l10 4V3L3 7z" stroke="#1e2a4a" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M3 7H2a1 1 0 00-1 1v2a1 1 0 001 1h1" stroke="#1e2a4a" strokeWidth="1.5" fill="none" />
      <path d="M15 6.5c.6.5 1 1.3 1 2.5s-.4 2-1 2.5" stroke="#1e2a4a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
  monitor: (
    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="#1e2a4a" strokeWidth="1.5" fill="none" />
      <path d="M9 5v4l3 2" stroke="#1e2a4a" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.1" fill="#1e2a4a" />
    </svg>
  ),
  alert: (
    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
      <path d="M9 2l7 14H2L9 2z" stroke="#1e2a4a" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <line x1="9" y1="7" x2="9" y2="11" stroke="#1e2a4a" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="13.5" r="0.75" fill="#1e2a4a" />
    </svg>
  ),
  copy: (
    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
      <rect x="2.5" y="2" width="9" height="13" rx="1.5" stroke="#1e2a4a" strokeWidth="1.5" fill="none" />
      <line x1="5" y1="6" x2="9" y2="6" stroke="#1e2a4a" strokeWidth="1.2" />
      <line x1="5" y1="9" x2="9" y2="9" stroke="#1e2a4a" strokeWidth="1.2" />
      <path d="M12.5 8l3 3-3.5 3.5H10v-2.5L12.5 8z" stroke="#1e2a4a" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  ),
};

const FORMATS = [
  { icon: "email", name: "E-Mail-Entwurf", example: "Newsletter Frühling 2026" },
  { icon: "copy", name: "Copy-Variante", example: "Headline A / B / C" },
  { icon: "social", name: "Social Post", example: "LinkedIn — Leasing-Aktion" },
  { icon: "landing", name: "Landing Page", example: "/fruehjahr-launch-2026" },
  { icon: "pdf", name: "PDF-Analyse", example: "Wettbewerbs-Scan, 14 S." },
  { icon: "excel", name: "Auswertung", example: "Kampagnen_Performance.xlsx" },
  { icon: "monitor", name: "Kampagnen-Monitor", example: "3 live · 1 under benchmark" },
  { icon: "alert", name: "Performance-Alert", example: "⚠ CTR Kampagne X unter Ø" },
];

export default function DeliverablesMarketing() {
  return (
    <SlideWrapper variant="rose">
      <div className="max-w-[760px] mb-10 md:mb-14">
        <motion.p
          variants={itemVariants}
          className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4"
        >
          Was Ihre Agenten liefern
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-tight mb-4"
        >
          Was immer Marketing braucht. In jedem Format.
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-[#555] text-base md:text-lg leading-relaxed"
        >
          Sie beschreiben den Output — Ihre Agenten liefern. Strukturiert,
          sofort nutzbar, im Format, das in Ihrem Marketing-Workflow zählt.
        </motion.p>
      </div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8"
      >
        {FORMATS.map((item) => (
          <div
            key={item.name}
            className="hover-card bg-white border border-[#ebe4d8] rounded-xl p-5 transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
          >
            <div className="mb-3">{icons[item.icon]}</div>
            <p className="font-bold text-[15px] md:text-base text-[#111] leading-tight mb-1.5">
              {item.name}
            </p>
            <p className="text-[#888] text-[12px] font-mono leading-relaxed break-words">
              {item.example}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-start gap-4">
        <div className="shrink-0 h-[2px] w-10 md:w-14 bg-[#1e2a4a] mt-3" />
        <p className="text-[#333] text-base md:text-lg leading-relaxed">
          <span className="font-bold text-[#111]">Das sind nur Beispiele.</span>{" "}
          <span className="text-[#555]">
            Sagen Sie was Sie brauchen — Ihre Agenten bauen es.
          </span>
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
