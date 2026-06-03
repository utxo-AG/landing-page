"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { DELIVERABLE_FORMATS } from "@/lib/pitch-constants";
import { usePrintMode } from "../PrintContext";

const NEUTRAL_BG = "#fafafa";
const NEUTRAL_LINE = "#e5e7eb";
const NEUTRAL_LINE_SOFT = "#f3f4f6";

const mockups: Record<string, (color: string) => React.ReactNode> = {
  email: (color) => (
    <svg viewBox="0 0 150 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="150" height="100" fill="white" />
      <rect x="8" y="8" width="60" height="4" rx="1" fill="#9ca3af" />
      <rect x="8" y="16" width="40" height="3" rx="1" fill={NEUTRAL_LINE} />
      <rect x="118" y="8" width="24" height="10" rx="2" fill={color} opacity="0.18" />
      <text x="130" y="15.5" textAnchor="middle" fontSize="6" fontWeight="700" fill={color} fontFamily="ui-monospace, monospace">Re:</text>
      <line x1="8" y1="26" x2="142" y2="26" stroke={NEUTRAL_LINE} strokeWidth="0.6" />
      <rect x="8" y="34" width="90" height="5" rx="1" fill="#111" />
      <rect x="8" y="48" width="120" height="3" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="56" width="110" height="3" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="64" width="118" height="3" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="72" width="70" height="3" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="86" width="30" height="6" rx="1.5" fill={color} />
    </svg>
  ),
  excel: (color) => (
    <svg viewBox="0 0 150 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="150" height="100" fill="white" />
      {/* Header row */}
      <rect x="6" y="8" width="138" height="14" fill={color} opacity="0.85" />
      {[6, 33.6, 61.2, 88.8, 116.4].map((x, i) => (
        <rect key={`h-${i}`} x={x + 2} y="13" width="22" height="4" rx="1" fill="white" opacity="0.9" />
      ))}
      {/* Body rows */}
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r}>
          <rect
            x="6"
            y={22 + r * 14}
            width="138"
            height="14"
            fill={r % 2 === 0 ? "white" : NEUTRAL_LINE_SOFT}
            stroke={NEUTRAL_LINE}
            strokeWidth="0.4"
          />
          {[0, 1, 2, 3, 4].map((c) => (
            <rect
              key={c}
              x={8 + c * 27.6}
              y={27 + r * 14}
              width={c === 3 && r === 2 ? 22 : 18}
              height="3"
              rx="1"
              fill={c === 3 && r === 2 ? color : c === 0 ? "#374151" : "#9ca3af"}
              opacity={c === 3 && r === 2 ? 1 : 0.7}
            />
          ))}
        </g>
      ))}
      {/* Column dividers */}
      {[33.6, 61.2, 88.8, 116.4].map((x, i) => (
        <line key={`v-${i}`} x1={x} y1="8" x2={x} y2="92" stroke={NEUTRAL_LINE} strokeWidth="0.4" />
      ))}
    </svg>
  ),
  pdf: (color) => (
    <svg viewBox="0 0 150 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="150" height="100" fill={NEUTRAL_BG} />
      {/* Page with folded corner */}
      <path
        d="M 30 8 L 110 8 L 122 20 L 122 92 L 30 92 Z"
        fill="white"
        stroke={NEUTRAL_LINE}
        strokeWidth="0.8"
      />
      <path d="M 110 8 L 110 20 L 122 20 Z" fill={NEUTRAL_LINE_SOFT} stroke={NEUTRAL_LINE} strokeWidth="0.8" />
      {/* Title */}
      <rect x="38" y="20" width="50" height="5" rx="1" fill={color} />
      <rect x="38" y="29" width="38" height="3" rx="1" fill={NEUTRAL_LINE} />
      {/* Body bars */}
      <rect x="38" y="42" width="76" height="3" rx="1" fill={NEUTRAL_LINE} />
      <rect x="38" y="50" width="70" height="3" rx="1" fill={NEUTRAL_LINE} />
      <rect x="38" y="58" width="76" height="3" rx="1" fill={NEUTRAL_LINE} />
      <rect x="38" y="66" width="54" height="3" rx="1" fill={NEUTRAL_LINE} />
      {/* Footer page number */}
      <line x1="38" y1="80" x2="114" y2="80" stroke={NEUTRAL_LINE} strokeWidth="0.5" />
      <text x="114" y="88" textAnchor="end" fontSize="5" fill="#9ca3af" fontFamily="ui-monospace, monospace">1 / 12</text>
    </svg>
  ),
  proposal: (color) => (
    <svg viewBox="0 0 150 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="150" height="100" fill="white" stroke={NEUTRAL_LINE} strokeWidth="0.6" />
      {/* Letterhead */}
      <rect x="0" y="0" width="150" height="14" fill={color} />
      <rect x="8" y="5" width="32" height="4" rx="1" fill="white" opacity="0.95" />
      <rect x="120" y="5" width="22" height="4" rx="1" fill="white" opacity="0.6" />
      {/* Body */}
      <rect x="8" y="22" width="70" height="4" rx="1" fill="#111" />
      <rect x="8" y="32" width="100" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="38" width="92" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="44" width="96" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="50" width="80" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="60" width="60" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="66" width="68" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      {/* Price box */}
      <rect x="88" y="62" width="54" height="30" rx="2" fill="white" stroke={color} strokeWidth="1.2" />
      <text x="115" y="73" textAnchor="middle" fontSize="4.5" fill="#9ca3af" fontFamily="ui-monospace, monospace">TOTAL</text>
      <text x="115" y="86" textAnchor="middle" fontSize="8" fontWeight="800" fill={color} fontFamily="ui-monospace, monospace">CHF 24.8k</text>
    </svg>
  ),
  monitoring: (color) => (
    <svg viewBox="0 0 150 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="150" height="100" fill="white" />
      {/* LIVE pill */}
      <rect x="8" y="8" width="24" height="9" rx="4.5" fill={color} />
      <circle cx="13" cy="12.5" r="1.4" fill="white" />
      <text x="17" y="14.5" fontSize="5.5" fontWeight="700" fill="white" fontFamily="ui-monospace, monospace">LIVE</text>
      <rect x="36" y="9" width="50" height="3" rx="1" fill="#9ca3af" />
      <rect x="36" y="14" width="34" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      {/* Stat tiles */}
      <rect x="8" y="24" width="40" height="22" rx="2" fill={NEUTRAL_LINE_SOFT} />
      <text x="12" y="34" fontSize="4.5" fill="#9ca3af" fontFamily="ui-monospace, monospace">ON</text>
      <text x="12" y="43" fontSize="9" fontWeight="800" fill={color}>3</text>
      <rect x="55" y="24" width="40" height="22" rx="2" fill={NEUTRAL_LINE_SOFT} />
      <text x="59" y="34" fontSize="4.5" fill="#9ca3af" fontFamily="ui-monospace, monospace">DELAY</text>
      <text x="59" y="43" fontSize="9" fontWeight="800" fill="#f59e0b">1</text>
      <rect x="102" y="24" width="40" height="22" rx="2" fill={NEUTRAL_LINE_SOFT} />
      <text x="106" y="34" fontSize="4.5" fill="#9ca3af" fontFamily="ui-monospace, monospace">DONE</text>
      <text x="106" y="43" fontSize="9" fontWeight="800" fill="#374151">12</text>
      {/* Chart area */}
      <rect x="8" y="52" width="134" height="40" rx="2" fill={NEUTRAL_LINE_SOFT} />
      <polyline
        points="14,82 30,74 46,76 62,66 78,68 94,58 110,60 126,50 138,46"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="14,82 30,74 46,76 62,66 78,68 94,58 110,60 126,50 138,46 138,88 14,88"
        fill={color}
        opacity="0.12"
      />
    </svg>
  ),
  escalation: (color) => (
    <svg viewBox="0 0 150 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="150" height="100" fill={NEUTRAL_BG} />
      {/* Alert card */}
      <rect x="6" y="8" width="138" height="84" rx="3" fill="white" stroke={NEUTRAL_LINE} strokeWidth="0.6" />
      {/* Warning bar */}
      <rect x="6" y="8" width="138" height="16" rx="3" fill={color} />
      <rect x="6" y="20" width="138" height="4" fill={color} />
      {/* Exclamation icon */}
      <circle cx="16" cy="16" r="5" fill="white" />
      <rect x="15.2" y="13" width="1.6" height="4" rx="0.8" fill={color} />
      <circle cx="16" cy="19" r="0.8" fill={color} />
      <rect x="26" y="13" width="60" height="3.5" rx="1" fill="white" />
      <rect x="26" y="18.5" width="40" height="2.5" rx="1" fill="white" opacity="0.65" />
      {/* Status badge */}
      <rect x="108" y="12" width="30" height="9" rx="2" fill="white" />
      <text x="123" y="18.5" textAnchor="middle" fontSize="5.5" fontWeight="800" fill={color} fontFamily="ui-monospace, monospace">OPEN</text>
      {/* Body */}
      <rect x="14" y="34" width="80" height="4" rx="1" fill="#111" />
      <rect x="14" y="46" width="120" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="14" y="52" width="112" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="14" y="58" width="100" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      {/* Action button */}
      <rect x="14" y="72" width="44" height="12" rx="2" fill={color} />
      <rect x="22" y="76.5" width="28" height="3" rx="1" fill="white" />
    </svg>
  ),
  landing: (color) => (
    <svg viewBox="0 0 150 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="150" height="100" fill={NEUTRAL_BG} />
      {/* Browser window */}
      <rect x="4" y="6" width="142" height="88" rx="3" fill="white" stroke={NEUTRAL_LINE} strokeWidth="0.6" />
      {/* Browser chrome */}
      <rect x="4" y="6" width="142" height="12" rx="3" fill={NEUTRAL_LINE_SOFT} />
      <rect x="4" y="14" width="142" height="4" fill={NEUTRAL_LINE_SOFT} />
      <circle cx="10" cy="12" r="1.3" fill="#ef4444" />
      <circle cx="14.5" cy="12" r="1.3" fill="#f59e0b" />
      <circle cx="19" cy="12" r="1.3" fill="#10b981" />
      <rect x="26" y="9" width="100" height="6" rx="3" fill="white" stroke={NEUTRAL_LINE} strokeWidth="0.4" />
      <rect x="30" y="11" width="46" height="2" rx="1" fill="#9ca3af" />
      {/* Hero */}
      <rect x="12" y="26" width="80" height="6" rx="1" fill="#111" />
      <rect x="12" y="36" width="60" height="4" rx="1" fill="#111" opacity="0.7" />
      <rect x="12" y="46" width="100" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="12" y="52" width="92" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      {/* Buttons */}
      <rect x="12" y="62" width="32" height="10" rx="2" fill={color} />
      <rect x="48" y="62" width="32" height="10" rx="2" fill="white" stroke={color} strokeWidth="0.8" />
      {/* Content blocks */}
      <rect x="12" y="80" width="38" height="10" rx="2" fill={NEUTRAL_LINE_SOFT} />
      <rect x="54" y="80" width="38" height="10" rx="2" fill={NEUTRAL_LINE_SOFT} />
      <rect x="96" y="80" width="38" height="10" rx="2" fill={NEUTRAL_LINE_SOFT} />
    </svg>
  ),
  marketing: (color) => (
    <svg viewBox="0 0 150 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="150" height="100" fill="white" stroke={NEUTRAL_LINE} strokeWidth="0.6" />
      {/* Header image */}
      <rect x="0" y="0" width="150" height="38" fill={color} opacity="0.18" />
      <rect x="0" y="0" width="150" height="38" fill={`url(#mkt-grad)`} />
      <defs>
        <linearGradient id="mkt-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {/* Decorative shapes in header */}
      <circle cx="120" cy="14" r="10" fill={color} opacity="0.25" />
      <circle cx="135" cy="28" r="6" fill={color} opacity="0.18" />
      {/* Logo / brand line */}
      <rect x="8" y="8" width="28" height="4" rx="1" fill={color} />
      {/* Title */}
      <rect x="8" y="46" width="84" height="5" rx="1" fill="#111" />
      <rect x="8" y="56" width="60" height="3" rx="1" fill={NEUTRAL_LINE} />
      {/* Body bars */}
      <rect x="8" y="66" width="120" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="8" y="72" width="110" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      {/* CTA */}
      <rect x="8" y="82" width="38" height="10" rx="5" fill={color} />
      <text x="27" y="89" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="white" fontFamily="ui-monospace, monospace">ABO</text>
      <rect x="52" y="84" width="40" height="2.5" rx="1" fill={NEUTRAL_LINE} />
      <rect x="52" y="89" width="32" height="2.5" rx="1" fill={NEUTRAL_LINE} />
    </svg>
  ),
};

