import React from "react"

function CodeLine({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="hero-code-line">{children}</div>
}

export function HeroCodeBackdrop() {
  const lines: React.ReactNode[] = [
    <>
      <span className="hero-code-k">const</span> <span className="hero-code-v">hero</span> ={" "}
      <span className="hero-code-n">{"{"}</span>
    </>,
    <>
      {" "}
      {"  "}
      <span className="hero-code-f">name</span>: <span className="hero-code-s">"Iza"</span>,
    </>,
    <>
      {"  "}
      <span className="hero-code-f">stack</span>: <span className="hero-code-s">["Nest", "Laravel", "Next"]</span>,
    </>,
    <>
      {"  "}
      <span className="hero-code-f">render</span>(): <span className="hero-code-n">{"->"}</span>{" "}
      <span className="hero-code-w">canvas</span>,
    </>,
    <>
      <span className="hero-code-k">function</span> <span className="hero-code-f">animate</span>(){" "}
      <span className="hero-code-n">{"{"}</span>
    </>,
    <>
      {"  "}
      <span className="hero-code-c">lines</span>.forEach(<span className="hero-code-p">(l)</span> <span className="hero-code-w">=&gt;</span> l.tick()),
    </>,
    <>
      {"  "}
      <span className="hero-code-c">particles</span>.emit()
    </>,
    <>
      {"  "}
      <span className="hero-code-f">requestAnimationFrame</span>(<span className="hero-code-c">animate</span>)
    </>,
    <>
      <span className="hero-code-n">{"}"}</span>
    </>,
    <>
      <span className="hero-code-n">{"}"}</span>
    </>,
  ]

  return (
    <div aria-hidden className="hero-code-backdrop pointer-events-none absolute inset-0 overflow-hidden z-0">
      <div className="hero-code-radial" />
      <div className="hero-code-grid" />

      <div className="hero-code-panel">
        <div className="hero-code-panel-inner">
          <div className="hero-code-scroll">
            {[0, 1].map((copy) => (
              <React.Fragment key={copy}>
                {lines.map((line, idx) => (
                  <CodeLine key={`${copy}-${idx}`}>{line}</CodeLine>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="hero-code-panel-sheen" />
      </div>

      <svg
        className="hero-code-lines"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <path
          d="M40 520 C 220 420, 320 520, 500 420 S 820 300, 1160 220"
          className="hero-code-line-path"
        />
        <path
          d="M60 460 C 240 360, 360 460, 540 360 S 860 260, 1140 180"
          className="hero-code-line-path hero-code-line-path--2"
        />
        <path
          d="M110 420 C 320 320, 390 420, 600 320 S 900 220, 1120 140"
          className="hero-code-line-path hero-code-line-path--3"
        />
      </svg>

      <div className="hero-code-scanlines" />

      <style>{`
        .hero-code-backdrop { opacity: 1; }
        .hero-code-radial {
          position: absolute;
          inset: -30% -20%;
          background:
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.22), transparent 55%),
            radial-gradient(circle at 70% 40%, rgba(16, 185, 129, 0.16), transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.10), transparent 55%);
          filter: blur(14px);
          transform: translate3d(0,0,0);
        }
        .hero-code-grid {
          position: absolute;
          inset: -20% -10%;
          background-image:
            linear-gradient(to right, rgba(148, 163, 184, 0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.35;
          transform: translate3d(0,0,0);
          mask-image: radial-gradient(circle at 50% 40%, rgba(0,0,0,1), transparent 65%);
        }
        .hero-code-panel {
          position: absolute;
          right: 4%;
          top: 18%;
          width: min(520px, 55vw);
          height: 260px;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          background: rgba(2, 6, 23, 0.40);
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(99, 102, 241, 0.10) inset,
            0 20px 60px rgba(0, 0, 0, 0.35);
        }
        .hero-code-panel-inner {
          position: absolute;
          inset: 0;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
        }
        .hero-code-scroll {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 12px;
          line-height: 22px;
          color: rgba(226, 232, 240, 0.75);
          letter-spacing: 0.02em;
          white-space: pre;
          will-change: transform;
          animation: heroCodeScroll 14s linear infinite;
        }
        .hero-code-panel-sheen {
          position: absolute;
          inset: -40% -10%;
          background: linear-gradient(120deg, transparent, rgba(99, 102, 241, 0.18), transparent);
          transform: rotate(10deg) translateX(-30%);
          animation: heroCodeSheen 6.5s ease-in-out infinite;
          opacity: 0.8;
          pointer-events: none;
        }

        .hero-code-panel-sheen { pointer-events: none; }

        @keyframes heroCodeScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @keyframes heroCodeSheen {
          0% { transform: rotate(10deg) translateX(-45%); opacity: 0.0; }
          20% { opacity: 0.7; }
          50% { opacity: 0.85; }
          100% { transform: rotate(10deg) translateX(45%); opacity: 0.0; }
        }

        .hero-code-line { opacity: 0.92; }
        .hero-code-k { color: rgba(129, 140, 248, 0.92); }
        .hero-code-f { color: rgba(56, 189, 248, 0.92); }
        .hero-code-v { color: rgba(74, 222, 128, 0.92); }
        .hero-code-s { color: rgba(251, 191, 36, 0.88); }
        .hero-code-n { color: rgba(226, 232, 240, 0.75); }
        .hero-code-w { color: rgba(226, 232, 240, 0.82); }
        .hero-code-p { color: rgba(167, 139, 250, 0.95); }
        .hero-code-c { color: rgba(52, 211, 153, 0.95); }

        .hero-code-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.55;
          pointer-events: none;
          filter: drop-shadow(0 10px 20px rgba(99, 102, 241, 0.10));
        }

        .hero-code-line-path {
          fill: none;
          stroke: rgba(99, 102, 241, 0.65);
          stroke-width: 2;
          stroke-dasharray: 10 10;
          stroke-linecap: round;
          animation: heroDash 2.8s linear infinite;
          opacity: 0.9;
        }
        .hero-code-line-path--2 { stroke: rgba(56, 189, 248, 0.55); animation-duration: 3.6s; opacity: 0.75; }
        .hero-code-line-path--3 { stroke: rgba(74, 222, 128, 0.45); animation-duration: 4.2s; opacity: 0.70; }

        @keyframes heroDash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -200; }
        }

        .hero-code-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.06) 1px,
            transparent 1px,
            transparent 6px
          );
          opacity: 0.10;
          mix-blend-mode: overlay;
          mask-image: radial-gradient(circle at 50% 35%, rgba(0,0,0,1), transparent 70%);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-code-scroll { animation: none !important; }
          .hero-code-panel-sheen { animation: none !important; }
          .hero-code-line-path { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

