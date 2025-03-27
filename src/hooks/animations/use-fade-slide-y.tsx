'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

interface UseFadeSlideYProps {
  duration?: number
  delay?: number
  fromY?: number
  toY?: number
}

export const useFadeSlideY = ({
  duration = 2,
  delay = 0.5,
  fromY = 30,
  toY = 0,
}: UseFadeSlideYProps = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: fromY },
        { opacity: 1, y: toY, duration, delay },
      )
    }
  }, [duration, fromY, toY])

  return ref
}
