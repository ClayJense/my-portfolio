"use client"

import Script from "next/script"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function sendPageView(pathWithQuery: string) {
  if (typeof window === "undefined" || !GA_ID || typeof window.gtag !== "function") return
  window.gtag("config", GA_ID, { page_path: pathWithQuery })
}

function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_ID) return
    const q = searchParams?.toString()
    const path = q ? `${pathname}?${q}` : pathname
    sendPageView(path)
  }, [pathname, searchParams])

  return null
}

/**
 * Google Analytics 4 (gtag.js).
 * Définir NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxxxxxxx dans .env.local
 */
export function GoogleAnalytics() {
  if (!GA_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsRouteTracker />
      </Suspense>
    </>
  )
}
