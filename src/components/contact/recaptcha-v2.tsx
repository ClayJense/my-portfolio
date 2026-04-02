"use client"

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import Script from "next/script"

type GrecaptchaRenderOptions = {
  sitekey: string
  callback?: (token: string) => void
  "expired-callback"?: () => void
  "error-callback"?: () => void
}

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, options: GrecaptchaRenderOptions) => number
      reset: (widgetId?: number) => void
      getResponse: (widgetId?: number) => string
      ready: (cb: () => void) => void
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

type RecaptchaV2Props = {
  onChange: (token: string | null) => void
}

export type RecaptchaV2Handle = {
  reset: () => void
}

/**
 * reCAPTCHA v2 (case « Je ne suis pas un robot »).
 * Si NEXT_PUBLIC_RECAPTCHA_SITE_KEY est absent, ne rend rien (ex. dev local).
 */
export const RecaptchaV2 = forwardRef<RecaptchaV2Handle, RecaptchaV2Props>(
  function RecaptchaV2({ onChange }, ref) {
    const hostRef = useRef<HTMLDivElement | null>(null)
    const widgetIdRef = useRef<number | undefined>(undefined)
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange

    const [scriptReady, setScriptReady] = useState(false)

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current !== undefined && window.grecaptcha) {
          window.grecaptcha.reset(widgetIdRef.current)
        }
        onChangeRef.current(null)
      },
    }))

    useEffect(() => {
      if (!SITE_KEY?.trim() || !scriptReady) return

      let cancelled = false

      const mount = () => {
        const host = hostRef.current
        if (!host || !window.grecaptcha || cancelled) return

        host.innerHTML = ""
        const inner = document.createElement("div")
        host.appendChild(inner)

        const id = window.grecaptcha.render(inner, {
          sitekey: SITE_KEY.trim(),
          callback: (token: string) => onChangeRef.current(token),
          "expired-callback": () => onChangeRef.current(null),
          "error-callback": () => onChangeRef.current(null),
        })
        widgetIdRef.current = id
      }

      window.grecaptcha.ready(() => {
        if (!cancelled) mount()
      })

      return () => {
        cancelled = true
        const id = widgetIdRef.current
        widgetIdRef.current = undefined
        if (id !== undefined && window.grecaptcha) {
          try {
            window.grecaptcha.reset(id)
          } catch {
            // widget déjà démonté
          }
        }
        const host = hostRef.current
        if (host) host.innerHTML = ""
      }
    }, [scriptReady])

    if (!SITE_KEY?.trim()) {
      return null
    }

    return (
      <>
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="lazyOnload"
          onLoad={() => setScriptReady(true)}
        />
        <div ref={hostRef} className="flex justify-center" />
      </>
    )
  }
)

export function isRecaptchaEnabled(): boolean {
  return Boolean(SITE_KEY?.trim())
}
