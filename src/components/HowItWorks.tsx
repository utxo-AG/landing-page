import { getTranslations } from "next-intl/server";

const STEPS = [
  { num: "01", key: "step1", icon: "discovery" as const },
  { num: "02", key: "step2", icon: "build" as const },
  { num: "03", key: "step3", icon: "launch" as const },
];

export default async function HowItWorks() {
  const t = await getTranslations("HowItWorks");

  return (
    <section id="how-it-works" className="px-6 py-28 border-t border-[#f0f0f0]">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[640px] mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-[#eee] rounded-2xl p-7 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#111] flex items-center justify-center shrink-0">
                  <StepIcon variant={step.icon} />
                </div>
                <span className="text-[12px] font-mono font-bold text-[#bbb]">
                  {step.num}
                </span>
              </div>
              <h3 className="text-[19px] font-bold tracking-[-0.4px] mb-3">
                {t(`${step.key}Title`)}
              </h3>
              <p className="text-[14px] text-[#777] leading-[1.65] mb-5">
                {t(`${step.key}Description`)}
              </p>
              <div className="mt-auto pt-4 border-t border-[#f0f0f0]">
                <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#999]">
                  {t(`${step.key}Meta`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepIcon({ variant }: { variant: "discovery" | "build" | "launch" }) {
  if (variant === "discovery") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h14v9H8l-4 4v-4H3V4z" />
        <line x1="7" y1="8" x2="13" y2="8" />
        <line x1="7" y1="11" x2="11" y2="11" />
      </svg>
    );
  }
  if (variant === "build") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 3l-2.5 2.5 6 6L17 9l-6-6z" />
        <path d="M8.5 5.5L3 11v6h6l5.5-5.5" />
        <line x1="6" y1="14" x2="9" y2="11" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2c4 2 6 5 6 9-2 1-4 1-6 1s-4 0-6-1c0-4 2-7 6-9z" />
      <circle cx="10" cy="8" r="1.5" />
      <path d="M6 14l-2 4 4-2M14 14l2 4-4-2" />
    </svg>
  );
}
