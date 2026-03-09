"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <span className="text-[10rem] font-black leading-none tracking-tighter text-primary/10 sm:text-[14rem]">
          404
        </span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center text-6xl font-black tracking-tighter text-foreground sm:text-8xl"
        >
          404
        </motion.span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-xl font-bold text-foreground sm:text-2xl"
      >
        Page introuvable
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base"
      >
        Oups, cette page n&apos;existe pas ou a été déplacée.
        Pas de panique, tu peux revenir à l&apos;accueil.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          <Home className="size-4" />
          Retour à l&apos;accueil
        </Link>
        <button
          onClick={() => history.back()}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Page précédente
        </button>
      </motion.div>

      {/* Cercles décoratifs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute -top-32 -right-32 size-96 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/5 blur-3xl"
        />
      </div>
    </div>
  )
}
