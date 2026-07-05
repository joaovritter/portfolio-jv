"use client";

import FooterParticles from "./FooterParticles";

/**
 * Background global FIXO: mesmo estilo do rodapé (grid + aurora + partículas),
 * mas preso à viewport para permanecer imóvel enquanto a página rola.
 * Fica atrás de todo o conteúdo (o <main> sobe com z-index).
 */
export default function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: "58px 58px",
          backgroundImage:
            "linear-gradient(to right,rgba(244,239,230,.038) 1px,transparent 1px),linear-gradient(to bottom,rgba(244,239,230,.038) 1px,transparent 1px)",
          WebkitMaskImage:
            "radial-gradient(120% 95% at 50% 32%,#000 42%,transparent 88%)",
          maskImage:
            "radial-gradient(120% 95% at 50% 32%,#000 42%,transparent 88%)",
        }}
      />
      {/* aurora */}
      <div
        className="anim-aurora absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: "min(1200px,130vw)",
          height: "82vh",
          transform: "translate(-50%,-50%)",
          filter: "blur(78px)",
          background:
            "radial-gradient(circle at 50% 50%,rgba(var(--accrgb),.14) 0%,rgba(62,123,255,.08) 44%,transparent 70%)",
        }}
      />
      {/* partículas */}
      <FooterParticles />
    </div>
  );
}
