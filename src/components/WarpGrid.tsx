"use client";

import { useEffect, useRef } from "react";

export default function WarpGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const RING_COUNT = 14;
    const LINE_COUNT = 26;
    const RING_SPEED = 0.00012; // vitesse des anneaux vers l'extérieur
    const ROTATE_SPEED = 0.00002; // rotation d'ensemble, très lente

    let rafId: number;
    const start = performance.now();

    function draw(now: number) {
      rafId = requestAnimationFrame(draw);
      if (document.hidden) return; // pause quand l'onglet n'est pas visible

      const t = now - start;
      const cx = width / 2;
      const cy = height * 0.55;
      const maxR = Math.hypot(width, height) * 0.6;
      const rotation = t * ROTATE_SPEED;

      ctx!.clearRect(0, 0, width, height);

      // Lignes radiales
      ctx!.strokeStyle = "rgba(0, 212, 255, 0.10)";
      ctx!.lineWidth = 1;
      for (let i = 0; i < LINE_COUNT; i++) {
        const angle = (i / LINE_COUNT) * Math.PI * 2 + rotation;
        const x = cx + Math.cos(angle) * maxR;
        const y = cy + Math.sin(angle) * maxR * 0.55;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(x, y);
        ctx!.stroke();
      }

      // Anneaux concentriques progressant vers l'extérieur (effet tunnel)
      const progress = (t * RING_SPEED) % 1;
      for (let i = 0; i < RING_COUNT; i++) {
        const p = (i / RING_COUNT + progress) % 1;
        const r = p * maxR;
        const opacity = (1 - p) * 0.3;
        if (opacity <= 0.01) continue;
        ctx!.strokeStyle = `rgba(72, 202, 228, ${opacity})`;
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, r, r * 0.55, rotation * 0.5, 0, Math.PI * 2);
        ctx!.stroke();
      }

      // Point lumineux central (léger pulse)
      const glowR = 40 + Math.sin(t * 0.0015) * 6;
      const gradient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      gradient.addColorStop(0, "rgba(0, 212, 255, 0.5)");
      gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
      ctx!.fillStyle = gradient;
      ctx!.beginPath();
      ctx!.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx!.fill();
    }

    if (prefersReducedMotion) {
      // Une seule image statique, pas de boucle d'animation
      draw(start + 400);
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{
        maskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 75%)",
      }}
    />
  );
}