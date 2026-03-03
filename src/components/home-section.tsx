"use client"

import { cn } from "@/lib/utils"

interface HomeSectionProps {
  className?: string
  title?: string
  subtitle?: string
  description?: string
}

export function HomeSection({
  className,
  title = "Bienvenue",
  subtitle = "Sur mon portfolio",
  description = "Développeur passionné par la création web et les expériences utilisateur.",
}: HomeSectionProps) {
  return (
    <section
      className={cn(
        "flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 py-20 text-center",
        className
      )}
    >
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {subtitle}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  )
}
