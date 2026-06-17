import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { motion } from "framer-motion";
import { Heart, ImageIcon, Calendar } from "lucide-react";

export default function MemoriesPage() {
  return (
    <AuroraBackground intensity={0.8} speed={1.2} className="min-h-screen">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Memories
            </h1>
            <p className="mt-2 text-muted-foreground">
              Relive your favorite moments together.
            </p>
          </motion.div>

          <div className="mb-8 flex items-center justify-between">
            <div className="flex gap-2">
              {["All", "Dates", "Travel", "Everyday"].map((filter) => (
                <button
                  key={filter}
                  className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-300 dark:hover:bg-rose-950/40"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Beach Sunset", date: "May 12, 2025", emoji: "🌅" },
              { title: "First Concert", date: "Apr 3, 2025", emoji: "🎵" },
              { title: "Mountain Hike", date: "Mar 18, 2025", emoji: "🏔️" },
              { title: "Cozy Night In", date: "Feb 14, 2025", emoji: "🍿" },
              { title: "City Getaway", date: "Jan 22, 2025", emoji: "🏙️" },
              { title: "Stargazing", date: "Dec 31, 2024", emoji: "✨" },
            ].map((memory, i) => (
              <GlassCard
                key={memory.title}
                intensity="medium"
                glow={i % 2 === 0 ? "rose" : "purple"}
                className="p-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-3xl">{memory.emoji}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {memory.date}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">
                    {memory.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A beautiful moment captured forever.
                  </p>
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </main>
      </div>
    </AuroraBackground>
  );
}
