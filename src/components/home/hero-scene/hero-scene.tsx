'use client'
import { Suspense, useMemo } from 'react'
import { Canvas, type CanvasProps } from '@react-three/fiber'
import { useControls } from 'leva'
import { type MotionValue } from 'motion/react'
import { HeroSceneModel } from '~/components/home/hero-scene/hero-scene-model'
import { HeroSceneGround } from '~/components/home/hero-scene/hero-scene-ground'
import { getSceneParams } from '~/components/home/hero-scene/hero-scene-tier'
import { useDeviceTier } from '~/hooks/use-device-tier'
import { useTheme } from 'next-themes'

// --bg-main from `globals.css`
const BG_LIGHT = '#fafaf9'
const BG_DARK = '#1c1917'

interface HeroSceneProps extends CanvasProps {
  scrollYProgress?: MotionValue<number>
}

function HeroScene(props: HeroSceneProps) {
  const { scrollYProgress, ...restProps } = props

  const { resolvedTheme } = useTheme()
  const tier = useDeviceTier()
  const params = useMemo(() => getSceneParams(tier), [tier])

  const cam = useControls('Camera', {
    posX: { value: -28.16, min: -50, max: 50, step: 0.5 },
    posY: { value: 5.12, min: -50, max: 50, step: 0.5 },
    posZ: { value: 7.34, min: -50, max: 50, step: 0.5 },
    zoom: { value: 48.5, min: 1, max: 200, step: 0.5 },
    tiltX: { value: 4, min: 0, max: 10, step: 0.05 },
    tiltY: { value: 0, min: 0, max: 20, step: 0.1 },
    tiltZ: { value: 2, min: 0, max: 10, step: 0.1 },
    mobileLookAtY: { value: -1.5, min: -20, max: 0, step: 0.5 },
  })

  return (
    <Canvas
      style={{
        background: 'transparent',
      }}
      dpr={params.dpr}
      gl={{ antialias: true, alpha: false, stencil: false }}
      orthographic
      camera={{
        position: [-28.16, 5.14, -18.24],
        zoom: 48.5,
      }}
      {...restProps}
    >
      <color
        attach="background"
        args={[resolvedTheme === 'dark' ? BG_DARK : BG_LIGHT]}
      />
      <Suspense fallback={null}>
        <HeroSceneGround
          renderOrder={0}
          cam={cam}
          scrollYProgress={scrollYProgress}
          params={params}
        />
        <HeroSceneModel
          rotation={[0, Math.atan2(-28.16, 7.34), 0]}
          renderOrder={1}
          scaleFactor={0.1}
          scrollYProgress={scrollYProgress}
          params={params}
        />
      </Suspense>
    </Canvas>
  )
}

export { HeroScene, type HeroSceneProps }
