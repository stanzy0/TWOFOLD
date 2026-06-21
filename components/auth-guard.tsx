"use client";

import { useEffect } from "react";

export function AuthGuard({
  isLoading,
  isLoggedIn,
  children,
}: {
  isLoading: boolean;
  isLoggedIn: boolean;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!isLoading && !isLoggedIn && typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading your account...</p>
          <p className="mt-2 text-sm text-muted-foreground">If this takes too long, sign in again from the login page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
