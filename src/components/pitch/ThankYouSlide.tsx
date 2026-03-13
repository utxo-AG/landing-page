"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "@/i18n/navigation";

export default function ThankYouSlide() {
  const t = useTranslations("PitchThankYou");
  const f = useTranslations("Footer");
  const [url, setUrl] = useState("");
  const [showQr, setShowQr] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setShowQr(true), 5000);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="min-h-[100dvh] w-full snap-start flex flex-col items-center justify-center bg-[#111] text-white px-6 overflow-hidden relative"
    >
      <div className="flex items-center justify-center w-full max-w-[1100px] gap-16 md:gap-24">
        <motion.div
          animate={{ x: showQr ? -40 : 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12 flex justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-16 h-16 md:w-20 md:h-20">
              <rect width="48" height="48" rx="10" fill="#fff" />
              <path d="M12 8 L12 30 Q12 42 22 42 L26 42 Q36 42 36 30 L36 22" stroke="#111" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M24 8 L24 26 Q24 33 30 33 L36 33" stroke="#111" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="40" cy="22" r="3.8" fill="#111" />
              <circle cx="40" cy="33" r="3.8" fill="#111" />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-tight mb-6"
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-[#666] text-lg md:text-xl font-light"
          >
            {t("subline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 text-[#555] text-xs font-mono"
          >
            {t("footer")}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showQr && url && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0"
            >
              <div className="rounded-3xl overflow-hidden bg-white p-5 md:p-6">
                <QRCodeSVG
                  value={url}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#111111"
                  level="M"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-6 py-8">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg width="16" height="19" viewBox="6 4.5 37 39" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M10 8 L10 30 Q10 40 20 40 L24 40 Q34 40 34 30 L34 22" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 8 L22 26 Q22 32 28 32 L34 32" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="38" cy="22" r="3.5" fill="#fff"/>
              <circle cx="38" cy="32" r="3.5" fill="#fff"/>
            </svg>
            <span className="text-[13px] text-white/40">{f("copyright", { year: new Date().getFullYear() })}</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-white/30">
            <Link href="/imprint" className="hover:text-white/60 transition-colors duration-200">{f("imprint")}</Link>
            <Link href="/privacy" className="hover:text-white/60 transition-colors duration-200">{f("privacyPolicy")}</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors duration-200">{f("termsOfService")}</Link>
            <Link href="/acceptable-use" className="hover:text-white/60 transition-colors duration-200">{f("acceptableUsePolicy")}</Link>
            <Link href="/dpa" className="hover:text-white/60 transition-colors duration-200">{f("dataProcessingAgreement")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
