import { type ReactNode } from 'react'

interface WritingTileHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: ReactNode
}

function WritingTileHeading(props: WritingTileHeadingProps) {
  const { as: Element = 'h3', className, children } = props

  return <Element className={className}>{children}</Element>
}

export { WritingTileHeading, type WritingTileHeadingProps }
