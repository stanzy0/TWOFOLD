"use client";

import { Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export function SiteHeader() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } finally {
      router.push("/login");
    }
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
          <Link href="/profile" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">Profile</Link>
          <Link href="/settings" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">Settings</Link>
        </nav>
        <div className="flex items-center gap-3">
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
