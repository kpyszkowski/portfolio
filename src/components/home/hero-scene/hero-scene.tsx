'use client'
import { Canvas, CanvasProps } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import { type MotionValue } from 'motion/react'
import { HeroSceneModel } from '~/components/home/hero-scene/hero-scene-model'
import { HeroSceneGround } from '~/components/home/hero-scene/hero-scene-ground'

interface HeroSceneProps extends CanvasProps {
  groundScrollOpacity?: MotionValue<number>
}

function HeroScene(props: HeroSceneProps) {
  const { groundScrollOpacity, ...restProps } = props
  const cam = useControls('Camera', {
    posX: { value: -28.16, min: -50, max: 50, step: 0.5 },
    posY: { value: 5.12, min: -50, max: 50, step: 0.5 },
    posZ: { value: 7.34, min: -50, max: 50, step: 0.5 },
    zoom: { value: 48.5, min: 1, max: 200, step: 0.5 },
    tiltX: { value: 4, min: 0, max: 10, step: 0.05 },
    tiltY: { value: 0, min: 0, max: 20, step: 0.1 },
    tiltZ: { value: 2, min: 0, max: 10, step: 0.1 },
  })

  return (
    <>
      <Leva
        collapsed
        hidden={process.env.NODE_ENV === 'production'}
        flat
      />
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, stencil: false }}
        orthographic
        camera={{
          position: [-28.16, 5.14, -18.24],
          zoom: 48.5,
          near: -200,
          far: 400,
        }}
        {...restProps}
      >
        <HeroSceneGround
          renderOrder={0}
          cam={cam}
          scrollOpacity={groundScrollOpacity}
        />
        <HeroSceneModel
          rotation={[0, Math.atan2(-28.16, 7.34), 0]}
          renderOrder={1}
          scaleFactor={0.1}
        />
      </Canvas>
    </>
  )
}

export { HeroScene, type HeroSceneProps }
