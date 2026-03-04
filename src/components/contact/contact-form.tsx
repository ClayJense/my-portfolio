"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Send } from "lucide-react"
import { countryPhoneOptions, getFlagEmoji, getPhonePlaceholder } from "@/data/countries"
import type { ContactFormData } from "@/types"
import { cn } from "@/lib/utils"

const initialForm: ContactFormData = {
  name: "",
  email: "",
  countryCode: "FR",
  phone: "",
  message: "",
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const phonePlaceholder = getPhonePlaceholder(form.countryCode)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 800))
    setStatus("success")
    setForm(initialForm)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-foreground"
          >
            Nom complet
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jean Dupont"
            className={cn(
              "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "transition-shadow"
            )}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jean@exemple.fr"
            className={cn(
              "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "transition-shadow"
            )}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="contact-country"
            className="text-sm font-medium text-foreground"
          >
            Pays
          </label>
          <select
            id="contact-country"
            name="countryCode"
            value={form.countryCode}
            onChange={handleChange}
            className={cn(
              "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "transition-shadow cursor-pointer appearance-none",
              "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%236b7280%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')] bg-[length:1rem] bg-[right_0.4rem_center] bg-no-repeat pr-8"
            )}
            style={{ paddingRight: "1.75rem" }}
          >
            {countryPhoneOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {getFlagEmoji(c.code)} {c.name} ({c.dialCode})
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contact-phone"
            className="text-sm font-medium text-foreground"
          >
            Téléphone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder={phonePlaceholder}
            className={cn(
              "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "transition-shadow"
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Décrivez votre projet ou votre demande..."
          className={cn(
            "w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "transition-shadow min-h-[120px]"
          )}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          En envoyant ce formulaire, vous acceptez d'être recontacté concernant
          votre demande.
        </p>
        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground",
            "shadow-sm transition-all hover:bg-primary/90 hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-60",
            "cursor-pointer"
          )}
        >
          {status === "sending" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Envoi...
            </>
          ) : status === "success" ? (
            "Message envoyé"
          ) : (
            <>
              Envoyer
              <Send className="size-4" />
            </>
          )}
        </motion.button>
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Une erreur est survenue. Réessayez ou contactez-moi par email.
        </p>
      )}
    </motion.form>
  )
}
