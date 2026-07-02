"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";

const pad = (n: number) => (n < 10 ? "0" : "") + n;

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const images = project?.images ?? [];
  const total = images.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    setIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, next, prev, onClose]);

  const cur = images[index];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 backdrop-blur-[8px]"
          style={{ background: "rgba(8,7,5,.7)" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.972 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.34, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative flex max-h-[92vh] w-[min(1020px,96vw)] flex-wrap overflow-y-auto rounded-[22px] border border-line"
            style={{
              background: "#161310",
              boxShadow: "0 50px 120px -40px rgba(0,0,0,.9)",
            }}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="modal-close absolute right-4 top-4 z-[5] grid h-10 w-10 place-items-center rounded-full border border-line text-sand backdrop-blur-[8px]"
              style={{ background: "rgba(19,17,14,.6)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Galeria */}
            <div className="flex min-w-0 flex-[1_1_420px] flex-col" style={{ background: "#0F0D0B" }}>
              <div
                className="relative grid flex-1 place-items-center overflow-hidden"
                style={{ minHeight: "clamp(280px,46vh,520px)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cur?.src}
                  alt={cur?.caption || project.shortTitle}
                  className="max-h-full max-w-full object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
                {total > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Anterior"
                      className="modal-nav absolute left-3.5 top-1/2 grid h-[42px] w-[42px] -translate-y-1/2 place-items-center rounded-full border border-line text-sand backdrop-blur-[8px]"
                      style={{ background: "rgba(19,17,14,.55)" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-[18px] w-[18px]">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={next}
                      aria-label="Próxima"
                      className="modal-nav absolute right-3.5 top-1/2 grid h-[42px] w-[42px] -translate-y-1/2 place-items-center rounded-full border border-line text-sand backdrop-blur-[8px]"
                      style={{ background: "rgba(19,17,14,.55)" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-[18px] w-[18px]">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </>
                )}
                <span
                  className="absolute left-3.5 top-3.5 rounded-full px-2.5 py-[5px] font-mono text-[11px] font-semibold text-cream backdrop-blur-[8px]"
                  style={{ background: "rgba(19,17,14,.6)" }}
                >
                  {pad(index + 1)} / {pad(total)}
                </span>
                {cur?.caption && (
                  <span
                    className="absolute bottom-0 left-0 right-0 px-4 pb-3.5 pt-6 text-center font-sans text-[13px] leading-[1.4] font-medium text-soft"
                    style={{
                      background:
                        "linear-gradient(180deg,transparent,rgba(15,13,11,.92))",
                    }}
                  >
                    {cur.caption}
                  </span>
                )}
              </div>

              <div
                className="flex gap-2 overflow-x-auto border-t border-line p-3"
                style={{ background: "#13110E" }}
              >
                {images.map((im, k) => (
                  <button
                    key={im.src + k}
                    onClick={() => setIndex(k)}
                    className="modal-thumb h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[9px] border-2 p-0"
                    style={{
                      background: "#1A1712",
                      borderColor: k === index ? "var(--acc)" : "rgba(244,239,230,.10)",
                      opacity: k === index ? 1 : 0.5,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={im.src} loading="lazy" alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Informações */}
            <div className="flex min-w-0 flex-[1_1_340px] flex-col px-[30px] pb-[34px] pt-[30px]">
              <div className="mb-3.5 flex items-center gap-2.5">
                <span className="font-mono text-[11px] font-semibold tracking-[0.06em] text-acc">
                  {project.year}
                </span>
                <span className="h-1 w-1 rounded-full bg-faint" />
                <span className="font-mono text-[11px] font-semibold tracking-[0.06em] text-faint">
                  PROJETO
                </span>
              </div>
              <h3 className="m-0 font-display text-[25px] font-extrabold leading-[1.15] tracking-[-0.015em]">
                {project.shortTitle}
              </h3>
              <p className="mt-3.5 text-[15px] leading-[1.62] text-muted">
                {project.description}
              </p>

              <div className="mt-6">
                <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                  O que foi feito
                </div>
                <ul className="m-0 grid list-none gap-2.5 p-0">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-[11px] text-[13.5px] leading-[1.5] text-[#bdb6ac]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-acc">
                        <path d="m5 12 4.5 4.5L19 7" />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                  Stack
                </div>
                <div className="flex flex-wrap gap-[7px]">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-[7px] border border-line px-2.5 py-[5px] font-mono text-[11px] font-medium text-cream"
                      style={{ background: "rgba(244,239,230,.05)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {project.demo && (
                <div className="mt-7">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-accent inline-flex items-center gap-2.5 rounded-[11px] px-[22px] py-[13px] font-sans text-[14px] font-bold"
                  >
                    Acessar projeto
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M14 4h6v6" />
                      <path d="M20 4 10 14" />
                      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
