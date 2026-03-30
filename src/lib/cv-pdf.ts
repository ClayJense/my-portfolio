/**
 * Génère un PDF à partir du nœud DOM du CV uniquement.
 * html2canvas ne supporte pas lab()/oklch() : on clone le CV, on copie les styles
 * calculés en inline (navigateur → souvent rgb/hex), puis on retire les classes.
 */

const STYLE_PROPS: readonly string[] = [
  "color",
  "backgroundColor",
  "backgroundSize",
  "backgroundPosition",
  "backgroundRepeat",
  "backgroundClip",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "borderTopStyle",
  "borderRightStyle",
  "borderBottomStyle",
  "borderLeftStyle",
  "borderRadius",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "lineHeight",
  "letterSpacing",
  "textAlign",
  "textDecoration",
  "textTransform",
  "display",
  "flexDirection",
  "flexWrap",
  "justifyContent",
  "alignItems",
  "alignSelf",
  "gap",
  "flex",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "width",
  "height",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "opacity",
  "overflow",
  "overflowX",
  "overflowY",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "objectFit",
  "objectPosition",
  "verticalAlign",
  "whiteSpace",
  "wordBreak",
]

function containsUnsupportedColor(cssValue: string): boolean {
  // html2canvas 1.4.x ne parse pas les couleurs modernes (dont oklab dans les dégradés)
  return /\b(oklab|oklch|lab|lch|color-mix)\(/i.test(cssValue)
}

function copyComputedStylesToInline(orig: HTMLElement, clone: HTMLElement): void {
  const s = getComputedStyle(orig)
  const isCvSidebar = orig.classList.contains("cv-sidebar")
  const isCvMain = orig.classList.contains("cv-main")
  const isCvRoot = orig.id === "cv-root"

  for (const prop of STYLE_PROPS) {
    if (prop === "backgroundColor" || prop === "color") continue
    const value = s.getPropertyValue(prop).trim()
    if (!value) continue
    if (containsUnsupportedColor(value)) continue
    clone.style.setProperty(prop, value)
  }

  // Couleur de texte : souvent lab()/oklch avec Tailwind — html2canvas échoue sur les SVG (currentColor)
  const colorRaw = s.getPropertyValue("color").trim()
  if (colorRaw && !containsUnsupportedColor(colorRaw)) {
    clone.style.setProperty("color", colorRaw)
  } else {
    clone.style.setProperty("color", isCvSidebar ? "#e4e4e7" : "#262626")
  }

  for (const side of ["top", "right", "bottom", "left"] as const) {
    const kebab = `border-${side}-color`
    const bc = s.getPropertyValue(kebab).trim()
    if (bc && containsUnsupportedColor(bc)) {
      clone.style.setProperty(kebab, isCvSidebar ? "#3f3f46" : "#e5e5e5")
    }
  }

  // Ne jamais copier background-image : Chrome sérialise souvent les dégradés en linear-gradient(oklab(...))
  clone.style.setProperty("background-image", "none")

  const bgcRaw = s.getPropertyValue("background-color").trim()
  const bgcSupported =
    bgcRaw &&
    bgcRaw !== "transparent" &&
    bgcRaw !== "rgba(0, 0, 0, 0)" &&
    !containsUnsupportedColor(bgcRaw)

  if (bgcSupported) {
    clone.style.setProperty("background-color", bgcRaw)
  } else if (isCvSidebar) {
    clone.style.backgroundColor = "#18181b"
  } else if (isCvMain || isCvRoot) {
    clone.style.backgroundColor = "#fafafa"
  } else {
    clone.style.backgroundColor = "transparent"
  }

  const shadow = s.getPropertyValue("box-shadow")
  if (shadow && shadow !== "none") {
    if (containsUnsupportedColor(shadow)) {
      clone.style.boxShadow = "none"
    } else {
      clone.style.setProperty("box-shadow", shadow)
    }
  }

  if (isCvSidebar) {
    clone.setAttribute("data-cv-pdf-sidebar", "")
  }

  clone.removeAttribute("class")
}

/**
 * html2canvas appelle copyCSSStyles(getComputedStyle(), …) sur chaque SVG.
 * Toutes les propriétés parsées comme couleur (bordures, color, etc.) doivent être sûres.
 */
function paintSvgTargetFromComputed(target: SVGElement, inSidebar: boolean, s: CSSStyleDeclaration): void {
  const strokeRaw = s.getPropertyValue("stroke").trim()
  let strokeCss: string
  if (!strokeRaw || strokeRaw === "none") {
    strokeCss = "none"
  } else if (containsUnsupportedColor(strokeRaw)) {
    strokeCss = inSidebar ? "#e4e4e7" : "#52525b"
  } else {
    strokeCss = strokeRaw
  }

  const fillRaw = s.getPropertyValue("fill").trim()
  let fillCss: string
  if (!fillRaw || fillRaw === "none" || fillRaw === "transparent") {
    fillCss = "none"
  } else if (containsUnsupportedColor(fillRaw)) {
    fillCss = inSidebar ? "#fafafa" : "#171717"
  } else {
    fillCss = fillRaw
  }

  const accent =
    strokeCss !== "none" ? strokeCss : fillCss !== "none" ? fillCss : inSidebar ? "#e4e4e7" : "#52525b"

  target.style.cssText = ""
  target.style.setProperty("fill", fillCss)
  target.style.setProperty("stroke", strokeCss)
  target.style.setProperty("color", accent)
  target.style.setProperty("background-color", "transparent")
  target.style.setProperty("background-image", "none")
  target.style.setProperty("border-top-color", "transparent")
  target.style.setProperty("border-right-color", "transparent")
  target.style.setProperty("border-bottom-color", "transparent")
  target.style.setProperty("border-left-color", "transparent")
  target.style.setProperty("box-shadow", "none")
  target.style.setProperty("text-decoration-color", accent)
  target.style.setProperty("text-shadow", "none")
  target.style.setProperty("-webkit-text-stroke-color", "transparent")
  target.style.setProperty("outline-color", "transparent")
  target.style.setProperty("caret-color", "transparent")
  target.style.setProperty("list-style-image", "none")

  const sw = s.getPropertyValue("stroke-width").trim()
  if (sw && sw !== "0px") target.style.setProperty("stroke-width", sw)

  const lc = s.getPropertyValue("stroke-linecap").trim()
  if (lc) target.style.setProperty("stroke-linecap", lc)

  const lj = s.getPropertyValue("stroke-linejoin").trim()
  if (lj) target.style.setProperty("stroke-linejoin", lj)

  target.setAttribute("stroke", strokeCss)
  target.setAttribute("fill", fillCss)
  if (sw && sw !== "0px") target.setAttribute("stroke-width", sw)
}

function sanitizeSvgElement(orig: SVGElement, clone: SVGElement): void {
  clone.removeAttribute("class")
  const inSidebar = !!orig.closest(".cv-sidebar")
  paintSvgTargetFromComputed(clone, inSidebar, getComputedStyle(orig))
}

const SVG_NS = "http://www.w3.org/2000/svg"

function sanitizeAllSvgInDocument(doc: Document): void {
  const win = doc.defaultView
  if (!win) return
  doc.querySelectorAll("svg, svg *").forEach((node) => {
    if (!(node instanceof Element) || node.namespaceURI !== SVG_NS) return
    const svgEl = node as SVGElement
    const inSidebar = !!svgEl.closest("[data-cv-pdf-sidebar]")
    paintSvgTargetFromComputed(svgEl, inSidebar, win.getComputedStyle(svgEl))
  })
}

function flattenTree(orig: Element, clone: Element): void {
  if (orig instanceof HTMLElement && clone instanceof HTMLElement) {
    copyComputedStylesToInline(orig, clone)
  } else if (orig instanceof SVGElement && clone instanceof SVGElement) {
    sanitizeSvgElement(orig, clone)
  }

  const oChildren = orig.children
  const cChildren = clone.children
  const n = Math.min(oChildren.length, cChildren.length)
  for (let i = 0; i < n; i++) {
    flattenTree(oChildren[i], cChildren[i])
  }
}

export async function downloadCvAsPdf(
  element: HTMLElement,
  fileName = "CV-Izayid-Ali.pdf"
): Promise<void> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ])

  const host = document.createElement("div")
  host.setAttribute(
    "style",
    "position:fixed;left:-10000px;top:0;width:auto;height:auto;overflow:visible;pointer-events:none;background:#ffffff;"
  )
  document.body.appendChild(host)

  const clone = element.cloneNode(true) as HTMLElement
  clone.removeAttribute("id")
  host.appendChild(clone)

  const rect = element.getBoundingClientRect()
  clone.style.width = `${rect.width}px`
  clone.style.boxSizing = "border-box"

  flattenTree(element, clone)

  /** Sécurité : aucun dégradé résiduel (html2canvas → oklab dans linear-gradient). */
  const stripBgImages = (el: HTMLElement) => {
    el.style.setProperty("background-image", "none")
    for (const child of el.children) {
      if (child instanceof HTMLElement) stripBgImages(child)
    }
  }
  stripBgImages(clone)

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      width: clone.scrollWidth,
      height: clone.scrollHeight,
      /**
       * html2canvas re-parse les <link>/<style> du document cloné (Tailwind = oklch/lab).
       * On les enlève : le clone a déjà des styles inline via flattenTree.
       */
      onclone: (clonedDoc) => {
        clonedDoc.querySelectorAll('link[rel="stylesheet"]').forEach((n) => n.remove())
        clonedDoc.querySelectorAll("style").forEach((n) => n.remove())
        // html2canvas clone tout le document : navbar etc. ont encore lab() après copyCSSStyles
        sanitizeAllSvgInDocument(clonedDoc)
      },
    })

    const imgData = canvas.toDataURL("image/png", 1.0)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    })

    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()
    const imgW = pageW
    const imgH = (canvas.height * imgW) / canvas.width

    let y = 0
    while (y < imgH) {
      if (y > 0) pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, -y, imgW, imgH)
      y += pageH
    }

    pdf.save(fileName)
  } finally {
    host.remove()
  }
}
