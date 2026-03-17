"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function Conviction() {
  const t = useTranslations("Pitch.Conviction");

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

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <div className="space-y-6 md:space-y-8 max-w-[700px] mb-10">
            {[1, 2, 3].map((i) => (
              <motion.div key={i} variants={itemVariants} className="hover-card flex gap-5 items-start p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-[#efe8de]">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center text-sm font-bold">
                  {i}
                </span>
                <div>
                  <p className="font-bold text-lg">{t(`item${i}Title`)}</p>
                  <p className="text-[#666] text-sm mt-1">{t(`item${i}Desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p variants={itemVariants} className="text-[#888] text-sm mt-4">
            {t("footnote")}
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="hidden md:flex justify-center mt-8 md:mt-0">
          <div className="relative w-[200px] h-[200px]">
            <Image src="/images/pitch/otto-pfp.png" alt="Otto" fill className="object-contain" sizes="200px" />
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
