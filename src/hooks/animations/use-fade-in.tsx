'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

interface UseFadeInProps {
  duration?: number
  delay?: number
}

export const useFadeIn = ({
  duration = 2,
  delay = 0.5,
}: UseFadeInProps = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration, delay })
    }
  }, [duration, delay])

  return ref
}
