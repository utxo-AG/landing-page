"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { CHAT_MESSAGES } from "@/lib/pitch-constants";

const TYPING_SPEED = 45;

function TypeWriter({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");

    const id = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, TYPING_SPEED);

    return () => clearInterval(id);
  }, [text, onDone]);

  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[14px] bg-[#999] ml-0.5 align-middle animate-pulse" />
      )}
    </>
  );
}

function EmailVisual() {
  return (
    <motion.div
      variants={itemVariants}
      className="hidden md:flex flex-col items-center justify-center"
    >
      <div className="relative w-[240px] h-[300px]">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#e5e5e5] overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="bg-[#fafafa] border-b border-[#eee] px-4 py-2.5 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ddd]" />
              <span className="w-2 h-2 rounded-full bg-[#ddd]" />
              <span className="w-2 h-2 rounded-full bg-[#ddd]" />
            </div>
            <span className="text-[9px] font-mono text-[#bbb]">inbox</span>
          </div>
          {[
            { initials: "O", name: "Otto", bg: "#1e2a4a", textColor: "#333", delay: 0.65 },
            { initials: "M", name: "M. Weber", bg: "#ddd", textColor: "#bbb", delay: 0.8 },
            { initials: "S", name: "S. Keller", bg: "#ddd", textColor: "#bbb", delay: 0.95 },
          ].map((row, i) => (
            <motion.div
              key={i}
              className="px-4 py-3 border-b border-[#f5f5f5] last:border-0"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: row.delay, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: row.bg }}>
                  <span className={`text-[6px] font-bold ${i === 0 ? "text-white" : "text-[#999]"}`}>{row.initials}</span>
                </span>
                <span className="text-[10px] font-medium" style={{ color: row.textColor }}>{row.name}</span>
                <span className="text-[8px] text-[#ccc] ml-auto font-mono">09:{10 + i * 12}</span>
              </div>
              <div className="h-[6px] bg-[#f0f0f0] rounded-full w-[85%]" />
              <div className="h-[6px] bg-[#f5f5f5] rounded-full w-[60%] mt-1" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0 w-[100px] h-[100px] rounded-full overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-2 border-white"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image src="/images/pitch/otto-pfp.png" alt="Otto" fill className="object-cover" sizes="100px" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Solution() {
  const t = useTranslations("Pitch.Solution");
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingIndex, setTypingIndex] = useState(-1);
  const [showInbox, setShowInbox] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMsgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visibleCount > 0 && lastMsgRef.current) {
      setTimeout(() => {
        const el = lastMsgRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const overflow = rect.bottom + 80 - window.innerHeight;
        if (overflow > 0) {
          const scrollContainer = el.closest("section")?.parentElement;
          if (scrollContainer) {
            scrollContainer.scrollBy({ top: overflow, behavior: "smooth" });
          }
        }
      }, 450);
    }
  }, [visibleCount]);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const showNextMessage = useCallback((step: number) => {
    if (step >= CHAT_MESSAGES.length) return;
    setTypingIndex(step);
    setVisibleCount(step + 1);
  }, []);

  const handleTypingDone = useCallback(() => {
    const next = typingIndex + 1;
    setTypingIndex(-1);
    if (next < CHAT_MESSAGES.length) {
      const pause = CHAT_MESSAGES[next].sender === "human" ? 3500 : 2800;
      timerRef.current = setTimeout(() => showNextMessage(next), pause);
    }
  }, [typingIndex, showNextMessage]);

  const startDemo = useCallback(() => {
    if (showInbox) return;
    setShowInbox(true);
    setVisibleCount(0);
    setTypingIndex(-1);
    timerRef.current = setTimeout(() => showNextMessage(0), 900);
  }, [showInbox, showNextMessage]);

  const resetDemo = useCallback(() => {
    clearTimers();
    setShowInbox(false);
    setVisibleCount(0);
    setTypingIndex(-1);
  }, [clearTimers]);

  return (
    <SlideWrapper variant="rose">
      <motion.p
        variants={itemVariants}
        className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4"
      >
        {t("label")}
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-10"
      >
        {t("headline1")}
        <br />
        <span className="text-[#999]">{t("headline2")}</span>
      </motion.h2>

      <motion.div variants={itemVariants}>
        <AnimatePresence mode="wait">
          {!showInbox ? (
            <motion.div
              key="cards"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center mb-10">
                <EmailVisual />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="hover-card bg-[#f5f5f5] rounded-lg p-8 md:p-10 transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    <p className="text-[#999] text-xs font-mono tracking-[0.15em] uppercase mb-4">{t("typicalAI")}</p>
                    <p className="text-[#666] text-sm leading-relaxed">
                      {t("typicalAIDesc")}
                    </p>
                  </div>
                  <div className="hover-card bg-[#111] text-white rounded-lg p-8 md:p-10 transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                    <p className="text-[#888] text-xs font-mono tracking-[0.15em] uppercase mb-4">{t("coworker")}</p>
                    <p className="text-[#ccc] text-sm leading-relaxed">
                      {t("coworkerDesc")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={startDemo}
                  className="flex items-center gap-2 text-[#999] text-xs font-mono tracking-[0.1em] uppercase hover:text-[#111] transition-colors duration-300 select-none"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 1.5L12 7L3 12.5V1.5Z" fill="currentColor" />
                  </svg>
                  {t("watchDemo")}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="inbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="max-w-[900px] mx-auto">
                <div className="border border-[#e5e5e5] rounded-t-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                  <div className="bg-[#fafafa] border-b border-[#e5e5e5] px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ddd]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ddd]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ddd]" />
                      </div>
                      <span className="text-[#999] text-xs font-mono">{t("inbox")}</span>
                    </div>
                    <span className="text-[#ccc] text-xs font-mono">{t("today")}</span>
                  </div>

                  <div className="px-5 py-3 border-b border-[#f0f0f0]">
                    <p className="text-xs text-[#999] font-mono tracking-wide uppercase">{t("subject")}</p>
                    <p className="text-sm font-medium text-[#333] mt-0.5">{t("subjectText")}</p>
                  </div>
                </div>

                <div className="border-x border-b border-[#e5e5e5] rounded-b-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] divide-y divide-[#f0f0f0]">
                  {CHAT_MESSAGES.map((msg, i) => {
                    const msgText = t(`${msg.key}Text`);
                    const msgFrom = t(`${msg.key}From`);
                    const actions = msg.actionCount > 0
                      ? Array.from({ length: msg.actionCount }, (_, j) => t(`${msg.key}Action${j + 1}`))
                      : [];

                    return (
                      <AnimatePresence key={i}>
                        {i < visibleCount && (
                          <motion.div
                            ref={i === visibleCount - 1 ? lastMsgRef : undefined}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_200px]">
                              <div className="px-5 py-4">
                                <div className="flex items-baseline justify-between mb-1.5">
                                  <div className="flex items-center gap-2">
                                    {msg.sender === "agent" ? (
                                      <img src="/images/pitch/otto-pfp.png" alt="Otto" className="w-5 h-5 rounded-full object-cover" />
                                    ) : (
                                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold bg-[#e8e8e8] text-[#666]">
                                        T
                                      </span>
                                    )}
                                    <span className="text-xs font-medium text-[#333]">{msgFrom}</span>
                                  </div>
                                  <span className="text-[10px] text-[#bbb] font-mono">{msg.time}</span>
                                </div>
                                <p className="text-sm text-[#555] leading-relaxed pl-7">
                                  {typingIndex === i ? (
                                    <TypeWriter text={msgText} onDone={handleTypingDone} />
                                  ) : (
                                    msgText
                                  )}
                                </p>
                              </div>

                              {actions.length > 0 && (
                                <div className="hidden md:flex flex-col justify-center py-3 pr-5 border-l border-[#f0f0f0] pl-4">
                                  {actions.map((action, j) => (
                                    <motion.div
                                      key={j}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: typingIndex === i ? 0.6 + j * 0.5 : 0,
                                      }}
                                      className="flex items-start gap-1.5 py-0.5"
                                    >
                                      <span className="text-[#ddd] text-[8px] mt-[3px]">{"\u25CF"}</span>
                                      <span className="text-[10px] font-mono text-[#aaa] leading-snug">
                                        {action}
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    );
                  })}
                </div>
              </div>

              {visibleCount >= CHAT_MESSAGES.length && typingIndex === -1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex justify-center mt-6"
                >
                  <button
                    onClick={resetDemo}
                    className="text-[#bbb] text-xs font-mono tracking-[0.1em] uppercase hover:text-[#999] transition-colors duration-300 cursor-pointer"
                  >
                    {t("back")}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SlideWrapper>
  );
}
