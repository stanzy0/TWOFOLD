"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";


const AUTH_TIMEOUT_MS = 3000;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuthInstance();
    if (!auth) {
      // Firebase is not configured (e.g. missing env vars). Avoid build-time crashes.
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });


    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, AUTH_TIMEOUT_MS);

    return () => {
      unsubscribe();
      window.clearTimeout(timeout);
    };
  }, []);

  return { user, isLoggedIn: !!user, isLoading };
}
