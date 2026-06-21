"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Plus } from "lucide-react";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function CreateMemoryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("💝");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emojis = ["💝", "🌅", "🎵", "🏔️", "🍿", "🏙️", "✨", "🌹", "🎯", "📅", "📸", "💌"];

  useEffect(() => {
    const session = sessionStorage.getItem("twofold_session");
    if (!session) router.push("/login");
  }, [router]);

  const saveToLocal = (memory: { id: string; title: string; description?: string; emoji?: string; date: string; created_at: string }) => {
    const saved = localStorage.getItem("twofold_memories");
    const memories: typeof memory[] = saved ? JSON.parse(saved) : [];
    localStorage.setItem("twofold_memories", JSON.stringify([memory, ...memories]));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const memory = {
      id: Date.now().toString(),
      title,
      description,
      emoji,
      date,
      created_at: new Date().toISOString(),
    };

    saveToLocal(memory);

    const supabaseConfigured = isSupabaseConfigured;
    if (supabaseConfigured) {
      try {
        await supabase.from("memories").insert({
          title,
          description,
          emoji,
          date,
        });
      } catch {
        
      }
    }

    router.push("/memories");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-rose-950/30 dark:via-purple-950/20 dark:to-indigo-950/30 p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link href="/memories" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 dark:text-rose-400">
            <ArrowLeft className="h-4 w-4" />
            Back to memories
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-3xl font-bold text-transparent mb-8">
            Create New Memory
          </h1>

          <GlassCard intensity="medium" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give this memory a title..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this special moment..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emoji</label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={`text-2xl p-2 rounded-lg border transition-all ${
                        emoji === e
                          ? "border-rose-500 bg-rose-50 dark:bg-rose-950/40"
                          : "border-gray-200 dark:border-gray-700 hover:border-rose-300"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                {isSubmitting ? "Creating..." : "Create Memory"}
              </button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
