"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { socials, iconMask, whatsappLink } from "./socials";
import { goToSection } from "./sections";

/**
 * Dock flutuante (canto inferior direito).
 * Botão principal = anel de progresso do scroll + ação "voltar ao topo";
 * ao passar o mouse/tocar, abre em leque os atalhos de contato e redes.
 */
export default function FloatingDock() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setVisible((window.scrollY || 0) > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  type DockItem = {
    key: string;
    label: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
  };

  const items: DockItem[] = [
    {
      key: "contato",
      label: "Ir para contato",
      onClick: () => goToSection("contato"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-[18px] w-[18px]">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: whatsappLink,
      icon: <span className="mask-icon h-[18px] w-[18px]" style={{ ["--icon" as string]: iconMask("whatsapp") }} />,
    },
    ...socials
      .filter((s) => s.slug !== "whatsapp")
      .map((s) => ({
        key: s.slug,
        label: s.label,
        href: s.href,
        icon: <span className="mask-icon h-[18px] w-[18px]" style={{ ["--icon" as string]: iconMask(s.slug) }} />,
      })),
  ];

  return (
    <div
      className="fixed bottom-6 right-6 z-[95] flex flex-col items-center gap-2.5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <AnimatePresence>
        {visible &&
          open &&
          items.map((it, i) => {
            const inner = (
              <>
                {it.icon}
                <span className="dock-tip">{it.label}</span>
              </>
            );
            const cls = "dock-btn grid h-11 w-11 place-items-center rounded-full";
            return (
              <motion.div
                key={it.key}
                initial={{ opacity: 0, y: 14, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.7 }}
                transition={{
                  duration: 0.34,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: (items.length - 1 - i) * 0.045,
                }}
              >
                {it.href ? (
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={it.label}
                    data-glass
                    className={cls}
                  >
                    {inner}
                  </a>
                ) : (
                  <button onClick={it.onClick} aria-label={it.label} data-glass className={cls}>
                    {inner}
                  </button>
                )}
              </motion.div>
            );
          })}
      </AnimatePresence>

      <motion.button
        aria-label="Voltar ao topo"
        onClick={() => goToSection("hero")}
        onFocus={() => setOpen(true)}
        data-glass
        data-magnet
        className="dock-main relative grid h-14 w-14 place-items-center rounded-full"
        initial={false}
        animate={
          visible
            ? { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, scale: 0.6, y: 20, pointerEvents: "none" }
        }
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <svg viewBox="0 0 44 44" className="pointer-events-none absolute inset-0 h-full w-full -rotate-90">
          <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(244,239,230,.12)" strokeWidth="1.6" />
          <motion.circle
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="var(--acc)"
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={1}
            style={{ pathLength: p }}
          />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  );
}
