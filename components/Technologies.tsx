"use client";

import { useState } from "react";
import SectionEyebrow from "./SectionEyebrow";
import { techGroups, techIconUrl, type Tech } from "@/data/technologies";

function TechItem({ t }: { t: Tech }) {
  const [failed, setFailed] = useState(false);
  const url = techIconUrl(t);
  const showImg = !!url && !failed;

  return (
    <div className="tech-item" style={{ ["--tc" as string]: t.color }}>
      <span className="grid h-[26px] w-[26px] shrink-0 place-items-center">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            loading="lazy"
            alt=""
            className="tech-icon"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="tech-glyph font-mono text-[12px] font-bold tracking-[0.02em]">
            {t.slug ? t.short : t.glyph}
          </span>
        )}
      </span>
      <span className="font-sans text-[13.5px] font-semibold text-soft">
        {t.name}
      </span>
    </div>
  );
}

export default function Technologies() {
  return (
    <section
      id="tecnologias"
      className="relative mx-auto max-w-[1180px] scroll-mt-[90px] px-6"
      style={{ paddingTop: 90, paddingBottom: 90 }}
    >
      <SectionEyebrow n="04" label="Tecnologias & ferramentas" className="mb-3.5" />
      <p
        data-reveal
        className="mb-[44px] mt-0 max-w-[54ch] text-[16px] leading-[1.6] text-[#8b857c]"
      >
        As ferramentas que uso para levar uma ideia do banco de dados até a tela — passe o mouse.
      </p>

      <div className="flex flex-col gap-[38px]">
        {techGroups.map((g) => (
          <div key={g.label} data-reveal>
            <div className="mb-4 flex items-baseline gap-3">
              <h3 className="m-0 font-display text-[16px] font-extrabold tracking-[0.01em]">
                {g.label}
              </h3>
              <span className="font-mono text-[11px] font-medium tracking-[0.04em] text-faint">
                {g.hint}
              </span>
            </div>
            <div
              className="grid gap-2.5"
              style={{ gridTemplateColumns: "repeat(auto-fill,minmax(132px,1fr))" }}
            >
              {g.items.map((t, i) => (
                <TechItem key={t.name + i} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
