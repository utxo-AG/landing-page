"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { usePrintMode } from "../PrintContext";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
} as const;

function ShieldIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function NetworkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <circle cx="4" cy="6" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="20" cy="18" r="2" />
      <line x1="6" y1="7" x2="10.5" y2="11" />
      <line x1="18" y1="7" x2="13.5" y2="11" />
      <line x1="6" y1="17" x2="10.5" y2="13" />
      <line x1="18" y1="17" x2="13.5" y2="13" />
    </svg>
  );
}

function MailShieldIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8" />
      <polyline points="22,6 12,13 2,6" />
      <path d="M18 21s4-2 4-5v-3.5l-4-1.5-4 1.5V16c0 3 4 5 4 5z" />
    </svg>
  );
}

function ToolIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ArchDiagram({ isPrint }: { isPrint: boolean }) {
  const Wrapper = isPrint ? "div" : motion.div;
  const wrapperProps = isPrint ? {} : { variants: itemVariants };

  return (
    <Wrapper {...wrapperProps} className="w-full">
      <svg viewBox="0 0 800 280" fill="none" className="w-full h-auto" aria-label="Orchestrator Architecture Diagram">
        {/* Orchestrator - top center */}
        <rect x="280" y="10" width="240" height="52" rx="8" fill="#1e2a4a" />
        <text x="400" y="41" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="system-ui">Orchestrator</text>

        {/* Session labels */}
        <rect x="60" y="100" width="200" height="44" rx="6" fill="#f0f2f8" stroke="#d0d5e0" strokeWidth="1" />
        <text x="160" y="127" textAnchor="middle" fill="#333" fontSize="11" fontWeight="600" fontFamily="system-ui">User-Facing Session</text>

        <rect x="300" y="100" width="200" height="44" rx="6" fill="#f0f2f8" stroke="#d0d5e0" strokeWidth="1" />
        <text x="400" y="127" textAnchor="middle" fill="#333" fontSize="11" fontWeight="600" fontFamily="system-ui">Employee-Facing Session</text>

        <rect x="540" y="100" width="200" height="44" rx="6" fill="#e8ecf4" stroke="#c4a882" strokeWidth="1" strokeDasharray="4 2" />
        <text x="640" y="127" textAnchor="middle" fill="#666" fontSize="11" fontWeight="600" fontFamily="system-ui">Automation Session</text>

        {/* Connecting lines from orchestrator */}
        <line x1="340" y1="62" x2="160" y2="100" stroke="#ccc" strokeWidth="1.5" />
        <line x1="400" y1="62" x2="400" y2="100" stroke="#ccc" strokeWidth="1.5" />
        <line x1="460" y1="62" x2="640" y2="100" stroke="#ccc" strokeWidth="1.5" />

        {/* Task Sessions row */}
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 100 + i * 150;
          return (
            <g key={i}>
              <line x1={i < 2 ? 160 : i < 4 ? 400 : 640} y1="144" x2={x} y2="190" stroke="#ddd" strokeWidth="1" strokeDasharray="3 2" />
              <rect x={x - 55} y="190" width="110" height="36" rx="5" fill="white" stroke="#e0e0e0" strokeWidth="1" />
              <text x={x} y="213" textAnchor="middle" fill="#666" fontSize="10" fontFamily="monospace">Task Session</text>
            </g>
          );
        })}

        {/* Security badges along bottom */}
        <g>
          <rect x="50" y="248" width="700" height="28" rx="4" fill="#f8f8f8" />
          {["Domain Whitelist", "Permission Scopes", "Tool Limits", "Prompt Injection Guard", "Memory Isolation"].map((label, i) => (
            <g key={i}>
              <circle cx={120 + i * 130} cy="262" r="4" fill="#1e2a4a" />
              <text x={130 + i * 130} y="266" fill="#666" fontSize="9" fontFamily="system-ui">{label}</text>
            </g>
          ))}
        </g>
      </svg>
    </Wrapper>
  );
}

const SECURITY_FEATURES = [
  { key: "network", icon: "network" },
  { key: "permissions", icon: "lock" },
  { key: "email", icon: "mail" },
  { key: "tools", icon: "tool" },
] as const;

const ATTACK_VECTORS = ["hallucination", "promptInjection", "instructionSkip", "dataExfiltration", "ssrf"] as const;
const PERMISSION_SCOPES = ["userBased", "automationBased", "taskBased", "fileBased"] as const;

function IconForKey({ iconKey, className }: { iconKey: string; className?: string }) {
  const cls = className ?? "";
  switch (iconKey) {
    case "network": return <span className={cls}><NetworkIcon /></span>;
    case "lock": return <span className={cls}><LockIcon /></span>;
    case "mail": return <span className={cls}><MailShieldIcon /></span>;
    case "tool": return <span className={cls}><ToolIcon /></span>;
    default: return null;
  }
}