type Item = (typeof DELIVERABLE_FORMATS)[number];

function Mockup({ item, compact = false }: { item: Item; compact?: boolean }) {
  return (
    <div
      className="w-full rounded-md border overflow-hidden mx-auto"
      style={{
        background: NEUTRAL_BG,
        borderColor: NEUTRAL_LINE,
        aspectRatio: "150 / 100",
        maxWidth: compact ? 150 : undefined,
      }}
    >
      {mockups[item.icon](item.color)}
    </div>
  );
}

function CardBody({ item, t, compact = false }: { item: Item; t: (k: string) => string; compact?: boolean }) {
  const color = item.color;
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[4px] rounded-t-2xl" style={{ background: color }} />
      <div className={compact ? "mt-3 mb-2" : "mt-5 mb-3"}>
        <Mockup item={item} compact={compact} />
      </div>
      <p className="font-bold text-[14px] md:text-[15px] text-[#111] leading-tight mb-1.5">
        {t(`${item.key}Name`)}
      </p>
      <p className="text-[#888] text-[11px] font-mono leading-relaxed break-words">
        {t(`${item.key}Example`)}
      </p>
    </>
  );
}

const CARD_W = 200;
const CARD_H = 280;
const FAN_HEIGHT = 320;

function FanCard({
  item,
  index,
  total,
  isFanHovered,
  t,
}: {
  item: Item;
  index: number;
  total: number;
  isFanHovered: boolean;
  t: (k: string) => string;
}) {
  const baseRotation = -30 + (60 / (total - 1)) * index;
  const baseOffset = (index - (total - 1) / 2) * 44;
  const spreadRotation = baseRotation * 0.5;
  const spreadOffset = (index - (total - 1) / 2) * 78;

  return (
    <motion.div
      className="absolute"
      style={{
        left: "50%",
        bottom: 0,
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2,
        transformOrigin: "bottom center",
        zIndex: index,
      }}
      initial={false}
      animate={{
        x: isFanHovered ? spreadOffset : baseOffset,
        rotate: isFanHovered ? spreadRotation : baseRotation,
      }}
      whileHover={{
        y: -40,
        rotate: 0,
        scale: 1.05,
        zIndex: 50,
        transition: { type: "spring", stiffness: 260, damping: 22 },
      }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      <div
        className="relative w-full h-full bg-white border border-[#ebe4d8] rounded-2xl px-4 pt-0 pb-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden cursor-default hover:shadow-[0_18px_44px_rgba(0,0,0,0.18)] transition-shadow duration-300"
      >
        <CardBody item={item} t={t} />
      </div>
    </motion.div>
  );
}

export default function Deliverables() {
  const t = useTranslations("Pitch.Deliverables");
  const isPrint = usePrintMode();
  const [isFanHovered, setIsFanHovered] = useState(false);

  const total = DELIVERABLE_FORMATS.length;

  return (
    <SlideWrapper variant="rose">
      <div className={`max-w-[760px] ${isPrint ? "mb-6" : "mb-10 md:mb-14"}`}>
        <motion.p variants={itemVariants} className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">
          {t("label")}
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-tight mb-4">
          {t("headline")}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#555] text-base md:text-lg leading-relaxed">
          {t("description")}
        </motion.p>
      </div>

      {isPrint ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {DELIVERABLE_FORMATS.map((item) => (
            <div
              key={item.key}
              className="relative bg-white border border-[#ebe4d8] rounded-2xl p-4 pt-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              <CardBody item={item} t={t} compact />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Mobile: flat 2-column grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-8 md:hidden">
            {DELIVERABLE_FORMATS.map((item) => (
              <div
                key={item.key}
                className="relative bg-white border border-[#ebe4d8] rounded-2xl px-4 pt-5 pb-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: item.color }} />
                <div className="mt-3 mb-3">
                  <Mockup item={item} />
                </div>
                <p className="font-bold text-[14px] text-[#111] leading-tight mb-1.5">
                  {t(`${item.key}Name`)}
                </p>
                <p className="text-[#888] text-[11px] font-mono leading-relaxed break-words">
                  {t(`${item.key}Example`)}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Desktop: fan layout with motion-driven hover */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex justify-center items-end mb-12"
            style={{ minHeight: FAN_HEIGHT }}
          >
            <div
              className="relative w-full"
              style={{ height: FAN_HEIGHT }}
              onMouseEnter={() => setIsFanHovered(true)}
              onMouseLeave={() => setIsFanHovered(false)}
            >
              {DELIVERABLE_FORMATS.map((item, i) => (
                <FanCard
                  key={item.key}
                  item={item}
                  index={i}
                  total={total}
                  isFanHovered={isFanHovered}
                  t={t}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}

      <motion.div variants={itemVariants} className="flex items-start gap-4">
        <div className="shrink-0 h-[2px] w-10 md:w-14 bg-[#1e2a4a] mt-3" />
        <p className="text-[#333] text-base md:text-lg leading-relaxed">
          <span className="font-bold text-[#111]">{t("footnoteLead")}</span>{" "}
          <span className="text-[#555]">{t("footnote")}</span>
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
