"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { getCalApi } from "@calcom/embed-react";
import CallbackForm from "@/components/CallbackForm";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "philip-isenmann-utxoag/30-min-meeting";
const CAL_NAMESPACE = "30-min-meeting";

export default function BookingSection() {
  const t = useTranslations("BookingSection");

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      const lightVars = {
        "cal-brand": "#002147",
        "cal-text": "#111111",
        "cal-text-emphasis": "#111111",
        "cal-bg": "#ffffff",
        "cal-bg-emphasis": "#f4f4f4",
        "cal-border": "#e5e4e2",
        "cal-border-emphasis": "#d4d4d4",
      };
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: lightVars, dark: lightVars },
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section id="booking" className="bg-white px-6 py-20 md:py-24">
      <div className="max-w-[1080px] mx-auto">
        <div className="max-w-[560px] mx-auto text-center mb-10">
          <p className="text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-[#696969] mb-3">
            {t("calendarTitle")}
          </p>
          <h2 className="font-display text-[28px] md:text-[40px] font-medium tracking-[-0.028em] leading-[1.05] mb-3">
            {t("title")}
          </h2>
          <p className="text-[16px] text-[#696969] leading-[1.6]">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          <div className="bg-pale-blue rounded-xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#002147] flex items-center justify-center mb-5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="8" y1="3" x2="8" y2="7" />
                  <line x1="16" y1="3" x2="16" y2="7" />
                </svg>
              </div>
              <h3 className="font-display text-[22px] font-medium tracking-[-0.02em] mb-5">
                {t("bookingCardTitle")}
              </h3>
              <ul className="space-y-2.5 mb-7">
                {[t("bookingBullet1"), t("bookingBullet2")].map((bullet, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[14px] text-[#3f3f3f]">
                    <span className="w-4 h-4 rounded-full bg-[#002147] flex items-center justify-center shrink-0">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1.5,4.5 3.7,6.5 7.5,2.5" />
                      </svg>
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              data-cal-link={CAL_LINK}
              data-cal-namespace={CAL_NAMESPACE}
              data-cal-config={JSON.stringify({ layout: "month_view", theme: "light" })}
              className="inline-flex items-center justify-center gap-2 bg-[#002147] text-white text-[14px] font-medium px-6 py-3 rounded-lg hover:bg-[#001833] transition-colors duration-200 cursor-pointer"
            >
              {t("bookingCta")}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="7" x2="13" y2="7" />
                <polyline points="8,2 13,7 8,12" />
              </svg>
            </button>
          </div>

          <div id="callback" className="bg-white border border-[#e5e4e2] rounded-xl p-7">
            <p className="text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-[#696969] mb-2">
              {t("callbackTitle")}
            </p>
            <p className="text-[13px] text-[#696969] leading-[1.55] mb-5">
              {t("callbackDescription")}
            </p>
            <CallbackForm />
          </div>
        </div>
      </div>
    </section>
  );
}