function SlideHeader({
  t,
  tabLabel,
}: {
  t: ReturnType<typeof useTranslations>;
  tabLabel?: string;
}) {
  return (
    <>
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#1e2a4a] text-white">
          <ShieldIcon size={16} />
        </span>
        <p className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase">
          {t("label")}
        </p>
        {tabLabel && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#1e2a4a] text-white text-[10px] font-mono tracking-wider">
            {tabLabel}
          </span>
        )}
      </motion.div>

      <motion.h2 variants={itemVariants} className="text-[24px] md:text-[36px] font-bold leading-[1.15] tracking-tight mb-2">
        {t("headline")}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-[#666] text-sm md:text-base max-w-[700px] mb-6">
        {t("subline")}
      </motion.p>
    </>
  );
}

function BusinessView({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <motion.div key="overview" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {SECURITY_FEATURES.map((feat) => (
          <div
            key={feat.key}
            className="hover-card bg-white/80 backdrop-blur-sm rounded-lg p-5 border border-[#e8ecf4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e2a4a] text-white">
                <IconForKey iconKey={feat.icon} />
              </span>
              <p className="text-sm font-semibold text-[#111]">{t(`${feat.key}Title`)}</p>
            </div>
            <p className="text-xs text-[#666] leading-relaxed">{t(`${feat.key}Desc`)}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#f8f9fc] rounded-lg p-5 border border-[#e8ecf4] mb-6">
        <p className="text-sm font-semibold text-[#111] mb-1">{t("benefitTitle")}</p>
        <p className="text-xs text-[#666] leading-relaxed">{t("benefitDesc")}</p>
      </div>
    </motion.div>
  );
}

function TechnicalView({
  t,
  isPrint,
}: {
  t: ReturnType<typeof useTranslations>;
  isPrint: boolean;
}) {
  return (
    <motion.div key="technical" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
      <div className="mb-6">
        <ArchDiagram isPrint={isPrint} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-[#1e2a4a] rounded-lg p-5">
          <p className="text-[10px] font-mono text-[#8899bb] uppercase tracking-wider mb-3">{t("attackVectorsLabel")}</p>
          <div className="space-y-1.5">
            {ATTACK_VECTORS.map((v) => (
              <div key={v} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4a882]" />
                <span className="text-[11px] text-[#ccc]">{t(`attack_${v}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 rounded-lg p-5 border border-[#e8ecf4]">
          <p className="text-[10px] font-mono text-[#666] uppercase tracking-wider mb-3">{t("permissionScopesLabel")}</p>
          <div className="space-y-1.5">
            {PERMISSION_SCOPES.map((s) => (
              <div key={s} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1e2a4a] mt-1.5" />
                <span className="text-[11px] text-[#333]">{t(`scope_${s}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 rounded-lg p-5 border border-[#e8ecf4]">
          <p className="text-[10px] font-mono text-[#666] uppercase tracking-wider mb-3">{t("memoryLabel")}</p>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e2a4a] mt-1.5" />
              <span className="text-[11px] text-[#333]">{t("memoryVector")}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e2a4a] mt-1.5" />
              <span className="text-[11px] text-[#333]">{t("memoryStateless")}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e2a4a] mt-1.5" />
              <span className="text-[11px] text-[#333]">{t("memoryContext")}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SecurityArchitecture() {
  const t = useTranslations("Pitch.SecurityArchitecture");
  const isPrint = usePrintMode();
  const [showTechnical, setShowTechnical] = useState(false);

  if (isPrint) {
    return (
      <>
        <SlideWrapper variant="cool">
          <SlideHeader t={t} tabLabel={t("tabOverview")} />
          <BusinessView t={t} />
          <motion.p variants={itemVariants} className="text-[#999] text-[11px]">
            {t("footnote")}
          </motion.p>
        </SlideWrapper>
        <SlideWrapper variant="cool">
          <SlideHeader t={t} tabLabel={t("tabTechnical")} />
          <TechnicalView t={t} isPrint={isPrint} />
          <motion.p variants={itemVariants} className="text-[#999] text-[11px]">
            {t("footnote")}
          </motion.p>
        </SlideWrapper>
      </>
    );
  }

  return (
    <SlideWrapper variant="cool">
      <SlideHeader t={t} />

      <motion.div variants={itemVariants} className="flex gap-1 mb-6">
        <button
          onClick={() => setShowTechnical(false)}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
            !showTechnical
              ? "bg-[#1e2a4a] text-white"
              : "bg-[#f0f2f8] text-[#666] hover:bg-[#e4e8f0]"
          }`}
        >
          {t("tabOverview")}
        </button>
        <button
          onClick={() => setShowTechnical(true)}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
            showTechnical
              ? "bg-[#1e2a4a] text-white"
              : "bg-[#f0f2f8] text-[#666] hover:bg-[#e4e8f0]"
          }`}
        >
          {t("tabTechnical")}
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        {showTechnical ? <TechnicalView t={t} isPrint={isPrint} /> : <BusinessView t={t} />}
      </AnimatePresence>

      <motion.p variants={itemVariants} className="text-[#999] text-[11px]">
        {t("footnote")}
      </motion.p>
    </SlideWrapper>
  );
}
