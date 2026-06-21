"use client";

import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { motion } from "framer-motion";
import { Heart, Calendar, ImageIcon, Trophy, Flame } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";

interface Memory {
  id: string;
  title: string;
  description?: string;
  date: string;
  emoji?: string;
}

interface Challenge {
  id: string;
  title: string;
  completed?: boolean;
}

export default function DashboardPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [memoryCount, setMemoryCount] = useState(0);
  const [anniversaryCount, setAnniversaryCount] = useState(0);

  useEffect(() => {
    if (!isLoading && !isLoggedIn && typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  useEffect(() => {
    if (!isLoggedIn) return;
    const saved = localStorage.getItem("twofold_memories");
    if (saved) {
      const parsed = JSON.parse(saved);
      setMemories(parsed);
      setMemoryCount(parsed.length);
    }
    const savedChallenges = localStorage.getItem("twofold_challenges");
    if (savedChallenges) {
      const parsed = JSON.parse(savedChallenges);
      setChallenges(parsed);
    }
    const savedUser = sessionStorage.getItem("twofold_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      const name = parsed.name || "User";
      const email = parsed.email || "";
      setUserName(name);
      const stored = localStorage.getItem(`profile_data_${email}`);
      if (stored) {
        const profile = JSON.parse(stored);
        if (profile.name) setUserName(profile.name);
        if (profile.photo) setPhotoUrl(profile.photo);
      }
    }
    const anniversaries = localStorage.getItem("twofold_anniversaries");
    if (anniversaries) {
      setAnniversaryCount(JSON.parse(anniversaries).length);
    }
  }, [isLoggedIn]);

  const completedChallenges = challenges.filter((c) => c.completed).length;

  return (
    <AuroraBackground intensity={0.8} speed={1.2} className="min-h-screen">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">Welcome back{userName ? `, ${userName}` : ""}! Your love story at a glance.</p>
          </motion.div>

          <GlassCard intensity="medium" className="p-6 mb-8">
            <div className="flex items-center gap-4">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="h-12 w-12 rounded-full object-cover border-2 border-rose-200" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
                  {userName ? userName[0]?.toUpperCase() : "U"}
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-foreground">{userName || "User"}</h2>
                <p className="text-sm text-muted-foreground">Signed in • {isLoggedIn ? "Active" : "Inactive"}</p>
              </div>
              <div className="ml-auto">
                <a href="/couple" className="text-sm text-rose-500 hover:text-rose-600 font-medium">Edit profile →</a>
              </div>
            </div>
          </GlassCard>

          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Memories", value: memoryCount.toString(), icon: ImageIcon, color: "purple" as const },
              { label: "Anniversaries", value: anniversaryCount.toString(), icon: Calendar, color: "indigo" as const },
              { label: "Challenges", value: completedChallenges.toString(), icon: Trophy, color: "rose" as const },
              { label: "Days Together", value: "0", icon: Heart, color: "rose" as const },
            ].map((stat) => (
              <GlassCard key={stat.label} intensity="medium" glow={stat.color} className="p-6">
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

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <GlassCard intensity="medium" className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Memories</h2>
              {memories.length === 0 ? (
                <p className="text-sm text-muted-foreground">No memories yet. Start by creating one!</p>
              ) : (
                <ul className="space-y-3">
                  {memories.slice(0, 3).map((m) => (
                    <li key={m.id} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-xl">{m.emoji}</span>
                      {m.title}
                    </li>
                  ))}
                </ul>
              )}
            </GlassCard>
            <GlassCard intensity="medium" className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h2>
              <ul className="space-y-3">
                {challenges.filter((c) => c.completed).slice(0, 3).map((c) => (
                  <li key={c.id} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Flame className="h-4 w-4 text-orange-500" />
                    Completed challenge: {c.title}
                  </li>
                ))}
                {challenges.filter((c) => c.completed).length === 0 && (
                  <p className="text-sm text-muted-foreground">No activity yet. Try a couple challenge!</p>
                )}
              </ul>
            </GlassCard>
          </motion.div>
        </main>
      </div>
    </AuroraBackground>
  );
}
