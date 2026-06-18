"use client";

import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { motion } from "framer-motion";
import { User, Mail } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <AuroraBackground intensity={0.8} speed={1.2} className="min-h-screen">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Profile
            </h1>
            <p className="mt-2 text-muted-foreground">Manage your account information</p>
          </motion.div>

          <GlassCard intensity="medium" className="p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                U
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">User</h2>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  user@example.com
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                <input type="text" defaultValue="" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                <input type="email" value="user@example.com" disabled className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Bio</label>
                <textarea rows={4} placeholder="Tell us about yourself..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">Save Changes</button>
            </div>
          </GlassCard>
        </main>
      </div>
    </AuroraBackground>
  );
}
