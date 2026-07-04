"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import ProjectModal from "./ProjectModal";
import { tiltMove, tiltLeave } from "./tilt";
import { projects, type Project } from "@/data/projects";

const PEEK = 14; // sliver (borda) visível de cada carta atrás do topo
const SCALE_STEP = 0.018; // profundidade sutil no baralho fechado

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

function StackCard({
  project,
  index,
  total,
  offset,
  progress,
  onOpen,
  cardRef,
}: {
  project: Project;
  index: number;
  total: number;
  offset: number;
  progress: MotionValue<number>;
  onOpen: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  // empilhado (progress 0) -> espalhado (progress 1), reversível.
  // No estado fechado: só a borda (PEEK) de cada carta aparece abaixo do topo.
  const y = useTransform(progress, (p) => {
    const t = easeOutCubic(clamp(p, 0, 1));
    const stacked = -offset + index * PEEK;
    return stacked * (1 - t);
  });
  const scale = useTransform(progress, (p) => {
    const t = easeOutCubic(clamp(p, 0, 1));
    const s = 1 - index * SCALE_STEP;
    return s + (1 - s) * t;
  });

  const stackTop = project.stack.slice(0, 4);
  const more = project.stack.length - 4;

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale, zIndex: total - index }}
      className="relative mx-auto w-full max-w-[620px]"
    >
      <article
        data-glass
        onClick={onOpen}
        onMouseMove={tiltMove}
        onMouseLeave={tiltLeave}
        className="project-card"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{ background: project.coverBg }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover}
            loading="lazy"
            alt={project.title}
            className="project-cover-img h-full w-full"
            style={{ objectFit: project.coverFit, padding: project.coverPad }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,transparent 55%,rgba(19,17,14,.5))",
            }}
          />
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-[5px] font-mono text-[11px] font-semibold text-cream backdrop-blur-[8px]"
            style={{ background: "rgba(19,17,14,.6)" }}
          >
            {project.year}
          </span>
          <span
            className="project-arrow absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full border backdrop-blur-[8px]"
            style={{
              background: "rgba(244,239,230,.1)",
              borderColor: "rgba(244,239,230,.2)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-[17px] w-[17px] text-sand">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </span>
        </div>

        <div className="px-[22px] pb-[22px] pt-5">
          <h3 className="mb-[7px] mt-0 font-display text-[19px] font-extrabold leading-[1.18] tracking-[-0.01em]">
            {project.shortTitle}
          </h3>
          <p className="mb-4 mt-0 min-h-[42px] text-[14px] leading-[1.5] text-muted2">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-[7px]">
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
        </div>

        <span aria-hidden className="spec-layer" />
      </article>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const [offsets, setOffsets] = useState<number[]>(() =>
    projects.map((_, i) => i * 560)
  );
  const [selected, setSelected] = useState<Project | null>(null);

  // Deck fechado enquanto entra; espalha conforme rola pela seção.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "start 0.15"],
  });

  // Mede a posição natural de cada carta para calcular o empilhamento
  useEffect(() => {
    const measure = () => {
      const tops = cardEls.current.map((el) => el?.offsetTop ?? 0);
      const base = tops[0] ?? 0;
      setOffsets(tops.map((t) => t - base));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="relative mx-auto max-w-[1180px] scroll-mt-[90px] px-6"
      style={{ paddingTop: 90, paddingBottom: 90 }}
    >
      <SectionEyebrow n="05" label="Projetos selecionados" className="mb-3.5" />
      <h2
        data-reveal
        className="relative z-0 m-0 max-w-[16ch] font-display font-black tracking-[-0.02em]"
        style={{ fontSize: "clamp(30px,5vw,56px)", lineHeight: 1.02 }}
      >
        <span className="rise-clip">
          <span className="reveal-rise glasstext glasstext-1">Conheça meus</span>
        </span>
        <br />
        <span className="rise-clip">
          <span className="reveal-rise glasstext glasstext-2">projetos</span>
        </span>
      </h2>
      <p
        data-reveal
        className="relative z-0 mb-[54px] mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-[#8b857c]"
      >
        Role para desempilhar os cartões — clique em qualquer um para abrir a galeria de telas.
      </p>

      <div className="flex flex-col gap-6">
        {projects.map((p, i) => (
          <StackCard
            key={p.id}
            project={p}
            index={i}
            total={projects.length}
            offset={offsets[i] ?? i * 560}
            progress={scrollYProgress}
            onOpen={() => setSelected(p)}
            cardRef={(el) => {
              cardEls.current[i] = el;
            }}
          />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
