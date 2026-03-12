/**
 * Envoi d'emails : SMTP (Mailtrap) ou API Mailtrap.
 * - SMTP : remplir MAILTRAP_SMTP_HOST, PORT, USER, PASS (et FROM_EMAIL, FROM_NAME).
 * - API  : remplir MAILTRAP_API_TOKEN (et FROM_EMAIL, FROM_NAME).
 * Si les deux sont présents, SMTP est utilisé en priorité.
 */

import nodemailer from "nodemailer"

export interface SendEmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

function getTransporter() {
  const host = process.env.MAILTRAP_SMTP_HOST
  const port = process.env.MAILTRAP_SMTP_PORT
  const user = process.env.MAILTRAP_SMTP_USER
  const pass = process.env.MAILTRAP_SMTP_PASS

  if (host && port && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(port),
      secure: port === "465",
      auth: { user, pass },
    })
  }
  return null
}

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const fromEmail = process.env.MAILTRAP_FROM_EMAIL ?? "noreply@example.com"
  const fromName = process.env.MAILTRAP_FROM_NAME ?? "Portfolio"

  const transporter = getTransporter()
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html ?? options.text.replace(/\n/g, "<br>"),
      })
      return true
    } catch (e) {
      console.error("[mail] SMTP send failed:", e)
      return false
    }
  }

  const token = process.env.MAILTRAP_API_TOKEN
  if (!token) {
    console.warn("[mail] No SMTP or MAILTRAP_API_TOKEN set, skipping send.")
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
    console.error("[mail] Mailtrap API send failed:", res.status, err)
    return false
  }
  return true
}
