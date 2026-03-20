"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

const INTEGRATIONS = [
  { name: "Outlook", color: "#0078D4", logo: "/logos/integrations/outlook.svg" },
  { name: "SAP", color: "#0FAAFF", logo: "/logos/integrations/sap.svg" },
  { name: "Teams", color: "#6264A7", logo: "/logos/integrations/teams.svg" },
  { name: "HubSpot", color: "#FF7A59", logo: "/logos/integrations/hubspot.svg" },
  { name: "Jira", color: "#0052CC", logo: "/logos/integrations/jira.svg" },
  { name: "Salesforce", color: "#00A1E0", logo: "/logos/integrations/salesforce.svg" },
  { name: "Gmail", color: "#EA4335", logo: "/logos/integrations/gmail.svg" },
  { name: "Zendesk", color: "#03363D", logo: "/logos/integrations/zendesk.svg" },
  { name: "WhatsApp", color: "#25D366", logo: "/logos/integrations/whatsapp.svg" },
  { name: "Slack", color: "#4A154B", logo: "/logos/integrations/slack.svg" },
];

interface IntegrationCyclerProps {
  inboxLabel: string;
}

export default function IntegrationCycler({ inboxLabel }: IntegrationCyclerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [index, setIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isInView && index === -1 && !isRunning) {
      delayTimerRef.current = setTimeout(() => {
        setIndex(0);
        setIsRunning(true);
      }, 5000);
    }
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    };
  }, [isInView, index, isRunning]);

  useEffect(() => {
    if (!isRunning || index < 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= INTEGRATIONS.length) {
          setIsRunning(false);
          setHasCompleted(true);
          return prev;
        }
        return next;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [isRunning, index]);

  // After completing, reset to inbox view
  useEffect(() => {
    if (!hasCompleted) return;
    const timer = setTimeout(() => {
      setIndex(-1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [hasCompleted]);

  const restart = useCallback(() => {
    if (!hasCompleted) return;
    setIndex(0);
    setHasCompleted(false);
    setIsRunning(true);
  }, [hasCompleted]);

  const isCycling = index >= 0;
  const current = isCycling ? INTEGRATIONS[index] : null;

  return (
    <div
      ref={ref}
      className={`w-full h-full flex flex-col items-center justify-center ${hasCompleted ? "cursor-pointer" : ""}`}
      onClick={restart}
    >
      <AnimatePresence mode="wait">
        {!isCycling ? (
          /* Default state: inbox label + email mockup lines */
          <motion.div
            key="inbox"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[11px] md:text-[13px] font-mono text-white/50 uppercase tracking-wider">
              {inboxLabel}
            </span>
            <div className="w-[120px] md:w-[140px] space-y-2">
              <div className="h-[10px] md:h-[14px] rounded-sm bg-[#1e2a4a]" />
              <div className="h-[6px] md:h-[8px] w-[75%] rounded-sm bg-[rgba(30,42,74,0.2)]" />
              <div className="h-[6px] md:h-[8px] w-[85%] rounded-sm bg-[rgba(30,42,74,0.15)]" />
              <div className="h-[10px] md:h-[14px] rounded-sm bg-[#1e2a4a] mt-3" />
              <div className="h-[6px] md:h-[8px] w-[60%] rounded-sm bg-[rgba(30,42,74,0.2)]" />
              <div className="h-[6px] md:h-[8px] w-[70%] rounded-sm bg-[rgba(30,42,74,0.15)]" />
            </div>
          </motion.div>
        ) : current && (
          /* Cycling state: logo + name */
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-2"
          >
            <Image
              src={current.logo}
              alt={current.name}
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <span
              className="text-[14px] md:text-[17px] font-bold tracking-tight text-center"
              style={{ color: current.color }}
            >
              {current.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
