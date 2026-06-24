"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { JOURNEY_STAGES } from "@/lib/pitch-constants";
import { usePrintMode } from "../PrintContext";

type StageNum = 1 | 2 | 3 | 4 | 5 | 6;

const BORDER = "#ebe4d8";

// Position of each milestone within the 30-day window (drives the ring fill).
const DAY_PROGRESS: Record<StageNum, number> = {
  1: 0,
  2: 0,
  3: 0.13,
  4: 0.5,
  5: 0.83,
  6: 1,
};

function DayRing({
  stage,
  accent,
  t,
}: {
  stage: StageNum;
  accent: string;
  t: (k: string) => string;
}) {
  const progress = DAY_PROGRESS[stage];
  const r = 54;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 140 140" className="w-[150px] h-[150px] md:w-[180px] md:h-[180px]">
        <circle cx="70" cy="70" r={r} fill="none" stroke={BORDER} strokeWidth="6" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.4s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[18px] md:text-[22px] font-bold leading-tight" style={{ color: accent }}>
          {t(`stage${stage}Day`)}
        </span>
        <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.12em] text-[#888] mt-1">
          {t("ringCaption")}
        </span>
      </div>
    </div>
  );
}

function DetailCardContent({
  stage,
  t,
}: {
  stage: StageNum;
  t: (k: string) => string;
}) {
  const accent = JOURNEY_STAGES[stage - 1].accent;
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      <div className="md:col-span-7 flex flex-col">
        <span
          className="inline-flex w-fit items-center gap-2 text-[11px] md:text-xs font-mono tracking-[0.16em] uppercase mb-4 px-3 py-1 rounded-full border"
          style={{ color: accent, borderColor: `${accent}33`, background: `${accent}0D` }}
        >
          {JOURNEY_STAGES[stage - 1].now && (
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          )}
          {t(`stage${stage}Meta`)}
        </span>
        <h3 className="font-bold text-xl md:text-3xl text-[#111] leading-tight mb-4">
          {t(`stage${stage}Title`)}
        </h3>
        <p className="text-[#555] text-[14px] md:text-[16px] leading-relaxed">
          {t(`stage${stage}Desc`)}
        </p>
      </div>
      <div className="md:col-span-5 flex justify-center md:justify-end">
        <DayRing stage={stage} accent={accent} t={t} />
      </div>
    </div>
  );
}

