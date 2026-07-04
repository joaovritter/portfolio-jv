"use client";

import SectionEyebrow from "./SectionEyebrow";
import { experiences } from "@/data/experiences";
import { tiltMove, tiltLeave } from "./tilt";

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="relative mx-auto max-w-[1080px] scroll-mt-[90px] px-6"
      style={{ paddingTop: 90, paddingBottom: 90 }}
    >
      <SectionEyebrow n="03" label="Experiência profissional" className="mb-[54px]" />

      <div className="relative pl-[34px]">
        <div
          aria-hidden
          className="absolute left-[7px] top-[6px] bottom-[6px] w-[2px]"
          style={{
            background:
              "linear-gradient(180deg,var(--acc),rgba(244,239,230,.12) 30%,var(--line))",
          }}
        />

        {experiences.map((x) => (
          <div key={x.company} data-reveal className="relative mb-[34px]">
            <span
              className="absolute left-[-34px] top-6 h-4 w-4 rounded-full border-[3px] border-base"
              style={{
                background: x.current ? "var(--acc)" : "#2c2820",
                boxShadow: x.current ? "0 0 0 4px rgba(var(--accrgb),.18)" : "none",
              }}
            />
            <div
              onMouseMove={tiltMove}
              onMouseLeave={tiltLeave}
              className="exp-card shine-border rounded-2xl"
              style={{ padding: "26px 28px" }}
            >
              <div className="mb-1.5 flex flex-wrap items-center gap-3">
                <span
                  className="font-mono text-[12px] font-semibold tracking-[0.03em]"
                  style={{ color: x.current ? "var(--acc)" : "#9A938A" }}
                >
                  {x.period}
                </span>
                {x.current && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-acc"
                    style={{ background: "rgba(var(--accrgb),.12)" }}
                  >
                    <span className="anim-pulse h-1.5 w-1.5 rounded-full bg-acc" />
                    Atual
                  </span>
                )}
              </div>
              <h3 className="m-0 font-display text-[21px] font-extrabold leading-[1.2] tracking-[-0.01em]">
                {x.role}
              </h3>
              <div className="mt-[3px] font-sans text-[14px] font-semibold text-acc">
                {x.company}
              </div>
              <p className="mb-4 mt-3.5 max-w-[64ch] text-[15px] leading-[1.6] text-muted">
                {x.description}
              </p>
              <ul className="m-0 grid list-none gap-[9px] p-0">
                {x.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-[11px] text-[14px] leading-[1.5] text-[#bdb6ac]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      className="mt-[3px] h-[15px] w-[15px] shrink-0 text-acc"
                    >
                      <path d="m5 12 4.5 4.5L19 7" />
                    </svg>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
