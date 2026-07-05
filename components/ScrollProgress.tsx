"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Posição horizontal da ponta luminosa (segue o fim da barra).
  const left = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] h-[3px] w-full"
    >
      {/* Barra preenchida */}
      <motion.div
        className="h-full w-full origin-left"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, var(--acc), #ff8a66)",
          willChange: "transform",
        }}
      />

      {/* Ponta com brilho */}
      <motion.span
        className="absolute top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left,
          background: "#ffd0bf",
          boxShadow:
            "0 0 6px 1px rgba(var(--accrgb), 0.9), 0 0 14px 4px rgba(var(--accrgb), 0.7), 0 0 30px 8px rgba(var(--accrgb), 0.4)",
          willChange: "left",
        }}
      />
    </div>
  );
}
