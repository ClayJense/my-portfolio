import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  id?: string
  className?: string
  children: React.ReactNode
  containerClassName?: string
}

export function SectionWrapper({
  id,
  className,
  children,
  containerClassName,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("py-12 sm:py-20 md:py-28", className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}
