"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

export default function NameYourAgent() {
  const t = useTranslations("Pitch.NameYourAgent");

  return (
    <SlideWrapper variant="dark">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-center">
        <div>
          <motion.p variants={itemVariants} className="text-[#4a5578] text-xs font-mono tracking-[0.15em] uppercase mb-4">
            {t("label")}
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-[28px] md:text-[44px] font-bold leading-[1.1] tracking-tight mb-6 text-white">
            {t("headline")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-[500px]">
            {t("description")}
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
              <Image src="/images/pitch/lena-portrait.png" alt="Lena" fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{t("lenaName")}</p>
              <p className="text-white/40 text-xs">{t("lenaRole")}</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="hidden md:block relative w-[440px] h-[300px]"
        >
          <div className="absolute inset-0 opacity-25">
            <Image
              src="/images/pitch/agent-silhouettes.png"
              alt=""
              fill
              className="object-contain"
              sizes="440px"
            />
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
