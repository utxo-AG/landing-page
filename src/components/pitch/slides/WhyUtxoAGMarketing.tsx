"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const SOLUTIONS = [
  {
    title: "Mehr als Chatbots",
    description:
      "Agenten, die handeln — nicht nur antworten. Von Recherche über Analyse bis Auslieferung.",
  },
  {
    title: "Mehr als Textgeneratoren",
    description:
      "Mit Zugriff auf Ihre Systeme, mit Gedächtnis über Zeit, mit definierten Rechten je Rolle.",
  },
  {
    title: "2–4 Wochen bis produktiv",
    description:
      "Direkt in Ihrem echten Prozess. Nicht in einer Demo-Umgebung.",
  },
] as const;

export default function WhyUtxoAGMarketing() {
  return (
    <SlideWrapper variant="glow">
      <motion.p
        variants={itemVariants}
        className="text-[#8899bb] text-sm font-mono tracking-[0.15em] uppercase mb-10"
      >
        Warum utxo AG
      </motion.p>

      <motion.div variants={itemVariants} className="relative mb-6">
        <span
          aria-hidden
          className="absolute -left-2 md:-left-6 -top-6 md:-top-10 text-[96px] md:text-[160px] font-serif text-[#c4a882]/30 leading-none select-none"
        >
          „
        </span>
        <h2 className="relative z-10 text-[36px] md:text-[64px] lg:text-[72px] font-bold leading-[1.05] tracking-tight text-white max-w-[900px]">
          KI im Marketing ist mehr als ein Chatbot.
        </h2>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex items-start gap-4 mb-10 max-w-[720px]"
      >
        <div className="shrink-0 h-[2px] w-10 bg-[#c4a882] mt-3" />
        <p className="text-[#a3b0c9] text-sm md:text-base italic leading-relaxed">
          Unsere Beobachtung aus vier Jahren KI-Arbeit mit Konzernen und
          globalen Partnern.
        </p>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-[#c9d1e0] text-base md:text-lg leading-relaxed max-w-[820px] mb-12"
      >
        Die meisten KI-Angebote für Marketing bleiben an der Oberfläche —
        Texte, Bilder, Zusammenfassungen. Wir bauen Agenten, die als
        Teammitglieder in Ihren Abläufen arbeiten: mit Zugriff auf Ihre
        Systeme, mit Gedächtnis über Zeit, mit klaren Rechten je Rolle.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
        {SOLUTIONS.map((s, i) => (
          <motion.div
            key={s.title}
            variants={itemVariants}
            className="hover-card relative rounded-xl p-6 md:p-7 bg-white/[0.04] border border-white/10 backdrop-blur-sm transition-[transform,background-color,box-shadow] duration-300 hover:bg-white/[0.07] hover:-translate-y-0.5"
          >
            <span className="block text-[11px] font-mono text-[#c4a882] tracking-[0.15em] uppercase mb-3">
              0{i + 1}
            </span>
            <p className="text-white font-bold text-lg md:text-xl mb-2 leading-tight">
              {s.title}
            </p>
            <p className="text-[#a3b0c9] text-sm md:text-[15px] leading-relaxed">
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={itemVariants}
        className="text-white/70 text-sm md:text-base"
      >
        Wie das konkret aussieht — auf den folgenden Folien, mit Beispielen aus
        dem Marketing-Alltag.
      </motion.p>
    </SlideWrapper>
  );
}
