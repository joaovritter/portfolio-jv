"use client";

import { useEffect } from "react";

/**
 * Efeitos globais portados do Claude Design:
 *  - reveal on scroll para [data-reveal]
 *  - "glass" que segue o cursor (--mx/--my/--spec) + magnetismo em [data-magnet]
 *  - movimento dos marquees (#mq1/#mq2/#mqf) e parallax do nome gigante (#footname)
 * Roda uma única vez, depois que todas as seções já montaram.
 */
export default function Interactions() {
  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;

    const cleanups: Array<() => void> = [];

    /* ---------- reveal on scroll ---------- */
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (reduce || !("IntersectionObserver" in window)) {
      revealItems.forEach((el) => el.classList.add("reveal-in"));
    } else {
      const io = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              const sibs = Array.from(
                el.parentElement?.querySelectorAll<HTMLElement>(
                  ":scope > [data-reveal]"
                ) ?? []
              );
              const idx = Math.max(0, sibs.indexOf(el));
              el.style.transitionDelay = idx * 0.08 + "s";
              el.classList.add("reveal-in");
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
      );
      revealItems.forEach((el) => io.observe(el));
      const safety = window.setTimeout(
        () => revealItems.forEach((el) => el.classList.add("reveal-in")),
        2600
      );
      cleanups.push(() => {
        io.disconnect();
        clearTimeout(safety);
      });
    }

    /* ---------- glass / magnetismo ---------- */
    if (!reduce && !coarse) {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-glass]")
      );
      if (els.length) {
        type St = {
          mx: number;
          my: number;
          tmx: number;
          tmy: number;
          spec: number;
          tspec: number;
          mag: boolean;
          tx: number;
          ty: number;
          ttx: number;
          tty: number;
          sc: number;
          tsc: number;
        };
        const S = new Map<HTMLElement, St>();
        const active = new Set<HTMLElement>();
        let raf = 0;
        const loop = () => {
          active.forEach((el) => {
            const s = S.get(el)!;
            s.mx += (s.tmx - s.mx) * 0.2;
            s.my += (s.tmy - s.my) * 0.2;
            s.spec += (s.tspec - s.spec) * 0.12;
            el.style.setProperty("--mx", s.mx.toFixed(1) + "%");
            el.style.setProperty("--my", s.my.toFixed(1) + "%");
            el.style.setProperty("--spec", s.spec.toFixed(3));
            let magSettled = true;
            if (s.mag) {
              s.tx += (s.ttx - s.tx) * 0.18;
              s.ty += (s.tty - s.ty) * 0.18;
              s.sc += (s.tsc - s.sc) * 0.18;
              el.style.transform =
                "translate(" +
                s.tx.toFixed(2) +
                "px," +
                s.ty.toFixed(2) +
                "px) scale(" +
                s.sc.toFixed(3) +
                ")";
              magSettled =
                Math.abs(s.tx - s.ttx) < 0.1 &&
                Math.abs(s.ty - s.tty) < 0.1 &&
                Math.abs(s.sc - s.tsc) < 0.002;
            }
            if (s.tspec === 0 && s.spec < 0.01 && magSettled) {
              el.style.setProperty("--spec", "0");
              if (s.mag) {
                el.style.transform = "";
                s.tx = 0;
                s.ty = 0;
                s.sc = 1;
              }
              active.delete(el);
            }
          });
          raf = active.size ? requestAnimationFrame(loop) : 0;
        };
        const ensure = () => {
          if (!raf) raf = requestAnimationFrame(loop);
        };
        const listeners: Array<[HTMLElement, string, EventListener]> = [];
        els.forEach((el) => {
          const mag = el.hasAttribute("data-magnet");
          S.set(el, {
            mx: 50,
            my: 50,
            tmx: 50,
            tmy: 50,
            spec: 0,
            tspec: 0,
            mag,
            tx: 0,
            ty: 0,
            ttx: 0,
            tty: 0,
            sc: 1,
            tsc: 1,
          });
          const enter: EventListener = () => {
            const s = S.get(el)!;
            s.tspec = 1;
            if (s.mag) s.tsc = 1.04;
            active.add(el);
            ensure();
          };
          const pmove = ((e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const s = S.get(el)!;
            s.tmx = ((e.clientX - r.left) / r.width) * 100;
            s.tmy = ((e.clientY - r.top) / r.height) * 100;
            s.tspec = 1;
            if (s.mag) {
              s.ttx = (e.clientX - r.left - r.width / 2) * 0.28;
              s.tty = (e.clientY - r.top - r.height / 2) * 0.28;
              s.tsc = 1.04;
            }
            active.add(el);
            ensure();
          }) as EventListener;
          const pleave: EventListener = () => {
            const s = S.get(el)!;
            s.tspec = 0;
            if (s.mag) {
              s.ttx = 0;
              s.tty = 0;
              s.tsc = 1;
            }
            active.add(el);
            ensure();
          };
          el.addEventListener("pointerenter", enter);
          el.addEventListener("pointermove", pmove);
          el.addEventListener("pointerleave", pleave);
          listeners.push(
            [el, "pointerenter", enter],
            [el, "pointermove", pmove],
            [el, "pointerleave", pleave]
          );
        });
        cleanups.push(() => {
          if (raf) cancelAnimationFrame(raf);
          listeners.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn));
        });
      }
    }

    /* ---------- marquees (com arraste + inércia) + parallax do nome ---------- */
    if (!reduce) {
      const fname = document.getElementById("footname");
      const foot = document.getElementById("contato");
      const clamp = (v: number, lo: number, hi: number) =>
        Math.max(lo, Math.min(hi, v));

      // base > 0 desloca para a esquerda; base < 0 para a direita (auto-scroll)
      type MConf = { el: HTMLElement; base: number; skew: number; phase: number };
      const confs: MConf[] = [];
      const push = (id: string, base: number, skew: number) => {
        const el = document.getElementById(id);
        if (el) confs.push({ el, base, skew, phase: 0 });
      };
      push("mq1", 0.55, 0.22);
      push("mq2", -0.5, -0.22);
      push("mqf", 0.4, 0.16);

      // arraste + inércia compartilhados: "off" é o deslocamento de tela que o
      // usuário puxou; "offVel" é a velocidade que continua após soltar (roleta).
      let off = 0;
      let offVel = 0;
      let dragging = false;
      let dragDX = 0; // pixels acumulados desde o último frame
      let lastY = window.scrollY || 0;
      let raf = 0;

      const targets = confs.map((c) => c.el);
      const isMarquee = (t: EventTarget | null) =>
        t instanceof Node && targets.some((el) => el.contains(t as Node));

      let lastX = 0;
      const onDown = (e: PointerEvent) => {
        if (e.button !== 0 || !isMarquee(e.target)) return;
        dragging = true;
        lastX = e.clientX;
        dragDX = 0;
        offVel = 0;
        document.body.classList.add("mq-grabbing");
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        dragDX += e.clientX - lastX;
        lastX = e.clientX;
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        document.body.classList.remove("mq-grabbing");
      };
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);

      // wrap para (-w, 0]: mantém a faixa sempre coberta (sem espaço em branco)
      const wrapNeg = (v: number, w: number) => -(((v % w) + w) % w);

      const loop = () => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        const vy = y - lastY;
        lastY = y;

        if (dragging) {
          // as palavras seguem o mouse 1:1; velocidade suavizada p/ o momentum
          off += dragDX;
          offVel = offVel * 0.6 + dragDX * 0.4;
          dragDX = 0;
        } else {
          off += offVel;
          offVel *= 0.965; // atrito da roleta: desacelera gradualmente
          if (Math.abs(offVel) < 0.02) offVel = 0;
        }

        confs.forEach((c) => {
          const one = (c.el.firstElementChild as HTMLElement | null)?.offsetWidth;
          const w = one && one > 0 ? one : c.el.scrollWidth / 3 || 1;
          c.phase += c.base * (1 + Math.abs(vy) * 0.9);
          const t = wrapNeg(c.phase + off, w);
          const scrollSk = clamp(-Math.sign(c.base) * vy * c.skew, -9, 9);
          const dragSk = clamp((dragging ? dragDX : offVel) * 0.14, -10, 10);
          c.el.style.transform = `translateX(${t}px) skewX(${scrollSk + dragSk}deg)`;
        });

        if (fname && foot) {
          const r = foot.getBoundingClientRect();
          const vh = window.innerHeight || 1;
          const pr = clamp((vh - r.top) / (vh + r.height), 0, 1);
          fname.style.transform = `translate(-50%,${((0.5 - pr) * 52).toFixed(1)}px)`;
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanups.push(() => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        document.body.classList.remove("mq-grabbing");
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
