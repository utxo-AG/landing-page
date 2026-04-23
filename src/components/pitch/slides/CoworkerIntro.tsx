"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const PILLARS = [
  { label: "Gedächtnis", desc: "Kontext über Gespräche, Tage und Kanäle hinweg." },
  { label: "Rechte", desc: "Definierter Scope je Rolle — von Kund:in bis Management." },
  { label: "Output", desc: "Eigene Ergebnisse. Liefert Entwürfe, Analysen, Aktionen." },
];

export default function CoworkerIntro() {
  return (
    <SlideWrapper variant="default">
      <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-8 md:gap-12 items-center">
        <div>
          <motion.p
            variants={itemVariants}
            className="text-[#666] text-sm font-mono tracking-[0.2em] uppercase mb-6 md:mb-10"
          >
            Der Coworker-Ansatz
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-[40px] md:text-[56px] lg:text-[68px] font-bold leading-[1.05] tracking-tight"
          >
            Nicht ein Tool mehr.
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-[32px] md:text-[44px] lg:text-[54px] font-bold leading-[1.1] text-[#999] mt-1"
          >
            Ein Kollege mehr.
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="flex items-start gap-4 mt-8 md:mt-10 max-w-[560px]"
          >
            <div className="shrink-0 h-[2px] w-10 md:w-14 bg-[#c4a882] mt-3" />
            <p className="text-[#444] text-base md:text-lg leading-relaxed">
              Autonome KI-Agenten, die als Teammitglieder in Ihren Abläufen
              arbeiten. Keine neue Plattform, keine Dashboard-Schulung.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-[220px] h-[260px] md:w-[300px] md:h-[380px] lg:w-[360px] lg:h-[440px]">
            <Image
              src="/images/pitch/otto-portrait.png"
              alt="Coworker Portrait"
              fill
              className="object-contain object-bottom"
              sizes="360px"
              priority
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16 max-w-[900px]">
        {PILLARS.map((p) => (
          <motion.div
            key={p.label}
            variants={itemVariants}
            className="border-t border-[#1e2a4a]/15 pt-4"
          >
            <p className="text-[#1e2a4a] font-mono text-[11px] tracking-[0.15em] uppercase mb-2">
              {p.label}
            </p>
            <p className="text-[#555] text-[14px] md:text-[15px] leading-relaxed">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SlideWrapper>
  );
}
