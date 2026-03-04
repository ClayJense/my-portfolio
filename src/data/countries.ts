import type { CountryPhoneOption } from "@/types"

/** Retourne l'emoji drapeau pour un code pays ISO 3166-1 alpha-2 (ex: FR → 🇫🇷) */
export function getFlagEmoji(countryCode: string): string {
  const code = countryCode.toUpperCase()
  if (code.length !== 2) return ""
  const codePoints = code.split("").map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export const countryPhoneOptions: CountryPhoneOption[] = [
  { code: "FR", name: "France", dialCode: "+33", placeholder: "6 12 34 56 78" },
  { code: "BE", name: "Belgique", dialCode: "+32", placeholder: "456 78 90 12" },
  { code: "CH", name: "Suisse", dialCode: "+41", placeholder: "78 123 45 67" },
  { code: "US", name: "États-Unis", dialCode: "+1", placeholder: "(555) 123-4567" },
  { code: "CA", name: "Canada", dialCode: "+1", placeholder: "(555) 123-4567" },
  { code: "GB", name: "Royaume-Uni", dialCode: "+44", placeholder: "7700 900123" },
  { code: "DE", name: "Allemagne", dialCode: "+49", placeholder: "151 12345678" },
  { code: "ES", name: "Espagne", dialCode: "+34", placeholder: "612 34 56 78" },
  { code: "IT", name: "Italie", dialCode: "+39", placeholder: "312 345 6789" },
  { code: "MA", name: "Maroc", dialCode: "+212", placeholder: "612-345678" },
  { code: "SN", name: "Sénégal", dialCode: "+221", placeholder: "70 123 45 67" },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "+225", placeholder: "07 12 34 56 78" },
  { code: "CM", name: "Cameroun", dialCode: "+237", placeholder: "6 12 34 56 78" },
  { code: "TN", name: "Tunisie", dialCode: "+216", placeholder: "20 123 456" },
  { code: "DZ", name: "Algérie", dialCode: "+213", placeholder: "551 23 45 67" },
]

export function getPhonePlaceholder(countryCode: string): string {
  const country = countryPhoneOptions.find((c) => c.code === countryCode)
  return country?.placeholder ?? "Numéro de téléphone"
}

export function getDialCode(countryCode: string): string {
  const country = countryPhoneOptions.find((c) => c.code === countryCode)
  return country?.dialCode ?? ""
}
