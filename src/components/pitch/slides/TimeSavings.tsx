"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SlideWrapper, { itemVariants } from "../SlideWrapper";
import { usePrintMode } from "../PrintContext";

const TASKS = [
  { key: "task1" },
  { key: "task2" },
  { key: "task3" },
];

const BENEFIT_ITEMS = [
  { key: "item1", dark: false, highlighted: true },
  { key: "item2", dark: false, highlighted: false },
  { key: "item3", dark: true, highlighted: false },
];

function BeforeAfterVisual({ t, isPrint }: { t: (key: string) => string; isPrint: boolean }) {
  const Wrapper = isPrint ? "div" : motion.div;
  const wrapperProps = isPrint ? {} : {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { delay: 0.3, duration: 0.8 },
  };

  return (
    <Wrapper className="hidden md:block" {...wrapperProps}>
      <div className="w-[300px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#e5e5e5] overflow-hidden">
        <div className="bg-[#fafafa] border-b border-[#eee] px-5 py-3 flex justify-between">
          <span className="text-[11px] font-mono text-[#666] tracking-wider uppercase">{t("beforeLabel")}</span>
          <span className="text-[11px] font-mono text-[#666] tracking-wider uppercase">{t("afterLabel")}</span>
        </div>
        <div className="p-5 space-y-5">
          {TASKS.map((task, i) => {
            const ItemWrapper = isPrint ? "div" : motion.div;
            const itemProps = isPrint ? {} : {
              initial: { opacity: 0, x: -10 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: 0.5 + i * 0.2, duration: 0.4 },
            };
            return (
              <ItemWrapper key={task.key} {...itemProps}>
                <p className="text-sm font-bold text-[#333] mb-2">{t(`${task.key}Name`)}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#999] line-through flex-1">{t(`${task.key}Before`)}</span>
                  <span className="text-[#ccc]">→</span>
                  <span className="text-sm font-medium text-[#1e2a4a] flex-1 text-right">{t(`${task.key}After`)}</span>
                </div>
              </ItemWrapper>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}

export default function TimeSavings() {
  const t = useTranslations("Pitch.TimeSavings");
  const isPrint = usePrintMode();

  return (
    <SlideWrapper variant="rose">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-center">
        <motion.div variants={itemVariants}>
          <BeforeAfterVisual t={t} isPrint={isPrint} />
        </motion.div>

        <div>
          <motion.p variants={itemVariants} className="text-[#666] text-sm font-mono tracking-[0.15em] uppercase mb-4">
            {t("label")}
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-10">
            {t("headline1")}
            <br />
            <span className="text-[#666]">{t("headline2")}</span>
          </motion.h2>

          {/* Mobile: before/after cards */}
          <div className="md:hidden space-y-4 mb-8">
            {TASKS.map((task) => (
              <motion.div key={task.key} variants={itemVariants} className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-bold text-[#333] mb-2">{t(`${task.key}Name`)}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#999] line-through flex-1">{t(`${task.key}Before`)}</span>
                  <span className="text-[#ccc]">→</span>
                  <span className="text-sm font-medium text-[#1e2a4a] flex-1 text-right">{t(`${task.key}After`)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4 mb-8">
            {BENEFIT_ITEMS.map((item) => (
              <motion.div
                key={item.key}
                variants={itemVariants}
                className={`hover-card rounded-lg p-6 transition-all duration-300 ${
                  item.dark
                    ? "bg-[#111] text-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                    : item.highlighted
                      ? "bg-[#1e2a4a] text-white hover:shadow-[0_8px_30px_rgba(30,42,74,0.3)]"
                      : "bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                }`}
              >
                <p className="font-bold text-base mb-2">{t(`${item.key}Title`)}</p>
                <p className={`text-sm leading-relaxed ${item.dark || item.highlighted ? "text-[#ccc]" : "text-[#666]"}`}>
                  {t(`${item.key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={itemVariants} className="text-[#666] text-sm">
            {t("footnote")}
          </motion.p>
        </div>
      </div>
    </SlideWrapper>
  );
}
