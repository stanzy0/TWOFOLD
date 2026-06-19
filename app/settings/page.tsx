"use client";

import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { AuthGuard } from "@/components/auth-guard";
import { motion } from "framer-motion";
import { Sun, Bell, Shield } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

function AuthFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="text-lg text-muted-foreground">Loading your account...</p>
        <p className="mt-2 text-sm text-muted-foreground">If this takes too long, sign in again from the login page.</p>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { isLoggedIn, isLoading } = useAuth();

  return (
    <AuthGuard isLoading={isLoading} isLoggedIn={isLoggedIn}>
      <AuroraBackground intensity={0.8} speed={1.2} className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <h1 className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                Settings
              </h1>
              <p className="mt-2 text-muted-foreground">Customize your experience</p>
            </motion.div>

            <div className="space-y-6">
              <GlassCard intensity="medium" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Sun className="h-6 w-6 text-amber-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">Appearance</h3>
                      <p className="text-sm text-muted-foreground">Manage your theme settings</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Customize
                  </button>
                </div>
              </GlassCard>

              <GlassCard intensity="medium" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Bell className="h-6 w-6 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                      <p className="text-sm text-muted-foreground">Control your notification preferences</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Configure
                  </button>
                </div>
              </GlassCard>

              <GlassCard intensity="medium" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Shield className="h-6 w-6 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">Privacy & Security</h3>
                      <p className="text-sm text-muted-foreground">Manage your privacy settings</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Manage
                  </button>
                </div>
              </GlassCard>
            </div>
          </main>
        </div>
      </AuroraBackground>
      {isLoading && <AuthFallback />}
    </AuthGuard>
  );
}
