import type { BlogPost } from "@/types"

export const blogPosts: BlogPost[] = [
  {
    slug: "nora",
    title: "Nora — Assistant IA",
    excerpt:
      "Assistant IA conversationnel conçu pour vous aider et répondre à vos questions de manière naturelle et intuitive. Réalisé avec HTML, CSS, JavaScript et Python Flask.",
    content: `
## Nora

Assistant IA conversationnel conçu pour vous aider et répondre à vos questions de manière naturelle et intuitive. Interface web simple et accessible.

**Stack :** HTML, CSS, JavaScript, Python, Flask.

[Visiter le projet →](https://noraia.onrender.com/)
    `.trim(),
    date: "2024-01-01",
    readingTime: 1,
    tags: ["IA", "Chatbot", "Flask", "Python"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    slug: "udb",
    title: "Université Dakar-Bourguiba (UDB)",
    excerpt:
      "Projet réalisé lors d'un stage de 4 mois avec une équipe de 4 étudiants : site et applications pour l'université. Back-end Laravel, front-end Angular, base MySQL, hébergement OVH.",
    content: `
## Université Dakar-Bourguiba (UDB)

Projet réalisé lors d'un stage de 4 mois avec une équipe de 4 étudiants : site et applications pour l'université. Back-end Laravel, front-end Angular, base MySQL, hébergement OVH.

**Stack :** Laravel, Angular, MySQL, Git, GitHub, OVH.

[Visiter le site →](https://udb.sn/)
    `.trim(),
    date: "2024-07-01",
    readingTime: 1,
    tags: ["Laravel", "Angular", "MySQL", "OVH"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  },
  {
    slug: "biacode",
    title: "BIACode",
    excerpt:
      "Notre plateforme et agence tech, lancée à trois. BIACode est notre structure dédiée au développement et à l'accompagnement des projets numériques.",
    content: `
## BIACode

Notre plateforme et agence tech, lancée à trois. BIACode est notre structure dédiée au développement et à l'accompagnement des projets numériques.

**Stack :** Laravel, Angular, MySQL, Git, GitHub, LWS.

[Visiter le site →](https://www.biacode.tech/)
    `.trim(),
    date: "2024-09-01",
    readingTime: 1,
    tags: ["Agence", "Plateforme"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    slug: "easytecs",
    title: "EASYTECS — EasyGEC",
    excerpt:
      "Premier client de l'agence : plateforme pour EASYTECS, structure sénégalaise spécialisée dans les logiciels métiers. EasyGEC gère les faits d'état civil (naissance au décès) et garantit les droits fondamentaux.",
    content: `
## EASYTECS — EasyGEC

Premier client de l'agence : plateforme pour EASYTECS, structure sénégalaise spécialisée dans les logiciels métiers. EasyGEC est un système d'enregistrement sécurisé et simple pour gérer les faits d'état civil (naissance au décès), garantissant les droits fondamentaux : carte d'identité, droit de vote, héritage, accès à l'école, permis de conduire, etc.

**Stack :** Laravel, Angular, MySQL, Git, GitHub, LWS.

[Visiter le site →](https://www.easytecs.tech/)
    `.trim(),
    date: "2026-03-01",
    readingTime: 2,
    tags: ["État civil", "e-Gouvernance", "Sénégal"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}
