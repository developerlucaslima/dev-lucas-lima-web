'use client'

import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  animationDuration: number
  depth: number
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<(HTMLDivElement | null)[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })

  // Ensure starsRef array has the same length as stars
  if (starsRef.current.length !== stars.length) {
    starsRef.current = Array(stars.length).fill(null)
  }

  // Generate stars based on window size and update on resize
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      // Determine the number of stars based on the screen area
      const count = Math.floor((window.innerWidth * window.innerHeight) / 8000)

      for (let i = 0; i < count; i++) {
        newStars.push({
          x: Math.random() * 100, // Percentage for horizontal position
          y: Math.random() * 100, // Percentage for vertical position
          size: Math.random() * 2 + 1, // Size in pixels
          opacity: Math.random() * 0.7 + 0.3,
          animationDuration: Math.random() * 3 + 2, // For the pulse effect
          depth: Math.random() * 5 + 1, // Determines parallax effect strength
        })
      }

      setStars(newStars)
    }

    generateStars()
    window.addEventListener('resize', generateStars)
    return () => {
      window.removeEventListener('resize', generateStars)
    }
  }, [])

  // Track the mouse position and store normalized values in a ref
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { clientX, clientY } = e
        const { width, height } = containerRef.current.getBoundingClientRect()

        // Normalize mouse coordinates to range [-1, 1]
        const normalizedX = (clientX / width) * 2 - 1
        const normalizedY = (clientY / height) * 2 - 1
        mousePositionRef.current = { x: normalizedX, y: normalizedY }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Continuously update the position of each star based on mouse movement
  useEffect(() => {
    let animationFrame: number

    const updateStarPositions = () => {
      starsRef.current.forEach((starRef, i) => {
        if (starRef) {
          const star = stars[i]
          // Calculate parallax factor based on star's depth
          const parallaxFactor = (1 / star.depth) * 20

          // Animate the star position based on mouse position and parallax factor
          gsap.to(starRef, {
            x: mousePositionRef.current.x * -parallaxFactor,
            y: mousePositionRef.current.y * -parallaxFactor,
            duration: 0.5,
            ease: 'power2.out',
          })
        }
      })

      animationFrame = requestAnimationFrame(updateStarPositions)
    }

    updateStarPositions()
    return () => cancelAnimationFrame(animationFrame)
  }, [stars])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          ref={(el) => {
            starsRef.current[i] = el
          }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `pulse ${star.animationDuration}s infinite ease-in-out`,
            zIndex: Math.floor(star.depth),
          }}
        />
      ))}
    </div>
  )
}
