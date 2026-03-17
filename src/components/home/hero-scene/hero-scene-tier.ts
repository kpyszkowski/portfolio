import { type DeviceTier } from '~/hooks/use-device-tier'

export interface SceneParams {
  dpr: [number, number]
  transmission: {
    enabled: boolean
    samples: number
    resolution: number
  }
  environment: {
    resolution: number
  }
  ground: {
    xSegs: number
    cellSize: number
  }
  float: boolean
}

const SCENE_PARAMS: Record<DeviceTier, SceneParams> = {
  low: {
    dpr: [1, 1],
    transmission: { enabled: false, samples: 1, resolution: 64 },
    environment: { resolution: 32 },
    ground: { xSegs: 60, cellSize: 3 },
    float: false,
  },
  mid: {
    dpr: [1, 1.5],
    transmission: { enabled: true, samples: 2, resolution: 128 },
    environment: { resolution: 64 },
    ground: { xSegs: 90, cellSize: 2.5 },
    float: true,
  },
  high: {
    dpr: [1, 2],
    transmission: { enabled: true, samples: 4, resolution: 256 },
    environment: { resolution: 64 },
    ground: { xSegs: 120, cellSize: 2 },
    float: true,
  },
}

function getSceneParams(tier: DeviceTier): SceneParams {
  return SCENE_PARAMS[tier]
}

export { getSceneParams }
