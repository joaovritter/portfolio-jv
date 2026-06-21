"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiExternalLink, FiImage } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/data/projects";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projetos" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos em destaque"
          description="Clique em um projeto para ver os detalhes, a galeria de imagens e o link de acesso. As imagens podem ser abertas em tela cheia."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40"
            >
              {/* Capa */}
              <button
                onClick={() => setSelected(project)}
                className="relative block aspect-[16/10] w-full overflow-hidden text-left"
                aria-label={`Ver detalhes de ${project.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.images[0].src}
                  alt={project.images[0].caption || project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent opacity-90" />

                {project.images.length > 1 && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-base/60 px-3 py-1 text-xs text-sand backdrop-blur">
                    <FiImage size={12} /> {project.images.length}
                  </span>
                )}

                <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-sand text-base opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <FiArrowUpRight size={20} />
                </span>
              </button>

              {/* Corpo */}
              <div className="flex flex-1 flex-col p-6">
                <button
                  onClick={() => setSelected(project)}
                  className="text-left"
                >
                  <h3 className="font-display text-xl font-semibold text-sand transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                </button>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line bg-surface2 px-2.5 py-1 text-xs text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4 border-t border-line pt-4 text-sm">
                  <button
                    onClick={() => setSelected(project)}
                    className="font-medium text-sand transition-colors hover:text-accent"
                  >
                    Ver detalhes
                  </button>
                  <span className="ml-auto flex items-center gap-3 text-muted">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Repositório no GitHub"
                        className="transition-colors hover:text-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub size={18} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Acessar projeto"
                        className="transition-colors hover:text-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
