"use client";

import { toast } from "sonner";

export function useToast() {
  const show = (title: string, message?: string) => {
    toast(title, { description: message });
  };
  return { show };
}

export { toast };
