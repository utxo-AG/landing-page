"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import EmailMockup from "../visuals/EmailMockup";

const mockupVariants = ["draft", "inbox", "report"] as const;
const cardAgents = [
  { src: "/images/pitch/otto-pfp.png", alt: "Otto" },
  { src: "/images/pitch/lena-portrait.png", alt: "Lena" },
  { src: "/images/pitch/kai-pfp.png", alt: "Kai" },
];

export default function UseCases() {
  const t = useTranslations("Pitch.UseCases");

  return (
    <SlideWrapper variant="cool">
      <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-3">
        {t("headline")}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#666] text-sm md:text-base mb-12 max-w-[650px]">
        {t("description")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        {[1, 2, 3].map((i) => (
          <motion.div key={i} variants={itemVariants} className="hover-card bg-white shadow-sm rounded-lg p-4 border-t-2 border-[#1e2a4a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <Image src={cardAgents[i - 1].src} alt={cardAgents[i - 1].alt} fill className="object-cover object-top" sizes="24px" />
              </div>
              <p className="font-bold text-lg text-[#111]">{t(`item${i}Title`)}</p>
            </div>
            <p className="text-[#555] text-sm leading-relaxed mb-4">{t(`item${i}Desc`)}</p>
            <div className="bg-[#f9f9f9] rounded px-3 py-2 mb-4 border border-[#eee]">
              <p className="text-[10px] font-mono text-[#999] uppercase tracking-wider mb-1">{t("samplePromptLabel")}</p>
              <p className="text-xs text-[#555] italic leading-relaxed">{t(`item${i}Prompt`)}</p>
            </div>
            <EmailMockup variant={mockupVariants[i - 1]} className="mb-2" />
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-[#666] text-sm md:text-base">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
