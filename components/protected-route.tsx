"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("twofold_logged_in");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
