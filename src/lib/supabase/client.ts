import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Client Supabase pour le navigateur (composants client).
 * Utilise la clé anonyme (NEXT_PUBLIC_SUPABASE_ANON_KEY).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set."
    )
  }

  return createSupabaseClient(url, anonKey)
}
