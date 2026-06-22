"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Lock, Eye, EyeOff } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      const resetEmail = typeof window !== "undefined" ? sessionStorage.getItem("twofold_reset_email") : null;
      if (!resetEmail) {
        setError("No reset request found. Please request a reset from the login page.");
      }
    }
  }, []);

  const getUsers = () => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("twofold_users");
    return data ? JSON.parse(data) : [];
  };

  const saveUsers = (users: { name: string; email: string; password: string }[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("twofold_users", JSON.stringify(users));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    if (isSupabaseConfigured) {
      const { error } = await (await import("@/lib/supabase")).supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message || "Failed to reset password");
        setIsLoading(false);
        return;
      }
    } else {
      const resetEmail = typeof window !== "undefined" ? sessionStorage.getItem("twofold_reset_email") : null;
      if (!resetEmail) {
        setError("No reset request found. Please request a reset from the login page.");
        setIsLoading(false);
        return;
      }
      const users = getUsers();
      const userIndex = users.findIndex((u) => u.email === resetEmail);
      if (userIndex === -1) {
        setError("User not found");
        setIsLoading(false);
        return;
      }
      users[userIndex].password = password;
      saveUsers(users);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("twofold_reset_email");
      }
    }

    setSuccess("Password updated! You can now sign in.");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-rose-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">Twofold</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your new password below</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm mb-6">
            {success}
          </div>
        )}

        {!success && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all">
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              <Link href="/login" className="text-rose-500 hover:text-rose-600 font-medium">
                Back to login
              </Link>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
