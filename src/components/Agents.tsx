"use client";

import { useState } from "react";
import { AGENTS } from "@/lib/constants";
import CopyEmail from "@/components/CopyEmail";

function AgentCard({
  agent,
  type,
}: {
  agent: { name: string; description: string };
  type: "public" | "private";
}) {
  return (
    <div className="group bg-white border border-[#eee] rounded-2xl p-6 flex flex-col hover:border-[#ccc] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-[15px] font-bold leading-snug">{agent.name}</h3>
        <span
          className={`shrink-0 text-[10px] font-mono uppercase tracking-[0.06em] px-2 py-0.5 rounded-full border ${
            type === "public"
              ? "border-[#d1d1d1] text-[#555]"
              : "border-[#e8e8e8] text-[#aaa]"
          }`}
        >
          {type === "public" ? "Available" : "Custom"}
        </span>
      </div>
      <p className="text-[14px] text-[#888] leading-[1.6] mb-5">{agent.description}</p>

      {/* Mini email mockup */}
      <div className="mt-auto bg-[#f8f8f8] border border-[#f0f0f0] rounded-xl p-3 space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#e5e5e5] flex items-center justify-center">
            <span className="text-[6px] text-[#bbb] font-bold">AI</span>
          </div>
          <div className="h-1.5 bg-[#eee] rounded-full w-16"/>
          <div className="h-1.5 bg-[#f0f0f0] rounded-full w-8 ml-auto"/>
        </div>
        <div className="space-y-1.5 pl-6">
          <div className="h-1.5 bg-[#eee] rounded-full w-full"/>
          <div className="h-1.5 bg-[#f0f0f0] rounded-full w-3/4"/>
          <div className="h-1.5 bg-[#f0f0f0] rounded-full w-1/2"/>
        </div>
      </div>

      <CopyEmail className="w-full text-center text-[12px] font-medium text-[#555] bg-[#f0f0f0] hover:bg-[#e5e5e5] px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer">
        <span className="inline-flex items-center gap-1.5">
          {type === "public" ? "Get started" : "Request this agent"}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="7" x2="13" y2="7" />
            <polyline points="8,2 13,7 8,12" />
          </svg>
        </span>
      </CopyEmail>
    </div>
  );
}

const VISIBLE_COUNT = 4;

function AgentGrid({
  agents,
  type,
  label,
}: {
  agents: { name: string; description: string }[];
  type: "public" | "private";
  label: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = agents.length > VISIBLE_COUNT;
  const visible = expanded ? agents : agents.slice(0, VISIBLE_COUNT);

  return (
    <div>
      <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#bbb] mb-5">
        {label}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {visible.map((agent) => (
          <AgentCard key={agent.name} agent={agent} type={type} />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 text-[12px] font-mono text-[#aaa] hover:text-[#111] transition-colors duration-200"
        >
          {expanded ? "Show less" : `Show all ${agents.length}`}
        </button>
      )}
    </div>
  );
}

export default function Agents() {
  return (
    <section id="agents" className="px-6 py-28">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[480px] mb-16">
          <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-[#999] mb-4">
            Agents
          </p>
          <h2 className="text-[36px] md:text-[42px] font-extrabold tracking-[-1.5px] leading-[1.1] mb-5">
            Agentic coworkers, ready to work.
          </h2>
          <p className="text-[16px] text-[#888] leading-[1.65]">
            Some are available instantly. Others are custom-built for your company — with deep integrations into SAP, Microsoft 365, Slack, and your existing tools.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {["SAP", "Outlook", "Teams", "Slack", "Office 365", "Email"].map((tool) => (
              <span
                key={tool}
                className="text-[11px] font-mono text-[#999] bg-[#f5f5f5] border border-[#eee] px-3 py-1 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <AgentGrid agents={AGENTS.public} type="public" label="Hire instantly" />
          <AgentGrid agents={AGENTS.private} type="private" label="Custom deployment" />
        </div>
      </div>
    </section>
  );
}
