import SectionEyebrow from "./SectionEyebrow";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section
      id="sobre"
      className="relative mx-auto max-w-[1180px] scroll-mt-[90px] px-6"
      style={{ paddingTop: 110, paddingBottom: 110 }}
    >
      <SectionEyebrow n="02" label="Sobre mim" />

      <div
        className="grid items-start gap-[54px]"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
      >
        {/* Coluna esquerda: foto + estatísticas */}
        <div data-reveal>
          <div className="relative max-w-[420px]">
            <div
              aria-hidden
              className="absolute"
              style={{
                inset: "-14px -14px auto auto",
                width: "60%",
                height: "60%",
                borderTop: "2px solid var(--acc)",
                borderRight: "2px solid var(--acc)",
                borderRadius: "0 18px 0 0",
                opacity: 0.6,
              }}
            />
            <div
              aria-hidden
              className="absolute"
              style={{
                inset: "auto auto -14px -14px",
                width: "60%",
                height: "60%",
                borderBottom: "2px solid var(--acc)",
                borderLeft: "2px solid var(--acc)",
                borderRadius: "0 0 0 18px",
                opacity: 0.6,
              }}
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-line bg-surface2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/eu.jpeg"
                loading="lazy"
                alt="João Vitor Ritter"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-6 flex max-w-[420px] flex-wrap gap-2.5">
            {profile.stats.map((s) => (
              <div
                key={s.value}
                className="flex min-w-[150px] flex-1 items-center gap-2.5 rounded-xl border border-line bg-surface2 px-4 py-3"
              >
                <span className="font-display text-[26px] font-black leading-none text-acc">
                  {s.value}
                </span>
                <span
                  className="text-[12px] font-medium leading-[1.3] text-muted2"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna direita: título + parágrafos + soft skills */}
        <div data-reveal>
          <h2
            className="m-0 mb-7 max-w-[18ch] font-display font-extrabold tracking-[-0.015em]"
            style={{ fontSize: "clamp(28px,3.6vw,42px)", lineHeight: 1.08 }}
          >
            {profile.aboutTitle}
          </h2>
          <div className="flex max-w-[60ch] flex-col gap-[18px]">
            {profile.aboutParagraphs.map((p, i) => (
              <p
                key={i}
                className="rich m-0 text-[16.5px] leading-[1.65] text-[#bdb6ac]"
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
          </div>

          <div className="mt-[30px]">
            <div className="mb-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
              Soft skills
            </div>
            <div className="flex flex-wrap gap-[9px]">
              {profile.softSkills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line bg-surface2 px-3.5 py-2 text-[13px] font-medium text-cream"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
