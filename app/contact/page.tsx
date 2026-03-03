import Link from "next/link"
import { ArrowLeft, Mail, MapPin } from "lucide-react"

export const metadata = {
  title: "Contact | Mon portfolio",
  description: "Me contacter pour un projet ou une collaboration.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour à l’accueil
        </Link>
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Contact
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Un projet, une question ou une collaboration ? Envoyez-moi un message.
          </p>
        </header>
        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="sr-only">Coordonnées</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </span>
                <div>
                  <span className="block text-sm font-medium text-foreground">
                    Email
                  </span>
                  <a
                    href="mailto:contact@example.com"
                    className="text-sm hover:underline"
                  >
                    contact@example.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <span className="block text-sm font-medium text-foreground">
                    Localisation
                  </span>
                  <span className="text-sm">Disponible en remote & sur site</span>
                </div>
              </li>
            </ul>
          </section>
          <section className="rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
            <p className="text-sm font-medium text-foreground">
              Formulaire de contact à venir
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              En attendant, utilisez l’email ci-dessus ou les liens du bandeau en bas
              de page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
