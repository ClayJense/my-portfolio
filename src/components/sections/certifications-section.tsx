"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SectionWrapper } from "@/components/layout"

export interface Certification {
  name: string
  issuer: string
  date?: string
  url?: string
}

interface CertificationsSectionProps {
  className?: string
  title?: string
  subtitle?: string
  certifications?: Certification[]
}

const defaultCertifications: Certification[] = [
  { name: "Professional React Developer", issuer: "Meta", date: "2024" },
  { name: "Next.js & React", issuer: "Vercel", date: "2024" },
  { name: "Web Accessibility", issuer: "W3C", date: "2023" },
  { name: "TypeScript Fundamentals", issuer: "Microsoft", date: "2023" },
]

export function CertificationsSection({
  className,
  title = "Certifications",
  subtitle = "Formations et accréditations reconnues",
  certifications = defaultCertifications,
}: CertificationsSectionProps) {
  return (
    <SectionWrapper
      id={siteConfig.sections.certifications}
      className={cn("border-b border-border/40", className)}
    >
      <div className="mb-12 max-w-2xl">
        <h2
          id={`${siteConfig.sections.certifications}-heading`}
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <motion.li
            key={cert.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            {cert.url ? (
              <Link
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Award className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {cert.issuer}
                      {cert.date && ` · ${cert.date}`}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Award className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {cert.issuer}
                      {cert.date && ` · ${cert.date}`}
                    </p>
                  </div>
                </div>
              </article>
            )}
          </motion.li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
