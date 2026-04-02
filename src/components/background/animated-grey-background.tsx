"use client"

import React, { useEffect, useRef, useState } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type CodeRain = {
  x: number
  y: number
  speed: number
  chars: string[]
  head: number
  opacity: number
  fontSize: number
  color: string
}

type CircuitNode = {
  x: number
  y: number
  pulse: number
  pulseSpeed: number
  connections: number[]
  active: boolean
  activationDelay: number
}

type FloatingGlyph = {
  x: number
  y: number
  vx: number
  vy: number
  char: string
  opacity: number
  size: number
  life: number
  maxLife: number
}

type ScanLine = {
  y: number
  speed: number
  opacity: number
  width: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CODE_SNIPPETS = [
  "const∇", "=>∇{", "async∇", "await∇", "return∇", "export∇",
  "import∇", "function∇", "useState∇", "useEffect∇", "interface∇",
  "type∇", "class∇", "extends∇", "render∇", "props∇", "null∇",
  "void∇", "const∇", "let∇", "var∇", "for∇", "while∇", "if∇",
  "else∇", "try∇", "catch∇", "new∇", "this∇", "super∇", "static∇",
  "0x∇", "1∇", "0∇", "∇{}", "∇[]", "∇()", "∇=>", "∇||", "∇&&",
  "∇!=", "∇==", "∇>=", "∇<=", "∇++", "∇--", "∇**",
  "React∇", "Next∇", "Node∇", "HTTP∇", "API∇", "JSON∇", "URL∇",
  "DOM∇", "CSS∇", "SVG∇", "RGB∇", "HEX∇",
  // Binary / hex blocs
  "01101100∇", "11001010∇", "0xFFFFFF∇", "0x000000∇", "0xABCDEF∇",
  "10110101∇", "01010101∇", "11111111∇", "00000000∇",
  // Symbols
  "∑∇", "∏∇", "∂∇", "∇∇", "∞∇", "≡∇", "≠∇", "≈∇", "∫∇",
]

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" +
  "!@#$%^&*()_+-=[]{}|;':\",./<>?∑∏∂∇∞≡≠≈∫αβγδεζηθικλμνξοπρστυφχψω"

// Accent colors for the rain columns
const RAIN_COLORS = [
  "#00ff88", // neon green
  "#00d4ff", // cyan
  "#a855f7", // violet
  "#f97316", // orange
  "#ec4899", // pink
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const rnd = (min: number, max: number) => Math.random() * (max - min) + min
const rndInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min
const randChar = () =>
  MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
const randSnippet = () =>
  CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)].replace("∇", "")

