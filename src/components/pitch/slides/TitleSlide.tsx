"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TitleSlide() {
  const t = useTranslations("Pitch.TitleSlide");

  return (
    <section className="min-h-[100dvh] w-full snap-start flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-[1100px] text-center md:text-left">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#999] text-xs font-mono tracking-[0.2em] uppercase mb-8"
        >
          {t("label")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[42px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] tracking-tight"
        >
          {t("headline1")}
          <br />
          {t("headline2")}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-[32px] md:text-[44px] lg:text-[56px] font-bold leading-[1.1] text-[#999] mt-2"
        >
          {t("subtitle")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-[#888] text-base md:text-lg mt-8 max-w-[500px]"
        >
          {t("description")}
        </motion.p>
      </div>
    </section>
  );
}
