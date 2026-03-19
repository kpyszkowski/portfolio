import {
  SectionLayoutRoot,
  sectionLayoutRootStyles,
  type SectionLayoutRootProps,
} from '~/components/ui/section-layout/section-layout-root'
import {
  SectionLayoutWrapper,
  sectionLayoutWrapperStyles,
  type SectionLayoutWrapperProps,
} from '~/components/ui/section-layout/section-layout-wrapper'
import {
  SectionLayoutHeading,
  sectionLayoutHeadingStyles,
  type SectionLayoutHeadingProps,
} from '~/components/ui/section-layout/section-layout-heading'

const SectionLayout = {
  Root: SectionLayoutRoot,
  Wrapper: SectionLayoutWrapper,
  Heading: SectionLayoutHeading,
}

export {
  SectionLayout,
  sectionLayoutRootStyles,
  sectionLayoutWrapperStyles,
  sectionLayoutHeadingStyles,
}
export type {
  SectionLayoutRootProps,
  SectionLayoutWrapperProps,
  SectionLayoutHeadingProps,
}
