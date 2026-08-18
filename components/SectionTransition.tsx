"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { NAV_EVENT, sectionMeta } from "./sections";

const PANELS = 6;
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Cortina de transição entre blocos.
 * Ao navegar pela navbar (ou pela dock), painéis verticais sobem cobrindo a
 * tela, o scroll acontece "escondido" e os painéis saem revelando a seção
 * nova — com o rótulo dela no meio.
 */
export default function SectionTransition() {
  const [target, setTarget] = useState<string | null>(null);
  const busy = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onGo = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (!id) return;
      e.preventDefault(); // avisa o helper que a transição foi assumida

      if (reduce) {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
        return;
      }
      if (busy.current) return;
      busy.current = true;
      setTarget(id);

      // cobre (≈520ms) → pula → revela
      window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top =
            el.getBoundingClientRect().top + window.scrollY - (id === "hero" ? 0 : 72);
          if (lenis) lenis.scrollTo(top, { immediate: true });
          else window.scrollTo({ top, behavior: "auto" });
        }
        window.setTimeout(() => setTarget(null), 240);
        window.setTimeout(() => {
          busy.current = false;
        }, 900);
      }, 560);
    };

    window.addEventListener(NAV_EVENT, onGo as EventListener);
    return () => window.removeEventListener(NAV_EVENT, onGo as EventListener);
  }, [lenis]);

  const meta = target ? sectionMeta(target) : null;

  return (
    <AnimatePresence>
      {target && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
        >
          <div className="absolute inset-0 flex">
            {Array.from({ length: PANELS }).map((_, i) => (
              <motion.span
                key={i}
                className="curtain-panel h-full flex-1"
                initial={{ y: "102%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-102%" }}
                transition={{
                  duration: 0.55,
                  ease: EASE,
                  delay: i * 0.045,
                }}
              />
            ))}
          </div>

          <motion.div
            className="absolute inset-0 grid place-items-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.28, duration: 0.3 } }}
            exit={{ opacity: 0, y: -14, transition: { duration: 0.2 } }}
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[13px] font-bold tracking-[0.3em] text-acc">
                {meta?.n}
              </span>
              <span
                className="font-display font-black tracking-[-0.03em] text-cream"
                style={{ fontSize: "clamp(34px,7vw,86px)", lineHeight: 1 }}
              >
                {meta?.label}
              </span>
            </div>
            <motion.span
              className="mt-5 block h-px bg-acc"
              initial={{ width: 0 }}
              animate={{ width: 220, transition: { delay: 0.34, duration: 0.42, ease: EASE } }}
              exit={{ width: 0, transition: { duration: 0.18 } }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
