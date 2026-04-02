import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/mail"
import { verifyRecaptchaV2 } from "@/lib/recaptcha"

/**
 * POST /api/contact — Envoi du message par email via Mailtrap.
 * Variables .env : MAILTRAP_API_TOKEN, CONTACT_TO_EMAIL, MAILTRAP_FROM_EMAIL, MAILTRAP_FROM_NAME
 * reCAPTCHA v2 (optionnel mais recommandé) : NEXT_PUBLIC_RECAPTCHA_SITE_KEY (client), RECAPTCHA_SECRET_KEY (serveur)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, countryCode, recaptchaToken } = body as {
      name?: string
      email?: string
      phone?: string
      message?: string
      countryCode?: string
      recaptchaToken?: string
    }

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Nom et email sont requis." },
        { status: 400 }
      )
    }

    const secretConfigured = Boolean(process.env.RECAPTCHA_SECRET_KEY?.trim())
    const siteKeyConfigured = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim())

    if (secretConfigured && siteKeyConfigured) {
      if (!recaptchaToken?.trim()) {
        return NextResponse.json(
          { error: "Veuillez valider le captcha." },
          { status: 400 }
        )
      }
      const forwarded = request.headers.get("x-forwarded-for")
      const remoteIp = forwarded?.split(",")[0]?.trim()
      const ok = await verifyRecaptchaV2(recaptchaToken.trim(), remoteIp)
      if (!ok) {
        return NextResponse.json(
          { error: "Captcha invalide ou expiré. Réessayez." },
          { status: 400 }
        )
      }
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
