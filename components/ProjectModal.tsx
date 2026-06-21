"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiGithub,
  FiExternalLink,
  FiMaximize2,
  FiImage,
} from "react-icons/fi";
import type { Project } from "@/data/projects";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const images = project?.images ?? [];
  const total = images.length;

  const next = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );

  // Reseta ao abrir um novo projeto
  useEffect(() => {
    setIndex(0);
    setLightbox(false);
  }, [project]);

  // Bloqueia o scroll do body enquanto o modal está aberto
  useEffect(() => {
    if (!project) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [project]);

  // Atalhos de teclado
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(false);
        else onClose();
      } else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, lightbox, next, prev, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-base/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-line bg-base/70 text-sand backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
            >
              <FiX size={18} />
            </button>

            <div className="grid lg:grid-cols-[1.25fr_1fr]">
              {/* Galeria */}
              <div className="flex flex-col gap-3 border-b border-line p-4 sm:p-5 lg:border-b-0 lg:border-r">
                <div
                  className="group relative aspect-[16/10] cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-base"
                  onClick={() => setLightbox(true)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[index].src}
                    alt={images[index].caption || `${project.title} — imagem ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-base/60 text-sand opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <FiMaximize2 size={16} />
                  </span>

                  {images[index].caption && (
                    <span className="absolute bottom-3 left-3 inline-flex max-w-[80%] items-center gap-1.5 rounded-full bg-base/60 px-3 py-1 text-xs text-sand backdrop-blur">
                      <FiImage size={12} className="shrink-0" />
                      <span className="truncate">{images[index].caption}</span>
                    </span>
                  )}

                  {total > 1 && (
                    <>
                      <NavButton side="left" onClick={(e) => { e.stopPropagation(); prev(); }} />
                      <NavButton side="right" onClick={(e) => { e.stopPropagation(); next(); }} />
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-base/60 px-3 py-1 text-xs text-sand backdrop-blur">
                        {index + 1} / {total}
                      </span>
                    </>
                  )}
                </div>

                {total > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                      <button
                        key={img.src + i}
                        onClick={() => setIndex(i)}
                        title={img.caption}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition-all ${
                          i === index
                            ? "border-accent ring-1 ring-accent/40"
                            : "border-line opacity-60 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.caption || `miniatura ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="flex max-h-[60vh] flex-col gap-5 overflow-y-auto p-5 sm:p-7 lg:max-h-[85vh]">
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    {project.year}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-sand sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent2">{project.tagline}</p>
                </div>

                <p className="text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                {project.highlights.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-sand">
                      Destaques
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-sand">
                    Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line bg-surface2 px-3 py-1 text-xs text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-sand px-5 py-2.5 text-sm font-semibold text-base transition-transform hover:scale-[1.03]"
                    >
                      <FiExternalLink /> Acessar projeto
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface2 px-5 py-2.5 text-sm font-semibold text-sand transition-colors hover:border-accent/50"
                    >
                      <FiGithub /> Ver código
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lightbox em tela cheia */}
          <AnimatePresence>
            {lightbox && (
              <motion.div
                className="fixed inset-0 z-[90] flex items-center justify-center bg-base/95 p-4 sm:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightbox(false)}
              >
                <button
                  onClick={() => setLightbox(false)}
                  aria-label="Fechar tela cheia"
                  className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface2/70 text-sand transition-colors hover:text-accent"
                >
                  <FiX size={20} />
                </button>

                {total > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prev(); }}
                      aria-label="Anterior"
                      className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface2/70 text-sand transition-colors hover:text-accent sm:left-6"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); next(); }}
                      aria-label="Próxima"
                      className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface2/70 text-sand transition-colors hover:text-accent sm:right-6"
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </>
                )}

                <motion.img
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  src={images[index].src}
                  alt={images[index].caption || `${project.title} — imagem ${index + 1} em tela cheia`}
                  className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />

                <span
                  className="absolute bottom-6 left-1/2 flex max-w-[90vw] -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-surface2/70 px-4 py-1.5 text-sm text-sand"
                  onClick={(e) => e.stopPropagation()}
                >
                  {images[index].caption && (
                    <span className="truncate">{images[index].caption}</span>
                  )}
                  {total > 1 && (
                    <span className="shrink-0 text-muted">
                      {images[index].caption ? "· " : ""}
                      {index + 1}/{total}
                    </span>
                  )}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
}) {
  const Icon = side === "left" ? FiChevronLeft : FiChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Imagem anterior" : "Próxima imagem"}
      className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-base/60 text-sand opacity-0 backdrop-blur transition-opacity hover:text-accent group-hover:opacity-100 ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      <Icon size={20} />
    </button>
  );
}
