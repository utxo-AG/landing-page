"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

function SwissFlag({ size = 32 }: { size?: number }) {
  const arm = size * 0.5;
  const thick = size * 0.16;
  const cx = size / 2;
  const cy = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <rect width={size} height={size} rx={size * 0.15} fill="#DA291C" />
      <rect x={cx - arm / 2} y={cy - thick / 2} width={arm} height={thick} rx={thick * 0.15} fill="white" />
      <rect x={cx - thick / 2} y={cy - arm / 2} width={thick} height={arm} rx={thick * 0.15} fill="white" />
    </svg>
  );
}

export default function SwissTrust() {
  const t = useTranslations("Pitch.SwissTrust");

  return (
    <SlideWrapper variant="rose">
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
        <SwissFlag size={28} />
        <p className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase">
          {t("label")}
        </p>
      </motion.div>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline1")}
        <br />
        <span className="text-[#666]">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <motion.div variants={itemVariants} className="hover-card bg-[#111] text-white rounded-lg p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <p className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-5">{t("utxoLabel")}</p>
          <ul className="space-y-3 text-[#ccc] text-sm leading-relaxed">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex gap-2"><span className="text-white">{"\u2713"}</span> {t(`utxo${i}`)}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="hover-card bg-[#f5f5f5] rounded-lg p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <p className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-5">{t("usLabel")}</p>
          <ul className="space-y-3 text-[#666] text-sm leading-relaxed">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex gap-2"><span className="text-[#ccc]">{"\u2717"}</span> {t(`us${i}`)}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
