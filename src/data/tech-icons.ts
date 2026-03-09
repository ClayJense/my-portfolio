/** Logos pour le nuage animé (IconCloud) — frameworks principaux uniquement */
export const techIconUrls = [
  "https://cdn.simpleicons.org/react/61DAFB",
  "https://cdn.simpleicons.org/angular/DD0031",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  "https://cdn.simpleicons.org/nestjs/E0234E",
  "https://cdn.simpleicons.org/laravel/FF2D20",
  "https://cdn.simpleicons.org/springboot/6DB33F",
  "https://cdn.simpleicons.org/docker/2496ED",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "https://cdn.simpleicons.org/git/F05032",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
]

/** Liste complète par catégorie pour la grille de compétences */
export interface TechItem {
  name: string
  icon: string
}

export interface TechCategory {
  label: string
  items: TechItem[]
}

export const techCategories: TechCategory[] = [
  {
    label: "Langages",
    items: [
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4" },
      { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Go", icon: "https://cdn.simpleicons.org/go/00ADD8" },
      { name: "C", icon: "https://cdn.simpleicons.org/c/A8B9CC" },
      { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Angular", icon: "https://cdn.simpleicons.org/angular/DD0031" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Nest.js", icon: "https://cdn.simpleicons.org/nestjs/E0234E" },
      { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
      { name: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
    ],
  },
  {
    label: "Bases de données",
    items: [
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Oracle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
      { name: "SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
      { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
    ],
  },
  {
    label: "DevOps & outils",
    items: [
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
    ],
  },
]
