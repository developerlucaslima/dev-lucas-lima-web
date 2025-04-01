import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export const useAlienAnimated = () => {
  const containerRef = useRef<HTMLElement>(null)
  const characterRef = useRef<SVGSVGElement>(null)
  const leftEyeRef = useRef<SVGCircleElement>(null)
  const rightEyeRef = useRef<SVGCircleElement>(null)
  const antennaRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Character entrance animation
    gsap.fromTo(
      characterRef.current,
      { scale: 0, rotation: -10 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.5,
      },
    )

    // Antenna bobbing animation
    gsap.to(antennaRef.current, {
      y: -5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // Mouse tracking for eyes and character
    const handleMouseMove = (e: MouseEvent) => {
      if (
        !containerRef.current ||
        !characterRef.current ||
        !leftEyeRef.current ||
        !rightEyeRef.current
      )
        return

      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect()
      const characterRect = characterRef.current.getBoundingClientRect()

      // Calculate mouse position relative to container
      const mouseX = e.clientX - left
      const mouseY = e.clientY - top

      // Calculate center of character
      const characterCenterX =
        characterRect.left - left + characterRect.width / 2
      const characterCenterY =
        characterRect.top - top + characterRect.height / 2

      // Calculate angle from character to mouse
      const angleX = (mouseX - characterCenterX) / (width / 2)
      const angleY = (mouseY - characterCenterY) / (height / 2)

      // Move eyes (limited range)
      const eyeMaxMove = 3
      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        x: angleX * eyeMaxMove,
        y: angleY * eyeMaxMove,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Slight character tilt/movement
      gsap.to(characterRef.current, {
        rotation: angleX * 5,
        x: angleX * 10,
        y: angleY * 5,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  })

  return { containerRef, characterRef, leftEyeRef, rightEyeRef, antennaRef }
}
