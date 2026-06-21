"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface LocalUser {
  name: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("twofold_session");
      if (session) router.push("/dashboard");
      const lastEmail = localStorage.getItem("twofold_last_email");
      if (lastEmail) setEmail(lastEmail);
    }
  }, [router]);

  const getUsers = (): LocalUser[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("twofold_users");
    return data ? JSON.parse(data) : [];
  };

  const saveUsers = (users: LocalUser[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("twofold_users", JSON.stringify(users));
    }
  };

  const clearAppData = () => {
    if (typeof window === "undefined") return;
    const keysToRemove = [
      "twofold_memories",
      "twofold_challenges",
      "couple_profile",
      "date_plans",
      "notifications",
      "edit_memory",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  const saveLastEmail = (emailValue: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("twofold_last_email", emailValue);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    const supabaseConfigured = isSupabaseConfigured;

    if (supabaseConfigured) {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) {
          setError(error.message || "Sign up failed");
          setIsLoading(false);
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setError(error.message || "Login failed");
          setIsLoading(false);
          return;
        }
      }
      if (typeof window !== "undefined") {
        clearAppData();
        saveLastEmail(email);
        sessionStorage.setItem("twofold_session", "true");
        sessionStorage.setItem("twofold_user", JSON.stringify({ name, email }));
      }
      router.push("/dashboard");
      return;
    }

    const users = getUsers();

    if (isSignUp) {
      const exists = users.find((u) => u.email === email);
      if (exists) {
        setError("Email already registered");
        setIsLoading(false);
        return;
      }
      const newUser: LocalUser = { name, email, password };
      saveUsers([...users, newUser]);
      if (typeof window !== "undefined") {
        clearAppData();
        saveLastEmail(email);
        sessionStorage.setItem("twofold_session", "true");
        sessionStorage.setItem("twofold_user", JSON.stringify({ name, email }));
      }
      router.push("/dashboard");
    } else {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }
      if (typeof window !== "undefined") {
        clearAppData();
        saveLastEmail(email);
        sessionStorage.setItem("twofold_session", "true");
        sessionStorage.setItem("twofold_user", JSON.stringify({ name: user.name, email: user.email }));
      }
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-rose-950/30 dark:via-purple-950/20 dark:to-indigo-950/30 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-rose-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">Twofold</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{isSignUp ? "Create your account" : "Welcome back"}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{isSignUp ? "Start your love story today" : "Sign in to continue"}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all">
              {isLoading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => { setIsSignUp(!isSignUp); setError(""); }} className="text-rose-500 hover:text-rose-600 font-medium">
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
