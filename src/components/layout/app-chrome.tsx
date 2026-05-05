"use client"

import { usePathname } from "next/navigation"
import { Chatbot } from "@/components/chat/chatbot"
import { Navbar } from "@/components/navbar"

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")

  return (
    <>
      {children}
      {!isAdminRoute && <Chatbot />}
      {!isAdminRoute && <Navbar />}
    </>
  )
}
