import { getTranslations } from "next-intl/server";
import { CUSTOMER_STORIES } from "@/lib/constants";

export default async function CustomerStories() {
  const t = await getTranslations("CustomerStories");

  return (
    <section id="customer-stories" className="px-6 py-28 bg-white">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[560px] mb-16">
          <p className="text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-[#696969] mb-4">
            {t("label")}
          </p>
          <h2 className="font-display text-[36px] md:text-[48px] font-medium tracking-[-0.028em] leading-[1] mb-5">
            {t("title")}
          </h2>
          <p className="text-[17px] md:text-[18px] text-[#696969] leading-[1.55]">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CUSTOMER_STORIES.map((key) => (
            <article
              key={key}
              className="bg-white border border-[#e5e4e2] rounded-xl p-7 flex flex-col hover:border-[#d4d4d4] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#a3a3a3] mb-3">
                {t(`${key}.industry`)}
              </p>
              <h3 className="font-display text-[19px] font-medium tracking-[-0.02em] leading-[1.15] mb-5">
                {t(`${key}.company`)}
              </h3>

              <div className="space-y-4 mb-5">
                <Block label="Problem" text={t(`${key}.problem`)} />
                <Block label="Coworker" text={t(`${key}.solution`)} />
              </div>

              <div className="mt-auto pt-4 border-t border-[#e5e4e2]">
                <p className="text-[13px] text-[#111] font-medium leading-[1.5]">
                  {t(`${key}.outcome`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#696969] mb-1.5">
        {label}
      </p>
      <p className="text-[14px] text-[#3f3f3f] leading-[1.55]">{text}</p>
    </div>
  );
}
