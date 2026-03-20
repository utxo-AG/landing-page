"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePrintMode } from "../PrintContext";

export default function TitleSlide() {
  const t = useTranslations("Pitch.TitleSlide");
  const isPrint = usePrintMode();

  return (
    <section
      className="min-h-[100dvh] w-full snap-start flex items-center justify-center px-6 md:px-12 lg:px-20 relative md:overflow-hidden py-12 md:py-0"
      style={{
        background: "radial-gradient(ellipse at 80% 50%, rgba(30,42,74,0.06) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(196,168,130,0.04) 0%, transparent 50%), linear-gradient(170deg, #ffffff 0%, #f5f0ea 100%)",
      }}
    >
      <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-center">
        <div>
          {isPrint ? (
            <p className="text-[#666] text-sm font-mono tracking-[0.2em] uppercase mb-4 md:mb-8">
              {t("label")}
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#666] text-sm font-mono tracking-[0.2em] uppercase mb-4 md:mb-8"
            >
              {t("label")}
            </motion.p>
          )}

          {isPrint ? (
            <h1 className="text-[36px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] tracking-tight">
              {t("headline1")}
              <br />
              {t("headline2")}
            </h1>
          ) : (
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[36px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] tracking-tight"
            >
              {t("headline1")}
              <br />
              {t("headline2")}
            </motion.h1>
          )}

          {isPrint ? (
            <h2 className="text-[26px] md:text-[44px] lg:text-[56px] font-bold leading-[1.1] text-[#999] mt-2">
              {t("subtitle")}
            </h2>
          ) : (
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-[26px] md:text-[44px] lg:text-[56px] font-bold leading-[1.1] text-[#999] mt-2"
            >
              {t("subtitle")}
            </motion.h2>
          )}

          {isPrint ? (
            <div className="md:hidden mt-6 flex justify-center">
              <div className="relative w-[200px] h-[240px]">
                <Image
                  src="/images/pitch/otto-portrait.png"
                  alt="Otto — AI CoWorker"
                  fill
                  className="object-contain object-bottom"
                  sizes="240px"
                  priority
                />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="md:hidden mt-6 flex justify-center"
            >
              <div className="relative w-[200px] h-[240px]">
                <Image
                  src="/images/pitch/otto-portrait.png"
                  alt="Otto — AI CoWorker"
                  fill
                  className="object-contain object-bottom"
                  sizes="240px"
                  priority
                />
              </div>
            </motion.div>
          )}

          {isPrint ? (
            <p className="text-[#666] text-base md:text-lg mt-6 md:mt-8 max-w-[500px]">
              {t("description")}
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-[#666] text-base md:text-lg mt-6 md:mt-8 max-w-[500px]"
            >
              {t("description")}
            </motion.p>
          )}
        </div>

        {isPrint ? (
          <div className="hidden md:flex justify-center">
            <div className="relative md:w-[340px] md:h-[420px] lg:w-[400px] lg:h-[500px]">
              <Image
                src="/images/pitch/otto-portrait.png"
                alt="Otto — AI CoWorker"
                fill
                className="object-contain object-bottom"
                sizes="400px"
                priority
              />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden md:flex justify-center"
          >
            <div className="relative md:w-[340px] md:h-[420px] lg:w-[400px] lg:h-[500px]">
              <Image
                src="/images/pitch/otto-portrait.png"
                alt="Otto — AI CoWorker"
                fill
                className="object-contain object-bottom"
                sizes="400px"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
