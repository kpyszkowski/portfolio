'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { ComponentPropsWithoutRef, useRef } from 'react'
import { useControls } from 'leva'
import { Vector3 } from 'three'
import type { Mesh } from 'three'

// Local-space vertices of the 4-sided cone: coneGeometry(radius=1.5, height=3, radialSegments=4)
// Base at y=-1.5 (4 corners at 0°/90°/180°/270°), apex at y=+1.5
const CONE_VERTS_LOCAL = [
  new Vector3(1.5, -1.5, 0),
  new Vector3(0, -1.5, 1.5),
  new Vector3(-1.5, -1.5, 0),
  new Vector3(0, -1.5, -1.5),
  new Vector3(0, 1.5, 0),
]

// Reusable scratch vector — avoids allocations every frame
const _v = new Vector3()

type HeroSceneModelProps = ComponentPropsWithoutRef<'group'> & {
  updateOverlay?: (clipPath: string) => void
  updateTurbulence?: (baseFrequency: string) => void
}

function HeroSceneModel(props: HeroSceneModelProps) {
  const { updateOverlay, updateTurbulence, ...restProps } = props

  const meshRef = useRef<Mesh>(null)

  const { height } = useThree((state) => state.viewport)
  const scale = height * 0.12

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * 0.4
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.08
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.06

    if (updateOverlay) {
      const { camera, size } = state
      const mesh = meshRef.current

      const rawPts = CONE_VERTS_LOCAL.map((v) => {
        _v.copy(v).applyMatrix4(mesh.matrixWorld).project(camera)
        return {
          x: (_v.x * 0.5 + 0.5) * size.width,
          y: (0.5 - _v.y * 0.5) * size.height,
        }
      })

      // Expand each point 8px from the centroid so distortion bleeds
      // slightly past the hard silhouette edge
      const cx = rawPts.reduce((s, p) => s + p.x, 0) / rawPts.length
      const cy = rawPts.reduce((s, p) => s + p.y, 0) / rawPts.length

      const pts = rawPts.map(({ x, y }) => {
        const dx = x - cx
        const dy = y - cy
        const len = Math.hypot(dx, dy) || 1
        return `${(x + (dx / len) * 8).toFixed(1)}px ${(y + (dy / len) * 8).toFixed(1)}px`
      })

      updateOverlay(`polygon(${pts.join(', ')})`)
    }

    if (updateTurbulence) {
      const f1 = (0.012 + Math.sin(t * 0.31) * 0.004).toFixed(4)
      const f2 = (0.015 + Math.cos(t * 0.23) * 0.004).toFixed(4)
      updateTurbulence(`${f1} ${f2}`)
    }
  })

  const materialProps = useControls('Model', {
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  })

  return (
    <group {...restProps}>
      <ambientLight intensity={0.6} />

      <Environment preset="studio" />

      <mesh
        ref={meshRef}
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

export { HeroSceneModel, type HeroSceneModelProps }
