import { getTranslations } from "next-intl/server";

const BRANDS = [
  { key: "masumi" as const, logo: "/logos/masumi.svg", bg: "#1a0f24" },
  { key: "sokosumi" as const, logo: "/logos/sokosumi.svg", bg: "#0f1a24" },
];

export default async function Heritage() {
  const t = await getTranslations("Heritage");

  return (
    <section className="px-6 py-28 bg-stone">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[640px] mb-16">
          <p className="text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-[#696969] mb-4">
            {t("label")}
          </p>
          <h2 className="font-display text-[36px] md:text-[48px] font-medium tracking-[-0.028em] leading-[1] mb-5">
            {t("title")}
          </h2>
          <p className="text-[17px] md:text-[18px] text-[#3f3f3f] leading-[1.55]">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BRANDS.map((brand) => (
            <a
              key={brand.key}
              href={t(`${brand.key}.href`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-[#d4d4d4] rounded-xl overflow-hidden hover:border-[#a3a3a3] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col"
            >
              <div
                className="aspect-[16/7] flex items-center justify-center"
                style={{ backgroundColor: brand.bg }}
              >
                <img
                  src={brand.logo}
                  alt={brand.key}
                  className="h-7 w-auto object-contain brightness-0 invert"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <p className="text-[15px] text-[#3f3f3f] leading-[1.55] mb-6 font-medium tracking-[-0.01em]">
                  {t(`${brand.key}.subline`)}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#e5e4e2]">
                  <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#a3a3a3]">
                    {t("partnerTag")}
                  </span>
                  <span className="text-[12px] font-medium text-[#3f3f3f] group-hover:text-[#111] inline-flex items-center gap-1.5 transition-colors">
                    {t(`${brand.key}.url`)}
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                      <line x1="1" y1="7" x2="13" y2="7" />
                      <polyline points="8,2 13,7 8,12" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
