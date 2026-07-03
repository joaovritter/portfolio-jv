"use client";

import HeroParticles from "./HeroParticles";
import { profile } from "@/data/profile";
import { socials, iconMask } from "./socials";

export default function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden scroll-mt-[90px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(58% 48% at 50% 40%, rgba(var(--accrgb),.11), transparent 72%)",
        }}
      />
      <HeroParticles />

      <div
        className="relative z-[2] w-full max-w-[1020px] text-center"
        style={{ padding: "128px 24px 96px" }}
      >
        <div
          className="mb-[26px] inline-flex items-center gap-2.5"
          style={{ animation: "fadeUp .8s .05s both" }}
        >
          <span
            className="h-[7px] w-[7px] rounded-full bg-acc"
            style={{ boxShadow: "0 0 12px var(--acc)" }}
          />
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-muted2">
            {profile.heroGreeting}
          </span>
        </div>

        <h1
          className="m-0 font-display font-black"
          style={{
            fontSize: "clamp(48px,11vw,128px)",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
          }}
        >
          <span
            className="block"
            style={{ overflow: "clip", overflowClipMargin: "0.6em", paddingBottom: ".05em" }}
          >
            <span
              className="glasstext glasstext-1"
              style={{
                animation:
                  "charIn 1s cubic-bezier(.2,.85,.2,1) .15s both, glassSheen 8s ease-in-out 1.2s infinite",
              }}
            >
              {profile.heroHeadline[0]}
            </span>
          </span>
          <span
            className="block"
            style={{ overflow: "clip", overflowClipMargin: "0.6em", paddingBottom: ".05em" }}
          >
            <span
              className="glasstext glasstext-2"
              style={{
                animation:
                  "charIn 1s cubic-bezier(.2,.85,.2,1) .32s both, glassSheen 8s ease-in-out 1.4s infinite",
              }}
            >
              {profile.heroHeadline[1]}
            </span>
          </span>
        </h1>

        <p
          className="mx-auto mt-[26px] whitespace-nowrap font-mono font-semibold tracking-[0.02em] text-cream"
          style={{
            fontSize: "clamp(7px, 2.1vw, 13px)",
            textShadow: "0 1px 10px rgba(0,0,0,.6)",
            animation: "fadeUp .8s .55s both",
          }}
        >
          {profile.heroMonoTagline}
        </p>

        <p
          className="mx-auto mt-[22px] max-w-[60ch] text-[18px] leading-[1.6] text-soft"
          style={{
            textShadow: "0 1px 14px rgba(0,0,0,.5)",
            animation: "fadeUp .8s .68s both",
          }}
        >
          {profile.heroTagline}
        </p>

        <div
          className="mt-[38px] flex flex-wrap justify-center gap-3.5"
          style={{ animation: "fadeUp .8s .82s both" }}
        >
          <a
            href="#projetos"
            data-glass
            onClick={(e) => {
              e.preventDefault();
              go("projetos");
            }}
            className="glass-accent inline-flex items-center gap-2.5 rounded-full px-[26px] py-[15px] font-sans text-[15px] font-bold"
          >
            Ver projetos
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-[17px] w-[17px]">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
          <a
            href={profile.resume}
            download
            data-glass
            className="glass-ghost inline-flex items-center gap-2.5 rounded-full px-6 py-[15px] font-sans text-[15px] font-semibold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-[17px] w-[17px]">
              <path d="M12 3v12" />
              <path d="m7 12 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Currículo
          </a>
        </div>

        <div
          className="mt-[30px] flex justify-center gap-2.5"
          style={{ animation: "fadeUp .8s .95s both" }}
        >
          {socials.map((s) => (
            <a
              key={s.slug}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="social-orb"
            >
              <span
                className="mask-icon h-[19px] w-[19px]"
                style={{ ["--icon" as string]: iconMask(s.slug) }}
              />
            </a>
          ))}
        </div>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar"
        onClick={(e) => {
          e.preventDefault();
          go("sobre");
        }}
        className="absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 no-underline"
      >
        <span className="font-mono text-[10px] font-medium tracking-[0.26em] text-faint">
          SCROLL
        </span>
        <span className="anim-cueline block h-[42px] w-px bg-faint" />
      </a>
    </section>
  );
}
