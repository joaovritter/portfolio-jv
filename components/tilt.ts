import type { MouseEvent } from "react";

/** Tilt 3D leve (define --rx/--ry no elemento). Desliga em telas touch. */
export function tiltMove(e: MouseEvent<HTMLElement>) {
  if (typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches)
    return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--ry", (px * 7).toFixed(2) + "deg");
  el.style.setProperty("--rx", (-py * 7).toFixed(2) + "deg");
}

export function tiltLeave(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.setProperty("--ry", "0deg");
  el.style.setProperty("--rx", "0deg");
}
