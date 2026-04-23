"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

type Milestone = {
  year: string;
  brand: string;
  description: string;
  partner?: string;
  logo: string;
  logoHeight: number;
};

const MILESTONES: Milestone[] = [
  {
    year: "2021",
    brand: "NMKR",
    description:
      "Blockchain-Infrastruktur. Globale Partner aus Tech, Finance und Konzernen.",
    logo: "/logos/nmkr.svg",
    logoHeight: 22,
  },
  {
    year: "2024",
    brand: "Masumi",
    partner: "mit Serviceplan",
    description:
      "Netzwerk für autonome KI-Agenten. Enterprise-Level, höchste Standards.",
    logo: "/logos/masumi.svg",
    logoHeight: 26,
  },
  {
    year: "2025",
    brand: "Sokosumi",
    description: "Marktplatz für KI-Agenten. Agenten als buchbarer Service.",
    logo: "/logos/sokosumi.svg",
    logoHeight: 22,
  },
];

export default function WhoWeAreMarketing() {
  return (
    <SlideWrapper variant="warm">
      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
      >
        Wer wir sind
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-[32px] md:text-[48px] font-bold leading-[1.08] tracking-tight"
      >
        Vier Jahre digitale Infrastruktur.
      </motion.h2>
      <motion.h3
        variants={itemVariants}
        className="text-[22px] md:text-[34px] font-bold leading-[1.1] text-[#999] mt-1"
      >
        Von Blockchain zu autonomen Agenten.
      </motion.h3>
      <motion.p
        variants={itemVariants}
        className="text-[#555] text-base md:text-lg max-w-[720px] mt-6 mb-14 leading-relaxed"
      >
        Wir sind Technologieentwickler. Seit 2021 bauen wir digitale
        Infrastruktur — mit globalen Partnern und auf Enterprise-Niveau.
      </motion.p>

      <div className="relative">
        <div
          aria-hidden
          className="hidden md:block absolute top-[32px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-[#1e2a4a]/25 to-transparent"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {MILESTONES.map((m) => (
            <motion.div
              key={m.brand}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 w-16 h-16 rounded-full bg-white border-2 border-[#1e2a4a] flex items-center justify-center shadow-[0_4px_16px_rgba(30,42,74,0.08)] relative z-10">
                <span className="font-mono font-bold text-[15px] text-[#1e2a4a] tracking-tight">
                  {m.year}
                </span>
              </div>

              <div className="hover-card w-full bg-white rounded-xl p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#ebe4d8] transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
                <div className="h-8 mb-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.logo}
                    alt={m.brand}
                    className="object-contain"
                    style={{ height: `${m.logoHeight}px` }}
                  />
                </div>
                {m.partner && (
                  <p className="text-[11px] font-mono text-[#999] uppercase tracking-[0.12em] mb-3">
                    {m.partner}
                  </p>
                )}
                <p className="text-[#555] text-[15px] leading-relaxed">
                  {m.description}
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
          <span className="font-bold text-[#111]">Heute → utxo AG.</span>{" "}
          <span className="text-[#555]">
            Wir bringen diese Erfahrung in konkrete Agenten, die Teams im Alltag
            entlasten.
          </span>
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
