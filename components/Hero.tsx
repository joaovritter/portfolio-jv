"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  type Variants,
} from "framer-motion";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiArrowDown, FiArrowUpRight, FiDownload, FiMapPin } from "react-icons/fi";
import ParticlesBackground from "./ParticlesBackground";
import { profile } from "@/data/profile";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const nameWords = profile.heroHeadline.split(" ");

export default function Hero() {
  // Spotlight que segue o mouse (apenas estético)
  const mx = useMotionValue(50);
  const my = useMotionValue(38);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${sx}% ${sy}%, rgba(203,184,157,0.12), transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="inicio"
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* fundo: partículas + brilhos neutros */}
      <ParticlesBackground />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: spotlight }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-accent2/10 blur-[120px]"
        animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[120px]"
        animate={{ y: [0, -26, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 -z-10 grain opacity-60" aria-hidden />

      <div className="container-x">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex max-w-4xl flex-col items-start"
        >
         

          <motion.p
            variants={item}
            className="mb-3 font-display text-lg text-muted sm:text-xl"
          >
            {profile.heroGreeting}
          </motion.p>

          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            {nameWords.map((word, i) => (
              <motion.span
                key={i}
                variants={item}
                className="mr-[0.25em] inline-block text-gradient"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-balance text-lg font-medium text-sand/90 sm:text-xl"
          >
            {profile.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted"
          >
            {profile.heroTagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("projetos")}
              className="group inline-flex items-center gap-2 rounded-full bg-sand px-6 py-3 text-sm font-semibold text-base transition-transform hover:scale-[1.03] active:scale-95"
            >
              Ver meus projetos
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href={profile.resume}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface2/60 px-6 py-3 text-sm font-semibold text-sand transition-all hover:border-accent/50 hover:bg-surface2"
            >
              <FiDownload className="transition-transform group-hover:translate-y-0.5" />
              Baixar currículo
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <div className="flex items-center gap-3">
              {[
                { href: profile.socials.github, icon: FaGithub, label: "GitHub" },
                { href: profile.socials.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
                { href: profile.socials.instagram, icon: FaInstagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface2/50 text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <span className="hidden h-5 w-px bg-line sm:block" />
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <FiMapPin className="text-accent" />
              {profile.location}
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("sobre")}
        aria-label="Rolar para baixo"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.span
          className="block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown size={20} />
        </motion.span>
      </motion.button>
    </section>
  );
}
