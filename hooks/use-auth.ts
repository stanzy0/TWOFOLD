"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isSupabaseConfigured) {
      const getSession = async () => {
        const { data } = await supabase.auth.getSession();
        const session = data.session;
        setIsLoggedIn(!!session);
        if (session?.user) {
          const metadata = session.user.user_metadata;
          setUser({
            email: session.user.email || undefined,
            name: metadata?.name || session.user.email?.split("@")[0] || undefined,
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      };

      getSession();

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsLoggedIn(!!session);
        if (session?.user) {
          const metadata = session.user.user_metadata;
          setUser({
            email: session.user.email || undefined,
            name: metadata?.name || session.user.email?.split("@")[0] || undefined,
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    } else {
      const checkSession = () => {
        const appSession = sessionStorage.getItem("twofold_session") === "true";
        setIsLoggedIn(appSession);
        const raw = sessionStorage.getItem("twofold_user");
        setUser(raw ? JSON.parse(raw) : null);
        setIsLoading(false);
      };

      checkSession();

      const handleStorage = () => {
        const s = sessionStorage.getItem("twofold_session");
        setIsLoggedIn(s === "true");
        const raw = sessionStorage.getItem("twofold_user");
        setUser(raw ? JSON.parse(raw) : null);
      };
      window.addEventListener("storage", handleStorage);

      return () => window.removeEventListener("storage", handleStorage);
    }
  }, []);

  return { isLoggedIn, isLoading, user };
}
