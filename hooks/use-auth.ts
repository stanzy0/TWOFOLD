"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem("twofold_session");
    if (!session) {
      router.push("/login");
    }
  }, [router]);

  return { isLoggedIn: typeof window !== "undefined" && sessionStorage.getItem("twofold_session") === "true" };
}
