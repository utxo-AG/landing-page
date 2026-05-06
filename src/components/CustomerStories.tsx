import { getTranslations } from "next-intl/server";
import { CUSTOMER_STORIES } from "@/lib/constants";

export default async function CustomerStories() {
  const t = await getTranslations("CustomerStories");

  return (
    <section id="customer-stories" className="px-6 py-28 border-t border-[#f0f0f0]">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[560px] mb-16">
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
          {CUSTOMER_STORIES.map((key) => (
            <article
              key={key}
              className="bg-white border border-[#eee] rounded-2xl p-7 flex flex-col hover:border-[#ccc] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#bbb] mb-3">
                {t(`${key}.industry`)}
              </p>
              <h3 className="text-[18px] font-bold tracking-[-0.4px] mb-5">
                {t(`${key}.company`)}
              </h3>

              <div className="space-y-4 mb-5">
                <Block label="Problem" text={t(`${key}.problem`)} />
                <Block label="Coworker" text={t(`${key}.solution`)} />
              </div>

              <div className="mt-auto pt-4 border-t border-[#f0f0f0]">
                <p className="text-[13px] text-[#333] font-medium leading-[1.5]">
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
      <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#999] mb-1.5">
        {label}
      </p>
      <p className="text-[14px] text-[#555] leading-[1.55]">{text}</p>
    </div>
  );
}
