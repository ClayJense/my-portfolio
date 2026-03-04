"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface TechMarqueeProps {
  items: string[]
  className?: string
  duration?: number
}

export function TechMarquee({
  items,
  className,
  duration = 25,
}: TechMarqueeProps) {
  const duplicated = [...items, ...items]

  return (
    <div
      className={cn("overflow-hidden py-4", className)}
      aria-hidden
    >
      <motion.div
        className="flex w-max gap-8"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
        style={{ width: "max-content" }}
      >
        {duplicated.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 rounded-full border border-border bg-muted/80 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
