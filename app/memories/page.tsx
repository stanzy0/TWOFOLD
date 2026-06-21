"use client";

import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { motion } from "framer-motion";
import { Calendar, Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";

interface Memory {
  id: string;
  title: string;
  description?: string;
  date: string;
  emoji?: string;
}

export default function MemoriesPage() {
  const { isLoggedIn, isLoading } = useAuth();

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

  const handleEdit = (memory: Memory) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("edit_memory", JSON.stringify(memory));
      window.location.href = "/memories/edit";
    }
  };

  const handleDelete = (id: string) => {
    if (typeof window !== "undefined") {
      const memories = JSON.parse(localStorage.getItem("twofold_memories") || "[]");
      const filtered = memories.filter((m: Memory) => m.id !== id);
      localStorage.setItem("twofold_memories", JSON.stringify(filtered));
      setMemories(filtered);
    }
  };

  return (
    <AuroraBackground intensity={0.8} speed={1.2} className="min-h-screen">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  Memories
                </h1>
                <p className="mt-2 text-muted-foreground">Relive your favorite moments together.</p>
              </div>
              <Link
                href="/memories/create"
                className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Memory
              </Link>
            </div>
          </motion.div>

          {memories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">No memories yet</p>
              <Link href="/memories/create" className="text-rose-500 hover:text-rose-600 font-medium">
                Create your first memory
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {memories.map((memory, i) => (
                <GlassCard key={memory.id} intensity="medium" glow={i % 2 === 0 ? "rose" : "purple"} className="p-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-3xl">{memory.emoji}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(memory.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-foreground">{memory.title}</h3>
                    {memory.description && <p className="text-sm text-muted-foreground mb-4">{memory.description}</p>}
                    <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => handleEdit(memory)}
                        className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(memory.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                </GlassCard>
              ))}
            </div>
          )}
        </main>
      </div>
    </AuroraBackground>
  );
}
