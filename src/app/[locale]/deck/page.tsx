"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

type DeckType = "sales" | "infosheet" | "market";
type Lang = "de" | "en";

function deckPath(type: DeckType) {
  return type === "sales" ? "pitch" : type === "market" ? "pitch-market" : "pitch-infosheet";
}

export default function DeckLauncher() {
  const t = useTranslations("DeckLauncher");
  const currentLocale = useLocale();

  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [logo, setLogo] = useState("");
  const [deck, setDeck] = useState<DeckType>("sales");
  const [lang, setLang] = useState<Lang>(currentLocale as Lang);

  function buildUrl(raw = false) {
    const path = deckPath(deck);
    if (raw) return `/${lang}/${path}`;

    const params = new URLSearchParams();
    if (company.trim()) params.set("company", company.trim());
    if (contact.trim()) params.set("contact", contact.trim());
    if (logo.trim()) params.set("logo", logo.trim());

    const query = params.toString();
    return `/${lang}/${path}${query ? `?${query}` : ""}`;
  }

  function handleOpen() {
    window.open(buildUrl(), "_blank");
  }

  function handleOpenRaw(type: DeckType) {
    window.open(`/${lang}/${deckPath(type)}`, "_blank");
  }

  function handleDownloadPdf() {
    const url = buildUrl() + (buildUrl().includes("?") ? "&" : "?") + "print=true";
    window.open(url, "_blank");
  }

  const isValid = company.trim().length > 0;

  return (
    <div className="min-h-[100dvh] bg-[#111] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-[480px]">
        <div className="mb-10">
          <h1 className="text-[32px] md:text-[40px] font-bold tracking-tight leading-[1.1]">
            {t("title")}
          </h1>
          <p className="text-[#888] mt-2 text-sm">{t("subtitle")}</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-[#888] uppercase tracking-widest mb-2">
              {t("companyLabel")} *
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={t("companyPlaceholder")}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-[#666] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#888] uppercase tracking-widest mb-2">
              {t("contactLabel")}
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={t("contactPlaceholder")}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-[#666] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#888] uppercase tracking-widest mb-2">
              {t("logoLabel")}
            </label>
            <input
              type="url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder={t("logoPlaceholder")}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-[#666] transition-colors font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#888] uppercase tracking-widest mb-2">
              {t("deckLabel")}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["sales", "infosheet", "market"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setDeck(type)}
                  onDoubleClick={() => handleOpenRaw(type)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all select-none ${
                    deck === type
                      ? "bg-white text-[#111] border-white"
                      : "bg-[#1a1a1a] text-[#888] border-[#333] hover:border-[#666] hover:text-white"
                  }`}
                >
                  {type === "sales" ? t("deckSales") : type === "market" ? t("deckMarket") : t("deckInfosheet")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#888] uppercase tracking-widest mb-2">
              {t("langLabel")}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["de", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                    lang === l
                      ? "bg-white text-[#111] border-white"
                      : "bg-[#1a1a1a] text-[#888] border-[#333] hover:border-[#666] hover:text-white"
                  }`}
                >
                  {l === "de" ? t("langDe") : t("langEn")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={handleOpen}
              disabled={!isValid}
              className={`py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all ${
                isValid
                  ? "bg-white text-[#111] hover:bg-[#eee] cursor-pointer"
                  : "bg-[#333] text-[#666] cursor-not-allowed"
              }`}
            >
              {t("openButton")} →
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={!isValid}
              className={`py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all border ${
                isValid
                  ? "bg-transparent text-white border-[#555] hover:border-white cursor-pointer"
                  : "bg-transparent text-[#666] border-[#333] cursor-not-allowed"
              }`}
            >
              {t("downloadButton")} ↓
            </button>
          </div>

          <div className="border-t border-[#333] mt-8 pt-6">
            <label className="block text-xs font-mono text-[#888] uppercase tracking-widest mb-3">
              {t("defaultDownloads")}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["sales", "infosheet", "market"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    const path = deckPath(type);
                    window.open(`/${lang}/${path}?print=true`, "_blank");
                  }}
                  className="py-3 rounded-lg border border-[#333] text-[#888] text-sm font-medium hover:border-[#666] hover:text-white transition-all cursor-pointer"
                >
                  {type === "sales" ? t("deckSales") : type === "market" ? t("deckMarket") : t("deckInfosheet")} ↓
                </button>
              ))}
            </div>
          </div>

          <p className="text-[#555] text-xs text-center mt-5">{t("hint")}</p>
        </div>
      </div>
    </div>
  );
}
