"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import WorkflowDiagram from "../visuals/WorkflowDiagram";
import { WORKFLOW_STAGES } from "@/lib/pitch-constants";
import { usePrintMode } from "../PrintContext";

type StageNum = 1 | 2 | 3 | 4;

const BORDER = "#ebe4d8";

function StageChips({
  stage,
  accent,
  t,
}: {
  stage: StageNum;
  accent: string;
  t: (k: string) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#ebe4d8] bg-white text-[12px] md:text-[13px] font-medium"
          style={{ color: accent }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          {t(`stage${stage}Chip${n}`)}
        </span>
      ))}
    </div>
  );
}

function StageBadge({
  num,
  active,
  accent,
}: {
  num: number;
  active: boolean;
  accent: string;
}) {
  return (
    <span
      className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full text-[12px] md:text-[13px] font-mono font-bold transition-colors duration-300"
      style={
        active
          ? { background: accent, color: num === 4 ? "#0b1426" : "#fff", boxShadow: `0 0 0 6px ${accent}1A` }
          : { background: "#ffffff", color: "#888", border: `1.5px solid ${BORDER}` }
      }
    >
      {String(num).padStart(2, "0")}
    </span>
  );
}

function ProgressBar({
  activeStage,
  onSelect,
  t,
}: {
  activeStage: StageNum;
  onSelect: (n: StageNum) => void;
  t: (k: string) => string;
}) {
  return (
    <div className="relative mb-7 md:mb-9">
      {/* connector line behind dots */}
      <div className="absolute left-0 right-0 top-[18px] md:top-[20px] h-[2px] bg-[#ebe4d8] -z-0" aria-hidden />
      {/* filled progress line up to active */}
      <div
        className="absolute left-0 top-[18px] md:top-[20px] h-[2px] -z-0 transition-[width,background-color] duration-500"
        style={{
          width: `${((activeStage - 1) / (WORKFLOW_STAGES.length - 1)) * 100}%`,
          background: WORKFLOW_STAGES[activeStage - 1].accent,
        }}
        aria-hidden
      />

      <div className="relative grid grid-cols-4 gap-2">
        {WORKFLOW_STAGES.map((s) => {
          const active = s.num === activeStage;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => onSelect(s.num as StageNum)}
              className="group flex flex-col items-start text-left focus:outline-none"
              aria-current={active}
            >
              <StageBadge num={s.num} active={active} accent={s.accent} />
              <span
                className="mt-3 text-[11px] md:text-[12px] font-mono uppercase tracking-[0.12em] transition-colors duration-300 hidden md:block"
                style={{ color: active ? s.accent : "#888" }}
              >
                {t(`${s.key}Label`)}
              </span>
              <span
                className="mt-2 text-[10px] font-mono uppercase tracking-[0.08em] transition-colors duration-300 md:hidden"
                style={{ color: active ? s.accent : "#888" }}
              >
                {t(`${s.key}Label`).split("·")[0]?.trim() ?? ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StageCardContent({
  stage,
  t,
}: {
  stage: StageNum;
  t: (k: string) => string;
}) {
  const accent = WORKFLOW_STAGES[stage - 1].accent;

  const TextBlock = (
    <div className="flex flex-col">
      <p
        className="text-[11px] md:text-xs font-mono tracking-[0.18em] uppercase mb-3"
        style={{ color: accent }}
      >
        {t(`stage${stage}Label`)}
      </p>
      <h3 className="font-bold text-xl md:text-2xl text-[#111] leading-tight mb-3">
        {t(`stage${stage}Title`)}
      </h3>
      <p className="text-[#555] text-[14px] md:text-[15px] leading-relaxed mb-5">
        {t(`stage${stage}Desc`)}
      </p>
      <StageChips stage={stage} accent={accent} t={t} />
    </div>
  );

  const Diagram = (
    <div className="rounded-xl border border-[#ebe4d8] bg-[#f5f0ea] p-3 overflow-hidden">
      <WorkflowDiagram stage={stage} />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7 items-center">
      <div className="md:col-span-5">{TextBlock}</div>
      <div className="md:col-span-7">{Diagram}</div>
    </div>
  );
}

function PrintStageSlide({
  stage,
  t,
}: {
  stage: StageNum;
  t: (k: string) => string;
}) {
  const accent = WORKFLOW_STAGES[stage - 1].accent;
  return (
    <SlideWrapper variant="warm">
      <div className="flex items-center gap-3 mb-5">
        <p className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase">
          {t("label")}
        </p>
        <span
          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider"
          style={{ background: accent, color: stage === 4 ? "#0b1426" : "#fff" }}
        >
          {String(stage).padStart(2, "0")} / 04
        </span>
      </div>
      <h2 className="text-[26px] md:text-[36px] font-bold leading-[1.15] tracking-tight mb-6">
        {t("headline")}
      </h2>
      <div className="relative bg-white border border-[#ebe4d8] rounded-2xl p-7 md:p-9 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: accent }} />
        <StageCardContent stage={stage} t={t} />
      </div>
      <p className="text-[#666] text-sm mt-5">{t("footnote")}</p>
    </SlideWrapper>
  );
}

export default function Workflow() {
  const t = useTranslations("Pitch.Workflow");
  const isPrint = usePrintMode();
  const [activeStage, setActiveStage] = useState<StageNum>(1);

  // ------- Print mode: each stage on its own page (1 section = 1 page) -------
  if (isPrint) {
    return (
      <>
        {[1, 2, 3, 4].map((n) => (
          <PrintStageSlide key={n} stage={n as StageNum} t={t} />
        ))}
      </>
    );
  }

  const accent = WORKFLOW_STAGES[activeStage - 1].accent;

  // ------- Interactive mode -------
  return (
    <SlideWrapper variant="warm">
      <div className="max-w-[760px] mb-8 md:mb-10">
        <motion.p
          variants={itemVariants}
          className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
        >
          {t("label")}
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-tight mb-4"
        >
          {t("headline")}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-[#555] text-base md:text-lg leading-relaxed max-w-[700px]"
        >
          {t("description")}
        </motion.p>
      </div>

      <motion.div variants={itemVariants}>
        <ProgressBar activeStage={activeStage} onSelect={setActiveStage} t={t} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="relative bg-white border border-[#ebe4d8] rounded-2xl p-7 md:p-10 overflow-hidden"
        style={{ boxShadow: "0 1px 0 rgba(30,42,74,0.04)" }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-[4px]"
          animate={{ backgroundColor: accent }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ background: accent }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <StageCardContent stage={activeStage} t={t} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-[#666] text-sm md:text-base mt-8"
      >
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
