"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function Conviction() {
  const t = useTranslations("Pitch.Conviction");

  return (
    <SlideWrapper variant="warm">
      <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-12">
        {t("headline1")}
        <br />
        <span className="text-[#999]">{t("headline2")}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <div className="space-y-4 md:space-y-8 max-w-[700px] mb-10">
            {[1, 2, 3].map((i) => (
              <motion.div key={i} variants={itemVariants} className="hover-card flex gap-3 md:gap-5 items-start p-3 md:p-4 -mx-3 md:-mx-4 rounded-lg transition-all duration-300 hover:bg-[#efe8de]">
                <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#111] text-white flex items-center justify-center text-xs md:text-sm font-bold">
                  {i}
                </span>
                <div>
                  <p className="font-bold text-base md:text-lg">{t(`item${i}Title`)}</p>
                  <p className="text-[#666] text-xs md:text-sm mt-1">{t(`item${i}Desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p variants={itemVariants} className="text-[#888] text-xs md:text-sm mt-4">
            {t("footnote")}
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 md:gap-6 mt-4 md:mt-0">
          <div className="flex items-end gap-4 md:gap-5">
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden ring-2 ring-[#e0d9cf]">
                <Image src="/images/pitch/emma-pfp.png" alt="Emma" fill className="object-cover" sizes="(max-width: 768px) 80px, 120px" />
              </div>
              <span className="text-[10px] md:text-xs font-mono text-[#999] tracking-wide">Emma</span>
              <span className="text-[9px] md:text-[10px] text-[#bbb] uppercase tracking-[0.1em]">Human</span>
            </div>
            <span className="text-xl md:text-2xl text-[#ccc] mb-8 md:mb-10 font-light">+</span>
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden ring-2 ring-[#e0d9cf]">
                <Image src="/images/pitch/otto-pfp.png" alt="Otto" fill className="object-cover" sizes="(max-width: 768px) 80px, 120px" />
              </div>
              <span className="text-[10px] md:text-xs font-mono text-[#999] tracking-wide">Otto</span>
              <span className="text-[9px] md:text-[10px] text-[#bbb] uppercase tracking-[0.1em]">AI Agent</span>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
