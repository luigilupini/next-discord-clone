"use client"

import { useMounted } from "./use-mounted"

export const useOrigin = () => {
  const mounted = useMounted()
  // If window is not undefine and we have the location origin, return it!
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : ""
  if (!mounted) return ""
  return origin
}
