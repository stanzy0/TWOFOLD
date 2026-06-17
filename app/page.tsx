"use client";

import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { FloatingHeartsBackground } from "@/components/backgrounds/FloatingHeartsBackground";
import { AnimatedGradientBackground } from "@/components/backgrounds/AnimatedGradientBackground";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <AnimatedGradientBackground intensity="medium" className="min-h-screen">
      <AuroraBackground intensity={0.8} speed={1.2} className="min-h-screen">
        <FloatingHeartsBackground count={16} speed="slow" className="min-h-screen">
          <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-6">
              <section className="relative mb-32">
                <div className="mx-auto max-w-5xl text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/60 px-4 py-1.5 text-sm backdrop-blur-sm dark:border-rose-500/30 dark:bg-rose-950/40"
                  >
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text font-medium text-transparent">
                      Made for couples in love
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-6 px-4 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                  >
                    <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      Create beautiful moments,
                    </span>
                    <br />
                    <span className="text-foreground">together.</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl"
                  >
                    {siteConfig.description}. Build memories that last forever.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                  >
                    <button className="group relative overflow-hidden rounded-xl bg-rose-500 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:bg-rose-600 active:scale-95 dark:shadow-rose-400/20">
                      <span className="relative z-10 flex items-center gap-2">
                        Start your journey
                        <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
                      </span>
                    </button>
                    <button className="rounded-xl border border-rose-200 bg-white/50 px-8 py-3.5 text-lg font-semibold text-rose-700 backdrop-blur-sm transition-all hover:scale-105 hover:border-rose-300 hover:bg-white/70 active:scale-95 dark:border-rose-500/30 dark:bg-white/5 dark:text-rose-300 dark:hover:bg-white/10">
                      Learn more
                    </button>
                  </motion.div>
                </div>
              </section>

              <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="mb-40"
              >
                <div className="mb-16 text-center">
                  <h2 className="mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                    Beautifully designed for love
                  </h2>
                  <p className="mx-auto max-w-xl text-lg text-muted-foreground">
                    Every feature is crafted with care to help you connect deeper
                    with your partner.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Shared Memories",
                      desc: "Capture and relive special moments together in one beautiful timeline.",
                      icon: "💝",
                      glow: "rose" as const,
                    },
                    {
                      title: "Love Notes",
                      desc: "Send sweet messages that arrive at just the right moment.",
                      icon: "💌",
                      glow: "purple" as const,
                    },
                    {
                      title: "Date Ideas",
                      desc: "Discover curated experiences tailored to your relationship.",
                      icon: "🌹",
                      glow: "purple" as const,
                    },
                    {
                      title: "Anniversary Tracker",
                      desc: "Never miss a milestone with smart reminders.",
                      icon: "📅",
                      glow: "rose" as const,
                    },
                    {
                      title: "Couple Challenges",
                      desc: "Strengthen your bond with fun bonding activities.",
                      icon: "🎯",
                      glow: "rose" as const,
                    },
                    {
                      title: "Photo Journals",
                      desc: "Create visual stories of your journey together.",
                      icon: "📸",
                      glow: "purple" as const,
                    },
                  ].map((feature, i) => (
                    <GlassCard key={feature.title} intensity="medium" glow={feature.glow} className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <div className="mb-4 text-4xl">{feature.icon}</div>
                        <h3 className="mb-2 text-lg font-semibold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">{feature.desc}</p>
                      </motion.div>
                    </GlassCard>
                  ))}
                </div>
              </motion.section>
            </main>
          </div>
        </FloatingHeartsBackground>
      </AuroraBackground>
    </AnimatedGradientBackground>
  );
}
