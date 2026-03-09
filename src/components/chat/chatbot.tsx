"use client"

import { useState, useCallback } from "react"
import { AnimatePresence } from "motion/react"
import { ChatToggleButton } from "./chat-toggle-button"
import { ChatPanel } from "./chat-panel"
import type { ChatMessage } from "@/types/chat"

const SIMULATED_RESPONSES = [
  "Merci pour ta question ! Iza est un développeur full-stack orienté backend & DevOps, passionné par Laravel, Spring Boot, Nest.js, Angular et Next.js.",
  "Iza travaille principalement avec Laravel, Spring Boot et Nest.js côté backend, et Angular/Next.js côté frontend. Il maîtrise aussi Docker, Linux et le déploiement cloud.",
  "N'hésite pas à consulter la section projets du portfolio pour voir des exemples concrets de réalisations !",
  "Bonne question ! Tu peux contacter Iza directement via la page Contact du site.",
  "Iza est aussi à l'aise avec les bases de données relationnelles : PostgreSQL, MySQL, Oracle, SQL Server et SQLite.",
]

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const sendMessage = useCallback(() => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    const delay = 800 + Math.random() * 1200
    setTimeout(() => {
      const response = SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)]
      const botMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, delay)
  }, [input, isTyping])

  return (
    <>
      <ChatToggleButton isOpen={isOpen} onClick={toggle} />

      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            messages={messages}
            input={input}
            isTyping={isTyping}
            onInputChange={setInput}
            onSend={sendMessage}
            onClose={toggle}
          />
        )}
      </AnimatePresence>
    </>
  )
}
