import {
  GlowCard as GlowCardItem,
  glowCardStyles,
  type GlowCardProps,
} from '~/components/ui/glow-card/glow-card'
import {
  GlowCardRoot,
  glowCardRootStyles,
  useGlowCardRootContext,
  type GlowCardRootProps,
  type GlowCardRootContextValue,
} from '~/components/ui/glow-card/glow-card-root'

const GlowCard = {
  Root: GlowCardRoot,
  Item: GlowCardItem,
}

export { GlowCard, glowCardStyles, glowCardRootStyles, useGlowCardRootContext }
export type { GlowCardProps, GlowCardRootProps, GlowCardRootContextValue }
