"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const USE_CASES = [
  {
    tag: "Content Creation",
    title: "Material, das schon zum Briefing passt.",
    description:
      "Aus Briefing, Tonality-Guide und bisherigen Kampagnen: Copy-Varianten, Adaptionen für Kanäle, Erstentwürfe für Creatives. Alles im Brand-Kontext — nicht generisch.",
    examples: [
      "Kampagnen-Copy in mehreren Varianten",
      "Kanal-Adaption (Web, Social, Print)",
      "Lokalisierungen DE / FR / IT",
    ],
  },
  {
    tag: "Kampagnen-Analyse",
    title: "Zielgruppen-Reaktion vor dem Launch.",
    description:
      "Synthetische Zielgruppen-Panels bewerten Ihre Kampagne vor dem Launch. Was funktioniert, was bleibt hängen, was geht an der Zielgruppe vorbei — als Entscheidungsgrundlage, nicht als Ersatz für echte Tests.",
    examples: [
      "A/B-Voraussage vor Media-Spend",
      "Wahrnehmung je Persona",
      "Messaging-Stärken & Schwächen",
    ],
  },
  {
    tag: "Kundendialog",
    title: "First Contact mit Gedächtnis.",
    description:
      "Die erste Antwort an Ihre Kund:innen — mit Kontext aus früheren Gesprächen, sauber nach Sales, After Sales oder Allgemein, mit klarer Eskalation an Ihr Team. Auf Mail, Chat, WhatsApp oder Web.",
    examples: [
      "Multi-Channel (Mail, Chat, WhatsApp)",
      "Routing in die Fachteams",
      "Übergabe mit vollem Kontext",
    ],
  },
];

export default function MarketingUseCases() {
  return (
    <SlideWrapper variant="warm">
      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
      >
        Einsatzfelder im Marketing
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-[32px] md:text-[48px] font-bold leading-[1.08] tracking-tight mb-3"
      >
        Drei Felder. Drei Hebel.
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-[#555] text-base md:text-lg mb-10 max-w-[760px] leading-relaxed"
      >
        Hypothetische Einsatzfelder — greifbar, aber zugeschnitten wird erst
        auf Ihren konkreten Use-Case. Das Erstgespräch liefert die Basis für
        das richtige Setup.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8">
        {USE_CASES.map((uc, i) => (
          <motion.div
            key={uc.tag}
            variants={itemVariants}
            className="hover-card bg-white rounded-xl p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#ebe4d8] transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
          >
            <span className="inline-flex items-center justify-center px-3 h-7 rounded-full bg-[#1e2a4a] text-white text-[11px] font-mono uppercase tracking-wider mb-4">
              0{i + 1} · {uc.tag}
            </span>
            <p className="text-[#111] font-bold text-lg md:text-xl mb-3 leading-tight">
              {uc.title}
            </p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-5">
              {uc.description}
            </p>
            <ul className="space-y-2 pt-4 border-t border-[#ebe4d8]">
              {uc.examples.map((ex) => (
                <li
                  key={ex}
                  className="text-[#555] text-[13px] flex items-start gap-2"
                >
                  <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-[#c4a882]" />
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm md:text-base"
      >
        Welches Feld zuerst? Das entscheiden wir mit Ihnen — ausgehend von
        Ihrem konkretesten Pain.
      </motion.p>
    </SlideWrapper>
  );
}
