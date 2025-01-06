import { useCallback, useEffect, useState } from 'react'

interface UseClipboardReturnType {
  hasCopied: boolean
  onCopy: (content: string) => void
}

type UseClipboardOptions = {
  flagDuration?: number
}

function useClipboard(options?: UseClipboardOptions): UseClipboardReturnType {
  const { flagDuration = 2000 } = options || {}

  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = useCallback((content: string) => {
    navigator.clipboard.writeText(content)
    setHasCopied(true)
  }, [])

  useEffect(() => {
    if (hasCopied) {
      const id = setTimeout(() => {
        setHasCopied(false)
      }, flagDuration)

      return () => clearTimeout(id)
    }
  }, [hasCopied])

  return {
    hasCopied,
    onCopy,
  }
}

export default useClipboard
