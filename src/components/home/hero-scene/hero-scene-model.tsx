'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useControls } from 'leva'
import type { Mesh } from 'three'

function HeroSceneModel() {
  const meshRef = useRef<Mesh>(null)

  const { height } = useThree((state) => state.viewport)
  const scale = height * 0.12

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * 0.4
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.08
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.06
  })

  const materialProps = useControls('Model', {
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.74, min: 0, max: 1 },
    backside: { value: true },
  })

  return (
    <group>
      <ambientLight intensity={0.6} />

      <Environment preset="studio" />

      <mesh
        ref={meshRef}
        renderOrder={1}
        position={[0, 0, 0]}
        scale={scale}
        castShadow
      >
        <coneGeometry args={[1.5, 3, 4, 1]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  )
}

export { HeroSceneModel }
