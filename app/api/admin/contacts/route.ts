import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

interface ContactMessageRow {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  country_code: string | null
  created_at: string
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("contact_messages")
      .select("id,name,email,phone,message,country_code,created_at")
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      return NextResponse.json(
        {
          items: [],
          source: "ui-fallback",
          warning: "Impossible de lire Supabase pour le moment.",
        },
        { status: 200 }
      )
    }

    return NextResponse.json({
      items: (data ?? []) as ContactMessageRow[],
      source: "supabase",
    })
  } catch {
    return NextResponse.json(
      {
        items: [],
        source: "ui-fallback",
        warning: "Variables Supabase manquantes ou serveur indisponible.",
      },
      { status: 200 }
    )
  }
}
