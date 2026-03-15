'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { motionValue, useSpring, type MotionValue } from 'motion/react'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'
import { useControls } from 'leva'

const SPRING = { stiffness: 200, damping: 25, mass: 1 }
const LINES = ['Software', 'Developer'] as const

interface CharSpringProps {
  target: MotionValue<number>
  values: MutableRefObject<number[][]>
  li: number
  ci: number
}

function CharSpring(props: CharSpringProps) {
  const { target, values, li, ci } = props
  const spring = useSpring(target, SPRING)

  useEffect(() => {
    return spring.on('change', (v) => {
      values.current[li][ci] = v
    })
  }, [spring, li, ci, values])

  return null
}

interface HeroSceneTextMeshProps {
  fontSize?: number
  lineHeight?: number
  opacity?: number
  mouseRadius?: number
  weightMin?: number
  weightMax?: number
}

function HeroSceneTextMesh(props: HeroSceneTextMeshProps) {
  const { size } = useThree()
  const { width: vpWidth, height: vpHeight } = useThree((state) =>
    state.viewport.getCurrentViewport(
      state.camera,
      new THREE.Vector3(0, 0, -0.5),
    ),
  )

  const { fontSize, lineHeight, opacity, mouseRadius, weightMin, weightMax } =
    useControls('Text', {
      fontSize: {
        value: props.fontSize || 0.18,
        min: 0.05,
        max: 0.3,
        step: 0.01,
      },
      lineHeight: {
        value: props.lineHeight || 0.82,
        min: 0.5,
        max: 1.5,
        step: 0.05,
      },
      opacity: {
        value: props.opacity || 0.12,
        min: 0,
        max: 1,
        step: 0.01,
      },
      mouseRadius: {
        value: props.mouseRadius || 0.36,
        min: 0.05,
        max: 1,
        step: 0.05,
      },
      weightMin: {
        value: props.weightMin || 400,
        min: 100,
        max: 900,
        step: 100,
      },
      weightMax: {
        value: props.weightMax || 900,
        min: 100,
        max: 900,
        step: 100,
      },
    })

  // Refs for leva values consumed in event handlers — synced in useEffect
  const mouseRadiusRef = useRef(mouseRadius)
  const weightMinRef = useRef(weightMin)
  const weightMaxRef = useRef(weightMax)

  useEffect(() => {
    mouseRadiusRef.current = mouseRadius
    weightMinRef.current = weightMin
    weightMaxRef.current = weightMax
  }, [mouseRadius, weightMin, weightMax])

  const springValues = useRef<number[][]>(
    LINES.map((l) => Array.from({ length: l.length }, () => weightMin)),
  )

  const targets = useMemo(
    () =>
      LINES.map((l) =>
        Array.from({ length: l.length }, () => motionValue(weightMin)),
      ),
    [weightMin],
  )

  const charCenters = useRef<[number, number][][]>(
    LINES.map((l) =>
      Array.from({ length: l.length }, (): [number, number] => [0, 0]),
    ),
  )

  const fontReady = useRef(false)

  // canvas and texture are stable per viewport size — recreated only on resize
  const { canvas, texture } = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = size.width
    canvas.height = size.height
    return { canvas, texture: new THREE.CanvasTexture(canvas) }
  }, [size.width, size.height])

  // textureRef is populated in useEffect so useFrame can mutate .needsUpdate
  // without touching the hook return value directly (react-hooks/immutability)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)

  // Material ref lets us swap the map imperatively when texture changes on resize,
  // avoiding useState (which would call setState in an effect)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)

  useEffect(() => {
    textureRef.current = texture
    const mat = materialRef.current
    if (!mat) return
    mat.map = texture
    mat.needsUpdate = true
  }, [texture])

  useEffect(() => {
    void document.fonts.ready.then(() => {
      fontReady.current = true
    })
  }, [])

  const mousePosRef = useRef<{ x: number; y: number } | null>(null)

  const applyWeights = useRef((x: number, y: number) => {
    const radius = window.innerWidth * mouseRadiusRef.current
    const wMin = weightMinRef.current
    const wMax = weightMaxRef.current
    LINES.forEach((line, li) => {
      ;[...line].forEach((_, ci) => {
        const [cx, cy] = charCenters.current[li][ci]
        const dist = Math.hypot(x - cx, y - cy)
        const t = Math.max(0, 1 - dist / radius)
        targets[li][ci].set(wMin + (wMax - wMin) * t * t)
      })
    })
  })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      applyWeights.current(e.clientX, e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [targets])

  // Re-apply weights with last known mouse position when knobs change
  useEffect(() => {
    const pos = mousePosRef.current
    if (!pos) return
    applyWeights.current(pos.x, pos.y)
  }, [mouseRadius, weightMin, weightMax])

  useFrame(() => {
    if (!fontReady.current || !textureRef.current) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const fontPx = W * fontSize

    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = `rgba(255,255,255,${opacity})`
    ctx.textBaseline = 'middle'

    const linePx = fontPx * lineHeight
    const blockHeight = LINES.length * linePx
    const startY = (H - blockHeight) / 2 + linePx / 2

    LINES.forEach((line, li) => {
      const chars = [...line]
      const y = startY + li * linePx

      const charWidths = chars.map((char, ci) => {
        ctx.font = `${Math.round(springValues.current[li][ci])} ${fontPx}px Figtree`
        return ctx.measureText(char).width
      })

      const lineWidth = charWidths.reduce((a, b) => a + b, 0)
      let x = (W - lineWidth) / 2

      chars.forEach((char, ci) => {
        ctx.font = `${Math.round(springValues.current[li][ci])} ${fontPx}px Figtree`
        ctx.fillText(char, x, y)
        charCenters.current[li][ci] = [x + charWidths[ci] / 2, y]
        x += charWidths[ci]
      })
    })

    textureRef.current.needsUpdate = true
  })

  return (
    <>
      {LINES.map((line, li) =>
        [...line].map((_, ci) => (
          <CharSpring
            key={`${li}-${ci}`}
            target={targets[li][ci]}
            values={springValues}
            li={li}
            ci={ci}
          />
        )),
      )}
      <mesh
        position={[0, 0.5, -0.5]}
        renderOrder={0}
      >
        <planeGeometry args={[vpWidth, vpHeight]} />
        <meshBasicMaterial
          ref={materialRef}
          map={texture}
          transparent
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

export { HeroSceneTextMesh }
