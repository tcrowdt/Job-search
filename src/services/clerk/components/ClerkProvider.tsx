"use client"

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs"
import { ReactNode, Suspense } from "react"
import { dark } from "@clerk/themes"
import { useIsDarkMode } from "@/hooks/useIsDarkMode"

export function ClerkProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useIsDarkMode()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OriginalClerkProvider
        appearance={isDarkMode ? { baseTheme: [dark] } : undefined}
      >
        {children}
      </OriginalClerkProvider>
    </Suspense>
  )
}
