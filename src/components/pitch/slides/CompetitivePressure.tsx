"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

function GapVisual() {
  return (
    <motion.svg
      viewBox="0 0 280 260"
      fill="none"
      className="w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <line x1="40" y1="220" x2="260" y2="220" stroke="#ddd" strokeWidth="1" />
      <line x1="40" y1="220" x2="40" y2="30" stroke="#ddd" strokeWidth="1" />

      {[220, 172, 125, 78, 30].map((y, i) => (
        <line key={i} x1="40" y1={y} x2="260" y2={y} stroke="#f0ebe4" strokeWidth="0.5" />
      ))}

      <motion.path
        d="M50,180 C90,175 130,160 170,130 Q210,100 250,55"
        stroke="#1e2a4a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.path
        d="M50,185 C90,183 130,180 170,178 Q210,176 250,170"
        stroke="#b8b0a6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 4"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.path
        d="M250,55 L250,170"
        stroke="#1e2a4a"
        strokeWidth="1"
        strokeDasharray="4 3"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.0, duration: 0.5 }}
      />
      <motion.text
        x="240"
        y="115"
        fontSize="10"
        fill="#1e2a4a"
        fontWeight="600"
        textAnchor="end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.3, duration: 0.5 }}
      >
        GAP
      </motion.text>

      <motion.circle
        cx="250"
        cy="55"
        r="4"
        fill="#1e2a4a"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.0, duration: 0.3 }}
      />
      <motion.circle
        cx="250"
        cy="170"
        r="4"
        fill="#b8b0a6"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.0, duration: 0.3 }}
      />

      <text x="50" y="240" fontSize="9" fill="#bbb" fontFamily="monospace">2024</text>
      <text x="230" y="240" fontSize="9" fill="#bbb" fontFamily="monospace">2027</text>
    </motion.svg>
  );
}

export default function CompetitivePressure() {
  const t = useTranslations("Pitch.CompetitivePressure");

  return (
    <SlideWrapper variant="rose">
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline1")}
        <br />
        <span className="text-[#999]">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div variants={itemVariants} className="space-y-6 mb-8">
          <div className="hover-card p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#111]">{t("withAI")}</span>
              <span className="text-sm font-bold text-[#111]">76%</span>
            </div>
            <div className="h-7 bg-[#eee] rounded-md overflow-hidden">
              <motion.div
                className="h-full bg-[#1e2a4a] rounded-md"
                initial={{ width: 0 }}
                whileInView={{ width: "76%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </div>

          <div className="hover-card p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#111]">{t("withoutAI")}</span>
              <span className="text-sm font-bold text-[#111]">46%</span>
            </div>
            <div className="h-7 bg-[#eee] rounded-md overflow-hidden">
              <motion.div
                className="h-full bg-[#b8b0a6] rounded-md"
                initial={{ width: 0 }}
                whileInView={{ width: "46%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </div>

          <p className="text-[#888] text-xs">{t("chartLabel")}</p>

          <motion.p variants={itemVariants} className="text-[#888] text-base font-medium mt-6">
            {t.rich("footnote", { em: (chunks) => <em>{chunks}</em> })}
          </motion.p>
          <motion.p variants={itemVariants} className="text-[#bbb] text-xs font-mono mt-2">
            {t("source")}
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="hidden md:flex justify-center">
          <GapVisual />
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
