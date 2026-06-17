"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  intensity?: "light" | "medium" | "strong";
  hover?: boolean;
  glow?: "rose" | "purple" | "none";
}

export function GlassCard({
  children,
  intensity = "medium",
  hover = true,
  glow = "none",
  className,
  ...props
}: GlassCardProps) {
  const intensityClasses = {
    light: "bg-white/40 border-white/30 shadow-lg shadow-rose-100/50 dark:bg-white/5 dark:border-white/10 dark:shadow-black/20",
    medium:
      "bg-white/70 border-white/40 shadow-xl shadow-rose-200/50 dark:bg-white/10 dark:border-white/10 dark:shadow-black/30",
    strong:
      "bg-white/85 border-white/50 shadow-2xl shadow-rose-300/60 dark:bg-white/15 dark:border-white/15 dark:shadow-black/40",
  };

  const glowClasses = {
    rose: "hover:shadow-rose-400/40 hover:shadow-2xl",
    purple: "hover:shadow-purple-400/40 hover:shadow-2xl",
    none: "",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl border backdrop-blur-xl backdrop-saturate-150 transition-all duration-300",
        intensityClasses[intensity],
        hover && glowClasses[glow],
        "hover:border-rose-200/60 dark:hover:border-rose-400/30",
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
