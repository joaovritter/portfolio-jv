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

    /* ---------- marquees + parallax do nome gigante ---------- */
    if (!reduce) {
      const mq1 = document.getElementById("mq1");
      const mq2 = document.getElementById("mq2");
      const mqf = document.getElementById("mqf");
      const fname = document.getElementById("footname");
      const foot = document.getElementById("contato");
      let mx = 0,
        mx2 = 0,
        mxf = 0,
        lastY = window.scrollY || 0,
        raf = 0;
      const clamp = (v: number, lo: number, hi: number) =>
        Math.max(lo, Math.min(hi, v));
      const loop = () => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        const vy = y - lastY;
        lastY = y;
        if (mq1) {
          const w = mq1.scrollWidth / 2 || 1;
          mx += 0.55 + Math.abs(vy) * 0.5;
          const sk = clamp(-vy * 0.22, -9, 9);
          mq1.style.transform = `translateX(${-(mx % w)}px) skewX(${sk}deg)`;
        }
        if (mq2) {
          const w = mq2.scrollWidth / 2 || 1;
          mx2 += 0.5 + Math.abs(vy) * 0.5;
          const sk = clamp(vy * 0.22, -9, 9);
          mq2.style.transform = `translateX(${(mx2 % w) - w}px) skewX(${sk}deg)`;
        }
        if (mqf) {
          const w = mqf.scrollWidth / 2 || 1;
          mxf += 0.4 + Math.abs(vy) * 0.42;
          const sk = clamp(-vy * 0.16, -7, 7);
          mqf.style.transform = `translateX(${-(mxf % w)}px) skewX(${sk}deg)`;
        }
        if (fname && foot) {
          const r = foot.getBoundingClientRect();
          const vh = window.innerHeight || 1;
          const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
          fname.style.transform = `translate(-50%,${((0.5 - p) * 52).toFixed(1)}px)`;
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanups.push(() => {
        if (raf) cancelAnimationFrame(raf);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
