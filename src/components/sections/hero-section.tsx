"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, FileDown } from "lucide-react"
import { motion } from "motion/react"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SectionWrapper } from "@/components/layout"

interface HeroSectionProps {
  className?: string
  words?: { text: string; className?: string }[]
  subline?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

const defaultWords = [
  { text: "Construire", className: "text-foreground" },
  { text: "des", className: "text-foreground" },
  { text: "applications", className: "text-foreground" },
  { text: "stables", className: "text-primary" },
  { text: "et", className: "text-foreground" },
  { text: "utiles.", className: "text-foreground" },
]

export function HeroSection({
  className,
  words = defaultWords,
  subline = "Développeur full‑stack orienté backend & DevOps",
  description = "Développeur Full-Stack passionné, je conçois des applications web robustes et scalables. Spécialisé en Backend (Nest.js, Laravel, Spring Boot), j'accorde une importance particulière à l'architecture logicielle tout en créant des interfaces modernes avec Next.js et Angular. Mon approche inclut une dimension DevOps (Docker, Linux, Cloud) pour garantir des déploiements fluides et performants.",
  ctaLabel = "Voir mes projets",
  ctaHref = `#${siteConfig.sections.projects}`,
}: HeroSectionProps) {
  return (
    <SectionWrapper
      id={siteConfig.sections.hero}
      className={cn(
        "flex min-h-[85vh] sm:min-h-[90vh] flex-col justify-center border-b border-border/40",
        className
      )}
      containerClassName="flex flex-col items-center text-center"
    >
      {/* Logo à gauche, titre + sous-titre à droite */}
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full max-w-4xl mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Iza"
            width={256}
            height={256}
            className="size-24 sm:size-32 md:size-40 rounded-2xl object-contain"
            priority
          />
        </motion.div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl"
          >
            Salut, moi c&apos;est{" "}
            <span className="text-primary">Iza</span> 👋
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-1 sm:mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:text-sm"
          >
            {subline}
          </motion.p>
        </div>
      </div>
      <div className="mt-2 flex flex-col items-center justify-center">
        <TypewriterEffectSmooth
          words={words}
          className="text-foreground"
          cursorClassName="bg-primary h-6 w-1 sm:h-8 md:h-10"
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg md:text-xl px-2 sm:px-0"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {ctaLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Me contacter
        </Link>
        <Link
          href="/cv"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <FileDown className="size-4" aria-hidden />
          Mon CV
        </Link>
      </motion.div>
    </SectionWrapper>
  )
}
