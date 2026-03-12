import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/mail"

/**
 * POST /api/contact — Envoi du message par email via Mailtrap.
 * Variables .env : MAILTRAP_API_TOKEN, CONTACT_TO_EMAIL, MAILTRAP_FROM_EMAIL, MAILTRAP_FROM_NAME
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, countryCode } = body as {
      name?: string
      email?: string
      phone?: string
      message?: string
      countryCode?: string
    }

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Nom et email sont requis." },
        { status: 400 }
      )
    }

    const toEmail = process.env.CONTACT_TO_EMAIL
    if (toEmail) {
      await sendEmail({
        to: toEmail,
        subject: `[Portfolio] Message de ${name.trim()}`,
        text: [
          `Nom: ${name.trim()}`,
          `Email: ${email.trim()}`,
          countryCode ? `Pays: ${countryCode}` : null,
          phone ? `Téléphone: ${phone.trim()}` : null,
          message ? `Message:\n${message.trim()}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("[api/contact]", e)
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    )
  }
}
