"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const DEMO_KEYS = ["angebot", "rezeption", "monitoring", "disposition"] as const;
type DemoKey = typeof DEMO_KEYS[number];

const DEMO_DATA: Record<DemoKey, {
  rows: { labelKey: string; valueKey: string; bar: number }[];
  trailKeys: string[];
}> = {
  angebot: {
    rows: [
      { labelKey: "rowItem", valueKey: "rowItemVal", bar: 0 },
      { labelKey: "rowMargin", valueKey: "rowMarginVal", bar: 32 },
      { labelKey: "rowDelivery", valueKey: "rowDeliveryVal", bar: 0 },
    ],
    trailKeys: ["trail1", "trail2", "trail3", "trail4"],
  },
  rezeption: {
    rows: [
      { labelKey: "rowCaller", valueKey: "rowCallerVal", bar: 0 },
      { labelKey: "rowReason", valueKey: "rowReasonVal", bar: 0 },
      { labelKey: "rowRequest", valueKey: "rowRequestVal", bar: 0 },
    ],
    trailKeys: ["trail1", "trail2", "trail3", "trail4"],
  },
  monitoring: {
    rows: [
      { labelKey: "rowServer", valueKey: "rowServerVal", bar: 87 },
      { labelKey: "rowDuration", valueKey: "rowDurationVal", bar: 0 },
      { labelKey: "rowSimilar", valueKey: "rowSimilarVal", bar: 0 },
    ],
    trailKeys: ["trail1", "trail2", "trail3", "trail4"],
  },
  disposition: {
    rows: [
      { labelKey: "rowRoute", valueKey: "rowRouteVal", bar: 0 },
      { labelKey: "rowSavings", valueKey: "rowSavingsVal", bar: 14 },
      { labelKey: "rowDriver", valueKey: "rowDriverVal", bar: 0 },
    ],
    trailKeys: ["trail1", "trail2", "trail3", "trail4"],
  },
};

export default function Hero() {
  const [active, setActive] = useState<DemoKey>("angebot");
  const t = useTranslations("Hero");
  const td = useTranslations("HeroDemos");
  const demo = DEMO_DATA[active];

  return (
    <section className="pt-40 pb-32 px-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[760px]">
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

          <p className="text-[17px] md:text-[19px] leading-[1.65] text-[#777] max-w-[560px] mb-8">
            {t("description")}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-12">
            <TrustBadge label={t("trust1")} />
            <TrustBadge label={t("trust2")} />
            <TrustBadge label={t("trust3")} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 bg-[#111] text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-[#333] transition-colors duration-200 cursor-pointer"
            >
              {t("ctaPrimary")}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="7" x2="13" y2="7" />
                <polyline points="8,2 13,7 8,12" />
              </svg>
            </a>
            <a
              href="#callback"
              className="inline-flex items-center gap-2 bg-white border border-[#e5e5e5] text-[#111] text-[14px] font-medium px-6 py-3 rounded-full hover:border-[#111] transition-colors duration-200 cursor-pointer"
            >
              {t("ctaSecondary")}
            </a>
          </div>
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
              {DEMO_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`w-full text-left rounded-lg px-3 py-2.5 transition-all duration-150 ${
                    active === key
                      ? "bg-white border border-[#eee] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                      : "hover:bg-[#f5f5f5]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        active === key ? "bg-[#111]" : "bg-[#ddd]"
                      }`}
                    >
                      <span className="text-[7px] text-white font-bold">AI</span>
                    </div>
                    <span className={`text-[11px] font-semibold truncate ${
                      active === key ? "text-[#111]" : "text-[#bbb]"
                    }`}>
                      {td(`${key}.name`)}
                    </span>
                  </div>
                  <p className={`text-[10px] truncate pl-7 ${
                    active === key ? "text-[#999]" : "text-[#ccc]"
                  }`}>
                    {td(`${key}.preview`)}
                  </p>
                </button>
              ))}
            </div>

            <div className="md:hidden flex border-b border-[#eee] overflow-x-auto">
              {DEMO_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`shrink-0 px-4 py-2.5 text-[11px] font-medium border-b-2 transition-colors ${
                    active === key
                      ? "border-[#111] text-[#111]"
                      : "border-transparent text-[#bbb]"
                  }`}
                >
                  {td(`${key}.name`)}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8 h-[640px] overflow-y-auto">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center shrink-0">
                  <span className="text-[9px] text-white font-bold">AI</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold">{td(`${active}.name`)}</span>
                    <span className="text-[11px] text-[#bbb]">{t("toYou")}</span>
                  </div>
                  <p className="text-[12px] text-[#999] truncate">{td(`${active}.subject`)}</p>
                </div>
              </div>

              <div className="ml-11 mt-4 space-y-4">
                <p className="text-[13px] text-[#555] leading-[1.7]">{td(`${active}.body1`)}</p>
                <p className="text-[13px] text-[#555] leading-[1.7]">{td(`${active}.body2`)}</p>

                <div className="bg-white border border-[#eee] rounded-lg p-4 space-y-2.5">
                  {demo.rows.map((row) => (
                    <div key={row.labelKey}>
                      <div className="flex justify-between text-[12px] mb-1 gap-3">
                        <span className="text-[#888] shrink-0">{td(`${active}.${row.labelKey}`)}</span>
                        <span className="font-semibold text-[#333] text-right truncate">{td(`${active}.${row.valueKey}`)}</span>
                      </div>
                      {row.bar > 0 && (
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
                    {td(`${active}.footer`)}
                  </div>
                </div>

                <ActionTrail
                  label={t("actionTrailLabel")}
                  items={demo.trailKeys.map((k) => td(`${active}.${k}`))}
                />

                <p className="text-[13px] text-[#555] leading-[1.7]">{td(`${active}.closing`)}</p>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#booking"
          className="mt-4 group flex items-center justify-between gap-4 bg-white border border-dashed border-[#ccc] rounded-2xl px-6 py-4 hover:border-[#111] hover:bg-[#fafafa] transition-colors duration-200"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 rounded-full bg-white border-2 border-dashed border-[#111] flex items-center justify-center shrink-0">
              <span className="text-[12px] font-bold text-[#111]">+</span>
            </span>
            <p className="text-[14px] text-[#555] truncate">
              <span className="font-semibold text-[#111]">{t("customBannerText")}</span>{" "}
              <span className="text-[#777]">{t("customBannerCta")}</span>
            </p>
          </div>
          <svg className="text-[#999] group-hover:text-[#111] group-hover:translate-x-0.5 transition-all duration-200 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="7" x2="13" y2="7" />
            <polyline points="8,2 13,7 8,12" />
          </svg>
        </a>
      </div>
    </section>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#666] bg-[#f5f5f5] border border-[#eee] px-3 py-1 rounded-full">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,5 4,7 8,3" />
      </svg>
      {label}
    </span>
  );
}

function ActionTrail({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="bg-[#f5f5f5] border border-[#eee] rounded-lg p-3">
      <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#999] mb-2">
        {label}
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-[12px] text-[#555]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#111] flex items-center justify-center shrink-0">
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1,3.5 2.8,5 6,1.8" />
              </svg>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
