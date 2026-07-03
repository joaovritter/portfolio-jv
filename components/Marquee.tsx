const strokeStyle = {
  fontSize: "clamp(34px,6.5vw,82px)",
  letterSpacing: "-0.01em",
  color: "transparent",
  WebkitTextStroke: "1.4px rgba(244,239,230,.26)",
  paddingRight: "0.4em",
} as const;

const Star = () => <span className="text-acc">&nbsp;✦&nbsp;</span>;

function Row2Text() {
  return (
    <>
      COMUNICAÇÃO
      <Star />
      CÓDIGO LIMPO
      <Star />
      SOLUÇÕES REAIS
      <Star />
    </>
  );
}

export default function Marquee() {
  return (
    <section
      aria-hidden
      className="relative z-[2] cursor-grab select-none overflow-hidden border-y border-line bg-bg2 py-[30px]"
      style={{ touchAction: "pan-y" }}
    >
      <div id="mq1" className="flex whitespace-nowrap will-change-transform">
        <span className="font-display font-black" style={strokeStyle}>
          FULL-STACK&nbsp;✦&nbsp;FRONT-END&nbsp;✦&nbsp;BACK-END&nbsp;✦&nbsp;MOBILE&nbsp;✦&nbsp;CLOUD&nbsp;✦&nbsp;IA&nbsp;✦&nbsp;
        </span>
        <span className="font-display font-black" style={strokeStyle}>
          FULL-STACK&nbsp;✦&nbsp;FRONT-END&nbsp;✦&nbsp;BACK-END&nbsp;✦&nbsp;MOBILE&nbsp;✦&nbsp;CLOUD&nbsp;✦&nbsp;IA&nbsp;✦&nbsp;
        </span>
      </div>
      <div id="mq2" className="mt-1.5 flex whitespace-nowrap will-change-transform">
        <span
          className="font-display font-black"
          style={{ fontSize: "clamp(34px,6.5vw,82px)", letterSpacing: "-0.01em", color: "#1f1b15", paddingRight: "0.4em" }}
        >
          <Row2Text />
        </span>
        <span
          className="font-display font-black"
          style={{ fontSize: "clamp(34px,6.5vw,82px)", letterSpacing: "-0.01em", color: "#1f1b15", paddingRight: "0.4em" }}
        >
          <Row2Text />
        </span>
      </div>
    </section>
  );
}
