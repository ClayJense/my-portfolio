import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Blog | Mon portfolio",
  description: "Articles et réflexions sur le développement web et le design.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour à l’accueil
        </Link>
        <header className="mb-14">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Blog
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Articles, tutoriels et retours d’expérience sur le développement web,
            l’accessibilité et les bonnes pratiques.
          </p>
        </header>
        <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground shadow-sm">
          <p className="font-medium text-foreground">Bientôt des articles ici.</p>
          <p className="mt-2 text-sm">
            Cette section sera alimentée avec du contenu régulier. Revenez plus tard
            ou contactez-moi pour en savoir plus.
          </p>
        </div>
      </div>
    </div>
  )
}
