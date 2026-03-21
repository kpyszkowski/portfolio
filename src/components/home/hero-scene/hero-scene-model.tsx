'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { useControls } from 'leva'
import type { Group } from 'three'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { type MotionValue } from 'motion/react'
import { useTheme } from 'next-themes'
import { type SceneParams } from '~/components/home/hero-scene/hero-scene-tier'

const TRANSMISSION_LIGHT_COLOR = '#f4dfd9'
const TRANSMISSION_DARK_COLOR = '#be8b57'
const PHYSICAL_LIGHT_COLOR = '#fde4dc'
const PHYSICAL_DARK_COLOR = '#2a1208'
const SIGN_PATH =
  'M13.1 0S9.9 0 6.7 1.2c-1.6.6-3.3 1.6-4.6 3C.9 5.7 0 7.8 0 10.3c0 3.8 2.3 6.3 4.4 7.6 2.1 1.3 4.2 1.7 4.2 1.7a1.4 1.4 0 0 0 1.6-1.2 1.4 1.4 0 0 0-1.2-1.6s-1.6-.3-3.2-1.3c-1.6-1-3-2.4-3-5.2 0-1.9.6-3.2 1.5-4.2.9-1 2.1-1.7 3.5-2.3a15.5 15.5 0 0 1 3.9-.9v11.8a1.4 1.4 0 0 0 2.4 1l13.7-13.3a1.4 1.4 0 0 0 0-2A1.4 1.4 0 0 0 25.8.4L14.5 11.4V1.4A1.4 1.4 0 0 0 13.1 0m4.7 14.6a1.4 1.4 0 0 0-1 .4l-4.9 4.5a1.4 1.4 0 0 0-.5 1v10.1A1.4 1.4 0 0 0 12.8 32a1.4 1.4 0 0 0 1.4-1.4v-9.5l3.4-3.1 8.2 9a1.4 1.4 0 0 0 2 .1 1.4 1.4 0 0 0 .1-2l-9.2-10a1.4 1.4 0 0 0-1-.5M5.2 22.1c-1.1 0-2.1.5-2.7 1.2-.6.7-.9 1.6-.9 2.4s.3 1.7.9 2.4c.6.7 1.6 1.2 2.7 1.2 1.1 0 2.1-.5 2.7-1.2.6-.7.9-1.6.9-2.4 0-.9-.3-1.7-.9-2.4-.6-.7-1.6-1.2-2.7-1.2m0 2.8c.4 0 .5.1.6.2.1.1.2.3.2.5 0 .2-.1.4-.2.5-.1.1-.2.2-.6.2-.4 0-.5-.1-.6-.2a.9.9 0 0 1-.2-.5c0-.2.1-.4.2-.5.1-.1.2-.2.6-.2'

interface HeroSceneModelProps extends React.ComponentProps<'group'> {
  scaleFactor?: number
  scrollYProgress?: MotionValue<number>
  params: SceneParams
}

function HeroSceneModel(props: HeroSceneModelProps) {
  const { scaleFactor = 0.12, scrollYProgress, params, ...restProps } = props

  const groupRef = useRef<Group>(null)
  const { width, height } = useThree((s) => s.viewport)

  // On landscape, height wins (capped by wider viewport).
  // On portrait mobile, width is narrow so width * boost caps it proportionally.
  const scale = Math.min(width * 1.4, height) * scaleFactor

  const geometry = useMemo(() => {
    const loader = new SVGLoader()
    const { paths } = loader.parse(
      `<svg viewBox="0 0 28.221 32"><path d="${SIGN_PATH}"/></svg>`,
    )
    const shapes = paths.flatMap((p) => SVGLoader.createShapes(p))

    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 2,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 0.15,
      bevelSize: 0.1,
      bevelSegments: 4,
    })

    geo.scale(0.1, -0.1, 0.1)
    geo.computeVertexNormals()
    geo.computeBoundingBox()
    const center = new THREE.Vector3()
    geo.boundingBox?.getCenter(center)
    geo.translate(-center.x, -center.y, -center.z)

    return geo
  }, [])

  const { posY, tiltX, tiltY } = useControls('Model', {
    posY: { value: 0, min: -10, max: 10, step: 0.5 },
    tiltX: { value: 0.46, min: 0, max: 1, step: 0.05 },
    tiltY: { value: 0.96, min: 0, max: 1, step: 0.05 },
  })

  const { resolvedTheme } = useTheme()

  const initialColor = useMemo(() => {
    if (params.transmission.enabled) {
      return resolvedTheme === 'light'
        ? TRANSMISSION_LIGHT_COLOR
        : TRANSMISSION_DARK_COLOR
    }
    return resolvedTheme === 'light'
      ? PHYSICAL_LIGHT_COLOR
      : PHYSICAL_DARK_COLOR
  }, [params.transmission.enabled, resolvedTheme])

  const { roughness, thickness, ior, chromaticAberration } = useControls(
    'Material',
    {
      roughness: { value: 0.02, min: 0, max: 1, step: 0.01 },
      thickness: { value: 7.24, min: 0, max: 10, step: 0.1 },
      ior: { value: 1.12, min: 1, max: 2.5, step: 0.05 },
      chromaticAberration: { value: 0, min: 0, max: 1, step: 0.01 },
    },
  )

  const color = initialColor

  useFrame((state, delta) => {
    const { x, y } = state.pointer
    const scroll = scrollYProgress?.get() ?? 0
    const clampedDelta = Math.min(delta, 1 / 30)

    if (groupRef.current) {
      const scrollTilt = THREE.MathUtils.clamp(scroll / 0.125, 0, 1) * 0.25
      const preFadeSpin = scroll * scroll * 3.0

      const targetRotX =
        THREE.MathUtils.clamp(-y * tiltX, -0.2, 0.2) + scrollTilt
      const targetRotY =
        THREE.MathUtils.clamp(x * tiltY, -0.3, 0.3) + preFadeSpin

      groupRef.current.rotation.x +=
        (targetRotX - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.y +=
        (targetRotY - groupRef.current.rotation.y) * 0.05

      // Continuous idle rotation so the model is always visibly spinning
      groupRef.current.rotation.y += clampedDelta * 0.3
    }
  })

  const mesh = (
    <mesh
      geometry={geometry}
      scale={scale}
    >
      {params.transmission.enabled ? (
        <MeshTransmissionMaterial
          samples={params.transmission.samples}
          resolution={params.transmission.resolution}
          transmission={1}
          roughness={roughness}
          thickness={thickness}
          ior={ior}
          color={color}
          chromaticAberration={chromaticAberration}
          anisotropy={0}
          temporalDistortion={0}
          side={THREE.DoubleSide}
        />
      ) : (
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.72}
          metalness={0.04}
          ior={ior}
          roughness={roughness}
          side={THREE.DoubleSide}
        />
      )}
    </mesh>
  )

  return (
    <group
      {...restProps}
      position={[0, posY, 0]}
    >
      <Environment
        preset="warehouse"
        resolution={params.environment.resolution}
      />
      <group ref={groupRef}>
        {params.float ? (
          <Float
            speed={1.96}
            rotationIntensity={0}
            floatIntensity={1.5}
            floatingRange={[-0.78, 0.24]}
          >
            {mesh}
          </Float>
        ) : (
          mesh
        )}
      </group>
    </group>
  )
}

export { HeroSceneModel }
