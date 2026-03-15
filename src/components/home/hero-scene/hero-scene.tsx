'use client'
import { clsx } from 'clsx'
import { HeroSceneBackground } from '~/components/home/hero-scene/hero-scene-background'
import { HeroSceneModel } from '~/components/home/hero-scene/hero-scene-model'
import { HeroSceneTextMesh } from '~/components/home/hero-scene/hero-scene-text-mesh'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'

interface HeroSceneProps {
  className?: string
}

function HeroScene(props: HeroSceneProps) {
  const { className } = props

  return (
    <div
      className={clsx('bg-main', className)}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Leva
        collapsed
        hidden={process.env.NODE_ENV === 'production'}
      />
      <Canvas
        dpr={1}
        flat
        gl={{ antialias: true, alpha: true, stencil: false }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <HeroSceneBackground />
        <HeroSceneTextMesh />
        <HeroSceneModel />
      </Canvas>
    </div>
  )
}

export { HeroScene, type HeroSceneProps }
