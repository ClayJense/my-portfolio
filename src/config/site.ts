export const siteConfig = {
  name: "Mon Portfolio",
  description: "Portfolio professionnel — Développement web & expériences utilisateur",
  nav: [
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  sections: {
    hero: "hero",
    about: "about",
    certifications: "certifications",
    projects: "projects",
  },
} as const

export const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "X", href: "https://x.com", icon: "x" },
  { label: "Discord", href: "https://discord.com", icon: "discord" },
] as const
