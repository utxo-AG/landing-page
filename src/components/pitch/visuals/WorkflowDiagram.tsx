"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePrintMode } from "../PrintContext";

const NAVY = "#1e2a4a";
const NAVY_DIM = "#4a5578";
const GOLD = "#c4a882";
const GREEN = "#10b981";
const CREAM = "#f5f0ea";
const BORDER = "#ebe4d8";
const TEXT_DARK = "#111";
const TEXT_MUTED = "#666";
const TEXT_SOFT = "#9ca3af";

type StageNum = 1 | 2 | 3 | 4;

const FONT_SANS = "var(--font-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

// ------- shared sub-components -------------------------------------------

function ChannelIcon({ kind, color }: { kind: "email" | "chat" | "file" | "image"; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (kind === "email") {
    return (
      <g {...common}>
        <rect x="-9" y="-6" width="18" height="12" rx="1.5" />
        <path d="M-9 -5 L0 2 L9 -5" />
      </g>
    );
  }
  if (kind === "chat") {
    return (
      <g {...common}>
        <path d="M-9 -5 H7 a2 2 0 0 1 2 2 V3 a2 2 0 0 1 -2 2 H-3 L-7 8 V5 H-7 a2 2 0 0 1 -2 -2 V-3 a2 2 0 0 1 2 -2 Z" />
      </g>
    );
  }
  if (kind === "file") {
    return (
      <g {...common}>
        <path d="M-7 -7 H3 L8 -2 V8 H-7 Z" />
        <path d="M3 -7 V-2 H8" />
        <line x1="-4" y1="2" x2="5" y2="2" />
        <line x1="-4" y1="5" x2="3" y2="5" />
      </g>
    );
  }
  // image
  return (
    <g {...common}>
      <rect x="-9" y="-7" width="18" height="14" rx="1.5" />
      <circle cx="-3" cy="-2" r="1.8" />
      <path d="M-9 6 L-2 -1 L4 4 L9 -1 V7" />
    </g>
  );
}

// Subtle traveling dot along a straight line from (x1,y1) -> (x2,y2)
function TravelDot({
  x1,
  y1,
  x2,
  y2,
  color,
  delay = 0,
  duration = 2.6,
  size = 2.4,
  paused = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  delay?: number;
  duration?: number;
  size?: number;
  paused?: boolean;
}) {
  if (paused) {
    return <circle cx={x1} cy={y1} r={size} fill={color} opacity={0} />;
  }
  return (
    <motion.circle
      r={size}
      fill={color}
      initial={{ cx: x1, cy: y1, opacity: 0 }}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 0.2,
        times: [0, 0.15, 0.85, 1],
        ease: "linear",
      }}
    />
  );
}

// Animated path that draws itself in on mount, then stays drawn
function DrawnPath({
  d,
  color,
  dashed = false,
  strokeWidth = 1.4,
  delay = 0,
  duration = 0.9,
}: {
  d: string;
  color: string;
  dashed?: boolean;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dashed ? "4 4" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ pathLength: { duration, delay, ease: [0.25, 0.1, 0.25, 1] }, opacity: { duration: 0.2, delay } }}
    />
  );
}

function StageCard({
  x,
  y,
  w,
  h,
  delay = 0,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#ffffff" stroke={BORDER} strokeWidth={1} />
      {children}
    </motion.g>
  );
}

// ------- Stage 1: Input ---------------------------------------------------

