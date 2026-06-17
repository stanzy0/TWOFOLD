"use client"

import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gradient">{siteConfig.name}</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">Features</a>
          <a href="#" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">Pricing</a>
          <a href="#" className="transition-colors hover:text-accent-foreground/80 text-muted-foreground">About</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-rose-500/20 transition-all hover:bg-rose-600 hover:shadow-lg dark:bg-rose-600 dark:hover:bg-rose-500">
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
