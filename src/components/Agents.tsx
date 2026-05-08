"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AGENTS, AGENT_CATEGORIES, type AgentCategory } from "@/lib/constants";

const ROTATE_INTERVAL_MS = 3500;

const CATEGORY_LABELS: Record<AgentCategory, string> = {
  customer: "categoryCustomer",
  employee: "categoryEmployee",
  management: "categoryManagement",
};

export default function Agents() {
  const t = useTranslations("Agents");
  const ta = useTranslations("AgentsList");
  const [active, setActive] = useState<AgentCategory>("customer");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (locked) return;
    const interval = setInterval(() => {
      setActive((prev) => {
        const idx = AGENT_CATEGORIES.indexOf(prev);
        return AGENT_CATEGORIES[(idx + 1) % AGENT_CATEGORIES.length];
      });
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [locked]);

  return (
    <section id="agents" className="px-6 py-28">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[560px] mb-12">
          <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-[#999] mb-4">
            {t("label")}
          </p>
          <h2 className="text-[36px] md:text-[42px] font-extrabold tracking-[-1.5px] leading-[1.1] mb-5">
            {t("title")}
          </h2>
          <p className="text-[16px] text-[#888] leading-[1.65]">
            {t("description")}
          </p>
        </div>

        <div className="relative inline-flex items-center bg-[#f5f5f5] border border-[#eee] rounded-full p-1 mb-10">
          {AGENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActive(cat);
                setLocked(true);
              }}
              className={`relative z-10 text-[12px] font-medium px-4 py-2 rounded-full transition-colors duration-300 ${
                active === cat ? "text-white" : "text-[#777] hover:text-[#111]"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="active-cat-pill"
                  className="absolute inset-0 bg-[#111] rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {t(CATEGORY_LABELS[cat])}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AGENTS.map((agent) => {
            const isActive = agent.category === active;
            return (
              <motion.article
                key={agent.key}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  y: isActive ? -2 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`bg-white border rounded-2xl p-6 flex-col transition-colors duration-300 ${
                  isActive
                    ? "flex border-[#ccc] shadow-[0_4px_18px_rgba(0,0,0,0.06)]"
                    : "hidden md:flex border-[#eee]"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-[15px] font-bold leading-snug">
                    {ta(`${agent.key}.name`)}
                  </h3>
                  <span className="shrink-0 text-[10px] font-mono uppercase tracking-[0.06em] px-2 py-0.5 rounded-full border border-[#e8e8e8] text-[#888]">
                    {t(CATEGORY_LABELS[agent.category])}
                  </span>
                </div>
                <p className="text-[14px] text-[#888] leading-[1.6] mb-5">
                  {ta(`${agent.key}.description`)}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#bbb]">
                    {t("custom")}
                  </span>
                  <a
                    href="#booking"
                    className="text-[12px] font-medium text-[#555] hover:text-[#111] inline-flex items-center gap-1.5 transition-colors"
                  >
                    {t("requestAgent")}
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="1" y1="7" x2="13" y2="7" />
                      <polyline points="8,2 13,7 8,12" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
