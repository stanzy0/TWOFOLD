"use client";

import { Heart, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const router = useRouter();

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("twofold_session");
      sessionStorage.removeItem("twofold_user");
    }
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold text-gradient">Twofold</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">Dashboard</Link>
          <Link href="/memories" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">Memories</Link>
          <Link href="/challenges" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">Challenges</Link>
          <Link href="/couple" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">Couple</Link>
          <Link href="/planner" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">Planner</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/memories/create"
            className="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-600"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Memory</span>
          </Link>
          <ThemeToggle />
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 backdrop-blur-sm transition-colors hover:border-rose-300 dark:border-rose-500/30 dark:text-rose-300 dark:hover:bg-rose-950/40"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
