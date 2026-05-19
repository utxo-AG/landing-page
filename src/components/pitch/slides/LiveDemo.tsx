"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";

function DemoPlaceholder() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-white/5" />
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-white"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/70">Live</span>
        </div>
      </div>

      <div className="relative p-8 md:p-12 min-h-[320px]">
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08), transparent 55%)",
          }}
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative space-y-4">
          {[88, 72, 94, 60, 80, 68, 76].map((width, i) => (
            <motion.div
              key={i}
              className="h-2.5 rounded-full bg-white/15"
              style={{ width: `${width}%` }}
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.18,
              }}
            />
          ))}
        </div>

        <div className="relative mt-8 flex items-center gap-2 text-white/40 font-mono text-[11px] tracking-wider">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>processing</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ...
          </motion.span>
        </div>
      </div>
    </div>
  );
}

export default function LiveDemo() {
  const t = useTranslations("Pitch.LiveDemo");

  return (
    <SlideWrapper variant="glow">
      <motion.p
        variants={itemVariants}
        className="text-[#4a5578] text-sm font-mono tracking-[0.15em] uppercase mb-4"
      >
        {t("label")}
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-[32px] md:text-[52px] font-bold leading-[1.1] tracking-tight mb-10 md:mb-14 text-white max-w-[800px]"
      >
        {t("headline1")}
        <br />
        <span className="text-white/50">{t("headline2")}</span>
      </motion.h2>

      <motion.div variants={itemVariants} className="max-w-[820px] mx-auto">
        <DemoPlaceholder />
      </motion.div>
    </SlideWrapper>
  );
}
