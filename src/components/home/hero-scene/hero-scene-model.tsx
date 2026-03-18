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

const TRANSMISSION_LIGHT_COLOR = '#e8c288'
const TRANSMISSION_DARK_COLOR = '#e8bb78'
const PHYSICAL_LIGHT_COLOR = '#f0cc98'
const PHYSICAL_DARK_COLOR = '#211910'
const SIGN_PATH =
  'M13.05 0S9.93.002 6.73 1.232c-1.601.616-3.263 1.549-4.56 3.026C.875 5.735-.001 7.778 0 10.289c.003 3.826 2.27 6.307 4.38 7.611 2.111 1.305 4.206 1.657 4.206 1.657a1.418 1.418 0 0 0 1.639-1.155 1.418 1.418 0 0 0-1.155-1.638s-1.606-.291-3.199-1.276c-1.593-.984-3.033-2.437-3.035-5.2-.002-1.885.579-3.15 1.465-4.16.886-1.01 2.134-1.743 3.445-2.247a15.497 15.497 0 0 1 3.899-.922v11.77a1.418 1.418 0 0 0 2.402 1.017l13.742-13.31a1.418 1.418 0 0 0 .033-2.004A1.418 1.418 0 0 0 25.816.4L14.48 11.38V1.419A1.418 1.418 0 0 0 13.05 0m4.65 14.584a1.418 1.418 0 0 0-1.022.371l-4.875 4.48a1.418 1.418 0 0 0-.46 1.046v10.101A1.418 1.418 0 0 0 12.763 32a1.418 1.418 0 0 0 1.418-1.418v-9.478l3.37-3.098 8.208 8.967a1.418 1.418 0 0 0 2.002.088 1.418 1.418 0 0 0 .09-2.002l-9.166-10.016a1.418 1.418 0 0 0-.985-.459M5.2 22.144c-1.074 0-2.06.454-2.68 1.151-.62.697-.898 1.573-.898 2.428s.279 1.728.898 2.425c.62.698 1.606 1.15 2.68 1.15 1.075 0 2.06-.452 2.68-1.15.62-.697.896-1.57.896-2.425 0-.855-.276-1.73-.896-2.428-.62-.697-1.605-1.15-2.68-1.15m0 2.837c.366 0 .459.086.559.199.1.112.183.318.183.543 0 .225-.083.43-.183.543-.1.112-.193.199-.559.199-.365 0-.46-.087-.56-.2a.854.854 0 0 1-.182-.542c0-.225.081-.43.182-.543.1-.113.195-.2.56-.2'

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
      groupRef.current.rotation.y += delta * 0.3
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
