"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

const CONTACT = {
  email: "izayidali@biacode.tech",
  phoneDisplay: "+221 78 372 35 07",
  phoneHref: "https://wa.me/221783723507",
  location: "Sénégal",
  portfolio: "Portfolio en ligne",
  portfolioHref: "/",
} as const

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/ClayJense", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/izayid-ali", icon: Linkedin },
  { label: "X", href: "https://x.com/Izayid04", icon: null as null },
] as const

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const SKILL_TAGS = [
  "Laravel",
  "Angular",
  "Next.js",
  "React",
  "Nest.js",
  "Spring Boot",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Linux",
  "Git / GitHub",
  "OVH / LWS",
  "API REST",
  "DevOps",
] as const

const EXPERIENCES = [
  {
    period: "2024 — présent",
    title: "Co-fondateur & développeur full-stack",
    org: "BIACode",
    detail:
      "Agence tech lancée à trois : développement web, plateformes métiers, accompagnement clients. Stack Laravel, Angular, MySQL, déploiement LWS.",
    href: "https://www.biacode.tech/",
  },
  {
    period: "Mars 2026",
    title: "Développeur — plateforme vitrine",
    org: "EASYTECS (EasyGEC)",
    detail:
      "Premier client de l’agence : site présentant EasyGEC (état civil, sécurité, e-gouvernance). Laravel, Angular, MySQL, hébergement LWS.",
    href: "https://www.easytecs.tech/",
  },
  {
    period: "Juillet 2024",
    title: "Stage — équipe de 4",
    org: "Université Dakar-Bourguiba (UDB)",
    detail:
      "Plateforme web institutionnelle : back-end Laravel, front Angular, MySQL, Git/GitHub, hébergement OVH.",
    href: "https://udb.sn/",
  },
] as const

const PROJECTS = [
  {
    name: "Plateforme UDB",
    stack: "Laravel · Angular · MySQL · OVH",
    href: "https://udb.sn/",
  },
  {
    name: "BIACode",
    stack: "Laravel · Angular · MySQL · LWS",
    href: "https://www.biacode.tech/",
  },
  {
    name: "EASYTECS / EasyGEC",
    stack: "Laravel · Angular · MySQL · LWS",
    href: "https://www.easytecs.tech/",
  },
  {
    name: "Nora — Assistant IA",
    stack: "HTML · CSS · JS · Python Flask · Render",
    href: "https://noraia.onrender.com/",
  },
] as const

