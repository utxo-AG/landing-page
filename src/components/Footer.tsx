"use client";

export default function Footer() {
  return (
    <footer className="bg-[#111] px-6 py-8">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg width="16" height="19" viewBox="6 4.5 37 39" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 8 L10 30 Q10 40 20 40 L24 40 Q34 40 34 30 L34 22" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 8 L22 26 Q22 32 28 32 L34 32" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="38" cy="22" r="3.5" fill="#fff"/>
            <circle cx="38" cy="32" r="3.5" fill="#fff"/>
          </svg>
          <span className="text-[13px] text-white/40">&copy; {new Date().getFullYear()} utxo AG</span>
        </div>
        <div className="flex items-center gap-6 text-[12px] text-white/30">
          <a href="/imprint" className="hover:text-white/60 transition-colors duration-200">Imprint</a>
          <a href="/privacy" className="hover:text-white/60 transition-colors duration-200">Privacy Policy</a>
          <a href="/terms" className="hover:text-white/60 transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
