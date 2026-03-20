"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const TEAM_IMAGE_URL =
  "https://c-ipfs-gw.nmkr.io/ipfs/QmfRZiZW6yokjeLjNsKWmpqYUt1nLmZw3GZyGkdy8n4mFW";

export default function TeamImage() {
  const t = useTranslations("Pitch.TeamImage");

  return (
    <SlideWrapper variant="warm" layout="split">
      <div>
        <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4">
          {t("label")}
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight">
          {t("headline")}
        </motion.h2>
      </div>

      <motion.div variants={itemVariants} className="w-full flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TEAM_IMAGE_URL}
          alt="Agent team"
          className="max-h-[70dvh] w-auto object-contain"
        />
      </motion.div>
    </SlideWrapper>
  );
}
