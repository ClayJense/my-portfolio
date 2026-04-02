/**
 * Vérification Google reCAPTCHA v2 (checkbox) côté serveur.
 * @see https://developers.google.com/recaptcha/docs/verify
 */
export async function verifyRecaptchaV2(token: string, remoteIp?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret?.trim()) {
    console.warn("[recaptcha] RECAPTCHA_SECRET_KEY manquant — vérification ignorée")
    return false
  }
  if (!token?.trim()) return false

  const params = new URLSearchParams()
  params.set("secret", secret)
  params.set("response", token)
  if (remoteIp) params.set("remoteip", remoteIp)

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })

  if (!res.ok) return false

  const data = (await res.json()) as { success?: boolean }
  return data.success === true
}
