import { useCallback, useEffect, useState } from 'react'

interface UseClipboardReturnType {
  hasCopied: boolean
  onCopy: () => void
}

type UseClipboardOptions = {
  flagDuration?: number
}

function useClipboard(
  content: string,
  options?: UseClipboardOptions,
): UseClipboardReturnType {
  const { flagDuration = 2000 } = options || {}

  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(content)
    setHasCopied(true)
  }, [content])

  useEffect(() => {
    if (hasCopied) {
      const id = setTimeout(() => {
        setHasCopied(false)
      }, flagDuration)

      return () => clearTimeout(id)
    }
  }, [hasCopied, flagDuration])

  return {
    hasCopied,
    onCopy,
  }
}

export default useClipboard
