"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CopyEmail from "@/components/CopyEmail";

const DEMO_KEYS = ["data", "crm", "research", "invoice"] as const;

const DEMO_DATA: Record<string, {
  attachment: { name: string; size: string } | null;
  data: { rows: { key: string; value: string; bar: number }[]; footerKey: string };
}> = {
  data: {
    attachment: { name: "Q4-Revenue-Report.pdf", size: "2.4 MB" },
    data: {
      rows: [
        { key: "rowTotal", value: "CHF 2.4M", bar: 0 },
        { key: "rowDach", value: "CHF 1.1M", bar: 46 },
        { key: "rowWest", value: "CHF 820K", bar: 34 },
        { key: "rowSouth", value: "CHF 480K", bar: 20 },
      ],
      footerKey: "footer",
    },
  },
  crm: {
    attachment: null,
    data: {
      rows: [
        { key: "row1", value: "Manufacturing · 200 emp.", bar: 0 },
        { key: "row2", value: "Logistics · 85 emp.", bar: 0 },
        { key: "row3", value: "Retail · 45 emp.", bar: 0 },
      ],
      footerKey: "footer",
    },
  },
  research: {
    attachment: { name: "DACH-AI-Agent-Landscape-2025.pdf", size: "4.1 MB" },
    data: {
      rows: [
        { key: "rowCompanies", value: "14", bar: 0 },
        { key: "rowFunding", value: "€42M", bar: 0 },
        { key: "rowEmail", value: "2 others", bar: 0 },
        { key: "rowSap", value: "0 others", bar: 0 },
      ],
      footerKey: "footer",
    },
  },
  invoice: {
    attachment: { name: "Invoice-Batch-Jan-30.xlsx", size: "890 KB" },
    data: {
      rows: [
        { key: "rowProcessed", value: "12 / 13", bar: 92 },
        { key: "rowTotal", value: "€87,400", bar: 0 },
        { key: "rowFlagged", value: "1", bar: 0 },
      ],
      footerKey: "footer",
    },
  },
};

const CRM_ROW_LABELS = [
  "Müller GmbH (Munich)",
  "Helvetia Logistics AG",
  "Bauer & Söhne KG",
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const t = useTranslations("Hero");
  const td = useTranslations("HeroDemos");
  const demoKey = DEMO_KEYS[active];
  const demo = DEMO_DATA[demoKey];

  return (
    <section className="pt-40 pb-32 px-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[740px]">
          <div className="flex items-center gap-3 mb-8">
            <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-[#999]">
              {t("label")}
            </p>
            <span className="text-[#ddd]">·</span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="German flag">
                <clipPath id="de-clip"><rect width="14" height="14" rx="2"/></clipPath>
                <g clipPath="url(#de-clip)">
                  <rect width="14" height="4.67" fill="#000"/>
                  <rect y="4.67" width="14" height="4.67" fill="#DD0000"/>
                  <rect y="9.33" width="14" height="4.67" fill="#FFCC00"/>
                </g>
              </svg>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Swiss flag">
                <rect width="14" height="14" rx="2" fill="#FF0000"/>
                <rect x="6" y="3" width="2" height="8" rx="0.5" fill="#fff"/>
                <rect x="3" y="6" width="8" height="2" rx="0.5" fill="#fff"/>
              </svg>
            </span>
          </div>
          <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-extrabold tracking-[-3px] leading-[1.02] mb-8">
            {t("titleBlack")}{" "}
            <span className="text-[#bbb]">{t("titleGray")}</span>
          </h1>
          <p className="text-[17px] md:text-[19px] leading-[1.65] text-[#777] max-w-[480px] mb-12">
            {t("description")}
          </p>
          <CopyEmail className="inline-flex items-center gap-2 bg-[#111] text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-[#333] transition-colors duration-200 cursor-pointer">
            <span className="inline-flex items-center gap-2">
              business@utxoag.com
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="7" x2="13" y2="7" />
                <polyline points="8,2 13,7 8,12" />
              </svg>
            </span>
          </CopyEmail>
        </div>

        <div className="mt-20 bg-[#fafafa] border border-[#eee] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
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
              <span>{t("inboxLabel")}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-[260px_1fr]">
            <div className="hidden md:block border-r border-[#eee] p-3 space-y-1">
              {DEMO_KEYS.map((key, i) => (
                <button
                  key={key}
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
                      {td(`${key}.name`)}
                    </span>
                  </div>
                  <p className={`text-[10px] truncate pl-7 ${
                    active === i ? "text-[#999]" : "text-[#ccc]"
                  }`}>
                    {td(`${key}.preview`)}
                  </p>
                </button>
              ))}
            </div>

            <div className="md:hidden flex border-b border-[#eee] overflow-x-auto">
              {DEMO_KEYS.map((key, i) => (
                <button
                  key={key}
                  onClick={() => setActive(i)}
                  className={`shrink-0 px-4 py-2.5 text-[11px] font-medium border-b-2 transition-colors ${
                    active === i
                      ? "border-[#111] text-[#111]"
                      : "border-transparent text-[#bbb]"
                  }`}
                >
                  {td(`${key}.name`).replace(" Agent", "")}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8 h-[520px] overflow-y-auto">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center shrink-0">
                  <span className="text-[9px] text-white font-bold">AI</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold">{td(`${demoKey}.name`)}</span>
                    <span className="text-[11px] text-[#bbb]">{t("toYou")}</span>
                  </div>
                  <p className="text-[12px] text-[#999] truncate">{td(`${demoKey}.subject`)}</p>
                </div>
              </div>

              <div className="ml-11 mt-4 space-y-4">
                <p className="text-[13px] text-[#555] leading-[1.7]">{td(`${demoKey}.body1`)}</p>
                <p className="text-[13px] text-[#555] leading-[1.7]">{td(`${demoKey}.body2`)}</p>

                <div className="bg-white border border-[#eee] rounded-lg p-4 space-y-2.5">
                  {demo.data.rows.map((row, ri) => (
                    <div key={row.key}>
                      <div className="flex justify-between text-[12px] mb-1">
                        <span className="text-[#888]">
                          {demoKey === "crm" ? CRM_ROW_LABELS[ri] : td(`${demoKey}.${row.key}`)}
                        </span>
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
                    {td(`${demoKey}.${demo.data.footerKey}`)}
                  </div>
                </div>

                {demo.attachment && (
                  <div className="inline-flex items-center gap-2 bg-[#f5f5f5] border border-[#eee] rounded-lg px-3 py-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#999" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 1v9M4 7l3 3 3-3"/>
                      <path d="M2 10v2h10v-2"/>
                    </svg>
                    <span className="text-[11px] text-[#666]">{demo.attachment.name}</span>
                    <span className="text-[10px] text-[#bbb]">{demo.attachment.size}</span>
                  </div>
                )}

                <p className="text-[13px] text-[#555] leading-[1.7]">{td(`${demoKey}.closing`)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
