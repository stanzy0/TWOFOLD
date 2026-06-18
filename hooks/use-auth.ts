"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const session = document.cookie.includes("twofold_session=true");
    if (!session) {
      router.push("/login");
    }
  }, [router]);

  return { isLoggedIn: typeof document !== "undefined" && document.cookie.includes("twofold_session=true") };
}
