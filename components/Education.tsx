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
        className="relative overflow-hidden rounded-[20px] border border-line p-10"
        style={{ background: "linear-gradient(135deg,#1C1812,#161310)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute font-display font-black leading-none"
          style={{
            top: -40,
            right: -30,
            fontSize: 200,
            color: "rgba(var(--accrgb),.05)",
          }}
        >
          SI
        </div>

        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[60ch]">
            <span
              className="mb-[18px] inline-block rounded-full px-3 py-[5px] font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-acc"
              style={{ background: "rgba(var(--accrgb),.12)" }}
            >
              {education.badge}
            </span>
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
          </div>

          <div className="flex min-w-[160px] flex-col gap-3.5">
            <div>
              <div className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                Período
              </div>
              <div className="font-display text-[17px] font-bold">{education.period}</div>
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
