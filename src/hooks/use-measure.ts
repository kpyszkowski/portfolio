import { useRef, useState, useLayoutEffect } from 'react'

/**
 * A hook that provides a ref and the dimensions of the element it is attached
 * to.
 * @returns An object containing the ref and the dimensions of the element.
 * @example
 * const { elementRef, elementRect } = useMeasure()
 * return <div ref={elementRef}>Width: {elementRect.width }</div>
 */
export function useMeasure() {
  const elementRef = useRef<HTMLDivElement>(null)

  const [elementRect, setElementRect] = useState(new DOMRect(0, 0, 0, 0))

  useLayoutEffect(() => {
    if (!elementRef.current) return
    const element = elementRef.current
    const update = () => {
      const rect = element.getBoundingClientRect()
      setElementRect(rect)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [elementRef, elementRect] as const
}
