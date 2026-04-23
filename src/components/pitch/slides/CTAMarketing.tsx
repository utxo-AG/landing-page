"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const INPUTS = [
  {
    num: "01",
    title: "Wo drückt der Schuh?",
    desc: "Ihre grössten Engpässe im Marketing-Alltag — je konkreter, desto besser. Kampagnen-Flut, Händler-Koordination, Creative-Bottlenecks, Reporting-Lücken.",
    highlighted: false,
  },
  {
    num: "02",
    title: "Was hat nicht funktioniert?",
    desc: "Welche Tools, Plattformen oder externen Partner haben Sie probiert — und wo blieben die Ergebnisse hinter den Erwartungen?",
    highlighted: false,
  },
  {
    num: "03",
    title: "Challengen Sie uns.",
    desc: "Bringen Sie Ihren härtesten Use-Case. Wir sagen ehrlich, was ein Coworker daraus machen kann — und was nicht.",
    highlighted: true,
  },
];

export default function CTAMarketing() {
  return (
    <SlideWrapper variant="warm">
      <motion.p
        variants={itemVariants}
        className="text-[#4a5578] text-xs font-mono tracking-[0.15em] uppercase mb-4"
      >
        Ihre Runde
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-4 text-[#111]"
      >
        Jetzt sind Sie dran.
        <br />
        <span className="text-[#111]/50">Challengen Sie uns.</span>
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-[#555] text-base md:text-lg mb-10 max-w-[720px] leading-relaxed"
      >
        Wir haben gezeigt, wie wir denken. Jetzt brauchen wir Sie — denn das
        beste Deck ersetzt nicht Ihren konkreten Fall. Je härter Ihr Input,
        desto schärfer das Ergebnis.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {INPUTS.map((item) => (
          <motion.div
            key={item.num}
            variants={itemVariants}
            className={`hover-card rounded-lg p-8 md:p-10 transition-all duration-300 ${
              item.highlighted
                ? "bg-[#1e2a4a] text-white border-2 border-[#1e2a4a] shadow-[0_8px_40px_rgba(30,42,74,0.2)] hover:shadow-[0_12px_50px_rgba(30,42,74,0.3)]"
                : "bg-white text-[#111] border border-[#e0dbd4] hover:shadow-[0_8px_30px_rgba(30,42,74,0.08)]"
            }`}
          >
            <p
              className={`text-xs font-mono tracking-[0.15em] mb-4 ${
                item.highlighted ? "text-white/60" : "text-[#4a5578]"
              }`}
            >
              {item.num}
            </p>
            <p className="font-bold text-lg mb-3">{item.title}</p>
            <p
              className={`text-sm leading-relaxed ${
                item.highlighted ? "text-white/70" : "text-[#555]"
              }`}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={itemVariants}
        className="text-[#999] text-xs font-mono"
      >
        Dammstrasse 16 · 6300 Zug · business@utxoag.com
      </motion.p>
    </SlideWrapper>
  );
}
