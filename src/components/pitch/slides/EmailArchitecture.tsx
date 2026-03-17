"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import ArchitectureDiagram from "../visuals/ArchitectureDiagram";
import { EMAIL_FLOW_STEPS } from "@/lib/pitch-constants";

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

      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
          <Image src="/images/pitch/otto-pfp.png" alt="Otto" fill className="object-cover" sizes="48px" />
        </div>
        <p className="text-white/60 text-sm font-mono">Otto &mdash; {t("label")}</p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0 mb-10">
        {EMAIL_FLOW_STEPS.map((step, i) => (
          <motion.div
            key={step.key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
            className="flex items-center gap-3 md:gap-0 flex-1"
          >
            <div
              className={`hover-card rounded-lg px-4 py-4 md:px-5 md:py-5 text-center flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${
                step.highlighted
                  ? "bg-[#1e2a4a] text-white hover:shadow-[0_8px_30px_rgba(30,42,74,0.4)]"
                  : "bg-white/15 backdrop-blur-sm text-white border border-white/20"
              }`}
            >
              <p className="font-bold text-sm">{t(`${step.key}Label`)}</p>
              <p className={`text-xs mt-1 ${step.highlighted ? "text-[#4a5578]" : "text-white/50"}`}>
                {t(`${step.key}Sub`)}
              </p>
            </div>
            {i < EMAIL_FLOW_STEPS.length - 1 && (
              <span className="hidden md:block text-[#ccc] text-lg mx-2 flex-shrink-0">&rarr;</span>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="hidden md:block mb-8">
        <ArchitectureDiagram className="w-full" />
      </motion.div>

      <motion.p variants={itemVariants} className="text-white/40 text-sm mt-4">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
