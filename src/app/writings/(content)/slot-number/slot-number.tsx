'use client'
import cn from '@/utils/cn'
import { AnimatePresence, motion } from 'motion/react'
import React, { useMemo } from 'react'
import { tv } from 'tailwind-variants'

type SlotNumberProps = {
  className?: string
  children: number
  formatFunction?: (value: number) => string
}

const getStyles = tv({
  slots: {
    container:
      'flex select-none flex-row-reverse justify-end overflow-hidden text-4xl font-semibold leading-none',
    digitContainer: 'relative',
    digitsWrapper: 'absolute inset-0 flex h-fit flex-col',
    digitPlaceholder: 'invisible block',
  },
})

type SlotNumberDigitProps = {
  className?: string
  children: number
}

const SlotNumberDigit = (props: SlotNumberDigitProps) => {
  const { className, children } = props

  const styles = getStyles()

  const digits = [...Array(10).keys()]

  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{
          y: '100%',
        }}
        animate={{
          y: '0%',
        }}
        layout="position"
        className={cn(styles.digitContainer(), className)}
      >
        <span className={styles.digitPlaceholder()}>{children}</span>

        <motion.div
          className={styles.digitsWrapper()}
          initial={false}
          animate={{ y: `${(children / 10) * -100}%` }}
        >
          {digits.map((digit) => (
            <span key={digit}>{digit}</span>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function SlotNumber(props: SlotNumberProps) {
  const { className, children: value, formatFunction } = props

  const styles = getStyles()

  const characters = useMemo(() => {
    const formattedValue = formatFunction
      ? formatFunction(value)
      : value.toString()

    return formattedValue
      .split('')
      .map((character) => (/^[0-9]$/.test(character) ? +character : character))
      .reverse()
  }, [formatFunction, value])

  return (
    <motion.div
      layout
      className={cn(styles.container(), className)}
    >
      {characters.map((character, index) =>
        typeof character === 'number' ? (
          <SlotNumberDigit key={`slot-number-character-${index}`}>
            {character}
          </SlotNumberDigit>
        ) : (
          <motion.span
            layout
            key={`slot-number-character-${index}`}
          >
            {character}
          </motion.span>
        ),
      )}
    </motion.div>
  )
}

export default SlotNumber
