import { getTranslations } from "next-intl/server";
import CopyEmail from "@/components/CopyEmail";

export default async function CTABar() {
  const t = await getTranslations("CTABar");

  return (
    <section className="bg-[#111] py-32 px-6">
      <div className="max-w-[520px] mx-auto text-center">
        <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-[-1.5px] text-white leading-[1.05] mb-5">
          {t("title")}
        </h2>
        <p className="text-[16px] text-white/40 mb-12 leading-[1.6]">
          {t("description")}
        </p>
        <CopyEmail className="inline-flex items-center gap-2 bg-white text-[#111] text-[14px] font-medium px-6 py-3 rounded-full hover:bg-[#f0f0f0] transition-colors duration-200 cursor-pointer">
          <span className="inline-flex items-center gap-2">
            business@utxoag.com
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="7" x2="13" y2="7" />
              <polyline points="8,2 13,7 8,12" />
            </svg>
          </span>
        </CopyEmail>
      </div>
    </section>
  );
}
