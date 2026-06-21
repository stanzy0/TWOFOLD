"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Trash2, Edit2 } from "lucide-react";
import { GlassCard } from "@/components/backgrounds/GlassCard";

interface Memory {
  id: string;
  title: string;
  description?: string;
  emoji?: string;
  date: string;
}

const emojis = ["💝", "🌅", "🎵", "🏔️", "🍿", "🏙️", "✨", "🌹", "🎯", "📅", "📸", "💌"];

export default function EditMemoryPage() {
  const router = useRouter();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("💝");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("twofold_session");
    if (!session) router.push("/login");

    const stored = localStorage.getItem("edit_memory");
    if (stored) {
      const data = JSON.parse(stored) as Memory;
      setMemory(data);
      setTitle(data.title);
      setDescription(data.description || "");
      setEmoji(data.emoji || "💝");
      setDate(data.date || "");
    } else {
      router.push("/memories");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!memory) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/memories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: memory.id, title, description, emoji, date }),
      });

      if (res.ok) {
        const memories = JSON.parse(localStorage.getItem("twofold_memories") || "[]");
        const updated = memories.map((m: Memory) => (m.id === memory.id ? { ...m, title, description, emoji, date } : m));
        localStorage.setItem("twofold_memories", JSON.stringify(updated));
        router.push("/memories");
      } else {
        alert("Failed to update memory");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!memory || !confirm("Delete this memory?")) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/memories?id=${memory.id}`, { method: "DELETE" });
      if (res.ok) {
        const memories = JSON.parse(localStorage.getItem("twofold_memories") || "[]");
        const filtered = memories.filter((m: Memory) => m.id !== memory.id);
        localStorage.setItem("twofold_memories", JSON.stringify(filtered));
        router.push("/memories");
      } else {
        alert("Failed to delete memory");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!memory) return null;

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
            Edit Memory
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
                        emoji === e ? "border-rose-500 bg-rose-50 dark:bg-rose-950/40" : "border-gray-200 dark:border-gray-700 hover:border-rose-300"
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

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 className="h-5 w-5" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-5 w-5" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
