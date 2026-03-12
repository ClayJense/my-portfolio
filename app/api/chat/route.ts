import { NextResponse } from "next/server"

/**
 * POST /api/chat
 * Reçoit le message utilisateur et renvoie une réponse (simulée ou via une API IA plus tard).
 * Body: { message: string }
 * Réponse: { reply: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = (body?.message as string)?.trim()

    if (!message) {
      return NextResponse.json(
        { error: "Le message est requis." },
        { status: 400 }
      )
    }

    // Pour l’instant : réponses simulées. Plus tard tu peux brancher OpenAI, etc.
    const replies = [
      "Merci pour ta question ! Iza est un développeur full-stack orienté backend & DevOps, passionné par Laravel, Spring Boot, Nest.js, Angular et Next.js.",
      "Iza travaille principalement avec Laravel, Spring Boot et Nest.js côté backend, et Angular/Next.js côté frontend. Il maîtrise aussi Docker, Linux et le déploiement cloud.",
      "N'hésite pas à consulter la section projets du portfolio pour voir des exemples concrets de réalisations !",
      "Tu peux contacter Iza via la page Contact du site (email, WhatsApp).",
      "Iza est aussi à l'aise avec les bases de données relationnelles : PostgreSQL, MySQL, Oracle, SQL Server et SQLite.",
    ]
    const reply = replies[Math.floor(Math.random() * replies.length)]

    return NextResponse.json({ reply })
  } catch (e) {
    console.error("[api/chat]", e)
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    )
  }
}
