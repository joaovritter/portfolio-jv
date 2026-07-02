"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ACC = "#FF5A36";

/**
 * Partículas 3D que formam "JV" no hero, com repulsão pelo cursor.
 * Porta o initParticles do Claude Design para three.js (npm).
 * O <canvas> preenche o elemento pai (a <section> do hero), que é usado
 * como "host" para dimensão e eventos de ponteiro.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement as HTMLElement | null;
    if (!canvas || !host) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const density = 4;
    const motion = 1;
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

    const sample = (w: number, h: number) => {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const x = c.getContext("2d")!;
      x.fillStyle = "#fff";
      x.textAlign = "center";
      x.textBaseline = "middle";
      const fs = Math.min(h * 0.92, w * 0.5);
      x.font = "900 " + fs + "px 'Archivo', sans-serif";
      x.fillText("JV", w / 2, h / 2 + fs * 0.02);
      const d = x.getImageData(0, 0, w, h).data;
      const step = Math.max(2, Math.round(8 - density) + (isMobile ? 2 : 0));
      const pts: [number, number][] = [];
      for (let y = 0; y < h; y += step)
        for (let xx = 0; xx < w; xx += step)
          if (d[(y * w + xx) * 4 + 3] > 130) pts.push([xx - w / 2, -(y - h / 2)]);
      return pts;
    };

    const tpts = sample(W, H);
    const N = tpts.length;
    if (!N) {
      renderer.dispose();
      return;
    }
    let mnX = 1e9,
      mxX = -1e9;
    for (let i = 0; i < N; i++) {
      if (tpts[i][0] < mnX) mnX = tpts[i][0];
      if (tpts[i][0] > mxX) mxX = tpts[i][0];
    }
    const pos = new Float32Array(N * 3),
      col = new Float32Array(N * 3),
      vel = new Float32Array(N * 3);
    const baseX = new Float32Array(N),
      baseY = new Float32Array(N),
      ab = new Float32Array(N),
      ph = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const lr = (tpts[i][0] - mnX) / Math.max(1, mxX - mnX);
      const aa = Math.max(0, Math.min(1, (lr - 0.46) / 0.54));
      ab[i] = aa;
      const scat = 10 + aa * 26;
      baseX[i] = tpts[i][0] + (Math.random() - 0.5) * 2 * scat;
      baseY[i] = tpts[i][1] + (Math.random() - 0.5) * 2 * scat;
      ph[i] = Math.random() * Math.PI * 2;
      pos[i * 3] = (Math.random() - 0.5) * W * 1.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * H * 1.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 320;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const c1 = new THREE.Color(ACC),
      c2 = new THREE.Color("#F4EFE6"),
      c3 = new THREE.Color("#3E7BFF");
    for (let i = 0; i < N; i++) {
      const a = ab[i];
      const r = Math.random();
      const c = r < 0.1 + 0.12 * a ? c3 : r < 0.42 + 0.22 * a ? c1 : c2;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    geo.attributes.color.needsUpdate = true;

    const mat = new THREE.PointsMaterial({
      size: isMobile ? 2.6 : 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
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

    const rad = isMobile ? 84 : 132;
    let raf = 0;
    const tick = () => {
      const time = performance.now();
      const P = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < N; i++) {
        const ix = i * 3,
          iy = i * 3 + 1,
          iz = i * 3 + 2;
        const amp = (8 + ab[i] * 24) * motion;
        const ox =
          Math.sin(time * 0.0003 + ph[i]) * amp +
          Math.sin(time * 0.00016 + ph[i] * 1.7) * amp * 0.5;
        const oy =
          Math.cos(time * 0.00026 + ph[i] * 1.3) * amp +
          Math.cos(time * 0.00019 + ph[i]) * amp * 0.4;
        const tx = baseX[i] + ox,
          ty = baseY[i] + oy;
        vel[ix] += (tx - P[ix]) * 0.0075;
        vel[iy] += (ty - P[iy]) * 0.0075;
        vel[iz] += (0 - P[iz]) * 0.006;
        if (mouse.on) {
          const ddx = P[ix] - mouse.x,
            ddy = P[iy] - mouse.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < rad * rad) {
            const dd = Math.sqrt(d2) || 1;
            const f = (rad - dd) / rad;
            vel[ix] += (ddx / dd) * f * 2.3;
            vel[iy] += (ddy / dd) * f * 2.3;
          }
        }
        vel[ix] *= 0.935;
        vel[iy] *= 0.935;
        vel[iz] *= 0.945;
        P[ix] += vel[ix];
        P[iy] += vel[iy];
        P[iz] += vel[iz];
      }
      geo.attributes.position.needsUpdate = true;
      points.rotation.z = Math.sin(time * 0.0001) * 0.03;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(tick);
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
      const ts = sample(W, H);
      for (let i = 0; i < N && i < ts.length; i++) {
        baseX[i] = ts[i][0];
        baseY[i] = ts[i][1];
      }
    };
    window.addEventListener("resize", onResize);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => (e.isIntersecting ? start() : stop())),
      { threshold: 0.02 }
    );
    io.observe(host);
    const vis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", vis);

    if (reduce) {
      const P = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < N; i++) {
        P[i * 3] = baseX[i];
        P[i * 3 + 1] = baseY[i];
        P[i * 3 + 2] = 0;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, cam);
    } else {
      start();
    }

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
