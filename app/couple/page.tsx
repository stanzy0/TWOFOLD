"use client";

import { useState, useEffect, FormEvent } from "react";
import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { motion } from "framer-motion";
import { Heart, User, Calendar, Camera, Share2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface Partner {
  name: string;
  email: string;
  since: string;
}

export default function CouplePage() {
  const { isLoggedIn, isLoading } = useAuth();
  const [partner1, setPartner1] = useState<Partner>({ name: "", email: "", since: "" });
  const [partner2, setPartner2] = useState<Partner>({ name: "", email: "", since: "" });
  const [sharedBio, setSharedBio] = useState("");

  useEffect(() => {
    if (!isLoading && !isLoggedIn && typeof window !== "undefined") {
      window.location.href = "/login";
    }
    const saved = localStorage.getItem("couple_profile");
    if (saved) {
      const data = JSON.parse(saved);
      setPartner1(data.partner1 || { name: "", email: "", since: "" });
      setPartner2(data.partner2 || { name: "", email: "", since: "" });
      setSharedBio(data.sharedBio || "");
    }
  }, [isLoading, isLoggedIn]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const profile = { partner1, partner2, sharedBio };
    localStorage.setItem("couple_profile", JSON.stringify(profile));
    alert("Couple profile saved!");
  };

  return (
    <AuroraBackground intensity={0.8} speed={1.2} className="min-h-screen">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-rose-500" />
            </div>
            <h1 className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Couple Profile
            </h1>
            <p className="mt-2 text-muted-foreground">Your shared love story</p>
          </motion.div>

          <GlassCard intensity="medium" className="p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-rose-500" />
                    Partner 1
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={partner1.name}
                        onChange={(e) => setPartner1({ ...partner1, name: e.target.value })}
                        placeholder="Partner 1 name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={partner1.email}
                        onChange={(e) => setPartner1({ ...partner1, email: e.target.value })}
                        placeholder="partner@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Together since</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          value={partner1.since}
                          onChange={(e) => setPartner1({ ...partner1, since: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-500" />
                    Partner 2
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={partner2.name}
                        onChange={(e) => setPartner2({ ...partner2, name: e.target.value })}
                        placeholder="Partner 2 name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={partner2.email}
                        onChange={(e) => setPartner2({ ...partner2, email: e.target.value })}
                        placeholder="partner@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Together since</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          value={partner2.since}
                          onChange={(e) => setPartner2({ ...partner2, since: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shared Bio</label>
                <textarea
                  value={sharedBio}
                  onChange={(e) => setSharedBio(e.target.value)}
                  placeholder="Write your love story..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="h-5 w-5" />
                Save Couple Profile
              </button>
            </form>
          </GlassCard>
        </main>
      </div>
    </AuroraBackground>
  );
}
