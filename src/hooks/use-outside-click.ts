import { useRef, useEffect } from 'react'

/**
 * Hook that handles outside click events
 * @param callback
 * @returns ref
 * @see https://www.robinwieruch.de/react-hook-detect-click-outside-component/
 */
function useOutsideClick<T extends HTMLElement>(callback: VoidFunction) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) return

      callback()
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [callback, ref])

  return ref
}

export default useOutsideClick
