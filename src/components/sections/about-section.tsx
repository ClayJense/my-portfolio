"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SectionWrapper } from "@/components/layout"
import { IconCloud } from "@/components/ui/icon-cloud"
import { techIconUrls } from "@/data/tech-icons"

interface AboutSectionProps {
  className?: string
  title?: string
  paragraphs?: string[]
  skills?: string[]
}

const defaultParagraphs = [
  "Après plusieurs années d'expérience en développement web, je m'attache à livrer des produits à la fois robustes techniquement et agréables à utiliser. Mon approche combine rigueur backend, front moderne et sens du design.",
  "Je code principalement côté serveur avec Laravel, Spring Boot et Nest.js, et côté front avec Angular et Next.js. J'ai aussi une forte sensibilité DevOps : Linux au quotidien, Docker, intégration continue et déploiement sur le cloud.",
]

const defaultSkills = [
  "Backend : Laravel, Spring Boot, Nest.js",
  "Frontend : Angular, Next.js",
  "TypeScript / JavaScript",
  "Docker / Linux",
  "Cloud & DevOps (CI/CD)",
  "Accessibilité (a11y)",
  "Performance & bonnes pratiques",
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
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
        {/* Logos à gauche du texte, visibles, sans cadre */}
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <IconCloud images={techIconUrls} />
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id={`${siteConfig.sections.about}-heading`}
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Parcours & valeurs
          </p>
          <div className="mt-8 space-y-6">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {text}
              </motion.p>
            ))}
          </div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Compétences clés
            </p>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
