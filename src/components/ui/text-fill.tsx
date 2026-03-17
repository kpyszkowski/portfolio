'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const textFillStyles = createStyles({
  slots: {
    container: 'relative block',
    ghost: 'opacity-50',
    measure: 'pointer-events-none absolute inset-0 opacity-0 select-none',
    fill: 'pointer-events-none absolute inset-0',
    line: 'block whitespace-nowrap',
  },
})

interface TextFillLineProps {
  progress: MotionValue<number>
  lineIndex: number
  totalLines: number
  className: string
  children: string
}

function TextFillLine(props: TextFillLineProps) {
  const { progress, lineIndex, totalLines, className, children } = props

  const lineStart = lineIndex / totalLines
  const lineEnd = (lineIndex + 1) / totalLines

  const rightPercent = useTransform(progress, [lineStart, lineEnd], [100, 0], {
    clamp: true,
  })
  const clipPath = useMotionTemplate`inset(0 ${rightPercent}% 0 0)`

  return (
    <motion.span
      className={className}
      style={{ clipPath }}
    >
      {children}
    </motion.span>
  )
}

interface TextFillProps extends StylesProps<typeof textFillStyles> {
  className?: string
  children: string
  progress: MotionValue<number>
}

type WordLineData = {
  lineIndex: number
}

function TextFill(props: TextFillProps) {
  const { className, children, progress } = props
  const styles = textFillStyles()

  const words = children.split(' ')
  const containerRef = useRef<HTMLSpanElement>(null)
  const wordRefs = useRef<(HTMLElement | null)[]>([])

  const [wordLineData, setWordLineData] = useState<WordLineData[] | null>(null)

  const measure = useCallback(() => {
    const els = wordRefs.current.slice(0, words.length)
    if (els.length !== words.length || els.some((el) => !el)) return

    const tops = els.map((el) => Math.round(el!.getBoundingClientRect().top))
    const orderedTops = [...new Set(tops)]
    const topToLineIndex = new Map(orderedTops.map((top, i) => [top, i]))

    setWordLineData(
      tops.map((top) => ({ lineIndex: topToLineIndex.get(top)! })),
    )
  }, [words.length])

  useEffect(() => {
    measure()
    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [measure])

  const lineGroups = useMemo(() => {
    if (!wordLineData || wordLineData.length === 0) return null
    const wordList = children.split(' ')
    const groups: string[][] = []
    wordLineData.forEach(({ lineIndex }, i) => {
      if (!groups[lineIndex]) groups[lineIndex] = []
      groups[lineIndex].push(wordList[i])
    })
    return groups.map((lineWords) => lineWords.join(' '))
  }, [wordLineData, children])

  const totalLines = lineGroups ? lineGroups.length : 1

  const smoothProgress = useSpring(progress, { stiffness: 200, damping: 32 })

  return (
    <span
      ref={containerRef}
      className={styles.container({ className })}
    >
      <span
        className={styles.ghost()}
        aria-label={children}
      >
        {children}
      </span>
      {/* Invisible layer — word refs for line measurement */}
      <span
        className={styles.measure()}
        aria-hidden
      >
        {words.map((word, i) => (
          <span key={i}>
            <span
              ref={(el) => {
                wordRefs.current[i] = el
              }}
            >
              {word}
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
      {/* Fill layer — one block per line, swept left to right */}
      {lineGroups && (
        <span
          className={styles.fill()}
          aria-hidden
        >
          {lineGroups.map((lineText, lineIdx) => (
            <TextFillLine
              key={lineIdx}
              progress={smoothProgress}
              lineIndex={lineIdx}
              totalLines={totalLines}
              className={styles.line()}
            >
              {lineText}
            </TextFillLine>
          ))}
        </span>
      )}
    </span>
  )
}

export { TextFill, textFillStyles, type TextFillProps }
