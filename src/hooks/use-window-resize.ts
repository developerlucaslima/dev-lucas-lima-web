import { useEffect } from 'react'

interface UseWindowResizeProps {
  callback: () => void
}

export function useWindowResize({ callback }: UseWindowResizeProps) {
  useEffect(() => {
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [callback])
}