function TimelineNav({
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
      {/* base connector */}
      <div className="absolute left-0 right-0 top-[10px] md:top-[12px] h-[2px] bg-[#ebe4d8] -z-0" aria-hidden />
      {/* filled progress up to active node */}
      <div
        className="absolute left-0 top-[10px] md:top-[12px] h-[2px] -z-0 transition-[width,background-color] duration-500"
        style={{
          width: `${((activeStage - 1) / (JOURNEY_STAGES.length - 1)) * 100}%`,
          background: JOURNEY_STAGES[activeStage - 1].accent,
        }}
        aria-hidden
      />
      <div className="relative grid grid-cols-6 gap-1 md:gap-2">
        {JOURNEY_STAGES.map((s) => {
          const active = s.num === activeStage;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => onSelect(s.num as StageNum)}
              className="group flex flex-col items-center text-center focus:outline-none"
              aria-current={active}
            >
              <span className="relative flex items-center justify-center w-[22px] h-[22px] md:w-[26px] md:h-[26px]">
                {s.now && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: s.accent }}
                    animate={{ scale: [1, 1.9, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <span
                  className="relative w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300"
                  style={
                    active
                      ? { background: s.accent, boxShadow: `0 0 0 5px ${s.accent}1F` }
                      : { background: "#fff", border: `2px solid ${BORDER}` }
                  }
                />
              </span>
              <span
                className="mt-3 text-[10px] md:text-[12px] font-mono uppercase tracking-[0.06em] md:tracking-[0.1em] transition-colors duration-300 leading-tight"
                style={{ color: active ? s.accent : "#888" }}
              >
                {t(`stage${s.num}Day`)}
              </span>
              <span
                className="mt-1 text-[10px] md:text-[12px] font-medium transition-colors duration-300 leading-tight hidden md:block"
                style={{ color: active ? "#111" : "#aaa" }}
              >
                {t(`stage${s.num}Short`)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function InvestGetStrip({ t }: { t: (k: string) => string }) {
  const items = [
    { title: t("investTitle"), desc: t("investDesc") },
    { title: t("getTitle"), desc: t("getDesc"), accent: true },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className={`rounded-xl border p-5 md:p-6 ${
            item.accent ? "bg-[#111] text-white border-[#111]" : "bg-white border-[#ebe4d8]"
          }`}
        >
          <p
            className={`text-[11px] font-mono tracking-[0.15em] uppercase mb-2 ${
              item.accent ? "text-white/60" : "text-[#888]"
            }`}
          >
            {item.title}
          </p>
          <p className={`text-[13px] md:text-sm leading-relaxed ${item.accent ? "text-white/85" : "text-[#555]"}`}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

function MilestoneRow({
  stage,
  t,
}: {
  stage: StageNum;
  t: (k: string) => string;
}) {
  const accent = JOURNEY_STAGES[stage - 1].accent;
  return (
    <div className="relative flex gap-5 rounded-xl border border-[#ebe4d8] bg-white p-5 md:p-6 overflow-hidden">
      <div className="absolute top-0 left-0 bottom-0 w-[4px]" style={{ background: accent }} />
      <div className="flex flex-col items-start pl-2 min-w-[88px]">
        <span className="text-[13px] md:text-[15px] font-bold leading-tight" style={{ color: accent }}>
          {t(`stage${stage}Day`)}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#999] mt-1">
          {t(`stage${stage}Meta`)}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-[15px] md:text-[17px] text-[#111] leading-tight mb-1.5">
          {t(`stage${stage}Title`)}
        </h3>
        <p className="text-[#555] text-[12.5px] md:text-[13.5px] leading-relaxed">
          {t(`stage${stage}Desc`)}
        </p>
      </div>
    </div>
  );
}

function PrintJourneyPage({
  stages,
  t,
  showHeader,
  showStrip,
}: {
  stages: StageNum[];
  t: (k: string) => string;
  showHeader: boolean;
  showStrip: boolean;
}) {
  return (
    <SlideWrapper variant="warm">
      {showHeader ? (
        <div className="max-w-[820px] mb-8">
          <p className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4">{t("label")}</p>
          <h2 className="text-[26px] md:text-[40px] font-bold leading-[1.12] tracking-tight mb-3">
            {t("headline")}
          </h2>
          <p className="text-[#555] text-base leading-relaxed">{t("description")}</p>
        </div>
      ) : (
        <p className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-6">
          {t("label")} · {t("continued")}
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {stages.map((n) => (
          <MilestoneRow key={n} stage={n} t={t} />
        ))}
      </div>
      {showStrip && (
        <div className="mt-5">
          <InvestGetStrip t={t} />
        </div>
      )}
    </SlideWrapper>
  );
}

export default function CustomerJourney() {
  const t = useTranslations("Pitch.CustomerJourney");
  const isPrint = usePrintMode();
  const [activeStage, setActiveStage] = useState<StageNum>(1);

  // ---- Print mode: split across 2 pages so nothing is cut off ----
  if (isPrint) {
    return (
      <>
        <PrintJourneyPage stages={[1, 2, 3]} t={t} showHeader showStrip={false} />
        <PrintJourneyPage stages={[4, 5, 6]} t={t} showHeader={false} showStrip />
      </>
    );
  }

  const accent = JOURNEY_STAGES[activeStage - 1].accent;

  // ---- Interactive mode ----
  return (
    <SlideWrapper variant="warm">
      <div className="max-w-[820px] mb-8 md:mb-10">
        <motion.p
          variants={itemVariants}
          className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4"
        >
          {t("label")}
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-[30px] md:text-[48px] font-bold leading-[1.08] tracking-tight mb-4"
        >
          {t("headline")}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-[#555] text-base md:text-lg leading-relaxed max-w-[720px]"
        >
          {t("description")}
        </motion.p>
      </div>

      <motion.div variants={itemVariants}>
        <TimelineNav activeStage={activeStage} onSelect={setActiveStage} t={t} />
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
            <DetailCardContent stage={activeStage} t={t} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 md:mt-7">
        <InvestGetStrip t={t} />
      </motion.div>
    </SlideWrapper>
  );
}
