import { useMemo } from 'react'

export type DeviceTier = 'low' | 'mid' | 'high'

function detectTier(): DeviceTier {
  if (typeof navigator === 'undefined') return 'mid'

  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  const cores = navigator.hardwareConcurrency ?? 4
  const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)

  if (memory <= 2 || cores <= 2) return 'low'
  if (mobile && memory <= 4) return 'low'
  if (memory >= 8 && cores >= 8) return 'high'
  return 'mid'
}

function useDeviceTier(): DeviceTier {
  return useMemo(() => detectTier(), [])
}

export { useDeviceTier }
