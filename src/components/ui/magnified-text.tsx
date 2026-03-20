'use client'
import { useRef, useState, useEffect, useMemo } from 'react'
import {
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import useBreakpoint from '~/hooks/use-breakpoint'

const FONT_SIZE = 200

type MagnifiedTextFeature = 'blur' | 'opacity'

const magnifiedTextStyles = createStyles({
  slots: {
    root: 'w-full overflow-hidden select-none',
    svg: 'block w-full',
    text: 'fill-current font-display text-[200px]',
  },
})

interface MagnifiedCharProps {
  char: string
  index: number
  textRef: React.RefObject<SVGTextElement | null>
  mousePos: MotionValue<{ x: number; y: number } | null>
  minWeight: number
  maxWeight: number
  idleWeight: number
  strength: number
  stiffness: number
  damping: number
  origin: 'pointer' | 'relative'
  features: MagnifiedTextFeature[]
  blurStrength: number
  minOpacity: number
}

function MagnifiedChar({
  char,
  index,
  textRef,
  mousePos,
  minWeight,
  maxWeight,
  idleWeight,
  strength,
  stiffness,
  damping,
  origin,
  features,
  blurStrength,
  minOpacity,
}: MagnifiedCharProps) {
  const spanRef = useRef<SVGTSpanElement>(null)
  const weight = useMotionValue(idleWeight)
  const smoothWeight = useSpring(weight, { stiffness, damping })

  useMotionValueEvent(smoothWeight, 'change', (w) => {
    const el = spanRef.current
    if (!el) return
    el.style.fontVariationSettings = `'wght' ${Math.round(w)}`
    // Derive normalised proximity [0–1] from the already-spring-smoothed weight
    // so blur and opacity inherit the same easing for free.
    const t =
      maxWeight === minWeight ? 1 : (w - minWeight) / (maxWeight - minWeight)
    if (features.includes('blur')) {
      el.style.filter = `blur(${((1 - t) * blurStrength).toFixed(2)}px)`
    }
    if (features.includes('opacity')) {
      el.style.opacity = (minOpacity + t * (1 - minOpacity)).toFixed(3)
    }
  })

  useMotionValueEvent(mousePos, 'change', (pos) => {
    const text = textRef.current
    if (!text || !pos) {
      weight.set(idleWeight)
      return
    }
    const charExt = text.getExtentOfChar(index)
    const cx = charExt.x + charExt.width / 2
    const cy = charExt.y + charExt.height / 2
    const dist =
      origin === 'relative'
        ? Math.abs(cx - pos.x)
        : Math.hypot(cx - pos.x, cy - pos.y)
    const t = Math.max(0, 1 - dist / text.getComputedTextLength())
    weight.set(minWeight + Math.pow(t, 1 / strength) * (maxWeight - minWeight))
  })

  return (
    <tspan
      ref={spanRef}
      style={{ fontVariationSettings: `'wght' ${idleWeight}` }}
    >
      {char}
    </tspan>
  )
}

type MagnifiedTextBaseProps = StylesProps<typeof magnifiedTextStyles> & {
  /** Text content to render. Each character is individually weighted. */
  children: string
  className?: string
  /**
   * Minimum font weight applied to characters at maximum distance from the cursor.
   * Maps to the lower bound of the font's `wght` axis (typically 100).
   * @default 100
   */
  minWeight?: number
  /**
   * Maximum font weight applied to characters directly under the cursor.
   * Maps to the upper bound of the font's `wght` axis (typically 1000).
   * @default 1000
   */
  maxWeight?: number
  /**
   * Distribution curve exponent — shapes how weight falls off with distance.
   * - `< 1` — weight concentrates tightly around the cursor; sharp drop-off.
   * - `= 1` — perfectly linear distribution across the text width.
   * - `> 1` — weight spreads broadly; gradual, plateau-like falloff.
   * @default 0.5
   */
  strength?: number
  /**
   * Spring stiffness — controls responsiveness of individual characters to
   * cursor movement. Higher values snap more immediately; lower values feel
   * floaty and delayed.
   * @default 80
   */
  stiffness?: number
  /**
   * Spring damping — controls how much the weight overshoots before settling.
   * Lower values allow more oscillation; higher values make it settle firmly
   * without bounce.
   * @default 20
   */
  damping?: number
  /**
   * Visual effects applied to each character based on proximity to the cursor.
   * Multiple features can be combined.
   * - `'blur'` — characters at maximum distance receive a CSS blur filter.
   * - `'opacity'` — characters at maximum distance fade toward `minOpacity`.
   * @default []
   */
  features?: MagnifiedTextFeature[]
  /**
   * Maximum blur radius (px) applied to characters at maximum distance.
   * Only relevant when `'blur'` is included in `features`.
   * @default 8
   */
  blurStrength?: number
  /**
   * Minimum opacity applied to characters at maximum distance.
   * Only relevant when `'opacity'` is included in `features`.
   * @default 0.2
   */
  minOpacity?: number
}

type MagnifiedTextConstrainedProps = MagnifiedTextBaseProps & {
  /**
   * Tracks cursor only while hovering over the component.
   * @default 'constrained'
   */
  mode?: 'constrained'
  /**
   * Resting font weight when the cursor leaves the component.
   * - `'max'` — full weight; text appears bold at rest.
   * - `'min'` — thin weight; text appears light at rest.
   * @default 'max'
   */
  idle?: 'min' | 'max'
}

type MagnifiedTextTrackedProps = MagnifiedTextBaseProps & {
  /** Attaches the listener to `window` so magnification is always active. */
  mode: 'tracked'
  /**
   * Distance origin used to compute per-character weight.
   * - `'pointer'` — full 2D distance; vertical cursor position matters.
   * - `'relative'` — horizontal distance only; Y axis is ignored so
   *   magnification stays consistent regardless of vertical cursor position.
   * @default 'pointer'
   */
  origin?: 'pointer' | 'relative'
}

/** Union of all valid prop combinations. */
type MagnifiedTextProps =
  | MagnifiedTextConstrainedProps
  | MagnifiedTextTrackedProps

/**
 * Renders a line of variable-font text where each character's weight is driven
 * by its distance from the cursor. Characters closest to the cursor receive
 * `maxWeight`; those furthest away fall to `minWeight`. The falloff curve,
 * spring physics, tracking mode, and resting state are all configurable.
 *
 * @example
 * // Basic usage — bold at rest, thins out near cursor
 * <MagnifiedText>Hello world</MagnifiedText>
 *
 * @example
 * // Thin at rest, boldens as cursor approaches; always tracks window
 * <MagnifiedText mode="tracked" origin="relative" strength={1}>
 *   Get in touch
 * </MagnifiedText>
 */
function MagnifiedText(props: MagnifiedTextProps) {
  const {
    children,
    className,
    minWeight = 100,
    maxWeight = 1000,
    strength = 0.5,
    stiffness = 80,
    damping = 20,
    features = [],
    blurStrength = 8,
    minOpacity = 0.2,
  } = props

  const isMd = useBreakpoint('md')

  const mode = props.mode ?? 'constrained'
  const idle = props.mode !== 'tracked' ? (props.idle ?? 'max') : 'max'
  const origin =
    props.mode === 'tracked' ? (props.origin ?? 'pointer') : 'pointer'
  const idleWeight = idle === 'max' ? maxWeight : minWeight

  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<SVGTextElement>(null)
  const mousePos = useMotionValue<{ x: number; y: number } | null>(null)

  // Start at null on both server and client — avoids hydration mismatch from
  // DOM measurement (unavailable on server) returning a different value.
  // The SVG stays hidden until the first effect measurement resolves.
  const [viewBox, setViewBox] = useState<{
    y: number
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      const text = textRef.current
      if (!text) return
      const width = text.getComputedTextLength()
      const { y, height } = text.getBBox()
      if (width > 0) setViewBox({ y, width, height })
    })
  }, [children])

  const toSvgCoords = (clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return
    const pt = svg.createSVGPoint()
    pt.x = clientX
    pt.y = clientY
    const { x, y } = pt.matrixTransform(svg.getScreenCTM()!.inverse())
    mousePos.set({ x, y })
  }

  useEffect(() => {
    if (mode !== 'tracked') return
    const handler = (e: MouseEvent) => {
      const svg = svgRef.current
      if (!svg) return
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const { x, y } = pt.matrixTransform(svg.getScreenCTM()!.inverse())
      mousePos.set({ x, y })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mode, mousePos])

  const chars = useMemo(() => [...children], [children])
  const styles = magnifiedTextStyles()

  return (
    <div className={styles.root({ className })}>
      <svg
        ref={svgRef}
        viewBox={
          viewBox
            ? `0 ${viewBox.y} ${viewBox.width} ${viewBox.height}`
            : undefined
        }
        width="100%"
        preserveAspectRatio="xMinYMid meet"
        aria-label={children}
        className={styles.svg()}
        onMouseMove={
          mode === 'tracked'
            ? undefined
            : (e) => toSvgCoords(e.clientX, e.clientY)
        }
        onMouseLeave={mode === 'tracked' ? undefined : () => mousePos.set(null)}
      >
        <text
          ref={textRef}
          x={0}
          y={FONT_SIZE}
          textLength={viewBox?.width}
          lengthAdjust="spacing"
          className={styles.text()}
        >
          {chars.map((char, i) => (
            <MagnifiedChar
              key={i}
              char={char}
              index={i}
              textRef={textRef}
              mousePos={mousePos}
              // Disable magnification on smaller screens by clamping min and
              // max weight
              minWeight={isMd ? minWeight : maxWeight}
              maxWeight={maxWeight}
              idleWeight={idleWeight}
              strength={strength}
              stiffness={stiffness}
              damping={damping}
              origin={origin}
              features={features}
              blurStrength={blurStrength}
              minOpacity={minOpacity}
            />
          ))}
        </text>
      </svg>
    </div>
  )
}

export { MagnifiedText, magnifiedTextStyles, type MagnifiedTextProps }
