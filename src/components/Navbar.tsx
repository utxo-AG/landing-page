"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import CopyEmail from "@/components/CopyEmail";
import LocaleSwitcher from "@/components/LocaleSwitcher";

function Logo() {
  return (
    <svg width="26" height="30" viewBox="6 4.5 37 39" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 8 L10 30 Q10 40 20 40 L24 40 Q34 40 34 30 L34 22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 8 L22 26 Q22 32 28 32 L34 32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="38" cy="22" r="3.5" fill="currentColor"/>
      <circle cx="38" cy="32" r="3.5" fill="currentColor"/>
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Navbar");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-b border-[#e6e6e6] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-[16px] font-bold tracking-[-0.4px]">utxo AG</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-[#888] hover:text-[#111] transition-colors duration-200"
            >
              {t(item.key)}
            </a>
          ))}
          <CopyEmail className="text-[13px] font-medium text-[#111] bg-[#f5f5f5] px-4 py-1.5 rounded-full hover:bg-[#eee] transition-colors duration-200 cursor-pointer" />
          <LocaleSwitcher />
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label={t("toggleMenu")}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#111" strokeWidth="1.5">
            {open ? (
              <>
                <line x1="4" y1="4" x2="14" y2="14" />
                <line x1="14" y1="4" x2="4" y2="14" />
              </>
            ) : (
              <>
                <line x1="2" y1="5" x2="16" y2="5" />
                <line x1="2" y1="13" x2="16" y2="13" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-[#f0f0f0] px-6 py-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2.5 text-[14px] text-[#888] hover:text-[#111]"
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </a>
          ))}
          <CopyEmail className="block py-2.5 text-[14px] font-medium text-[#111] cursor-pointer" />
          <div className="py-2.5">
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
