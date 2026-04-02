"use client"

import { useEffect, useRef } from "react"

const SNIPPETS = [
  "const", "=>", "async", "await", "return", "export", "import",
  "type", "null", "void", "true", "false", "if", "else",
  "[]", "{}", "()", "//", "&&", "||", "!==", "===",
  "01", "10", "0x",
]

type Particle = {
  x: number; y: number
  vx: number; vy: number
  r: number
}

type CodeGlyph = {
  x: number; y: number
  vy: number
  text: string
  opacity: number
  size: number
}

const rnd = (a: number, b: number) => Math.random() * (b - a) + a
const rndSnippet = () => SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]

function isDark() {
  if (typeof window === "undefined") return true
  const html = document.documentElement
  if (html.classList.contains("dark")) return true
  if (html.classList.contains("light")) return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let W = 0, H = 0
    const DPR = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = Math.floor(W * DPR)
      canvas.height = Math.floor(H * DPR)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const count = Math.min(80, Math.max(35, Math.floor((W * H) / 14000)))
    const MAX_DIST = Math.min(150, Math.floor(Math.min(W, H) / 5.5))
    const MAX_DIST2 = MAX_DIST * MAX_DIST

    const particles: Particle[] = Array.from({ length: count }, () => {
      const speed = rnd(0.04, 0.18)
      const angle = Math.random() * Math.PI * 2
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rnd(1.0, 2.2),
      }
    })

    const GLYPH_COUNT = Math.min(16, Math.max(6, Math.floor(W / 100)))
    const glyphs: CodeGlyph[] = Array.from({ length: GLYPH_COUNT }, () => ({
      x: rnd(0, W),
      y: rnd(0, H),
      vy: rnd(0.06, 0.22),
      text: rndSnippet(),
      opacity: rnd(0.04, 0.10),
      size: rnd(11, 15),
    }))

    let raf = 0
    let last = performance.now()

    const loop = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67
      last = now

      // Fond entièrement transparent — aucune couleur de fond
      ctx.clearRect(0, 0, W, H)

      const dark = isDark()
      // En dark : gris clair subtil. En light : gris foncé subtil.
      const rgb = dark ? "200,200,215" : "60,60,80"

      // Particules
      for (const p of particles) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      }

      // Connexions
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d2 = dx * dx + dy * dy
          if (d2 > MAX_DIST2) continue
          const t = 1 - Math.sqrt(d2) / MAX_DIST
          ctx.strokeStyle = `rgba(${rgb},${(0.10 * t).toFixed(3)})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }

      // Points
      for (const p of particles) {
        ctx.fillStyle = `rgba(${rgb},0.22)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Glyphs de code
      for (const g of glyphs) {
        g.y += g.vy * dt
        if (g.y > H + 24) {
          g.y = -16
          g.x = rnd(0, W)
          g.text = rndSnippet()
          g.opacity = rnd(0.04, 0.10)
          g.vy = rnd(0.06, 0.22)
        }
        ctx.font = `400 ${g.size}px 'Courier New', monospace`
        ctx.fillStyle = `rgba(${rgb},${g.opacity.toFixed(3)})`
        ctx.fillText(g.text, g.x, g.y)
      }

      raf = requestAnimationFrame(loop)
    }

    if (!prefersReduced) {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      // Pas de background — complètement transparent
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}