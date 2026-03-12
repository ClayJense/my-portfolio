import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/mail"

/**
 * Table Supabase attendue : contact_messages
 * Colonnes : id (uuid), name (text), email (text), phone (text), message (text), country_code (text), created_at (timestamptz)
 * À créer dans le Dashboard Supabase → Table Editor.
 */
const CONTACT_TABLE = "contact_messages"

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

    const hasSupabase =
      process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    if (hasSupabase) {
      try {
        const supabase = createServerSupabaseClient()
        const { error } = await supabase.from(CONTACT_TABLE).insert({
          name: name.trim(),
          email: email.trim(),
          phone: phone?.trim() ?? null,
          message: message?.trim() ?? null,
          country_code: countryCode?.trim() ?? null,
        })
        if (error) {
          console.error("[api/contact] Supabase insert error:", error)
          return NextResponse.json(
            { error: "Erreur lors de l'enregistrement du message." },
            { status: 500 }
          )
        }
      } catch (e) {
        console.error("[api/contact] Supabase client error:", e)
        return NextResponse.json(
          { error: "Configuration serveur manquante (Supabase)." },
          { status: 503 }
        )
      }
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
