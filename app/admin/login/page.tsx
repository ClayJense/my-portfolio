"use client"

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LockKeyhole, ShieldCheck } from "lucide-react"
import { ADMIN_KEYS, DEMO_ADMIN } from "@/data/admin-demo"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>(DEMO_ADMIN.email)
  const [password, setPassword] = useState<string>(DEMO_ADMIN.password)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const existingSession = localStorage.getItem(ADMIN_KEYS.session)
    if (existingSession) {
      router.replace("/admin")
    }
  }, [router])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("Veuillez renseigner votre e-mail et votre mot de passe.")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const isDemoCredential =
      email.trim().toLowerCase() === DEMO_ADMIN.email &&
      password === DEMO_ADMIN.password

    if (!isDemoCredential) {
      setError("Identifiants invalides (mode UI demo).")
      setIsLoading(false)
      return
    }

    localStorage.setItem(
      ADMIN_KEYS.session,
      JSON.stringify({
        email: email.trim().toLowerCase(),
        loginAt: new Date().toISOString(),
      })
    )

    router.replace("/admin")
  }

  return (
    <main className="min-h-screen bg-muted/20 px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Espace securise</p>
              <h1 className="text-xl font-semibold text-foreground">Connexion admin</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-foreground">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="admin@portfolio.dev"
                autoComplete="email"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-foreground">Mot de passe</span>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="********"
                  autoComplete="current-password"
                />
              </div>
            </label>

            {error && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            Demo UI: <span className="font-medium">admin@portfolio.dev / admin123</span>
          </p>
        </div>
      </div>
    </main>
  )
}
