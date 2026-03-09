"use client"

import { motion, AnimatePresence } from "motion/react"
import { MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatToggleButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export function ChatToggleButton({ isOpen, onClick, className }: ChatToggleButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "fixed bottom-20 right-4 z-50 flex items-center justify-center",
        "size-12 sm:size-14 rounded-full shadow-lg cursor-pointer",
        "bg-primary text-primary-foreground",
        "hover:shadow-xl hover:scale-105 active:scale-95",
        "transition-shadow",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
    >
      {!isOpen && (
        <span className="absolute inset-0 rounded-full animate-ping bg-primary/30 pointer-events-none" />
      )}
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="size-5 sm:size-6" />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageCircle className="size-5 sm:size-6" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
