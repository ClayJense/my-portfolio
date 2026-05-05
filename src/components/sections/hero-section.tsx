"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SectionWrapper } from "@/components/layout"

interface HeroSectionProps {
  className?: string
  title?: string
  subtitle?: string
}

const ringConfigs = [
  { size: 940, rotate: "hero-spin-slow", iconSize: 46, iconCount: 6, radiusRatio: 0.47 },
  { size: 700, rotate: "hero-spin-reverse", iconSize: 44, iconCount: 5, radiusRatio: 0.45 },
  { size: 500, rotate: "hero-spin-slow", iconSize: 40, iconCount: 4, radiusRatio: 0.43 },
]

const heroIconUrls = [
  "https://cdn.simpleicons.org/react/61DAFB",
  "https://cdn.simpleicons.org/nextdotjs/111111",
  "https://cdn.simpleicons.org/typescript/3178C6",
  "https://cdn.simpleicons.org/nodedotjs/339933",
  "https://cdn.simpleicons.org/nestjs/E0234E",
  "https://cdn.simpleicons.org/laravel/FF2D20",
  "https://cdn.simpleicons.org/docker/2496ED",
  "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  "https://cdn.simpleicons.org/git/F05032",
]

export function HeroSection({
  className,
  title = "Construire des experiences web qui marquent les esprits.",
  subtitle = "Architecture solide, design premium, execution propre: du concept au produit qui performe.",
}: HeroSectionProps) {
  const icons = heroIconUrls

  return (
    <SectionWrapper
      id={siteConfig.sections.hero}
      className={cn(
        "relative overflow-hidden flex min-h-[92vh] flex-col justify-center border-b border-border/40 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--primary)/0.15),transparent_55%)]",
        className
      )}
      containerClassName="flex flex-col items-center text-center"
    >
      <style>{`
        @keyframes hero-spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes hero-spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        .hero-spin-slow { animation: hero-spin-slow 80s linear infinite; }
        .hero-spin-reverse { animation: hero-spin-reverse 90s linear infinite; }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        {ringConfigs.map((ring, ringIndex) => (
          <div
            key={`ring-${ring.size}`}
            className={cn("absolute left-1/2 top-1/2", ring.rotate)}
            style={{ width: ring.size, height: ring.size }}
          >
            {new Array(ring.iconCount).fill(0).map((_, iconIndex) => {
              const icon = icons[(iconIndex + ringIndex * 3) % icons.length]
              const angleOffset = (ringIndex * Math.PI) / (ring.iconCount * 2)
              const angle = (iconIndex / ring.iconCount) * Math.PI * 2 + angleOffset
              const radius = ring.size * ring.radiusRatio
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <div
                  key={`icon-${ringIndex}-${iconIndex}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <Image
                    src={icon}
                    alt=""
                    width={ring.iconSize}
                    height={ring.iconSize}
                    className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
                    unoptimized
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="relative z-10 max-w-4xl mt-6 sm:mt-10"
      >
        <h1 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base md:text-lg">
          {subtitle}
        </p>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--background))_5%,transparent_35%,transparent_70%,hsl(var(--background))_100%)]" />

      <div className="relative z-10 mt-10 text-xs uppercase tracking-[0.18em] text-primary/80">
        {siteConfig.name}
      </div>
    </SectionWrapper>
  )
}
