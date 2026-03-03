"use client"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SectionWrapper } from "@/components/layout"

interface AboutSectionProps {
  className?: string
  title?: string
  paragraphs?: string[]
  skills?: string[]
}

const defaultParagraphs = [
  "Après plusieurs années d’expérience en développement web, je m’attache à livrer des produits à la fois robustes techniquement et agréables à utiliser. Mon approche combine rigueur technique et sens du design.",
  "Je travaille principalement avec React, Next.js et TypeScript côté front-end, et Node.js ou des API headless côté back-end. Je porte une attention particulière à l’accessibilité, aux performances et au SEO.",
]

const defaultSkills = [
  "React / Next.js",
  "TypeScript",
  "Node.js",
  "Accessibilité (a11y)",
  "Performance web",
  "Design systems",
]

export function AboutSection({
  className,
  title = "À propos",
  paragraphs = defaultParagraphs,
  skills = defaultSkills,
}: AboutSectionProps) {
  return (
    <SectionWrapper
      id={siteConfig.sections.about}
      className={cn("bg-muted/30", className)}
    >
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-2">
          <h2
            id={`${siteConfig.sections.about}-heading`}
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Parcours & valeurs
          </p>
        </div>
        <div className="md:col-span-3 space-y-6">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {text}
            </p>
          ))}
          <div className="pt-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Compétences clés
            </p>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
