import { FirebaseOptions, initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

function getFirebaseConfig(): FirebaseOptions | null {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  // If the key is missing, Firebase will throw at initialization time.
  // Return null so build/prerender doesn't fail.
  if (!apiKey) return null;

  return {
    apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

let cachedAuth: ReturnType<typeof getAuth> | null = null;

export function getAuthInstance() {
  if (cachedAuth) return cachedAuth;

  // Ensure we only initialize when needed.
  const config = getFirebaseConfig();
  if (!config) {
    // Client code should handle the “not configured” case.
    return null;
  }

  const app = getApps().length ? getApps()[0] : initializeApp(config);
  cachedAuth = getAuth(app);
  return cachedAuth;
}

