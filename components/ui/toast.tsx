"use client"

import { useEffect } from "react"
import { toast } from "sonner"

type ShowToast = (title: string, message?: string) => void

export function useToast() {
  const show = (title: string, message?: string) => {
    toast(title, { description: message })
  }
  return { show }
}

export { toast }
