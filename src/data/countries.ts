import type { CountryPhoneOption } from "@/types"

/** Retourne l'emoji drapeau pour un code pays ISO 3166-1 alpha-2 (ex: FR → 🇫🇷) */
export function getFlagEmoji(countryCode: string): string {
  const code = countryCode.toUpperCase()
  if (code.length !== 2) return ""
  const codePoints = code.split("").map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

/** Sénégal en premier = valeur par défaut. Puis Afrique (dont Comores), puis Europe / reste du monde. */
export const countryPhoneOptions: CountryPhoneOption[] = [
  // Afrique (priorité)
  { code: "SN", name: "Sénégal", dialCode: "+221", placeholder: "70 123 45 67" },
  { code: "KM", name: "Comores", dialCode: "+269", placeholder: "321 12 34" },
  { code: "MA", name: "Maroc", dialCode: "+212", placeholder: "612-345678" },
  { code: "DZ", name: "Algérie", dialCode: "+213", placeholder: "551 23 45 67" },
  { code: "TN", name: "Tunisie", dialCode: "+216", placeholder: "20 123 456" },
  { code: "LY", name: "Libye", dialCode: "+218", placeholder: "91 234 5678" },
  { code: "EG", name: "Égypte", dialCode: "+20", placeholder: "100 123 4567" },
  { code: "MR", name: "Mauritanie", dialCode: "+222", placeholder: "22 12 34 56" },
  { code: "ML", name: "Mali", dialCode: "+223", placeholder: "65 12 34 56" },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", placeholder: "70 12 34 56" },
  { code: "NE", name: "Niger", dialCode: "+227", placeholder: "93 12 34 56" },
  { code: "TD", name: "Tchad", dialCode: "+235", placeholder: "63 12 34 56" },
  { code: "NG", name: "Nigeria", dialCode: "+234", placeholder: "802 123 4567" },
  { code: "CM", name: "Cameroun", dialCode: "+237", placeholder: "6 12 34 56 78" },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "+225", placeholder: "07 12 34 56 78" },
  { code: "GH", name: "Ghana", dialCode: "+233", placeholder: "23 123 4567" },
  { code: "TG", name: "Togo", dialCode: "+228", placeholder: "90 12 34 56" },
  { code: "BJ", name: "Bénin", dialCode: "+229", placeholder: "90 12 34 56" },
  { code: "GA", name: "Gabon", dialCode: "+241", placeholder: "6 12 34 56 78" },
  { code: "CG", name: "Congo", dialCode: "+242", placeholder: "06 123 45 67" },
  { code: "CD", name: "RD Congo", dialCode: "+243", placeholder: "991 234 567" },
  { code: "AO", name: "Angola", dialCode: "+244", placeholder: "923 123 456" },
  { code: "GW", name: "Guinée-Bissau", dialCode: "+245", placeholder: "955 012 345" },
  { code: "GQ", name: "Guinée équatoriale", dialCode: "+240", placeholder: "222 123 456" },
  { code: "ST", name: "Sao Tomé-et-Príncipe", dialCode: "+239", placeholder: "981 2345" },
  { code: "SC", name: "Seychelles", dialCode: "+248", placeholder: "2 512 345" },
  { code: "MU", name: "Maurice", dialCode: "+230", placeholder: "5251 2345" },
  { code: "RE", name: "La Réunion", dialCode: "+262", placeholder: "692 12 34 56" },
  { code: "YT", name: "Mayotte", dialCode: "+262", placeholder: "639 12 34 56" },
  { code: "MG", name: "Madagascar", dialCode: "+261", placeholder: "32 12 345 67" },
  { code: "MZ", name: "Mozambique", dialCode: "+258", placeholder: "84 123 4567" },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263", placeholder: "71 123 4567" },
  { code: "ZM", name: "Zambie", dialCode: "+260", placeholder: "95 123 4567" },
  { code: "MW", name: "Malawi", dialCode: "+265", placeholder: "991 23 45 67" },
  { code: "TZ", name: "Tanzanie", dialCode: "+255", placeholder: "712 345 678" },
  { code: "KE", name: "Kenya", dialCode: "+254", placeholder: "712 345678" },
  { code: "UG", name: "Ouganda", dialCode: "+256", placeholder: "712 345678" },
  { code: "RW", name: "Rwanda", dialCode: "+250", placeholder: "72 123 4567" },
  { code: "BI", name: "Burundi", dialCode: "+257", placeholder: "79 12 34 56" },
  { code: "ET", name: "Éthiopie", dialCode: "+251", placeholder: "91 123 4567" },
  { code: "SO", name: "Somalie", dialCode: "+252", placeholder: "61 234 5678" },
  { code: "DJ", name: "Djibouti", dialCode: "+253", placeholder: "77 12 34 56" },
  { code: "ER", name: "Érythrée", dialCode: "+291", placeholder: "7 123 456" },
  { code: "SS", name: "Soudan du Sud", dialCode: "+211", placeholder: "977 123 456" },
  { code: "SD", name: "Soudan", dialCode: "+249", placeholder: "912 345 678" },
  { code: "GM", name: "Gambie", dialCode: "+220", placeholder: "301 2345" },
  { code: "GN", name: "Guinée", dialCode: "+224", placeholder: "601 12 34 56" },
  { code: "SL", name: "Sierra Leone", dialCode: "+232", placeholder: "72 123 456" },
  { code: "LR", name: "Liberia", dialCode: "+231", placeholder: "77 123 4567" },
  { code: "CV", name: "Cap-Vert", dialCode: "+238", placeholder: "991 23 45" },
  // Europe & autres
  { code: "FR", name: "France", dialCode: "+33", placeholder: "6 12 34 56 78" },
  { code: "BE", name: "Belgique", dialCode: "+32", placeholder: "456 78 90 12" },
  { code: "CH", name: "Suisse", dialCode: "+41", placeholder: "78 123 45 67" },
  { code: "US", name: "États-Unis", dialCode: "+1", placeholder: "(555) 123-4567" },
  { code: "CA", name: "Canada", dialCode: "+1", placeholder: "(555) 123-4567" },
  { code: "GB", name: "Royaume-Uni", dialCode: "+44", placeholder: "7700 900123" },
  { code: "DE", name: "Allemagne", dialCode: "+49", placeholder: "151 12345678" },
  { code: "ES", name: "Espagne", dialCode: "+34", placeholder: "612 34 56 78" },
  { code: "IT", name: "Italie", dialCode: "+39", placeholder: "312 345 6789" },
]

export function getPhonePlaceholder(countryCode: string): string {
  const country = countryPhoneOptions.find((c) => c.code === countryCode)
  return country?.placeholder ?? "Numéro de téléphone"
}

export function getDialCode(countryCode: string): string {
  const country = countryPhoneOptions.find((c) => c.code === countryCode)
  return country?.dialCode ?? ""
}
