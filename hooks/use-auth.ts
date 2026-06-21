"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkSession = () => {
      const appSession = sessionStorage.getItem("twofold_session") === "true";
      setIsLoggedIn(appSession);
      setIsLoading(false);
    };

    checkSession();

    const handleStorage = () => {
      const s = sessionStorage.getItem("twofold_session");
      setIsLoggedIn(s === "true");
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const userData =
    typeof window !== "undefined"
      ? (() => {
          const raw = sessionStorage.getItem("twofold_user");
          return raw ? JSON.parse(raw) : null;
        })()
      : null;

  return { isLoggedIn, isLoading, user: userData };
}