function Stage1({ t, paused }: { t: (k: string) => string; paused: boolean }) {
  const channels: { label: string; kind: "email" | "chat" | "file" | "image" }[] = [
    { label: t("stage1Chip1"), kind: "email" },
    { label: t("stage1Chip2"), kind: "chat" },
    { label: t("stage1Chip3"), kind: "file" },
    { label: t("stage1Chip4"), kind: "image" },
  ];

  // Centered layout in 600-wide viewBox
  const cardX = 125;
  const cardW = 150;
  const cardH = 44;
  const gap = 16;
  const totalH = channels.length * cardH + (channels.length - 1) * gap;
  const startY = (260 - totalH) / 2;

  const hubX = 375;
  const hubY = 110;
  const hubW = 100;
  const hubH = 44;
  const hubCy = hubY + hubH / 2;

  return (
    <g>
      {/* channel cards + connectors flow directly into Input hub */}
      {channels.map((ch, i) => {
        const y = startY + i * (cardH + gap);
        const cy = y + cardH / 2;
        const startX = cardX + cardW + 6;
        const lineEndX = hubX - 2;
        const midX = (startX + lineEndX) / 2;
        return (
          <g key={ch.label}>
            <DrawnPath
              d={`M${startX} ${cy} C${midX} ${cy} ${midX} ${hubCy} ${lineEndX} ${hubCy}`}
              color={NAVY_DIM}
              strokeWidth={1.2}
              delay={0.15 + i * 0.08}
              duration={0.7}
            />
            <TravelDotPath
              d={`M${startX} ${cy} C${midX} ${cy} ${midX} ${hubCy} ${lineEndX} ${hubCy}`}
              color={NAVY_DIM}
              delay={1 + i * 0.35}
              duration={2.4}
              paused={paused}
            />
            <StageCard x={cardX} y={y} w={cardW} h={cardH} delay={i * 0.06}>
              <g transform={`translate(${cardX + 22}, ${cy})`}>
                <ChannelIcon kind={ch.kind} color={NAVY} />
              </g>
              <text
                x={cardX + 44}
                y={cy + 4}
                fontSize="13"
                fontWeight="600"
                fill={TEXT_DARK}
                fontFamily={FONT_SANS}
              >
                {ch.label}
              </text>
            </StageCard>
          </g>
        );
      })}

      {/* hub */}
      <motion.g
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: `${hubX + hubW / 2}px ${hubY + hubH / 2}px` }}
      >
        <rect x={hubX} y={hubY} width={hubW} height={hubH} rx={10} fill={NAVY_DIM} />
        <text
          x={hubX + hubW / 2}
          y={hubY + hubH / 2 + 5}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#ffffff"
          fontFamily={FONT_SANS}
        >
          Input
        </text>
      </motion.g>
    </g>
  );
}



// ------- Stage 2: Processing ---------------------------------------------

