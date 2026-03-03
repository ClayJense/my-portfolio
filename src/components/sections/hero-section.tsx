"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SectionWrapper } from "@/components/layout"

interface HeroSectionProps {
  className?: string
  headline?: string
  subline?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export function HeroSection({
  className,
  headline = "Créer des expériences digitales qui comptent",
  subline = "Développeur full-stack & design d’interfaces",
  description = "Je conçois et développe des applications web performantes, accessibles et centrées sur l’utilisateur. Passionné par le code propre et les interfaces pensées pour les humains.",
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
      <p
        id={`${siteConfig.sections.hero}-heading`}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:text-sm"
      >
        {subline}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        {headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
        {description}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
      </div>
    </SectionWrapper>
  )
}
