"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePrintMode } from "./PrintContext";

export default function WelcomeSlide({
  company,
  contact,
  logo,
}: {
  company: string;
  contact?: string;
  logo?: string;
}) {
  const t = useTranslations("PitchWelcome");
  const isPrint = usePrintMode();

  return (
    <section className="min-h-[100dvh] w-full snap-start flex items-center justify-center bg-[#111] text-white px-6">
      <div className="text-center max-w-[800px]">
        {logo && (
          isPrint ? (
            <div className="mb-12 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo}
                alt={`${company} Logo`}
                className="max-h-[80px] max-w-[240px] object-contain brightness-0 invert"
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-12 flex justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo}
                alt={`${company} Logo`}
                className="max-h-[80px] max-w-[240px] object-contain brightness-0 invert"
              />
            </motion.div>
          )
        )}

        {isPrint ? (
          <p className="text-[#888] text-sm font-mono tracking-widest uppercase mb-6">
            {t("presentationFor")}
          </p>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#888] text-sm font-mono tracking-widest uppercase mb-6"
          >
            {t("presentationFor")}
          </motion.p>
        )}

        {isPrint ? (
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-tight mb-6">
            {company}
          </h1>
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-tight mb-6"
          >
            {company}
          </motion.h1>
        )}

        {contact && (
          isPrint ? (
            <p className="text-[#999] text-lg md:text-xl">
              {t("greeting", { contact })}
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-[#999] text-lg md:text-xl"
            >
              {t("greeting", { contact })}
            </motion.p>
          )
        )}

        {isPrint ? (
          <div className="mt-16 flex items-center justify-center gap-3 text-[#555] text-xs font-mono">
            <span>{t("footer")}</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-3 text-[#555] text-xs font-mono"
          >
            <span>{t("footer")}</span>
          </motion.div>
        )}

        {isPrint ? null : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-12 text-[#555] text-xs animate-bounce"
          >
            ↓
          </motion.div>
        )}
      </div>
    </section>
  );
}
