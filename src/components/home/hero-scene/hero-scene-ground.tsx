'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef, useMemo, useEffect } from 'react'
import { type MotionValue } from 'motion/react'
import * as THREE from 'three'

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform float uSpeed;

  varying vec3 vWorldPos;

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

  // FBM — 5 octaves for smooth organic sea-surface detail
  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    // slight rotation per octave breaks grid alignment
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      value += amp * gnoise(p);
      p = rot * p * 2.1 + vec2(1.7, 9.2);
      amp *= 0.45;
    }
    return value;
  }

  void main() {
    vec3 pos = position;

    // Waves roll primarily in the -Z direction (toward viewer).
    // X bias is reduced so crests run roughly left-right like ocean swells.
    vec2 coord = vec2(pos.x * 0.25, pos.z) * uFrequency + vec2(0.0, -uTime * uSpeed);
    float n = fbm(coord);
    pos.y += n * uAmplitude;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uFadeDistance;
  uniform float uFadeStrength;

  varying vec3 vWorldPos;

  void main() {
    float dist = length(vWorldPos.xz);
    float fade = 1.0 - smoothstep(uFadeDistance * (1.0 - uFadeStrength * 0.1), uFadeDistance, dist);
    if (fade <= 0.0) discard;
    gl_FragColor = vec4(uColor, uOpacity * fade);
  }
`

type CamControls = {
  posX: number
  posY: number
  posZ: number
  zoom: number
  tiltX: number
  tiltY: number
  tiltZ: number
}

interface HeroSceneGroundProps extends React.ComponentProps<'group'> {
  cam: CamControls
  scrollOpacity?: MotionValue<number>
}

function HeroSceneGround(props: HeroSceneGroundProps) {
  const { cam, scrollOpacity, ...restProps } = props

  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const ground = useControls('Ground', {
    posX: { value: 0, min: -50, max: 50, step: 0.5 },
    posY: { value: -7.64, min: -30, max: 10, step: 0.5 },
    posZ: { value: 0, min: -50, max: 50, step: 0.5 },
    cellSize: { value: 2, min: 0.1, max: 10, step: 0.1 },
    xSegs: { value: 120, min: 4, max: 300, step: 4 },
    amplitude: { value: 2.96, min: 0, max: 6, step: 0.05 },
    frequency: { value: 0.22, min: 0.01, max: 4, step: 0.01 },
    speed: { value: 0.12, min: 0, max: 2, step: 0.01 },
    fadeEnd: { value: 1, min: 0, max: 1, step: 0.01 },
    fadeStrength: { value: 1.96, min: 0.1, max: 5, step: 0.1 },
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
  })

  const geometry = useMemo(() => {
    // Cover full viewport width plus depth; add 20% bleed so edges never show gaps
    const size = viewport.width * 1.2
    const half = size / 2
    const rows = Math.round(size / ground.cellSize)
    const verts: number[] = []

    // X-parallel lines only — one row per cellSize step in Z
    for (let r = 0; r <= rows; r++) {
      const z = -half + r * ground.cellSize
      for (let c = 0; c < ground.xSegs; c++) {
        const x1 = -half + (c / ground.xSegs) * size
        const x2 = -half + ((c + 1) / ground.xSegs) * size
        verts.push(x1, 0, z, x2, 0, z)
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(verts), 3),
    )
    return geo
  }, [ground.cellSize, ground.xSegs, viewport.width])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: ground.amplitude },
      uFrequency: { value: ground.frequency },
      uSpeed: { value: ground.speed },
      uColor: { value: new THREE.Color(0.45, 0.44, 0.42) },
      uOpacity: { value: ground.opacity },
      uFadeDistance: { value: ground.fadeEnd },
      uFadeStrength: { value: ground.fadeStrength },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame((state, delta) => {
    const { x: mx, y: my } = mouseRef.current
    const f = 0.04
    const targetX = cam.posX - mx * cam.tiltX
    const targetY = cam.posY + my * cam.tiltY
    const targetZ = cam.posZ + mx * cam.tiltZ
    state.camera.position.x += (targetX - state.camera.position.x) * f
    state.camera.position.y += (targetY - state.camera.position.y) * f
    state.camera.position.z += (targetZ - state.camera.position.z) * f
    state.camera.lookAt(0, 0, 0)
    ;(state.camera as THREE.OrthographicCamera).zoom = cam.zoom
    state.camera.updateProjectionMatrix()
    if (!matRef.current) return
    const u = matRef.current.uniforms
    u.uTime.value += delta
    u.uAmplitude.value = ground.amplitude
    u.uFrequency.value = ground.frequency
    u.uSpeed.value = ground.speed
    u.uOpacity.value = ground.opacity * (scrollOpacity?.get() ?? 1)
    // Derive world-unit fade distance from viewport so it stays consistent at any size
    u.uFadeDistance.value = state.viewport.width * 0.6 * ground.fadeEnd
    u.uFadeStrength.value = ground.fadeStrength
  })

  return (
    <group
      {...restProps}
      position={[ground.posX, ground.posY, ground.posZ]}
    >
      <lineSegments geometry={geometry}>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          transparent
        />
      </lineSegments>
    </group>
  )
}

export { HeroSceneGround, type HeroSceneGroundProps }
