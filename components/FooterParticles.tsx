"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ACC = "#FF5A36";

/** Partículas ambientes do rodapé (porta initFooterParticles do Claude Design). */
export default function FooterParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement as HTMLElement | null;
    if (!canvas || !host) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const motion = 1;
    // --- Ajustes do hover (mexa nestes números) ---
    const PUSH = 1.2; // força do empurrão do cursor (menor = mais sutil)
    const RETURN = 0.0045; // rigidez da mola de volta (menor = volta mais devagar)
    const HOVER_CALM = 0.45; // agitação durante o hover (1 = normal, 0 = parado)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = host.clientWidth,
      H = host.clientHeight;
    if (!W || !H) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H, false);
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -1000, 1000);
    cam.position.z = 10;
    const isMobile = W < 700;
    const N = isMobile ? 24 : 52;

    const pos = new Float32Array(N * 3),
      col = new Float32Array(N * 3),
      vel = new Float32Array(N * 3);
    const baseX = new Float32Array(N),
      baseY = new Float32Array(N),
      amp = new Float32Array(N),
      ph = new Float32Array(N),
      sp = new Float32Array(N),
      react = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      baseX[i] = (Math.random() - 0.5) * W * 0.96;
      baseY[i] = (Math.random() - 0.5) * H * 0.84;
      pos[i * 3] = baseX[i];
      pos[i * 3 + 1] = baseY[i];
      pos[i * 3 + 2] = (Math.random() - 0.5) * 140;
      amp[i] = 12 + Math.random() * 30;
      ph[i] = Math.random() * Math.PI * 2;
      sp[i] = 0.5 + Math.random() * 0.8;
      // 0 = ponto imune ao cursor; senão reage com força variável (borda irregular)
      react[i] = Math.random() < 0.35 ? 0 : 0.25 + Math.random() * 0.75;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const c1 = new THREE.Color(ACC),
      c2 = new THREE.Color("#F4EFE6"),
      c3 = new THREE.Color("#3E7BFF");
    for (let i = 0; i < N; i++) {
      const r = Math.random();
      const c = r < 0.22 ? c3 : r < 0.56 ? c1 : c2;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    geo.attributes.color.needsUpdate = true;

    const mat = new THREE.PointsMaterial({
      size: isMobile ? 2.6 : 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthTest: false,
      sizeAttenuation: false,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const mouse = { x: 1e9, y: 1e9, on: false };
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left - W / 2;
      mouse.y = -(e.clientY - r.top - H / 2);
      mouse.on = true;
    };
    const leave = () => {
      mouse.on = false;
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);

    const rad = isMobile ? 66 : 104;
    let raf = 0;
    let inView = false;
    let calm = 1; // eased: cai para HOVER_CALM enquanto o mouse está em cima
    const tick = () => {
      const time = performance.now();
      const P = geo.attributes.position.array as Float32Array;
      calm += ((mouse.on ? HOVER_CALM : 1) - calm) * 0.05;
      for (let i = 0; i < N; i++) {
        const ix = i * 3,
          iy = i * 3 + 1,
          iz = i * 3 + 2;
        const a = amp[i] * motion * calm;
        const tx = baseX[i] + Math.sin(time * 0.0002 * sp[i] + ph[i]) * a;
        const ty = baseY[i] + Math.cos(time * 0.00017 * sp[i] + ph[i] * 1.3) * a;
        vel[ix] += (tx - P[ix]) * RETURN;
        vel[iy] += (ty - P[iy]) * RETURN;
        vel[iz] += (0 - P[iz]) * 0.005;
        if (mouse.on && react[i]) {
          const dx = P[ix] - mouse.x,
            dy = P[iy] - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < rad * rad) {
            const dd = Math.sqrt(d2) || 1;
            let f = (rad - dd) / rad;
            f = f * f; // borda mais suave (menos "círculo nítido")
            const push = f * react[i] * PUSH;
            vel[ix] += (dx / dd) * push;
            vel[iy] += (dy / dd) * push;
          }
        }
        vel[ix] *= 0.94;
        vel[iy] *= 0.94;
        vel[iz] *= 0.95;
        P[ix] += vel[ix];
        P[iy] += vel[iy];
        P[iz] += vel[iz];
      }
      geo.attributes.position.needsUpdate = true;
      points.rotation.z = Math.sin(time * 0.00008) * 0.02;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (reduce) return;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onResize = () => {
      W = host.clientWidth;
      H = host.clientHeight;
      if (!W || !H) return;
      renderer.setSize(W, H, false);
      cam.left = -W / 2;
      cam.right = W / 2;
      cam.top = H / 2;
      cam.bottom = -H / 2;
      cam.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          inView = e.isIntersecting;
          inView ? start() : stop();
        }),
      { threshold: 0.02 }
    );
    io.observe(host);
    const vis = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", vis);

    renderer.render(scene, cam);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", vis);
      io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      aria-hidden
    />
  );
}
