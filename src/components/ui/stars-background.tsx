'use client'

import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

// TODO: improve clean code and performance

// --- StarBackground Component (Background Stars) ---
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

// --- ShootingStars Component (Shooting Stars) ---
interface ShootingStar {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  duration: number
  size: number
  angle: number
  distance: number
}

export function ShootingStars() {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const shootingStarIdRef = useRef(0)

  useEffect(() => {
    const createShootingStar = () => {
      if (Math.random() > 0.8) {
        // 20% chance
        const id = shootingStarIdRef.current++
        const startX = Math.random() * 100
        const startY = Math.random() * 40
        const distance = 30 + Math.random() * 40
        const angle = Math.PI / 4 + (Math.random() * Math.PI) / 2
        const endX = startX + Math.cos(angle) * distance
        const endY = startY + Math.sin(angle) * distance
        const duration = 0.6 + Math.random() * 2
        const size = 1.5 + Math.random() * 1.5
        setShootingStars((prev) => [
          ...prev,
          { id, startX, startY, endX, endY, duration, size, angle, distance },
        ])
        setTimeout(
          () => {
            setShootingStars((prev) => prev.filter((star) => star.id !== id))
          },
          duration * 1000 + 100,
        )
      }
      const nextDelay = 200 + Math.random() * 1000
      setTimeout(createShootingStar, nextDelay)
    }
    const initialDelay = 1000 + Math.random() * 2000
    const timerId = setTimeout(createShootingStar, initialDelay)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: '1px',
            height: '1px',
          }}
        >
          <div
            className="absolute"
            style={{
              width: `${star.size * 3}px`,
              height: `${star.size}px`,
              background:
                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
              borderRadius: '50%',
              transform: `rotate(${(star.angle * 180) / Math.PI}deg)`,
              transformOrigin: 'left center',
              animation: `shootingStar-${star.id} ${star.duration}s linear forwards`,
            }}
          />
          <style jsx>{`
            @keyframes shootingStar-${star.id} {
              0% {
                transform: rotate(${(star.angle * 180) / Math.PI}deg)
                  translateX(0);
                opacity: 0;
              }
              10% {
                opacity: 1;
              }
              100% {
                transform: rotate(${(star.angle * 180) / Math.PI}deg)
                  translateX(${star.distance}vw);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  )
}

export function Background() {
  return (
    <>
      <StarBackground />
      <ShootingStars />
    </>
  )
}
