"use client";

import { useEffect, useRef } from "react";

interface AnimatedGradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
  direction?: "top-right" | "bottom-right" | "radial" | "diagonal";
}

export function AnimatedGradientBackground({
  className = "",
  children,
  intensity = "medium",
  direction = "diagonal",
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;

      const w = canvas.width;
      const h = canvas.height;

      const gradient = ctx.createLinearGradient(
        w * 0.2 + Math.sin(time * 0.5) * w * 0.2,
        0,
        w * 0.8 + Math.cos(time * 0.4) * w * 0.2,
        h,
      );

      const alpha = intensity === "strong" ? 0.25 : intensity === "medium" ? 0.2 : 0.15;

      gradient.addColorStop(0, `rgba(251, 113, 133, ${alpha})`);
      gradient.addColorStop(0.3, `rgba(244, 63, 94, ${alpha * 0.8})`);
      gradient.addColorStop(0.5, `rgba(168, 85, 247, ${alpha})`);
      gradient.addColorStop(0.7, `rgba(99, 102, 241, ${alpha * 0.8})`);
      gradient.addColorStop(1, `rgba(236, 72, 153, ${alpha})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const secondGradient = ctx.createRadialGradient(
        w * 0.5 + Math.cos(time * 0.3) * w * 0.3,
        h * 0.3 + Math.sin(time * 0.4) * h * 0.3,
        0,
        w * 0.5,
        h * 0.5,
        w * 0.8,
      );

      const alpha2 = intensity === "strong" ? 0.18 : intensity === "medium" ? 0.14 : 0.1;
      secondGradient.addColorStop(0, `rgba(253, 164, 175, ${alpha2})`);
      secondGradient.addColorStop(0.5, `rgba(232, 121, 249, ${alpha2})`);
      secondGradient.addColorStop(1, "rgba(99, 102, 241, 0)");

      ctx.fillStyle = secondGradient;
      ctx.fillRect(0, 0, w, h);

      time += 0.008;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [intensity, direction]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: "none" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
