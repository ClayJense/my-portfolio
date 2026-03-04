"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
  description = "Développeur full‑stack avec quelques années d'expérience, je travaille surtout sur le backend (Laravel, Spring Boot, Nest.js) tout en construisant des interfaces modernes avec Angular et Next.js. J'explore aussi la partie DevOps : Linux, Docker et déploiements sur le cloud.",
  ctaLabel = "Voir mes projets",
  ctaHref = `#${siteConfig.sections.projects}`,
}: HeroSectionProps) {
  return (
    <SectionWrapper
      id={siteConfig.sections.hero}
      className={cn(
        "flex min-h-[85vh] flex-col justify-center border-b border-border/40",
        className
      )}
      containerClassName="flex flex-col items-center text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:text-sm"
      >
        {subline}
      </motion.p>
      <div className="mt-6 flex flex-col items-center justify-center">
        <TypewriterEffectSmooth
          words={words}
          className="text-foreground"
          cursorClassName="bg-primary h-6 w-1 sm:h-8 md:h-10"
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
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
      </motion.div>
    </SectionWrapper>
  )
}
