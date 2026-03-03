"use client"

import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SectionWrapper } from "@/components/layout"

export interface Project {
  title: string
  description: string
  href?: string
  external?: boolean
  tags?: string[]
}

interface ProjectsSectionProps {
  className?: string
  title?: string
  subtitle?: string
  projects?: Project[]
}

const defaultProjects: Project[] = [
  {
    title: "Application e-commerce",
    description:
      "Plateforme de vente en ligne avec panier, paiement et tableau de bord admin. Next.js, Stripe, base de données relationnelle.",
    href: "#",
    external: true,
    tags: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    title: "Dashboard analytics",
    description:
      "Tableau de bord temps réel pour visualisation de métriques et rapports. React, API REST, graphiques interactifs.",
    href: "#",
    external: true,
    tags: ["React", "API", "Data viz"],
  },
  {
    title: "Site vitrine & blog",
    description:
      "Site institutionnel avec blog, formulaire de contact et intégration CMS headless pour la gestion des contenus.",
    href: "#",
    external: true,
    tags: ["Next.js", "CMS", "SEO"],
  },
]

export function ProjectsSection({
  className,
  title = "Projets",
  subtitle = "Réalisations récentes et side projects",
  projects = defaultProjects,
}: ProjectsSectionProps) {
  return (
    <SectionWrapper
      id={siteConfig.sections.projects}
      className={cn("bg-muted/30", className)}
    >
      <div className="mb-12 max-w-2xl">
        <h2
          id={`${siteConfig.sections.projects}-heading`}
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      </div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground group-hover:underline">
                  {project.title}
                </h3>
                {project.href &&
                  (project.external ? (
                    <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                  ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )

          return (
            <li key={project.title}>
              {project.href ? (
                <Link
                  href={project.href}
                  target={project.external ? "_blank" : undefined}
                  rel={project.external ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {content}
                </Link>
              ) : (
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                  {content}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </SectionWrapper>
  )
}