// ─── Component ────────────────────────────────────────────────────────────────

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    // ── Sizing ────────────────────────────────────────────────────────────────
    let W = window.innerWidth
    let H = window.innerHeight
    const DPR = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * DPR
      canvas.height = H * DPR
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.scale(DPR, DPR)
    }
    resize()
    window.addEventListener("resize", resize)

    // ── Code Rain Columns ─────────────────────────────────────────────────────
    const COL_COUNT = Math.floor(W / 22)
    const rain: CodeRain[] = Array.from({ length: COL_COUNT }, (_, i) => ({
      x: i * 22 + rnd(0, 10),
      y: rnd(-H, 0),
      speed: rnd(0.8, 2.8),
      chars: Array.from({ length: rndInt(10, 30) }, () =>
        Math.random() > 0.6 ? randSnippet().slice(0, rndInt(2, 7)) : randChar()
      ),
      head: 0,
      opacity: rnd(0.08, 0.28),
      fontSize: rndInt(10, 15),
      color: RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)],
    }))

    // ── Circuit nodes ─────────────────────────────────────────────────────────
    const NODE_COUNT = Math.min(60, Math.floor((W * H) / 18000))
    const nodes: CircuitNode[] = Array.from({ length: NODE_COUNT }, () => ({
      x: rnd(0, W),
      y: rnd(0, H),
      pulse: 0,
      pulseSpeed: rnd(0.005, 0.025),
      connections: [],
      active: Math.random() > 0.5,
      activationDelay: rnd(0, Math.PI * 2),
    }))
    // Connect nearby nodes
    nodes.forEach((n, i) => {
      nodes.forEach((m, j) => {
        if (i >= j) return
        const d = Math.hypot(n.x - m.x, n.y - m.y)
        if (d < 200 && n.connections.length < 4) {
          n.connections.push(j)
        }
      })
    })

    // ── Floating glyphs ───────────────────────────────────────────────────────
    const glyphs: FloatingGlyph[] = Array.from({ length: 40 }, () => ({
      x: rnd(0, W),
      y: rnd(0, H),
      vx: rnd(-0.3, 0.3),
      vy: rnd(-0.3, 0.3),
      char:
        Math.random() > 0.5
          ? randSnippet().slice(0, rndInt(1, 5))
          : randChar(),
      opacity: rnd(0.04, 0.14),
      size: rndInt(14, 36),
      life: rnd(0, 400),
      maxLife: rnd(300, 600),
    }))

    // ── Scan lines ────────────────────────────────────────────────────────────
    const scans: ScanLine[] = Array.from({ length: 3 }, () => ({
      y: rnd(0, H),
      speed: rnd(0.3, 1.2) * (Math.random() > 0.5 ? 1 : -1),
      opacity: rnd(0.03, 0.10),
      width: rnd(60, 200),
    }))

    // ── State ─────────────────────────────────────────────────────────────────
    let frame = 0
    let raf = 0
    let last = performance.now()

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67
      last = now
      frame++

      // --- Clear with dark semi-transparent BG (trail effect)
      ctx.fillStyle = "rgba(4, 6, 12, 0.18)"
      ctx.fillRect(0, 0, W, H)

      // ── 1. Deep background gradient ──────────────────────────────────────
      if (frame % 4 === 0) {
        const t = frame * 0.003
        const grd = ctx.createRadialGradient(
          W * (0.5 + 0.35 * Math.sin(t)),
          H * (0.4 + 0.25 * Math.cos(t * 0.7)),
          0,
          W * 0.5,
          H * 0.5,
          Math.max(W, H) * 0.8
        )
        grd.addColorStop(0, "rgba(0,212,255,0.025)")
        grd.addColorStop(0.4, "rgba(168,85,247,0.012)")
        grd.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, W, H)
      }

      // ── 2. Code Rain ──────────────────────────────────────────────────────
      for (const col of rain) {
        const lineH = col.fontSize + 2
        col.y += col.speed * dt
        col.head = (col.head + (frame % 3 === 0 ? 1 : 0)) % col.chars.length

        // Mutate a random char occasionally
        if (Math.random() < 0.02) {
          const idx = rndInt(0, col.chars.length - 1)
          col.chars[idx] =
            Math.random() > 0.6
              ? randSnippet().slice(0, rndInt(2, 6))
              : randChar()
        }

        for (let i = 0; i < col.chars.length; i++) {
          const cy = col.y - i * lineH
          if (cy < -lineH || cy > H + lineH) continue

          const isHead = i === 0
          const fade = 1 - i / col.chars.length

          if (isHead) {
            // Glowing white head
            ctx.shadowColor = col.color
            ctx.shadowBlur = 12
            ctx.fillStyle = `rgba(255,255,255,${(col.opacity + 0.55).toFixed(2)})`
          } else {
            ctx.shadowBlur = 0
            const a = (col.opacity * fade * 0.9).toFixed(3)
            ctx.fillStyle = col.color.replace(")", `,${a})`).replace("rgb", "rgba")
            // For hex colors, parse manually
            if (col.color.startsWith("#")) {
              const r = parseInt(col.color.slice(1, 3), 16)
              const g = parseInt(col.color.slice(3, 5), 16)
              const b = parseInt(col.color.slice(5, 7), 16)
              ctx.fillStyle = `rgba(${r},${g},${b},${(col.opacity * fade * 0.9).toFixed(3)})`
            }
          }

          ctx.font = `${col.fontSize}px 'Courier New', monospace`
          ctx.fillText(col.chars[i], col.x, cy)
        }
        ctx.shadowBlur = 0

        // Wrap around
        if (col.y - col.chars.length * (col.fontSize + 2) > H) {
          col.y = rnd(-200, 0)
          col.speed = rnd(0.8, 2.8)
          col.color = RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)]
        }
      }

      // ── 3. Circuit / Graph network ────────────────────────────────────────
      for (const node of nodes) {
        node.pulse = (node.pulse + node.pulseSpeed * dt) % (Math.PI * 2)
        const p = (Math.sin(node.pulse + node.activationDelay) + 1) / 2

        // Draw connections
        for (const j of node.connections) {
          const target = nodes[j]
          const grad = ctx.createLinearGradient(
            node.x, node.y, target.x, target.y
          )
          const alpha = (0.06 + 0.12 * p).toFixed(3)
          grad.addColorStop(0, `rgba(0,212,255,${alpha})`)
          grad.addColorStop(0.5, `rgba(168,85,247,${(parseFloat(alpha) * 0.5).toFixed(3)})`)
          grad.addColorStop(1, `rgba(0,212,255,${alpha})`)
          ctx.strokeStyle = grad
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)

          // Orthogonal circuit path (L-shaped)
          const mx = (node.x + target.x) / 2
          ctx.lineTo(mx, node.y)
          ctx.lineTo(mx, target.y)
          ctx.lineTo(target.x, target.y)
          ctx.stroke()

          // Travelling dot along the circuit line
          if (Math.random() < 0.002) {
            const tp = ((frame * 0.02) % 1)
            const tx = node.x + (target.x - node.x) * tp
            const ty = node.y + (target.y - node.y) * tp
            ctx.fillStyle = `rgba(0,255,136,0.9)`
            ctx.beginPath()
            ctx.arc(tx, ty, 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        // Draw node dot
        const nodeAlpha = 0.2 + 0.6 * p
        ctx.shadowColor = "#00d4ff"
        ctx.shadowBlur = 8 * p
        ctx.fillStyle = `rgba(0,212,255,${nodeAlpha.toFixed(2)})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Outer ring pulse
        ctx.strokeStyle = `rgba(0,212,255,${(nodeAlpha * 0.4).toFixed(2)})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.arc(node.x, node.y, 6 + 4 * p, 0, Math.PI * 2)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // ── 4. Floating large glyphs ──────────────────────────────────────────
      for (const g of glyphs) {
        g.x += g.vx * dt
        g.y += g.vy * dt
        g.life += dt

        // Wrap
        if (g.x < -100) g.x = W + 50
        if (g.x > W + 100) g.x = -50
        if (g.y < -50) g.y = H + 50
        if (g.y > H + 50) g.y = -50

        // Life fade
        const lifeRatio = g.life / g.maxLife
        const fade = lifeRatio < 0.2
          ? lifeRatio / 0.2
          : lifeRatio > 0.8
            ? (1 - lifeRatio) / 0.2
            : 1

        if (g.life > g.maxLife) {
          g.life = 0
          g.char = Math.random() > 0.5
            ? randSnippet().slice(0, rndInt(1, 5))
            : randChar()
          g.x = rnd(0, W)
          g.y = rnd(0, H)
        }

        ctx.font = `300 ${g.size}px 'Courier New', monospace`
        ctx.fillStyle = `rgba(0,212,255,${(g.opacity * fade).toFixed(3)})`
        ctx.fillText(g.char, g.x, g.y)
      }

      // ── 5. Horizontal scan lines ──────────────────────────────────────────
      for (const scan of scans) {
        scan.y += scan.speed * dt
        if (scan.y > H + 100) scan.y = -scan.width
        if (scan.y < -scan.width - 100) scan.y = H + 50

        const sg = ctx.createLinearGradient(0, scan.y, 0, scan.y + scan.width)
        sg.addColorStop(0, "rgba(0,212,255,0)")
        sg.addColorStop(0.5, `rgba(0,212,255,${scan.opacity.toFixed(3)})`)
        sg.addColorStop(1, "rgba(0,212,255,0)")
        ctx.fillStyle = sg
        ctx.fillRect(0, scan.y, W, scan.width)
      }

      // ── 6. Vignette ───────────────────────────────────────────────────────
      if (frame % 60 === 0 || frame === 1) {
        const vgrd = ctx.createRadialGradient(
          W / 2, H / 2, Math.min(W, H) * 0.3,
          W / 2, H / 2, Math.max(W, H) * 0.8
        )
        vgrd.addColorStop(0, "rgba(0,0,0,0)")
        vgrd.addColorStop(1, "rgba(0,0,0,0.65)")
        ctx.fillStyle = vgrd
        ctx.fillRect(0, 0, W, H)
      }

      raf = requestAnimationFrame(draw)
    }

    if (prefersReduced) {
      // Static snapshot for accessibility
      ctx.fillStyle = "#04060c"
      ctx.fillRect(0, 0, W, H)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [mounted])

  return (
    <>
      {/* ── Main canvas ────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ background: "#04060c" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* ── CSS scanline overlay ─────────────────────────────────────────── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* ── Corner brackets ─────────────────────────────────────────────── */}
        <CornerBrackets />

        {/* ── CSS animations ──────────────────────────────────────────────── */}
        <style>{`
          @keyframes cornerPulse {
            0%,100% { opacity: 0.25; }
            50% { opacity: 0.6; }
          }
          @keyframes statusBlink {
            0%,49% { opacity: 1; }
            50%,100% { opacity: 0; }
          }
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; }
          }
        `}</style>
      </div>

      {/* ── HUD overlay (bottom ticker) ────────────────────────────────────── */}
      <div
        aria-hidden
        className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden"
        style={{ height: "28px", borderTop: "1px solid rgba(0,212,255,0.12)" }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "ticker 40s linear infinite",
            color: "rgba(0,212,255,0.35)",
            fontSize: "10px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.08em",
            lineHeight: "28px",
            paddingLeft: "100%",
          }}
        >
          {Array.from({ length: 4 }, (_, k) => (
            <span key={k} style={{ marginRight: "6rem" }}>
              {CODE_SNIPPETS.join("  ·  ")}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Corner Brackets HUD ──────────────────────────────────────────────────────

function CornerBrackets() {
  const size = 40
  const stroke = "rgba(0,212,255,0.45)"
  const style: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    animation: "cornerPulse 3s ease-in-out infinite",
  }
  const lineStyle: React.CSSProperties = {
    position: "absolute",
    background: stroke,
  }

  return (
    <>
      {/* TL */}
      <div style={{ ...style, top: 20, left: 20 }}>
        <div style={{ ...lineStyle, top: 0, left: 0, width: size, height: 1 }} />
        <div style={{ ...lineStyle, top: 0, left: 0, width: 1, height: size }} />
      </div>
      {/* TR */}
      <div style={{ ...style, top: 20, right: 20, animationDelay: "0.5s" }}>
        <div style={{ ...lineStyle, top: 0, right: 0, width: size, height: 1 }} />
        <div style={{ ...lineStyle, top: 0, right: 0, width: 1, height: size }} />
      </div>
      {/* BL */}
      <div style={{ ...style, bottom: 48, left: 20, animationDelay: "1s" }}>
        <div style={{ ...lineStyle, bottom: 0, left: 0, width: size, height: 1 }} />
        <div style={{ ...lineStyle, bottom: 0, left: 0, width: 1, height: size }} />
      </div>
      {/* BR */}
      <div style={{ ...style, bottom: 48, right: 20, animationDelay: "1.5s" }}>
        <div style={{ ...lineStyle, bottom: 0, right: 0, width: size, height: 1 }} />
        <div style={{ ...lineStyle, bottom: 0, right: 0, width: 1, height: size }} />
      </div>

      {/* Status dot */}
      <div
        style={{
          position: "absolute",
          top: 22,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "rgba(0,255,136,0.55)",
          fontSize: 10,
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.12em",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00ff88",
            animation: "statusBlink 1.2s step-end infinite",
            boxShadow: "0 0 6px #00ff88",
          }}
        />
        SYS::ONLINE
      </div>
    </>
  )
}