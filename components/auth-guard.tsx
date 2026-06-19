"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({
  isLoading,
  isLoggedIn,
  children,
}: {
  isLoading: boolean;
  isLoggedIn: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  return <>{children}</>;
}
