"use client";

import FooterParticles from "./FooterParticles";
import { profile } from "@/data/profile";
import { contactLinks, iconMask } from "./socials";

const footMarquee =
  "FULL-STACK ✦ FRONT-END ✦ BACK-END ✦ MOBILE ✦ CLOUD ✦ IA ✦ COMUNICAÇÃO ✦ CÓDIGO LIMPO ✦ SOLUÇÕES REAIS ✦ ";

export default function Contact() {
  const backToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <section
      id="contato"
      className="relative mt-16 overflow-hidden border-t border-line scroll-mt-[90px]"
      style={{ padding: "54px 0 0" }}
    >
      {/* bg: grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundSize: "58px 58px",
          backgroundImage:
            "linear-gradient(to right,rgba(244,239,230,.038) 1px,transparent 1px),linear-gradient(to bottom,rgba(244,239,230,.038) 1px,transparent 1px)",
          WebkitMaskImage:
            "radial-gradient(74% 68% at 50% 42%,#000 26%,transparent 82%)",
          maskImage:
            "radial-gradient(74% 68% at 50% 42%,#000 26%,transparent 82%)",
        }}
      />
      {/* bg: aurora */}
      <div
        aria-hidden
        className="anim-aurora pointer-events-none absolute left-1/2 top-[42%] z-0 rounded-full"
        style={{
          width: "min(1120px,124vw)",
          height: "76%",
          transform: "translate(-50%,-50%)",
          filter: "blur(74px)",
          background:
            "radial-gradient(circle at 50% 50%,rgba(var(--accrgb),.16) 0%,rgba(62,123,255,.09) 44%,transparent 70%)",
        }}
      />
      {/* bg: partículas */}
      <FooterParticles />
      {/* bg: nome gigante */}
      <div
        id="footname"
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-[150px] sm:bottom-[118px] z-0 select-none whitespace-nowrap font-display font-black"
        style={{
          transform: "translateX(-50%)",
          fontSize: "clamp(42px,11vw,138px)",
          lineHeight: 0.8,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "1px rgba(244,239,230,.06)",
          background: "linear-gradient(180deg,rgba(244,239,230,.12),transparent 60%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        JOÃO VITOR RITTER
      </div>

      {/* marquee band */}
      <div
        aria-hidden
        className="relative z-[2] w-full cursor-grab select-none overflow-hidden border-y border-line backdrop-blur-[8px] backdrop-saturate-[1.3]"
        style={{ background: "rgba(21,18,14,.42)", padding: "15px 0", touchAction: "pan-y" }}
      >
        <div id="mqf" className="flex whitespace-nowrap will-change-transform">
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className="font-mono text-[13px] font-bold uppercase tracking-[0.32em] text-[#8b857c]"
              style={{ paddingRight: "0.4em" }}
            >
              {footMarquee.split("✦").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-acc">✦</span>}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* conteúdo */}
      <div className="relative z-[2] mx-auto max-w-[1120px]" style={{ padding: "104px 24px 62px" }}>
        <div data-reveal>
          <div className="mb-[26px] flex items-center gap-3">
            <span className="font-mono text-[12px] font-bold text-acc">07</span>
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-muted2">
              Contato
            </span>
            <span className="h-px max-w-[120px] flex-1 bg-line" />
          </div>
          <h2
            className="m-0 font-display font-black tracking-[-0.028em]"
            style={{ fontSize: "clamp(46px,9vw,112px)", lineHeight: 0.9 }}
          >
            <span className="block overflow-hidden" style={{ paddingBottom: ".06em" }}>
              <span className="glasstext glasstext-1 anim-glass-sheen">Bora</span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: ".06em" }}>
              <span
                className="glasstext glasstext-2"
                style={{ animation: "glassSheen 8s ease-in-out .3s infinite" }}
              >
                conversar?
              </span>
            </span>
          </h2>
          <p className="mt-[26px] max-w-[46ch] text-[17px] leading-[1.6] text-muted">
            Tô sempre a fim de um bom projeto ou uma boa conversa. Me chama pelo canal que preferir — costumo responder rápido.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="link-email mt-[22px] inline-block pb-1 font-sans font-semibold text-soft"
            style={{ fontSize: "clamp(20px,3.4vw,34px)" }}
          >
            {profile.email}
          </a>
        </div>

        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          {contactLinks.map((s) => (
            <a
              key={s.slug}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-glass
              data-magnet
              className="contact-chip inline-flex items-center gap-[11px] rounded-full px-[22px] py-3.5"
            >
              <span
                className="mask-icon h-[19px] w-[19px] shrink-0"
                style={{ ["--icon" as string]: iconMask(s.slug) }}
              />
              <span className="font-sans text-[14px] font-bold">{s.label}</span>
            </a>
          ))}
          <a
            href={profile.resume}
            download
            data-glass
            data-magnet
            className="contact-chip contact-chip-accent inline-flex items-center gap-2.5 rounded-full px-6 py-3.5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-[18px] w-[18px]">
              <path d="M12 3v12" />
              <path d="m7 12 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            <span className="font-sans text-[14px] font-extrabold">Baixar currículo</span>
          </a>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative z-[2] mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 border-t border-line" style={{ padding: "26px 24px 40px" }}>
        <span className="font-display text-[13px] font-semibold tracking-[0.01em] text-cream">
          © {new Date().getFullYear()} {profile.fullName}
        </span>
        <span
          data-glass
          className="badge-chip inline-flex items-center gap-2 rounded-full px-4 py-[9px]"
          style={{ cursor: "default" }}
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b857c]">
            feito com <span className="text-acc">café</span> e criatividade
          </span>
        </span>
        <button
          onClick={backToTop}
          data-glass
          data-magnet
          aria-label="Voltar ao topo"
          className="back-top grid h-[46px] w-[46px] place-items-center rounded-full"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[19px] w-[19px]">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
