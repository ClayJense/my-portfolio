export const siteConfig = {
  name: "Mon Portfolio",
  description: "Portfolio professionnel — Développement web & expériences utilisateur",
  assistantName: "Nova",
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
  { label: "GitHub", href: "https://github.com/ClayJense", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/izayid-ali", icon: "linkedin" },
  { label: "X", href: "https://x.com/Izayid04", icon: "x" },
  { label: "Discord (iza06467)", href: "https://discord.com", icon: "discord" },
] as const
