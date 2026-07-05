"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import ProjectModal from "./ProjectModal";
import { tiltMove, tiltLeave } from "./tilt";
import { projects, type Project } from "@/data/projects";

function StackCard({
  project,
  index,
  total,
  progress,
  targetScale,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  targetScale: number;
  onOpen: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);

  // Escala do "baralho": cada carta encolhe conforme as de baixo sobem.
  const range: [number, number] = [index * (1 / total), 1];
  const scale = useTransform(progress, range, [1, targetScale]);

  // Parallax leve na imagem enquanto a carta entra na viewport.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });
  const imageScale = useTransform(smooth, [0, 1], [1.9, 1]);

  const stackTop = project.stack.slice(0, 4);
  const more = project.stack.length - 4;

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center"
    >
      <motion.div
        style={{ scale, top: `calc(-5vh + ${index * 52}px)` }}
        className="relative w-full max-w-[1040px] origin-top"
      >
        <article
          data-glass
          onClick={onOpen}
          onMouseMove={tiltMove}
          onMouseLeave={tiltLeave}
          className="project-card grid grid-cols-1 gap-0 md:grid-cols-[0.82fr_1.5fr] md:min-h-[clamp(440px,64vh,560px)]"
          style={{ background: "rgba(20,18,14,.985)" }}
        >
          {/* Informações */}
          <div className="order-2 flex flex-col justify-center px-7 py-8 md:order-1 md:px-9 md:py-10">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="font-mono text-[11px] font-semibold tracking-[0.06em] text-acc">
                {project.year}
              </span>
              <span className="h-1 w-1 rounded-full bg-faint" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-faint">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <h3 className="m-0 font-display text-[clamp(22px,3vw,30px)] font-extrabold leading-[1.14] tracking-[-0.015em]">
              {project.shortTitle}
            </h3>
            <p className="mb-5 mt-3 max-w-[46ch] text-[14.5px] leading-[1.55] text-muted2">
              {project.tagline}
            </p>

            <div className="mb-6 flex flex-wrap gap-[7px]">
              {stackTop.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line px-[9px] py-1 font-mono text-[11px] font-medium text-muted"
                  style={{ background: "rgba(244,239,230,.05)" }}
                >
                  {s}
                </span>
              ))}
              {more > 0 && (
                <span className="rounded-md px-[9px] py-1 font-mono text-[11px] font-medium text-faint">
                  +{more}
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-2 self-start font-sans text-[14px] font-bold text-sand">
              Ver projeto
              <span className="project-arrow grid h-8 w-8 place-items-center rounded-full border border-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
            </span>
          </div>

          {/* Imagem — cada imagem é o bloco do projeto */}
          <div
            className="relative order-1 aspect-[16/11] overflow-hidden md:order-2 md:aspect-auto"
            style={{ background: project.coverBg }}
          >
            <motion.div
              style={{ scale: imageScale, willChange: "transform", backfaceVisibility: "hidden" }}
              className="h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                loading="lazy"
                alt={project.title}
                className="h-full w-full"
                style={{ objectFit: project.coverFit, padding: project.coverPad }}
              />
            </motion.div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg,transparent 60%,rgba(19,17,14,.45))",
              }}
            />
          </div>
        </article>

        <span aria-hidden className="spec-layer" />
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projetos" className="relative scroll-mt-[90px]">
      {/* Cabeçalho fixo no fundo — o título fica exposto e os cartões passam por cima */}
      <header className="sticky top-0 z-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        <SectionEyebrow n="05" label="Projetos selecionados" className="mb-6" />
        <h2
          className="m-0 select-none text-center font-display font-black tracking-[-0.02em]"
          style={{ fontSize: "clamp(48px,11vw,128px)", lineHeight: 0.92 }}
        >
          <span className="block" style={{ overflow: "clip", overflowClipMargin: "0.6em", paddingBottom: ".05em" }}>
            <span className="glasstext glasstext-1 anim-glass-sheen">Conheça meus</span>
          </span>
          <span className="block" style={{ overflow: "clip", overflowClipMargin: "0.6em", paddingBottom: ".05em" }}>
            <span
              className="glasstext glasstext-2"
              style={{ animation: "glassSheen 8s ease-in-out .3s infinite" }}
            >
              projetos
            </span>
          </span>
        </h2>
        <p className="mt-7 max-w-[52ch] text-center text-[15px] leading-[1.6] text-[#8b857c]">
          Role para empilhar os cartões — clique em qualquer um para abrir a galeria de telas.
        </p>

        <div className="pointer-events-none absolute bottom-9 flex animate-bounce flex-col items-center text-faint">
          <span className="mb-2 font-mono text-[11px] uppercase tracking-[0.24em]">Deslize</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </header>

      {/* Trilho do stacking: cartões deslizam por cima do cabeçalho (z-10) */}
      <div ref={cardsRef} className="relative z-10 px-6 pb-[10vh]">
        {projects.map((p, i) => (
          <StackCard
            key={p.id}
            project={p}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
            targetScale={1 - (projects.length - i) * 0.08}
            onOpen={() => setSelected(p)}
          />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
