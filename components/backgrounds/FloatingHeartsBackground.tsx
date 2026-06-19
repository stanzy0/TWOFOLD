"use client";

import { memo, useEffect, useState } from "react";

interface FloatingHeartsBackgroundProps {
  count?: number;
  className?: string;
  children?: React.ReactNode;
  speed?: "slow" | "medium" | "fast";
}

type HeartElement = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  rotation: number;
};

export const FloatingHeartsBackground = memo(function FloatingHeartsBackground({
  count = 12,
  className = "",
  children,
  speed = "medium",
}: FloatingHeartsBackgroundProps) {
  const [hearts, setHearts] = useState<HeartElement[]>([]);

  useEffect(() => {
    const baseDuration =
      speed === "slow" ? 12 : speed === "fast" ? 5 : 8;

    setHearts(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: baseDuration + Math.random() * 4,
        size: 12 + Math.random() * 18,
        opacity: 0.25 + Math.random() * 0.45,
        rotation: Math.random() * 60 - 30,
      })),
    );
  }, [count, speed]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pointer-events-none absolute select-none"
          style={{
            left: `${h.left}%`,
            bottom: "-40px",
            width: h.size,
            height: h.size,
            animation: `float ${h.duration}s ease-in-out ${h.delay}s infinite`,
            opacity: h.opacity,
            transform: `rotate(${h.rotation}deg)`,
          }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-full w-full text-rose-400 dark:text-rose-500"
            fill="currentColor"
          >
            <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
          </svg>
        </span>
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
});
