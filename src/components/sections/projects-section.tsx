"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SectionWrapper } from "@/components/layout"
import { LinkPreview } from "@/components/ui/link-preview"

export interface Project {
  title: string
  description: string
  href?: string
  external?: boolean
  tags?: string[]
  image?: string
  /** Slugs Simple Icons pour les icônes (ex: react, nextdotjs, typescript) */
  techIcons?: string[]
}

const defaultProjects: Project[] = [
  {
    title: "Application e-commerce",
    description:
      "Plateforme de vente en ligne avec panier, paiement et tableau de bord admin.",
    href: "https://vercel.com",
    external: true,
    tags: ["Next.js", "TypeScript", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    techIcons: ["nextdotjs", "typescript", "stripe"],
  },
  {
    title: "Dashboard analytics",
    description:
      "Tableau de bord temps réel pour visualisation de métriques et rapports.",
    href: "https://vercel.com",
    external: true,
    tags: ["React", "API", "Data viz"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    techIcons: ["react", "nodedotjs", "postgresql"],
  },
  {
    title: "Site vitrine & blog",
    description:
      "Site institutionnel avec blog, formulaire de contact et intégration CMS headless.",
    href: "https://vercel.com",
    external: true,
    tags: ["Next.js", "CMS", "SEO"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    techIcons: ["nextdotjs", "tailwindcss", "vercel"],
  },
]

function TechIcon({ slug }: { slug: string }) {
  const src = `https://cdn.simpleicons.org/${slug}`
  const name = slug.replace("dotjs", ".js").replace("dot", " ")
  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted p-1.5"
      title={name}
    >
      <Image
        src={src}
        alt=""
        width={20}
        height={20}
        className="object-contain opacity-90"
        unoptimized
      />
    </span>
  )
}

interface ProjectsSectionProps {
  className?: string
  title?: string
  subtitle?: string
  projects?: Project[]
}

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
          const cardContent = (
            <>
              {project.image && (
                <div className="relative -mx-6 -mt-6 mb-4 aspect-video overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
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
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              {project.techIcons && project.techIcons.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techIcons.map((slug) => (
                    <TechIcon key={slug} slug={slug} />
                  ))}
                </div>
              )}
              {project.tags && project.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
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

          const cardClassName =
            "group flex h-full flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

          return (
            <motion.li
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4 }}
            >
              {project.href ? (
                project.image ? (
                  <LinkPreview
                    url={project.href}
                    isStatic
                    imageSrc={project.image}
                    width={320}
                    height={200}
                    className={cardClassName}
                  >
                    {cardContent}
                  </LinkPreview>
                ) : (
                  <Link
                    href={project.href}
                    target={project.external ? "_blank" : undefined}
                    rel={project.external ? "noopener noreferrer" : undefined}
                    className={cardClassName}
                  >
                    {cardContent}
                  </Link>
                )
              ) : (
                <div className={cardClassName}>{cardContent}</div>
              )}
            </motion.li>
          )
        })}
      </ul>
    </SectionWrapper>
  )
}
