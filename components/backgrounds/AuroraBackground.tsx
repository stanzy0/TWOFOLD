"use client";

import { memo, useMemo } from "react";

interface AuroraBackgroundProps {
  intensity?: number;
  speed?: number;
  className?: string;
  children?: React.ReactNode;
}

export const AuroraBackground = memo(function AuroraBackground({
  intensity = 1,
  speed = 1,
  className = "",
  children,
}: AuroraBackgroundProps) {
  const orbs = useMemo(
    () => [
      { color: "bg-rose-300/40 dark:bg-rose-400/20", size: 320, x: 0, y: 0, blur: 120 },
      { color: "bg-purple-300/40 dark:bg-purple-400/20", size: 280, x: 1, y: 0, blur: 100 },
      { color: "bg-indigo-300/40 dark:bg-indigo-400/20", size: 360, x: 0.5, y: 1, blur: 140 },
      { color: "bg-pink-300/40 dark:bg-pink-400/20", size: 260, x: 1, y: 1, blur: 110 },
    ],
    [],
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-purple-50/30 to-indigo-50/50 dark:from-rose-950/30 dark:via-purple-950/20 dark:to-indigo-950/30"
          style={{ opacity: intensity }}
        />

        {orbs.map((orb, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${orb.color}`}
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x * 100}%`,
              top: `${orb.y * 100}%`,
              transform: `translate(-50%, -50%)`,
              filter: `blur(${orb.blur}px)`,
              animation: `aurora-${i + 1} ${12 / speed}s ease-in-out infinite`,
              opacity: 0.6 * intensity,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-black/60 dark:via-transparent" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
});