export function CvView() {
  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/60 via-background to-background pb-32 pt-6 sm:pt-10">
      {/* Barre d’actions (masquée à l’impression) */}
      <div
        className={cn(
          "cv-no-print mx-auto mb-6 flex max-w-[210mm] flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-0"
        )}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour au portfolio
        </Link>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md",
              "hover:opacity-90 transition-opacity cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            <Download className="size-4" aria-hidden />
            Télécharger en PDF
          </button>
          <p className="w-full text-xs text-muted-foreground sm:w-auto sm:self-center">
            Utilise « Enregistrer au format PDF » dans la fenêtre d’impression.
          </p>
        </div>
      </div>

      {/* Feuille CV */}
      <article
        id="cv-root"
        className={cn(
          "cv-sheet mx-auto w-full max-w-[210mm] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl",
          "print:shadow-none print:rounded-none print:border-0"
        )}
      >
        <div className="grid print:grid-cols-[minmax(0,260px)_1fr] md:grid-cols-[minmax(0,280px)_1fr] lg:grid-cols-[minmax(0,300px)_1fr]">
            <aside
              className={cn(
                "cv-sidebar relative flex flex-col gap-8 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 p-8 text-zinc-50",
                "md:border-r md:border-zinc-700/50"
              )}
            >
              <div className="relative mx-auto w-full max-w-[200px]">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 to-zinc-600/40 blur-sm" />
                <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-xl">
                  <Image
                    src="/me.png"
                    alt="Izayid Ali"
                    width={400}
                    height={500}
                    className="h-auto w-full object-cover object-top"
                    priority
                  />
                </div>
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                  Izayid Ali
                </h1>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                  Iza
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Développeur full-stack orienté backend &amp; DevOps — co-fondateur BIACode.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Contact
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="break-all text-zinc-200 underline-offset-2 hover:underline"
                    >
                      {CONTACT.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                    <a
                      href={CONTACT.phoneHref}
                      className="text-zinc-200 underline-offset-2 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {CONTACT.phoneDisplay} (WhatsApp)
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-zinc-200">{CONTACT.location}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="mt-0.5 size-4 shrink-0 text-primary" />
                    <Link
                      href={CONTACT.portfolioHref}
                      className="text-zinc-200 underline-offset-2 hover:underline"
                    >
                      {CONTACT.portfolio}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 text-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Réseaux
                </h2>
                <ul className="space-y-2">
                  {SOCIAL.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-zinc-200 transition-colors hover:text-white"
                      >
                        {s.icon ? (
                          <s.icon className="size-4 shrink-0 text-primary" />
                        ) : (
                          <XIcon className="size-4 shrink-0 text-primary" />
                        )}
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Langues
                </h2>
                <ul className="space-y-2 text-sm text-zinc-200">
                  <li className="flex justify-between gap-4 border-b border-zinc-700/50 pb-2">
                    <span>Français</span>
                    <span className="text-zinc-400">Courant</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Anglais</span>
                    <span className="text-zinc-400">Professionnel</span>
                  </li>
                </ul>
              </div>
            </aside>

            <div className="cv-main space-y-8 bg-card p-8 lg:p-10">
              <section className="cv-avoid-break">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <span className="h-px w-8 shrink-0 bg-primary/40" aria-hidden />
                  Profil
                  <span className="h-px flex-1 bg-border" aria-hidden />
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Développeur full-stack avec une forte orientation <strong className="text-foreground">backend</strong> et{" "}
                  <strong className="text-foreground">DevOps</strong>. J&apos;ai déjà travaillé en entreprise et je poursuis ma
                  formation tout en construisant des produits web concrets. Co-fondateur de{" "}
                  <strong className="text-foreground">BIACode</strong>, j&apos;interviens sur des plateformes Laravel / Angular,
                  des APIs, des bases MySQL/PostgreSQL, et le déploiement (Docker, Linux, OVH, LWS). Niveau{" "}
                  <strong className="text-foreground">intermédiaire</strong> : solide sur les fondamentaux, en progression
                  continue sur l&apos;architecture et la scalabilité.
                </p>
              </section>

              <section className="cv-avoid-break">
                <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
                  Compétences clés
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SKILL_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
                  Expérience
                </h2>
                <ul className="mt-5 space-y-6 border-l-2 border-primary/30 pl-6">
                  {EXPERIENCES.map((exp) => (
                    <li key={exp.title + exp.period} className="cv-avoid-break relative">
                      <span className="absolute -left-[calc(0.5rem+2px)] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <p className="font-semibold text-foreground">{exp.title}</p>
                          <p className="text-sm text-primary">{exp.org}</p>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.detail}</p>
                      <a
                        href={exp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-no-print mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        Lien <ExternalLink className="size-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-8 lg:grid-cols-2">
                <div className="cv-avoid-break">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Formation
                  </h2>
                  <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
                    <p className="font-semibold text-foreground">Licence 3 — Génie logiciel</p>
                    <p className="text-sm text-primary">Université Dakar-Bourguiba</p>
                    <p className="mt-1 text-xs text-muted-foreground">2025</p>
                  </div>
                </div>
                <div className="cv-avoid-break">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Certifications
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="rounded-xl border border-border bg-muted/30 p-4">
                      <span className="font-medium text-foreground">Certificat de stage</span> — Projet plateforme UDB (Laravel,
                      Angular, MySQL, OVH).
                    </li>
                  </ul>
                </div>
              </section>

              <section className="cv-avoid-break">
                <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
                  Projets phares
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {PROJECTS.map((p) => (
                    <li
                      key={p.name}
                      className="rounded-xl border border-border bg-muted/20 p-4 transition-colors hover:border-primary/30"
                    >
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{p.stack}</p>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-no-print mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        Voir <ExternalLink className="size-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
        </div>
      </article>
    </div>
  )
}
