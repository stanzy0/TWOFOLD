"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Trophy, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/backgrounds/GlassCard";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  completed?: boolean;
}

const defaultChallenges: Challenge[] = [
  { id: "1", title: "Stargazing Night", description: "Find a quiet spot, lay out a blanket, and watch the stars together.", difficulty: "easy" },
  { id: "2", title: "Cook a New Recipe", description: "Pick a cuisine you've never tried and cook it together from scratch.", difficulty: "medium" },
  { id: "3", title: "Photo Scavenger Hunt", description: "Take photos of 10 items that remind you of each other.", difficulty: "medium" },
  { id: "4", title: "Write Love Letters", description: "Write heartfelt letters to each other and exchange them over candlelight.", difficulty: "easy" },
  { id: "5", title: "30-Day Challenge", description: "Do something kind for your partner every day for 30 days.", difficulty: "hard" },
  { id: "6", title: "Memory Lane", description: "Recreate your first date and reminisce about how far you've come.", difficulty: "easy" },
];

export default function ChallengesPage() {
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>(defaultChallenges);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("twofold_session");
    if (!session) router.push("/login");
  }, [router]);

  const toggleComplete = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const handleAddChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, description: newDesc, difficulty: "medium" }),
      });

      if (res.ok) {
        const data = await res.json();
        setChallenges((prev) => [...prev, { ...data, completed: false }]);
        setNewTitle("");
        setNewDesc("");
      }
    } catch {
      alert("Failed to add challenge");
    }
  };

  const difficultyColors = {
    easy: "text-green-600 bg-green-50 dark:bg-green-900/20",
    medium: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20",
    hard: "text-red-600 bg-red-50 dark:bg-red-900/20",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 dark:text-purple-400">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-purple-500" />
            <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent">
              Couple Challenges
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Strengthen your bond with fun challenges together</p>
        </motion.div>

        <GlassCard intensity="medium" className="p-6 mb-8">
          <form onSubmit={handleAddChallenge} className="flex gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Challenge title..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Short description..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors"
            >
              Add
            </button>
          </form>
        </GlassCard>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {challenges.map((challenge, i) => (
            <GlassCard
              key={challenge.id}
              intensity="medium"
              glow={i % 2 === 0 ? "purple" : "rose"}
              className="p-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}`}>
                      {challenge.difficulty}
                    </div>
                    {challenge.completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  </div>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                <button
                  onClick={() => toggleComplete(challenge.id)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                    challenge.completed
                      ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 hover:bg-purple-100"
                  }`}
                >
                  {challenge.completed ? "Completed!" : "Mark as Complete"}
                </button>
              </motion.div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
