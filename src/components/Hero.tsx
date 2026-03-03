"use client";

import { useState } from "react";
import CopyEmail from "@/components/CopyEmail";

const DEMO_AGENTS = [
  {
    id: "data",
    name: "Data Analysis Agent",
    preview: "Re: Q4 revenue breakdown",
    subject: "Re: Q4 revenue breakdown by region",
    body: [
      "Here's the Q4 revenue breakdown you requested. I pulled the numbers directly from your SAP system and cross-referenced them with the CRM pipeline data.",
      "Key findings: DACH region grew 18% QoQ, driven by 3 new enterprise accounts. Southern Europe underperformed target by 6%, mainly due to delayed onboarding of the Milan contract.",
    ],
    attachment: {
      name: "Q4-Revenue-Report.pdf",
      size: "2.4 MB",
    },
    data: {
      rows: [
        { label: "Total Revenue", value: "CHF 2.4M" },
        { label: "DACH Region", value: "CHF 1.1M", bar: 46 },
        { label: "Western Europe", value: "CHF 820K", bar: 34 },
        { label: "Southern Europe", value: "CHF 480K", bar: 20 },
      ],
      footer: "vs. Q3: +12.4%",
    },
    closing:
      "Want me to break this down further by product line? Just reply and I'll pull the SKU-level data.",
  },
  {
    id: "crm",
    name: "CRM Coworker Agent",
    preview: "3 new leads flagged",
    subject: "Daily lead summary — 3 new, 2 follow-ups due",
    body: [
      "Good morning. I scanned your inbox and CRM overnight. Here's what needs attention today.",
      "3 new inbound leads came in from the website contact form. I've already created records in HubSpot and enriched them with LinkedIn data.",
    ],
    attachment: null,
    data: {
      rows: [
        { label: "Müller GmbH (Munich)", value: "Manufacturing · 200 emp.", bar: 0 },
        { label: "Helvetia Logistics AG", value: "Logistics · 85 emp.", bar: 0 },
        { label: "Bauer & Söhne KG", value: "Retail · 45 emp.", bar: 0 },
      ],
      footer: "2 follow-ups due today (Schneider AG, TechVentures)",
    },
    closing:
      "I've drafted personalized replies for each lead based on their industry. Reply 'send' to approve, or edit them in HubSpot first.",
  },
  {
    id: "research",
    name: "Research Agent",
    preview: "Market analysis complete",
    subject: "Re: Competitor analysis — AI agents in DACH",
    body: [
      "I've completed the competitive landscape analysis for AI agent providers in the DACH region. I reviewed 14 companies, cross-referenced Crunchbase funding data, and analyzed their product positioning.",
      "The market is still early. Most competitors focus on chat-based interfaces or dashboards. Only 2 others offer email-based interaction, but neither supports SAP integration.",
    ],
    attachment: {
      name: "DACH-AI-Agent-Landscape-2025.pdf",
      size: "4.1 MB",
    },
    data: {
      rows: [
        { label: "Companies analyzed", value: "14", bar: 0 },
        { label: "Total funding (combined)", value: "€42M", bar: 0 },
        { label: "Email-first approach", value: "2 others", bar: 0 },
        { label: "SAP integration", value: "0 others", bar: 0 },
      ],
      footer: "Your positioning: strong differentiation",
    },
    closing:
      "I also found 3 potential partnership opportunities. Want me to draft outreach emails?",
  },
  {
    id: "invoice",
    name: "Invoice Agent",
    preview: "12 invoices processed",
    subject: "Invoice batch processed — 12 done, 1 flagged",
    body: [
      "I processed the 13 invoices you forwarded this morning. 12 matched existing purchase orders in SAP and have been routed for approval.",
      "1 invoice from DataStream GmbH (€14,200) doesn't match any open PO. The amount is also 22% higher than their last 3 invoices. I've flagged it for manual review.",
    ],
    attachment: {
      name: "Invoice-Batch-Jan-30.xlsx",
      size: "890 KB",
    },
    data: {
      rows: [
        { label: "Processed", value: "12 / 13", bar: 92 },
        { label: "Total amount", value: "€87,400", bar: 0 },
        { label: "Flagged for review", value: "1", bar: 0 },
      ],
      footer: "Avg. processing time: 8 seconds per invoice",
    },
    closing:
      "The approved invoices are queued for payment on Feb 3. Reply to adjust the payment date or approve the flagged one.",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const agent = DEMO_AGENTS[active];

  return (
    <section className="pt-40 pb-32 px-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[740px]">
          <div className="flex items-center gap-3 mb-8">
            <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-[#999]">
              Product Studio
            </p>
            <span className="text-[#ddd]">·</span>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-[0.1em] text-[#999]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Swiss flag">
                <rect width="14" height="14" rx="2" fill="#FF0000"/>
                <rect x="6" y="3" width="2" height="8" rx="0.5" fill="#fff"/>
                <rect x="3" y="6" width="8" height="2" rx="0.5" fill="#fff"/>
              </svg>
              Switzerland
            </span>
          </div>
          <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-extrabold tracking-[-3px] leading-[1.02] mb-8">
            We build AI agents{" "}
            <span className="text-[#bbb]">you hire by email.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] leading-[1.65] text-[#777] max-w-[480px] mb-12">
            We build custom AI agents for your company — deeply integrated with SAP, Outlook, Teams, Slack, and more. Want your own? Get in touch.
          </p>
          <CopyEmail className="inline-flex items-center gap-2 bg-[#111] text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-[#333] transition-colors duration-200 cursor-pointer">
            <span className="inline-flex items-center gap-2">
              business@utxo.ag
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="7" x2="13" y2="7" />
                <polyline points="8,2 13,7 8,12" />
              </svg>
            </span>
          </CopyEmail>
        </div>

        {/* Interactive email mockup */}
        <div className="mt-20 bg-[#fafafa] border border-[#eee] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
          {/* Title bar */}
          <div className="border-b border-[#eee] px-6 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8e8]"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8e8]"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8e8]"/>
            </div>
            <div className="ml-4 flex items-center gap-2 text-[11px] text-[#bbb]">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1" y="3" width="12" height="9" rx="1.5"/>
                <path d="M1 5l6 4 6-4"/>
              </svg>
              <span>Inbox — AI Agents</span>
            </div>
          </div>

          <div className="grid md:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <div className="hidden md:block border-r border-[#eee] p-3 space-y-1">
              {DEMO_AGENTS.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setActive(i)}
                  className={`w-full text-left rounded-lg px-3 py-2.5 transition-all duration-150 ${
                    active === i
                      ? "bg-white border border-[#eee] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                      : "hover:bg-[#f5f5f5]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      active === i ? "bg-[#111]" : "bg-[#ddd]"
                    }`}>
                      <span className="text-[7px] text-white font-bold">AI</span>
                    </div>
                    <span className={`text-[11px] font-semibold truncate ${
                      active === i ? "text-[#111]" : "text-[#bbb]"
                    }`}>
                      {a.name}
                    </span>
                  </div>
                  <p className={`text-[10px] truncate pl-7 ${
                    active === i ? "text-[#999]" : "text-[#ccc]"
                  }`}>
                    {a.preview}
                  </p>
                </button>
              ))}
            </div>

            {/* Mobile agent tabs */}
            <div className="md:hidden flex border-b border-[#eee] overflow-x-auto">
              {DEMO_AGENTS.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setActive(i)}
                  className={`shrink-0 px-4 py-2.5 text-[11px] font-medium border-b-2 transition-colors ${
                    active === i
                      ? "border-[#111] text-[#111]"
                      : "border-transparent text-[#bbb]"
                  }`}
                >
                  {a.name.replace(" Agent", "")}
                </button>
              ))}
            </div>

            {/* Email content */}
            <div className="p-6 md:p-8 h-[520px] overflow-y-auto">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center shrink-0">
                  <span className="text-[9px] text-white font-bold">AI</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold">{agent.name}</span>
                    <span className="text-[11px] text-[#bbb]">to: you</span>
                  </div>
                  <p className="text-[12px] text-[#999] truncate">{agent.subject}</p>
                </div>
              </div>

              <div className="ml-11 mt-4 space-y-4">
                {agent.body.map((p, i) => (
                  <p key={i} className="text-[13px] text-[#555] leading-[1.7]">{p}</p>
                ))}

                {/* Data card */}
                <div className="bg-white border border-[#eee] rounded-lg p-4 space-y-2.5">
                  {agent.data.rows.map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-[12px] mb-1">
                        <span className="text-[#888]">{row.label}</span>
                        <span className="font-semibold text-[#333]">{row.value}</span>
                      </div>
                      {(row.bar ?? 0) > 0 && (
                        <div className="w-full bg-[#f0f0f0] rounded-full h-1.5">
                          <div
                            className="bg-[#111] h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${row.bar}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#f0f0f0] text-[11px] text-[#999]">
                    {agent.data.footer}
                  </div>
                </div>

                {/* Attachment */}
                {agent.attachment && (
                  <div className="inline-flex items-center gap-2 bg-[#f5f5f5] border border-[#eee] rounded-lg px-3 py-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#999" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 1v9M4 7l3 3 3-3"/>
                      <path d="M2 10v2h10v-2"/>
                    </svg>
                    <span className="text-[11px] text-[#666]">{agent.attachment.name}</span>
                    <span className="text-[10px] text-[#bbb]">{agent.attachment.size}</span>
                  </div>
                )}

                <p className="text-[13px] text-[#555] leading-[1.7]">{agent.closing}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
