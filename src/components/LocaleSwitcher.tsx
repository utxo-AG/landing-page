"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === "en" ? "de" : "en";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: next })}
      className="text-[12px] font-mono uppercase tracking-[0.06em] text-[#999] hover:text-[#111] transition-colors duration-200"
      aria-label={`Switch to ${next === "de" ? "Deutsch" : "English"}`}
    >
      {next === "de" ? "DE" : "EN"}
    </button>
  );
}
