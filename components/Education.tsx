import SectionEyebrow from "./SectionEyebrow";
import { education } from "@/data/profile";

export default function Education() {
  return (
    <section
      id="formacao"
      className="relative mx-auto max-w-[1080px] scroll-mt-[90px] px-6"
      style={{ paddingTop: 90, paddingBottom: 90 }}
    >
      <SectionEyebrow n="06" label="Formação" className="mb-9" />

      <div
        data-reveal
        className="edu-card relative overflow-hidden rounded-[20px] border border-line p-8 sm:p-10"
        style={{ background: "linear-gradient(135deg,#1C1812,#161310)" }}
      >
        {/* "SI" gigante ao fundo, surgindo igual ao Hero */}
        <div
          aria-hidden
          className="edu-si-wrap pointer-events-none absolute leading-none"
          style={{ top: -34, right: -18 }}
        >
          <span
            className="edu-si font-display font-black"
            style={{ fontSize: 200, color: "rgba(var(--accrgb),.06)" }}
          >
            SI
          </span>
        </div>

        <div className="relative z-[1] flex flex-wrap items-start justify-between gap-7">
          <div className="max-w-[60ch]">
            {/* logo + badge */}
            <div className="mb-5 flex items-center gap-4">
              <span
                className="grid h-[58px] w-[58px] shrink-0 place-items-center overflow-hidden rounded-[14px] border border-line"
                style={{ background: "rgba(244,239,230,.04)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={education.logo}
                  alt="Universidade Franciscana (UFN)"
                  className="h-full w-full object-contain p-1.5"
                />
              </span>
              <span
                className="inline-block rounded-full px-3 py-[6px] font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-acc"
                style={{ background: "rgba(var(--accrgb),.12)" }}
              >
                {education.badge}
              </span>
            </div>

            <h3
              className="m-0 font-display font-extrabold tracking-[-0.015em]"
              style={{ fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.12 }}
            >
              {education.course}
            </h3>
            <div className="mt-2 font-sans text-[15px] font-semibold text-cream">
              {education.institution}
            </div>
            <p className="mt-5 text-[15.5px] leading-[1.6] text-muted">
              {education.focus}
            </p>

            {/* áreas de foco */}
            <div className="mt-6">
              <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                Áreas de foco
              </div>
              <div className="flex flex-wrap gap-[7px]">
                {education.highlights.map((h) => (
                  <span
                    key={h}
                    className="edu-chip rounded-[8px] px-2.5 py-[6px] font-mono text-[11.5px] font-medium text-[#bdb6ac]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* meta */}
          <div className="flex min-w-[160px] flex-col gap-4">
            <div>
              <div className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                Período
              </div>
              <div className="font-display text-[17px] font-bold">{education.period}</div>
            </div>
            <div>
              <div className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                Progresso
              </div>
              <div className="font-display text-[17px] font-bold">{education.semester}</div>
            </div>
            <div>
              <div className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                Local
              </div>
              <div className="font-display text-[17px] font-bold">{education.local}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
