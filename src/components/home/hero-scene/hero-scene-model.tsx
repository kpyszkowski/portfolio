'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useEffect, useRef, useMemo } from 'react'
import { useControls } from 'leva'
import type { Mesh, MeshPhysicalMaterial } from 'three'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { SIGN_PATH } from '~/components/logo'

interface HeroSceneModelProps extends React.ComponentProps<'group'> {
  scaleFactor?: number
}

function HeroSceneModel(props: HeroSceneModelProps) {
  const { scaleFactor = 0.12, ...restProps } = props

  const meshRef = useRef<Mesh>(null)
  const matRef = useRef<MeshPhysicalMaterial>(null)
  const { width } = useThree((state) => state.viewport)
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

  const { posY, tiltX, tiltY, ior, roughness, thickness, transmission } =
    useControls('Model', {
      posY: { value: 0, min: -10, max: 10, step: 0.5 },
      tiltX: { value: 0.46, min: 0, max: 1, step: 0.05 },
      tiltY: { value: 0.96, min: 0, max: 1, step: 0.05 },
      ior: { value: 1.36, min: 1, max: 3, step: 0.05 },
      roughness: { value: 0.2, min: 0, max: 1, step: 0.05 },
      thickness: { value: 0, min: 0, max: 3, step: 0.1 },
      transmission: { value: 0, min: 0, max: 1, step: 0.05 },
    })

  const { keyIntensity } = useControls('Lights', {
    keyIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
  })

  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    const floatY = Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    meshRef.current.position.y = floatY

    const { x: mx, y: my } = mouseRef.current

    // Clamped tilt — keeps model front-facing under heavy mouse movement
    const targetRotY = THREE.MathUtils.clamp(mx * tiltY, -0.3, 0.3)
    const targetRotX = THREE.MathUtils.clamp(-my * tiltX, -0.2, 0.2)
    meshRef.current.rotation.y +=
      (targetRotY - meshRef.current.rotation.y) * 0.05
    meshRef.current.rotation.x +=
      (targetRotX - meshRef.current.rotation.x) * 0.05

    if (matRef.current) {
      matRef.current.ior = ior
      matRef.current.roughness = roughness
      matRef.current.thickness = thickness
      matRef.current.transmission = transmission
    }
  })

  return (
    <group
      {...restProps}
      position={[0, posY, 0]}
    >
      <Environment
        preset="warehouse"
        resolution={12}
      />
      <directionalLight
        position={[2, 4, 3]}
        intensity={keyIntensity}
        color="#ffe8cc"
      />
      <mesh
        ref={meshRef}
        geometry={geometry}
        scale={scale}
      >
        <meshPhysicalMaterial
          ref={matRef}
          color="#1a1a1a"
          transmission={1}
          roughness={0.18}
          ior={1.5}
          thickness={0.5}
          envMapIntensity={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export { HeroSceneModel }