function Stage2({ t, paused }: { t: (k: string) => string; paused: boolean }) {
  // Central hub on left, three side cards on right
  const hubX = 60;
  const hubY = 95;
  const hubW = 180;
  const hubH = 90;
  const hubCx = hubX + hubW / 2;
  const hubCy = hubY + hubH / 2;

  const sources = [
    { label: t("stage2Chip2"), y: 50, icon: "db" as const },
    { label: t("stage2Chip3"), y: 124, icon: "folder" as const },
    { label: t("stage2Chip4"), y: 198, icon: "brain" as const },
  ];
  const srcX = 380;
  const srcW = 170;
  const srcH = 40;

  return (
    <g>
      {/* hub */}
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <rect x={hubX} y={hubY} width={hubW} height={hubH} rx={12} fill="#ffffff" stroke={BORDER} />

        {/* subtle pulse ring */}
        <motion.circle
          cx={hubCx}
          cy={hubCy}
          r={48}
          fill="none"
          stroke={NAVY}
          strokeWidth={1}
          animate={paused ? { opacity: 0 } : { opacity: [0, 0.18, 0], scale: [0.85, 1.15, 1.3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: `${hubCx}px ${hubCy}px` }}
        />

        <text
          x={hubCx}
          y={hubCy - 6}
          textAnchor="middle"
          fontSize="11"
          fill={NAVY}
          fontFamily={FONT_MONO}
          letterSpacing="0.12em"
        >
          COWORKER
        </text>
        <text
          x={hubCx}
          y={hubCy + 12}
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={TEXT_DARK}
          fontFamily={FONT_SANS}
        >
          {t("stage2Chip1")}
        </text>
        <circle cx={hubCx} cy={hubCy + 26} r={2.5} fill={NAVY} />
      </motion.g>

      {/* sources */}
      {sources.map((s, i) => {
        const sy = s.y;
        const cy = sy + srcH / 2;
        const startX = hubX + hubW;
        const endX = srcX;
        const midX = (startX + endX) / 2;
        const dForward = `M${startX} ${hubCy} C${midX} ${hubCy} ${midX} ${cy} ${endX} ${cy}`;

        return (
          <g key={s.label}>
            <DrawnPath d={dForward} color={NAVY} strokeWidth={1.2} delay={0.25 + i * 0.08} duration={0.75} />
            <DrawnPath d={dForward} color={GOLD} strokeWidth={1} dashed delay={0.45 + i * 0.08} duration={0.65} />
            {/* forward dot */}
            <TravelDotPath
              d={dForward}
              color={NAVY}
              delay={1.1 + i * 0.4}
              duration={2.4}
              paused={paused}
            />
            {/* reverse dot */}
            <TravelDotPath
              d={dForward}
              color={GOLD}
              delay={2.2 + i * 0.4}
              duration={2.4}
              reverse
              paused={paused}
            />

            <StageCard x={srcX} y={sy} w={srcW} h={srcH} delay={0.15 + i * 0.06}>
              <g transform={`translate(${srcX + 20}, ${cy})`}>
                {s.icon === "db" && (
                  <g fill="none" stroke={NAVY} strokeWidth={1.4} strokeLinecap="round">
                    <ellipse cx="0" cy="-6" rx="7" ry="2.5" />
                    <path d="M-7 -6 V4 a7 2.5 0 0 0 14 0 V-6" />
                    <path d="M-7 -1 a7 2.5 0 0 0 14 0" />
                  </g>
                )}
                {s.icon === "folder" && (
                  <g fill="none" stroke={NAVY} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M-8 -5 H-2 L0 -3 H8 V5 H-8 Z" />
                  </g>
                )}
                {s.icon === "brain" && (
                  <g fill="none" stroke={NAVY} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="0" cy="0" r="6.5" />
                    <path d="M-4 -1 H4 M0 -4 V4 M-3 3 L3 -3" />
                  </g>
                )}
              </g>
              <text
                x={srcX + 42}
                y={cy + 4}
                fontSize="12.5"
                fontWeight="600"
                fill={TEXT_DARK}
                fontFamily={FONT_SANS}
              >
                {s.label}
              </text>
            </StageCard>
          </g>
        );
      })}

    </g>
  );
}

// Helper: traveling dot along an arbitrary path via motion.circle with offsetPath
function TravelDotPath({
  d,
  color,
  delay = 0,
  duration = 2.6,
  size = 2.4,
  reverse = false,
  paused = false,
}: {
  d: string;
  color: string;
  delay?: number;
  duration?: number;
  size?: number;
  reverse?: boolean;
  paused?: boolean;
}) {
  if (paused) return null;
  return (
    <motion.circle
      r={size}
      fill={color}
      initial={{ opacity: 0, offsetDistance: reverse ? "100%" : "0%" }}
      animate={{
        offsetDistance: reverse ? ["100%", "0%"] : ["0%", "100%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 0.4,
        times: [0, 0.15, 0.85, 1],
        ease: "linear",
      }}
      style={{ offsetPath: `path("${d}")` }}
    />
  );
}

// ------- Stage 3: Human-in-the-loop --------------------------------------

function Stage3({ t, paused }: { t: (k: string) => string; paused: boolean }) {
  // Draft card center-left, review actions right, dashed bypass underneath
  const draftX = 50;
  const draftY = 60;
  const draftW = 220;
  const draftH = 140;

  const actionsX = 330;
  const actionsY = 60;
  const actionsW = 220;
  const actionsH = 140;

  return (
    <g>
      {/* arrow draft -> actions */}
      <DrawnPath
        d={`M${draftX + draftW + 6} ${draftY + draftH / 2} L${actionsX - 6} ${actionsY + actionsH / 2}`}
        color={GOLD}
        strokeWidth={1.4}
        delay={0.35}
        duration={0.5}
      />
      <TravelDot
        x1={draftX + draftW + 6}
        y1={draftY + draftH / 2}
        x2={actionsX - 6}
        y2={actionsY + actionsH / 2}
        color={GOLD}
        delay={1.0}
        duration={1.6}
        paused={paused}
      />

      {/* bypass dashed line under both cards */}
      <DrawnPath
        d={`M${draftX + 30} ${draftY + draftH + 30} Q${(draftX + actionsX + actionsW) / 2} ${draftY + draftH + 60} ${actionsX + actionsW - 30} ${draftY + draftH + 30}`}
        color={TEXT_SOFT}
        strokeWidth={1.1}
        dashed
        delay={0.6}
        duration={0.8}
      />
      <text
        x={(draftX + actionsX + actionsW) / 2}
        y={draftY + draftH + 55}
        textAnchor="middle"
        fontSize="10.5"
        fill={TEXT_SOFT}
        fontFamily={FONT_MONO}
        letterSpacing="0.08em"
      >
        {t("stage3Chip4")}
      </text>

      {/* draft card */}
      <StageCard x={draftX} y={draftY} w={draftW} h={draftH} delay={0.05}>
        <text
          x={draftX + 16}
          y={draftY + 22}
          fontSize="9.5"
          fill={GOLD}
          fontFamily={FONT_MONO}
          letterSpacing="0.15em"
        >
          DRAFT
        </text>
        {/* mock title */}
        <rect x={draftX + 16} y={draftY + 32} width={140} height={6} rx={1.5} fill={TEXT_DARK} />
        {/* body lines */}
        <rect x={draftX + 16} y={draftY + 50} width={draftW - 32} height={3} rx={1} fill={BORDER} />
        <rect x={draftX + 16} y={draftY + 60} width={draftW - 40} height={3} rx={1} fill={BORDER} />
        <rect x={draftX + 16} y={draftY + 70} width={draftW - 50} height={3} rx={1} fill={BORDER} />
        <rect x={draftX + 16} y={draftY + 80} width={draftW - 28} height={3} rx={1} fill={BORDER} />
        <rect x={draftX + 16} y={draftY + 90} width={draftW - 60} height={3} rx={1} fill={BORDER} />
        {/* signature line */}
        <line
          x1={draftX + 16}
          y1={draftY + 112}
          x2={draftX + 80}
          y2={draftY + 112}
          stroke={NAVY}
          strokeWidth={1.2}
        />
        <rect x={draftX + 16} y={draftY + 116} width={60} height={3} rx={1} fill={NAVY_DIM} />
      </StageCard>

      {/* actions card */}
      <StageCard x={actionsX} y={actionsY} w={actionsW} h={actionsH} delay={0.18}>
        <text
          x={actionsX + 16}
          y={actionsY + 22}
          fontSize="9.5"
          fill={NAVY}
          fontFamily={FONT_MONO}
          letterSpacing="0.15em"
        >
          REVIEW
        </text>

        {/* action 1 — approve */}
        <g transform={`translate(${actionsX + 16}, ${actionsY + 36})`}>
          <rect width={188} height={26} rx={6} fill="#ecfdf5" stroke={GREEN} strokeWidth={1} />
          <circle cx={16} cy={13} r={7} fill={GREEN} />
          <path
            d="M12 13 L15 16 L20 10"
            stroke="#fff"
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={32} y={17} fontSize="12" fontWeight="600" fill={TEXT_DARK} fontFamily={FONT_SANS}>
            {t("stage3Chip3")}
          </text>
        </g>

        {/* action 2 — edit */}
        <g transform={`translate(${actionsX + 16}, ${actionsY + 68})`}>
          <rect width={188} height={26} rx={6} fill="#ffffff" stroke={GOLD} strokeWidth={1} />
          <g transform="translate(16, 13)" stroke={GOLD} strokeWidth={1.4} fill="none" strokeLinecap="round">
            <path d="M-5 5 L4 -4 L6 -2 L-3 7 L-6 7 Z" />
          </g>
          <text x={32} y={17} fontSize="12" fontWeight="600" fill={TEXT_DARK} fontFamily={FONT_SANS}>
            {t("stage3Chip2")}
          </text>
        </g>

        {/* action 3 — skip / send */}
        <g transform={`translate(${actionsX + 16}, ${actionsY + 100})`}>
          <rect width={188} height={26} rx={6} fill="#ffffff" stroke={BORDER} strokeWidth={1} />
          <g transform="translate(16, 13)" stroke={TEXT_MUTED} strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-6 0 H5 M2 -3 L6 0 L2 3" />
          </g>
          <text x={32} y={17} fontSize="12" fontWeight="600" fill={TEXT_DARK} fontFamily={FONT_SANS}>
            {t("stage3Chip1")}
          </text>
        </g>
      </StageCard>
    </g>
  );
}

// ------- Stage 4: Output -------------------------------------------------

function Stage4({ t, paused }: { t: (k: string) => string; paused: boolean }) {
  const hubX = 40;
  const hubY = 110;
  const hubW = 140;
  const hubH = 60;
  const hubCx = hubX + hubW / 2;
  const hubCy = hubY + hubH / 2;

  const outputs = [
    { label: t("stage4Chip1"), color: GOLD, kind: "email" as const },
    { label: t("stage4Chip2"), color: NAVY, kind: "excel" as const },
    { label: t("stage4Chip3"), color: NAVY, kind: "pdf" as const },
    { label: t("stage4Chip4"), color: GREEN, kind: "alert" as const },
  ];

  const outX = 360;
  const outW = 200;
  const outH = 44;
  const gap = 14;
  const totalH = outputs.length * outH + (outputs.length - 1) * gap;
  const startY = (260 - totalH) / 2;

  return (
    <g>
      {/* hub */}
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <rect x={hubX} y={hubY} width={hubW} height={hubH} rx={10} fill="#ffffff" stroke={BORDER} />
        <text
          x={hubCx}
          y={hubCy - 4}
          textAnchor="middle"
          fontSize="10"
          fill={GREEN}
          fontFamily={FONT_MONO}
          letterSpacing="0.14em"
        >
          COWORKER
        </text>
        <text
          x={hubCx}
          y={hubCy + 12}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={TEXT_DARK}
          fontFamily={FONT_SANS}
        >
          Output
        </text>
      </motion.g>

      {/* connectors + output cards */}
      {outputs.map((o, i) => {
        const y = startY + i * (outH + gap);
        const cy = y + outH / 2;
        const startX = hubX + hubW;
        const endX = outX;
        const midX = (startX + endX) / 2;
        const d = `M${startX} ${hubCy} C${midX} ${hubCy} ${midX} ${cy} ${endX} ${cy}`;

        return (
          <g key={o.label}>
            <DrawnPath d={d} color={o.color} strokeWidth={1.3} delay={0.2 + i * 0.07} duration={0.7} />
            <TravelDotPath d={d} color={o.color} delay={1.0 + i * 0.3} duration={2.4} paused={paused} />

            <StageCard x={outX} y={y} w={outW} h={outH} delay={0.1 + i * 0.07}>
              <g transform={`translate(${outX + 24}, ${cy})`}>
                {o.kind === "email" && (
                  <g fill="none" stroke={o.color} strokeWidth={1.4} strokeLinejoin="round">
                    <rect x="-9" y="-6" width="18" height="12" rx="1.5" />
                    <path d="M-9 -5 L0 2 L9 -5" />
                  </g>
                )}
                {o.kind === "excel" && (
                  <g fill="none" stroke={o.color} strokeWidth={1.4} strokeLinejoin="round">
                    <rect x="-8" y="-7" width="16" height="14" rx="1.5" />
                    <line x1="-8" y1="-2" x2="8" y2="-2" />
                    <line x1="-8" y1="3" x2="8" y2="3" />
                    <line x1="-3" y1="-7" x2="-3" y2="7" />
                    <line x1="3" y1="-7" x2="3" y2="7" />
                  </g>
                )}
                {o.kind === "pdf" && (
                  <g fill="none" stroke={o.color} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round">
                    <path d="M-7 -7 H3 L8 -2 V8 H-7 Z" />
                    <path d="M3 -7 V-2 H8" />
                    <text x="0" y="5" fontSize="5" fill={o.color} fontFamily={FONT_MONO} textAnchor="middle" stroke="none">
                      PDF
                    </text>
                  </g>
                )}
                {o.kind === "alert" && (
                  <g fill="none" stroke={o.color} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round">
                    <path d="M0 -8 L8 6 H-8 Z" />
                    <line x1="0" y1="-2" x2="0" y2="2" />
                    <circle cx="0" cy="4.5" r="0.6" fill={o.color} />
                  </g>
                )}
              </g>
              <text
                x={outX + 48}
                y={cy + 4}
                fontSize="13"
                fontWeight="600"
                fill={TEXT_DARK}
                fontFamily={FONT_SANS}
              >
                {o.label}
              </text>
            </StageCard>
          </g>
        );
      })}
    </g>
  );
}

// ------- root component --------------------------------------------------

export default function WorkflowDiagram({ stage }: { stage: StageNum }) {
  const t = useTranslations("Pitch.Workflow");
  const isPrint = usePrintMode();

  return (
    <svg
      viewBox="0 0 600 260"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={t(`stage${stage}Title`)}
    >
      <rect x="0" y="0" width="600" height="260" rx="14" fill={CREAM} />
      {/* subtle dot grid */}
      <g opacity="0.5">
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 15 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={20 + c * 40} cy={24 + r * 36} r={0.6} fill={BORDER} />
          ))
        )}
      </g>
      {stage === 1 && <Stage1 t={t} paused={isPrint} />}
      {stage === 2 && <Stage2 t={t} paused={isPrint} />}
      {stage === 3 && <Stage3 t={t} paused={isPrint} />}
      {stage === 4 && <Stage4 t={t} paused={isPrint} />}
    </svg>
  );
}
