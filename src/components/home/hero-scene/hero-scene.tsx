'use client'
import { useRef, useEffect, useCallback } from 'react'
import { clsx } from 'clsx'
import { HeroSceneBackground } from '~/components/home/hero-scene/hero-scene-background'
import { HeroSceneModel } from '~/components/home/hero-scene/hero-scene-model'
import { HeroSceneText } from '~/components/home/hero-scene/hero-scene-text'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'

interface HeroSceneProps {
  className?: string
}

function HeroScene(props: HeroSceneProps) {
  const { className } = props

  const glassOverlayRef = useRef<HTMLDivElement>(null)
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)

  useEffect(() => {
    const el = glassOverlayRef.current
    if (!el) return
    // SVG filter references in backdrop-filter are not supported in Chrome yet —
    // fall back to a frosted-glass blur so the effect is still visible.
    const filter = CSS.supports('backdrop-filter', 'url(#a)')
      ? 'url(#glass-distortion)'
      : 'blur(18px) brightness(1.08) saturate(1.6)'
    el.style.backdropFilter = filter
    ;(
      el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }
    ).webkitBackdropFilter = filter
  }, [])

  const updateOverlay = useCallback((clipPath: string) => {
    if (glassOverlayRef.current)
      glassOverlayRef.current.style.clipPath = clipPath
  }, [])

  const updateTurbulence = useCallback((baseFrequency: string) => {
    if (turbulenceRef.current)
      turbulenceRef.current.setAttribute('baseFrequency', baseFrequency)
  }, [])

  return (
    <div
      className={clsx('bg-main', className)}
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* SVG filter referenced by the glass overlay via backdrop-filter */}
      <svg
        aria-hidden
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
        }}
      >
        <defs>
          <filter
            id="glass-distortion"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.012 0.015"
              numOctaves="2"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* WebGL canvas — alpha: true so the HTML text shows through transparent areas */}
      <Canvas
        dpr={1}
        flat
        gl={{ antialias: true, alpha: true, stencil: false }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        {/* HTML variable-font text rendered via drei Html — sits below the WebGL canvas (zIndexRange: 0) */}
        <Html
          fullscreen
          zIndexRange={[0, 0]}
        >
          <HeroSceneText />
        </Html>
        <HeroSceneBackground />
        <HeroSceneModel
          updateOverlay={updateOverlay}
          updateTurbulence={updateTurbulence}
        />
      </Canvas>

      {/* Glass distortion overlay — backdrop-filter distorts HTML text + WebGL through transparent canvas */}
      <div
        ref={glassOverlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          clipPath: 'inset(50%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export { HeroScene, type HeroSceneProps }
