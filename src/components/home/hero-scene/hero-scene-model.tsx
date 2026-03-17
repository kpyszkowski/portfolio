'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { useControls } from 'leva'
import type { Group } from 'three'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { type MotionValue } from 'motion/react'
import { SIGN_PATH } from '~/components/logo'

interface HeroSceneModelProps extends React.ComponentProps<'group'> {
  scaleFactor?: number
  scrollYProgress?: MotionValue<number>
}

function HeroSceneModel(props: HeroSceneModelProps) {
  const { scaleFactor = 0.12, scrollYProgress, ...restProps } = props

  const groupRef = useRef<Group>(null)
  const { width } = useThree((s) => s.viewport)
  const scale = width * scaleFactor

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

  const {
    color,
    roughness,
    thickness,
    ior,
    chromaticAberration,
    resolution,
    samples,
  } = useControls('Material', {
    color: '#ffffff',
    roughness: { value: 0.18, min: 0, max: 1, step: 0.01 },
    thickness: { value: 2, min: 0, max: 10, step: 0.1 },
    ior: { value: 1.25, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0, min: 0, max: 1, step: 0.01 },
    // Performance knobs — keep low
    samples: { value: 8, min: 1, max: 16, step: 1 },
    resolution: { value: 512, min: 64, max: 2048, step: 64 },
  })

  useFrame((state) => {
    const { x, y } = state.pointer
    const scroll = scrollYProgress?.get() ?? 0

    if (groupRef.current) {
      const scrollTilt = THREE.MathUtils.clamp(scroll / 0.5, 0, 1) * 0.6
      const preFadeSpin = scroll * scroll * 3.0

      const targetRotX =
        THREE.MathUtils.clamp(-y * tiltX, -0.2, 0.2) + scrollTilt
      const targetRotY =
        THREE.MathUtils.clamp(x * tiltY, -0.3, 0.3) + preFadeSpin

      groupRef.current.rotation.x +=
        (targetRotX - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.y +=
        (targetRotY - groupRef.current.rotation.y) * 0.05
    }
  })

  return (
    <group
      {...restProps}
      position={[0, posY, 0]}
    >
      <Environment
        preset="warehouse"
        resolution={64}
      />
      <group ref={groupRef}>
        <Float
          speed={1.96}
          rotationIntensity={0}
          floatIntensity={1.5}
          floatingRange={[-0.78, 0.24]}
        >
          <mesh
            geometry={geometry}
            scale={scale}
          >
            <MeshTransmissionMaterial
              samples={samples}
              resolution={resolution}
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
          </mesh>
        </Float>
      </group>
    </group>
  )
}

export { HeroSceneModel }
