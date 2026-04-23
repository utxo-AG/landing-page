"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import StepIllustration from "../visuals/StepIllustration";
import { HOW_TO_STEPS } from "@/lib/pitch-constants";

const COPY: Record<string, { title: string; desc: string }> = {
  step1: {
    title: "Einfach anschreiben",
    desc: "Schreiben Sie in Klartext — per E-Mail, Chat oder über Ihre bestehenden Tools.",
  },
  step2: {
    title: "Ihr Coworker übernimmt",
    desc: "Er liest die Anfrage, zieht Daten aus Ihren Systemen und bereitet das Ergebnis vor.",
  },
  step3: {
    title: "Prüfen & freigeben",
    desc: "Das Ergebnis wird direkt geliefert. Prüfen, anpassen oder mit einem Klick freigeben.",
  },
};

export default function HowToWorkWithCoworker() {
  return (
    <SlideWrapper variant="cool">
      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
      >
        So funktioniert es
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-tight mb-3"
      >
        Drei Schritte. Das war's.
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-[#555] text-base md:text-lg mb-10 max-w-[700px] leading-relaxed"
      >
        Mit Ihrem Coworker zu arbeiten ist so intuitiv wie eine Nachricht an
        einen Kollegen. Keine Schulung, keine neuen Tools.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8">
        {HOW_TO_STEPS.map((step) => (
          <motion.div
            key={step.key}
            variants={itemVariants}
            className="hover-card bg-white shadow-sm rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1e2a4a] text-white text-sm font-bold mb-4">
              {step.num}
            </span>
            <p className="font-bold text-lg md:text-xl mb-2 text-[#111] leading-tight">
              {COPY[step.key].title}
            </p>
            <p className="text-[#555] text-[15px] md:text-base leading-relaxed mb-4">
              {COPY[step.key].desc}
            </p>
            <div className="max-w-[220px]">
              <StepIllustration step={step.num as 1 | 2 | 3} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm md:text-base"
      >
        Kein Dashboard. Kein Login. Funktioniert mit Ihren bestehenden Tools.
      </motion.p>
    </SlideWrapper>
  );
}
