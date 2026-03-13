"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

export default function SlideWrapper({
  children,
  className = "",
  dark = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`min-h-[100dvh] w-full snap-start flex items-center justify-center px-6 md:px-12 lg:px-20 ${
        dark ? "bg-[#111] text-white" : "bg-white text-[#111]"
      } ${className}`}
    >
      <motion.div
        className="w-full max-w-[1100px] py-16 md:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
