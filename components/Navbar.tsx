"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { socials, iconMask } from "./socials";

const links = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "tecnologias", label: "Stack" },
  { id: "projetos", label: "Projetos" },
  { id: "formacao", label: "Formação" },
];

const sectionIds = [
  "hero",
  "sobre",
  "experiencia",
  "tecnologias",
  "projetos",
  "formacao",
  "contato",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ind, setInd] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Estado de rolagem + seção ativa
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > 40);
      let act = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 150) act = id;
      }
      setActive(act);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Breakpoint mobile (< 820px como no design)
  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 820;
      setIsMobile(m);
      if (!m) setOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Posição do indicador deslizante
  useEffect(() => {
    if (isMobile) {
      setInd((p) => ({ ...p, width: 0 }));
      return;
    }
    const el = linkRefs.current[active] || linkRefs.current["hero"];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active, isMobile]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className="nav-shell fixed left-1/2 top-4 z-[80] flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-3.5 rounded-full py-2 pl-4 pr-2 transition-[background,box-shadow] duration-[400ms]"
        style={{
          background: scrolled ? "rgba(24,21,16,.74)" : "rgba(24,21,16,.30)",
          boxShadow: scrolled
            ? "0 12px 36px -18px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.14)"
            : "inset 0 1px 0 rgba(255,255,255,.10)",
        }}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            go("hero");
          }}
          className="shrink-0 font-display text-[18px] font-black tracking-[0.02em] text-acc"
          style={{ transform: "scaleX(1.05)" }}
        >
          JV
        </a>

        {!isMobile && (
          <div className="relative flex gap-0.5">
            <span
              className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-[rgba(244,239,230,.08)] transition-[transform,width] duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{ transform: `translateX(${ind.left}px)`, width: ind.width }}
            />
            {links.map((l) => (
              <a
                key={l.id}
                ref={(el) => {
                  linkRefs.current[l.id] = el;
                }}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
                className="nav-link relative z-[1] whitespace-nowrap rounded-full px-[13px] py-2 font-sans text-[13px] font-semibold"
                style={{ color: active === l.id ? "#F4EFE6" : "#9A938A" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}

        <a
          href="#contato"
          data-glass
          onClick={(e) => {
            e.preventDefault();
            go("contato");
          }}
          className="glass-accent glass-accent-sm inline-flex shrink-0 items-center gap-[7px] rounded-full px-4 py-[9px] font-sans text-[13px] font-bold"
        >
          Contato
        </a>

        {isMobile && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-[rgba(244,239,230,.06)] text-sand"
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[19px] w-[19px]">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[19px] w-[19px]">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        )}
      </nav>

      {/* Menu mobile */}
      <div
        className="fixed left-1/2 top-[74px] z-[79] w-[min(320px,calc(100vw-20px))] rounded-[20px] border border-line p-2.5 backdrop-blur-[20px] backdrop-saturate-150 transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{
          background: "rgba(22,19,15,.92)",
          boxShadow:
            "0 26px 60px -20px rgba(0,0,0,.75), inset 0 1px 0 rgba(255,255,255,.08)",
          transform: open
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(-10px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => {
              e.preventDefault();
              go(l.id);
            }}
            className="mobile-link block rounded-xl px-3.5 py-3 font-sans text-[15px] font-semibold text-soft"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contato"
          onClick={(e) => {
            e.preventDefault();
            go("contato");
          }}
          className="mt-1.5 flex items-center justify-center gap-[7px] rounded-xl bg-acc px-3.5 py-[13px] font-sans text-[15px] font-bold text-base"
        >
          Contato
        </a>
        <div className="mt-2 flex gap-2 border-t border-line px-1.5 pt-3 pb-1">
          {socials.map((s) => (
            <a
              key={s.slug}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-10 flex-1 place-items-center rounded-[11px] border border-line bg-[rgba(244,239,230,.05)]"
            >
              <span
                className="mask-icon h-[18px] w-[18px]"
                style={{ ["--icon" as string]: iconMask(s.slug) }}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
