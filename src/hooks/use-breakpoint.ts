import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config'
import { useEffect, useState } from 'react'

const fullConfig = resolveConfig(tailwindConfig)
const {
  theme: { screens },
} = fullConfig

type UseBreakpointQuery = keyof typeof screens
type UseBreakpointOptions = Partial<{
  useMaxQuery: boolean
}>

/*
 * A hook that returns a boolean indicating if the current screen size is greater than the specified breakpoint.
 * @param query - The breakpoint to compare against.
 * @returns A boolean indicating if the current screen size is greater than the specified breakpoint.
 */
function useBreakpoint(
  query: UseBreakpointQuery,
  options?: UseBreakpointOptions,
) {
  const { useMaxQuery = false } = options || {}

  const [isMatch, setMatch] = useState(false)

  const handleBreakpointChange = (event: MediaQueryListEvent) =>
    setMatch(event.matches)

  useEffect(() => {
    const matchQueryList = window.matchMedia(
      `(${useMaxQuery ? 'max' : 'min'}-width: ${screens[query]})`,
    )
    setMatch(matchQueryList.matches)

    matchQueryList.addEventListener('change', handleBreakpointChange)
    return () =>
      matchQueryList.removeEventListener('change', handleBreakpointChange)
  }, [query, useMaxQuery])

  return isMatch
}

export default useBreakpoint
