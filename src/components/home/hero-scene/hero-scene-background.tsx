'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import { useControls } from 'leva'

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uAspect;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uThreshold;
  uniform float uComplexity;
  uniform float uLineSoftness;
  uniform vec3  uLineColor;
  varying vec2 vUv;

  // Gradient (Perlin-style) noise
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }
  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = (vUv - 0.5) * vec2(uAspect, 1.0);

    vec2 freq = uv * uScale;

    // Domain warp — displaces sampling coords with a second noise field
    // uComplexity=0: smooth round blobs; higher: irregular organic shapes
    vec2 warp = vec2(
      gnoise(freq * 1.7 + vec2(1.7, 9.2) + uTime * uSpeed * 0.5),
      gnoise(freq * 1.7 + vec2(8.3, 2.8) + uTime * uSpeed * 0.5)
    ) * uComplexity;

    vec2 p = freq + warp;
    float n = gnoise(p       + vec2( uTime * uSpeed,        uTime * uSpeed * 0.71))
            + gnoise(p * 2.0 - vec2( uTime * uSpeed * 0.53, uTime * uSpeed * 0.89)) * 0.5;
    n /= 1.5;

    float d  = abs(n - uThreshold);
    float fw = fwidth(n) * uLineSoftness;
    float line = 1.0 - smoothstep(0.0, fw, d);
    gl_FragColor = vec4(uLineColor, line);
  }
`

function resolveCssColor(cssValue: string): THREE.Color {
  const el = document.createElement('canvas')
  el.width = el.height = 1
  const ctx = el.getContext('2d')!
  ctx.fillStyle = cssValue.trim()
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return new THREE.Color(r / 255, g / 255, b / 255)
}

function readLineColor() {
  const s = getComputedStyle(document.documentElement)
  return resolveCssColor(s.getPropertyValue('--background-color-highlight'))
}

// Module-level — single HeroSceneBackground instance so this is safe
const BG_UNIFORMS = {
  uTime: { value: 0 },
  uAspect: { value: 1 },
  uSpeed: { value: 0.08 },
  uScale: { value: 1.8 },
  uThreshold: { value: 0.2 },
  uComplexity: { value: 0.3 },
  uLineSoftness: { value: 1 },
  uLineColor: { value: new THREE.Color(0.96, 0.96, 0.96) },
}

interface HeroSceneBackgroundProps {
  speed?: number
  scale?: number
  threshold?: number
  complexity?: number
  lineSoftness?: number
}

function HeroSceneBackground(props: HeroSceneBackgroundProps) {
  const {
    speed: speedProp = 0.04,
    scale: scaleProp = 1.72,
    threshold: thresholdProp = 0.06,
    complexity: complexityProp = 0.02,
    lineSoftness: lineSoftnessProp = 0.5,
  } = props

  const { speed, scale, threshold, complexity, lineSoftness } = useControls(
    'Background',
    {
      speed: { value: speedProp, min: 0, max: 1, step: 0.01 },
      scale: { value: scaleProp, min: 0.5, max: 6, step: 0.1 },
      threshold: { value: thresholdProp, min: -1, max: 1, step: 0.01 },
      complexity: { value: complexityProp, min: 0, max: 1, step: 0.01 },
      lineSoftness: { value: lineSoftnessProp, min: 0.5, max: 4, step: 0.1 },
    },
  )

  const { resolvedTheme } = useTheme()

  const { width, height } = useThree((state) =>
    state.viewport.getCurrentViewport(
      state.camera,
      new THREE.Vector3(0, 0, -2),
    ),
  )

  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const prevThemeRef = useRef<string | undefined>(undefined)
  const lineTarget = useRef(new THREE.Color(0.96, 0.96, 0.96))

  useFrame((state, delta) => {
    if (!materialRef.current) return
    const u = materialRef.current.uniforms
    const dt = Math.min(delta, 0.05)
    const f = 1 - Math.exp(-dt / 0.4)

    u.uSpeed.value = speed
    u.uScale.value = scale
    u.uThreshold.value = threshold
    u.uComplexity.value = complexity
    u.uLineSoftness.value = lineSoftness

    if (resolvedTheme !== prevThemeRef.current) {
      prevThemeRef.current = resolvedTheme
      lineTarget.current.copy(readLineColor())
    }

    u.uTime.value += dt
    u.uAspect.value = state.size.width / state.size.height
    u.uLineColor.value.lerp(lineTarget.current, f)
  })

  return (
    <mesh
      renderOrder={-1}
      position={[0, 0, -2]}
      scale={[width, height, 1]}
    >
      <planeGeometry />
      <shaderMaterial
        ref={materialRef}
        uniforms={BG_UNIFORMS}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export { HeroSceneBackground, type HeroSceneBackgroundProps }
