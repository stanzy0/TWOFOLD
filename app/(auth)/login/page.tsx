"use client";

import { useEffect, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { getAuthInstance } from "@/lib/firebase";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const auth = getAuthInstance();
      if (!auth) {
        const message = "Firebase is not configured.";
        setError(message);
        toast.error(message);
        return;
      }

      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }


      router.push("/dashboard");
    } catch (authError) {
      const message = authError instanceof Error ? authError.message : "Authentication failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const auth = getAuthInstance();
      if (!auth) {
        const message = "Firebase is not configured.";
        setError(message);
        toast.error(message);
        setIsLoading(false);
        return;
      }

      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);

    } catch (authError) {
      const message = authError instanceof Error ? authError.message : "Google sign-in failed";
      setError(message);
      toast.error(message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuthInstance();
    if (!auth) {
      setIsLoading(false);
      return;
    }

    getRedirectResult(auth)
      .then(() => router.push("/dashboard"))
      .catch((authError) => {
        const message = authError instanceof Error ? authError.message : "Google sign-in failed";
        setError(message);
        toast.error(message);
      })
      .finally(() => setIsLoading(false));
  }, [router]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-gray-800 dark:text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to Twofold</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to continue your love story</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M23.766 12.2764c0-.8903-.0781-1.741-.2227-2.5627H12v4.8645h6.6055a5.6412 5.6412 0 0 1-2.4452 3.6997v3.062h3.9505c2.3091-2.1263 3.6552-5.2632 3.6552-9.0635Z" />
              <path fill="#34A853" d="M12 24c3.2995 0 6.0701-1.0861 8.1088-2.9406l-3.9505-3.062c-1.1005.7388-2.5114 1.1753-4.1583 1.1753-3.1873 0-5.883-2.151-6.8476-5.042H1.068v3.168A12 12 0 0 0 12 24Z" />
              <path fill="#FBBC05" d="M5.1524 14.1293A7.371 7.371 0 0 1 4.7813 12c0-.732.126-1.434.3711-2.088V6.744H1.068A12 12 0 0 0 12 24c1.6469 0 3.0578-.4365 4.1583-1.1753l-3.9505-3.062a6.7414 6.7414 0 0 1-7.0554-5.6334Z" />
              <path fill="#EA4335" d="M12 4.8335c1.7949 0 3.4135.6175 4.6912 1.8284l3.5153-3.5153C18.0853 1.1263 15.3147 0 12 0A12 12 0 0 0 1.068 9.156l4.0844 3.168C6.115 6.9744 8.8107 4.8335 12 4.8335Z" />
            </svg>
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-gray-800 px-4 text-sm text-gray-500">or use email</span>
            </div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold transition-colors"
            >
              {isLoading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsSignUp((value) => !value)}
            className="w-full text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-300 dark:hover:text-rose-200"
          >
            {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
