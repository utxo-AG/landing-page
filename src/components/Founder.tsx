import { getTranslations } from "next-intl/server";

export default async function Founder() {
  const t = await getTranslations("Founder");

  return (
    <section className="px-6 py-24">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[760px] mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="shrink-0 w-[120px] h-[120px] rounded-full overflow-hidden border border-[#e8e8e8]">
            <img
              src="/patrick.jpg"
              alt={t("alt")}
              className="w-full h-full object-cover scale-[1.35] origin-center"
            />
          </div>

          <div>
            <blockquote className="text-[17px] md:text-[19px] leading-[1.65] text-[#555] mb-5">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[15px] font-bold tracking-[-0.2px]">{t("name")}</p>
                <p className="text-[13px] text-[#999]">{t("role")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
