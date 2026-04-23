"use client";

import { motion } from "framer-motion";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

const LAYERS = [
  {
    number: "01",
    audience: "Kund:innen",
    title: "Customer-facing",
    role: "Erste Anlaufstelle, Routing, klare Eskalation.",
    scope: "Lese-Zugriff auf öffentliche Inhalte. Keine internen Daten.",
  },
  {
    number: "02",
    audience: "Mitarbeitende",
    title: "Employee-facing",
    role: "Aktiver Kollege — recherchiert, liefert Entwürfe und Dossiers.",
    scope: "Zugriff auf team-relevante Systeme. Aktionen mit Freigabe.",
  },
  {
    number: "03",
    audience: "Controlling & Management",
    title: "Autonomer Mitarbeiter",
    role: "Beobachtet Kennzahlen, erstellt Reports, hebt Auffälligkeiten eigenständig hervor.",
    scope: "Erweiterter Lese-Zugriff. Reporting-Rechte. Eigenständige Analyse.",
  },
];

export default function OttoAsCoworker() {
  return (
    <SlideWrapper variant="rose">
      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
      >
        Der Coworker im Unternehmen
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-[32px] md:text-[48px] font-bold leading-[1.08] tracking-tight mb-3"
      >
        Ein Agent. Drei Rollen.
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-[#555] text-base md:text-lg mb-10 max-w-[760px] leading-relaxed"
      >
        Ein Coworker ist nicht nur ein Kunden-Chatbot. Je nach Rechtescope
        wird er zum Team-Kollegen oder zum autonomen Mitarbeiter — mit
        Gedächtnis über Zeit und klaren Grenzen je Rolle.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10">
        {LAYERS.map((l) => (
          <motion.div
            key={l.number}
            variants={itemVariants}
            className="hover-card bg-white rounded-xl p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#ebe4d8] transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
          >
            <span className="block text-[11px] font-mono text-[#c4a882] tracking-[0.15em] uppercase mb-3">
              Layer {l.number}
            </span>
            <p className="text-[#111] font-bold text-lg md:text-xl mb-1 leading-tight">
              {l.title}
            </p>
            <p className="text-[#999] text-[13px] font-mono uppercase tracking-wider mb-4">
              {l.audience}
            </p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-4">
              {l.role}
            </p>
            <div className="pt-4 border-t border-[#ebe4d8]">
              <p className="text-[11px] font-mono text-[#c4a882] uppercase tracking-[0.12em] mb-1">
                Permission Scope
              </p>
              <p className="text-[#555] text-[13px] leading-relaxed">
                {l.scope}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="flex items-start gap-4 md:items-center"
      >
        <div className="shrink-0 h-[2px] w-10 md:w-16 bg-[#1e2a4a] mt-3 md:mt-0" />
        <p className="text-[#333] text-base md:text-lg leading-relaxed">
          <span className="font-bold text-[#111]">
            Persistent Memory über alle Rollen.
          </span>{" "}
          <span className="text-[#555]">
            Ihr Coworker erinnert sich an Kampagnen, Kund:innen und Kontext —
            über Gespräche, Tage und Kanäle hinweg.
          </span>
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
