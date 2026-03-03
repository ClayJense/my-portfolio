import {
  HeroSection,
  AboutSection,
  CertificationsSection,
  ProjectsSection,
} from "@/components/sections"

export const metadata = {
  title: "Accueil | Mon portfolio",
  description:
    "Portfolio professionnel — Développement web, React, Next.js et expériences utilisateur.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen pb-24">
      <HeroSection />
      <AboutSection />
      <CertificationsSection />
      <ProjectsSection />
    </main>
  )
}
