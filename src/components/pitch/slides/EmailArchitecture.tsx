"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import ArchitectureDiagram from "../visuals/ArchitectureDiagram";

export default function EmailArchitecture() {
  const t = useTranslations("Pitch.EmailArchitecture");

  return (
    <SlideWrapper variant="glow">
      <motion.p variants={itemVariants} className="text-[#4a5578] text-xs font-mono tracking-[0.15em] uppercase mb-4">
        {t("label")}
      </motion.p>
      <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-3 text-white">
        {t("headline")}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#a3a3a3] text-sm md:text-base mb-12 max-w-[600px]">
        {t("description")}
      </motion.p>

      <motion.div variants={itemVariants} className="mb-8">
        <ArchitectureDiagram className="w-full" />
      </motion.div>

      <motion.p variants={itemVariants} className="text-white/40 text-sm mt-4">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
