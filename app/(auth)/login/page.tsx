"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

type ErrorType = "access_denied" | "no_code" | "token_failed" | null;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get("error") as ErrorType;
      if (errorParam) {
        setError(errorParam);
      }
    }
  }, []);

  const handleDropboxLogin = () => {
    window.location.href = "/api/auth/dropbox";
  };

  const errorMessages = {
    access_denied: "Access denied. Please try again.",
    no_code: "Invalid authorization request.",
    token_failed: "Authentication failed. Please try again.",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to Twofold</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in with Dropbox to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
            {errorMessages[error] || "An error occurred during sign in."}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <button
            onClick={handleDropboxLogin}
            className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 2l6 4-6 4-3-2.5L6 2zm12 0l3 2.5L21 10l-6-4 6-4zM6 14l6 4 6-4-3-2.5L12 14l-3-2.5L6 14zm0 4l-3 2.5L0 22h12l3-2.5L12 18H6z"/>
            </svg>
            Continue with Dropbox
          </button>
        </div>
      </motion.div>
    </div>
  );
}
