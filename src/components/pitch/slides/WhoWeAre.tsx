"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

type BrandMilestone = {
  yearKey: "year1" | "year2" | "year3";
  brandKey: "brand1" | "brand2" | "brand3";
  descKey: "brand1Desc" | "brand2Desc" | "brand3Desc";
  partnerKey?: "brand2Partner";
  logo: string;
  logoHeight: number;
};

const MILESTONES: BrandMilestone[] = [
  {
    yearKey: "year1",
    brandKey: "brand1",
    descKey: "brand1Desc",
    logo: "/logos/nmkr.svg",
    logoHeight: 22,
  },
  {
    yearKey: "year2",
    brandKey: "brand2",
    descKey: "brand2Desc",
    partnerKey: "brand2Partner",
    logo: "/logos/masumi.svg",
    logoHeight: 26,
  },
  {
    yearKey: "year3",
    brandKey: "brand3",
    descKey: "brand3Desc",
    logo: "/logos/sokosumi.svg",
    logoHeight: 22,
  },
];

export default function WhoWeAre() {
  const t = useTranslations("Pitch.WhoWeAre");

  return (
    <SlideWrapper variant="warm">
      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
      >
        {t("label")}
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-[32px] md:text-[48px] font-bold leading-[1.08] tracking-tight"
      >
        {t("headline")}
      </motion.h2>
      <motion.h3
        variants={itemVariants}
        className="text-[22px] md:text-[34px] font-bold leading-[1.1] text-[#999] mt-1"
      >
        {t("subheadline")}
      </motion.h3>
      <motion.p
        variants={itemVariants}
        className="text-[#555] text-base md:text-lg max-w-[720px] mt-6 mb-14 leading-relaxed"
      >
        {t("description")}
      </motion.p>

      <div className="relative">
        <div
          aria-hidden
          className="hidden md:block absolute top-[32px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-[#1e2a4a]/25 to-transparent"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {MILESTONES.map((m) => (
            <motion.div
              key={m.brandKey}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 w-16 h-16 rounded-full bg-white border-2 border-[#1e2a4a] flex items-center justify-center shadow-[0_4px_16px_rgba(30,42,74,0.08)] relative z-10">
                <span className="font-mono font-bold text-[15px] text-[#1e2a4a] tracking-tight">
                  {t(m.yearKey)}
                </span>
              </div>

              <div className="hover-card w-full bg-white rounded-xl p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#ebe4d8] transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
                <div className="h-8 mb-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.logo}
                    alt={t(m.brandKey)}
                    className="object-contain"
                    style={{ height: `${m.logoHeight}px` }}
                  />
                </div>
                {m.partnerKey && (
                  <p className="text-[11px] font-mono text-[#999] uppercase tracking-[0.12em] mb-3">
                    {t(m.partnerKey)}
                  </p>
                )}
                <p className="text-[#555] text-[15px] leading-relaxed">
                  {t(m.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-12 flex items-start gap-4 md:items-center"
      >
        <div className="shrink-0 h-[2px] w-10 md:w-16 bg-[#1e2a4a] mt-3 md:mt-0" />
        <p className="text-[#333] text-base md:text-lg leading-relaxed">
          <span className="font-bold text-[#111]">{t("today")} → {t("todayBrand")}.</span>{" "}
          <span className="text-[#555]">{t("footnote")}</span>
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
