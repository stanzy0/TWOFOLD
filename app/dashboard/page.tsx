import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { motion } from "framer-motion";
import { Heart, Calendar, ImageIcon, Trophy, Flame } from "lucide-react";

export default function DashboardPage() {
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
              Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your love story at a glance.
            </p>
          </motion.div>

          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Days Together", value: "1,024", icon: Heart, color: "rose" },
              { label: "Memories", value: "238", icon: ImageIcon, color: "purple" },
              { label: "Anniversaries", value: "12", icon: Calendar, color: "indigo" },
              { label: "Challenges", value: "34", icon: Trophy, color: "rose" },
            ].map((stat) => (
              <GlassCard key={stat.label} intensity="medium" glow={stat.color as "rose" | "purple"} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-rose-500" />
                </div>
              </GlassCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            <GlassCard intensity="medium" className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Upcoming Milestones</h2>
              <ul className="space-y-4">
                {["Next anniversary in 14 days", "Date night reminder: Friday", "6 month trip plan"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </GlassCard>
            <GlassCard intensity="medium" className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h2>
              <ul className="space-y-4">
                {["Added 3 new memories", "Completed couple challenge", "Shared a love note"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Flame className="h-4 w-4 text-orange-500" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </GlassCard>
          </motion.div>
        </main>
      </div>
    </AuroraBackground>
  );
}
