"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-[#111] px-6 py-12 md:py-16">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/utxo-wordmark-inverse.svg"
            alt="utxo AG"
            className="h-9 w-auto"
          />
          <span className="text-[13px] font-mono text-white/50">{t("copyright", { year: new Date().getFullYear() })}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/40">
          <Link href="/imprint" className="hover:text-white/80 transition-colors duration-200">{t("imprint")}</Link>
          <Link href="/privacy" className="hover:text-white/80 transition-colors duration-200">{t("privacyPolicy")}</Link>
          <Link href="/terms" className="hover:text-white/80 transition-colors duration-200">{t("termsOfService")}</Link>
          <Link href="/acceptable-use" className="hover:text-white/80 transition-colors duration-200">{t("acceptableUsePolicy")}</Link>
          <Link href="/dpa" className="hover:text-white/80 transition-colors duration-200">{t("dataProcessingAgreement")}</Link>
        </div>
      </div>
    </footer>
  );
}
