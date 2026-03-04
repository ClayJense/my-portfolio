import type { BlogPost } from "@/types"

export const blogPosts: BlogPost[] = [
  {
    slug: "nextjs-15-server-actions",
    title: "Next.js 15 : Server Actions et mutations en douceur",
    excerpt:
      "Découvrez comment les Server Actions de Next.js 15 simplifient les mutations côté serveur sans API routes dédiées.",
    content: `
## Introduction

Next.js 15 apporte une maturité accrue aux **Server Actions**. On peut désormais gérer des mutations directement depuis des composants serveur ou des formulaires, avec une DX soignée.

## Pourquoi les Server Actions ?

- **Moins de boilerplate** : plus besoin d’exposer une route API pour chaque mutation.
- **Typage de bout en bout** : les arguments et le retour sont typés.
- **Progressive enhancement** : les formulaires fonctionnent même sans JavaScript.

## Exemple minimal

\`\`\`tsx
// app/actions.ts
"use server"
export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  await db.posts.create({ title })
  revalidatePath("/blog")
}
\`\`\`

Dans le formulaire : \`<form action={createPost}>\` et des champs nommés. C’est tout.

## Bonnes pratiques

1. Toujours valider les entrées (Zod, etc.).
2. Utiliser \`revalidatePath\` ou \`revalidateTag\` après une mutation.
3. Gérer les erreurs et les renvoyer au client pour un feedback utilisateur.

## Conclusion

Les Server Actions sont un outil central pour des applications Next.js modernes. À combiner avec le cache et le revalidation pour une expérience fluide.
    `.trim(),
    date: "2025-02-15",
    readingTime: 5,
    tags: ["Next.js", "React", "Server Actions"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    slug: "accessibilite-web-pour-tous",
    title: "Accessibilité web : des bases à la conformité",
    excerpt:
      "Rappel des principes WCAG et des bonnes pratiques pour rendre vos interfaces utilisables par tous.",
    content: `
## L’accessibilité, c’est quoi ?

L’accessibilité web (a11y) vise à ce que les sites et applications soient **utilisables par le plus grand nombre**, y compris les personnes en situation de handicap (moteur, visuel, cognitif, etc.).

## Principes WCAG

- **Perceptible** : l’information doit être présentable (texte alternatif, contraste, sous-titres).
- **Utilisable** : navigation au clavier, pas de piège au focus, délais ajustables.
- **Compréhensible** : langage clair, formulaires prévisibles, messages d’erreur explicites.
- **Robuste** : contenu interprétable par les technologies d’assistance.

## Actions concrètes

1. **Sémantique HTML** : \`<main>\`, \`<nav>\`, \`<article>\`, boutons vs liens.
2. **Contraste** : ratio au moins 4,5:1 pour le texte normal.
3. **Focus visible** : ne pas supprimer l’outline sans la remplacer.
4. **Labels** : associer chaque champ à un \`<label>\` ou \`aria-label\`.

## Outils

- **Lighthouse** (Chrome DevTools) pour un premier audit.
- **axe DevTools** pour des vérifications détaillées.
- Tests manuels au clavier et avec un lecteur d’écran (NVDA, VoiceOver).

## Conclusion

Intégrer l’accessibilité dès le début du projet est moins coûteux que de corriger après coup. C’est aussi un gain pour le SEO et l’ergonomie générale.
    `.trim(),
    date: "2025-02-08",
    readingTime: 6,
    tags: ["Accessibilité", "WCAG", "UX"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
  },
  {
    slug: "typescript-strict-mode",
    title: "TypeScript en mode strict : pourquoi et comment",
    excerpt:
      "Passer un projet TypeScript en strict mode améliore la fiabilité du code. Retour d’expérience et étapes pratiques.",
    content: `
## Qu’est-ce que le mode strict ?

Dans \`tsconfig.json\`, \`"strict": true\` active un ensemble d’options qui rendent le typage plus exigeant : \`strictNullChecks\`, \`noImplicitAny\`, etc.

## Pourquoi l’activer ?

- **Moins de bugs en production** : les \`undefined\` et \`null\` sont explicites.
- **Meilleure autocomplétion** : l’IDE connaît mieux les types.
- **Refactoring plus sûr** : les changements de contrat sont détectés à la compilation.

## Migration progressive

1. Activer une option à la fois si le projet est gros (ex. \`strictNullChecks\`).
2. Corriger les erreurs fichier par fichier ou avec \`// @ts-expect-error\` temporaire.
3. Utiliser des types utilitaires : \`NonNullable<T>\`, \`Required<T>\`, et bien typer les états.

## Pièges courants

- **Tableaux et \`length\`** : \`arr[0]\` peut être \`undefined\` si \`arr\` est \`T[]\`.
- **API et JSON** : valider les réponses (Zod, io-ts) au lieu de \`as Type\`.
- **Events** : typer les handlers (\`React.ChangeEvent<HTMLInputElement>\`, etc.).

## Conclusion

Le strict mode demande un peu d’effort au début mais renforce la maintenabilité. À adopter pour tout nouveau projet et à viser pour l’existant.
    `.trim(),
    date: "2025-01-28",
    readingTime: 4,
    tags: ["TypeScript", "Qualité"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
  },
  {
    slug: "react-server-components-vs-client",
    title: "React Server Components vs Client Components",
    excerpt:
      "Comprendre la différence entre RSC et Client Components dans l’écosystème React et Next.js.",
    content: `
## Deux modèles de composants

- **Server Components** : rendus sur le serveur, pas de \`useState\` ni d’effets, pas de bundle envoyé pour eux.
- **Client Components** : hydratés côté navigateur, peuvent utiliser hooks et événements.

## Quand utiliser quoi ?

- **Server** : fetch de données, accès BDD, secrets, gros composants sans interactivité.
- **Client** : formulaires, modales, tout ce qui dépend de \`onClick\`, \`useState\`, \`useEffect\`.

## Règles pratiques

1. Par défaut, en App Router Next.js, un composant est un Server Component.
2. Ajouter \`"use client"\` en première ligne pour en faire un Client Component.
3. On peut importer un Client Component dans un Server Component (il sera une “frontière” client).
4. On ne peut pas importer un Server Component dans un Client Component ; on passe des enfants ou des props sérialisables.

## Données et chargement

Les Server Components peuvent \`await\` directement un \`fetch\` ou un appel async. Pas besoin de \`useEffect\` pour le chargement initial. Pour l’interactivité après chargement, on combine avec des Client Components qui reçoivent les données en props.

## Conclusion

Bien séparer Server et Client permet de réduire le JavaScript envoyé et d’améliorer les performances tout en gardant une UX riche là où c’est nécessaire.
    `.trim(),
    date: "2025-01-15",
    readingTime: 5,
    tags: ["React", "Next.js", "RSC"],
    image: "https://images.unsplash.com/photo-1555066931-4365d18bab8c?w=800&q=80",
  },
  {
    slug: "tailwind-design-tokens",
    title: "Design tokens avec Tailwind CSS v4",
    excerpt:
      "Centraliser les couleurs et espacements avec les design tokens dans Tailwind v4.",
    content: `
## Design tokens : définition

Les design tokens sont des variables (couleurs, espacements, rayons, etc.) qui définissent le design system. Ils assurent la cohérence entre les écrans et les plateformes.

## Tailwind v4 et \`@theme\`

Avec Tailwind v4, on déclare les tokens dans le CSS avec \`@theme inline { ... }\`. Les variables sont alors disponibles comme classes (\`bg-primary\`, \`text-muted-foreground\`) et en CSS pur (\`var(--color-primary)\`).

## Exemple

\`\`\`css
@theme inline {
  --color-primary: oklch(0.45 0.2 250);
  --color-primary-foreground: oklch(0.98 0 0);
  --radius-md: 0.5rem;
}
\`\`\`

## Thème sombre

En dupliquant les variables dans \`.dark\` (ou une classe de thème), on bascule tout le design. Pas besoin de dupliquer chaque composant.

## Bonnes pratiques

- Nommer les tokens par rôle (\`primary\`, \`destructive\`) plutôt que par valeur (\`blue-500\`).
- Documenter les tokens pour les designers et les devs.
- Limiter le nombre de couleurs pour garder une palette cohérente.

## Conclusion

Les design tokens dans Tailwind v4 permettent un design system maintenable et un passage au dark mode propre. À adopter dès le début du projet.
    `.trim(),
    date: "2025-01-05",
    readingTime: 4,
    tags: ["Tailwind", "Design system", "CSS"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}
