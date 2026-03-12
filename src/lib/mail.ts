/**
 * Envoi d'emails via l'API Mailtrap.
 * Utilise MAILTRAP_API_TOKEN, MAILTRAP_FROM_EMAIL, MAILTRAP_FROM_NAME.
 * @see https://api-docs.mailtrap.io/docs/mailtrap-api-docs/67f1d70aeb62c-send-email
 */

export interface SendEmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const token = process.env.MAILTRAP_API_TOKEN
  const fromEmail = process.env.MAILTRAP_FROM_EMAIL ?? "noreply@example.com"
  const fromName = process.env.MAILTRAP_FROM_NAME ?? "Portfolio"

  if (!token) {
    console.warn("[mail] MAILTRAP_API_TOKEN is not set, skipping send.")
    return false
  }

  const res = await fetch("https://send.api.mailtrap.io/api/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: fromEmail, name: fromName },
      to: [{ email: options.to }],
      subject: options.subject,
      text: options.text,
      html: options.html ?? options.text.replace(/\n/g, "<br>"),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error("[mail] Mailtrap send failed:", res.status, err)
    return false
  }

  return true
}
