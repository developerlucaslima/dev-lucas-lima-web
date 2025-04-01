import gsap from 'gsap'
import { useCallback, useEffect, useRef } from 'react'

export function useMoonRocketAnimation() {
  const moonRef = useRef<SVGSVGElement>(null)
  const rocketRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const triggerAnimation = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.restart()
    }
  }, [])

  useEffect(() => {
    if (moonRef.current) {
      gsap.to(moonRef.current, {
        y: 15, // Move the moon 15 pixels vertically
        yoyo: true, // Reverse the animation direction after each cycle
        repeat: -1, // Repeat indefinitely
        ease: 'sine.inOut', // Use a smooth sine easing function
        duration: 2, // Duration of 2 seconds per cycle
      })
    }

    if (rocketRef.current) {
      gsap.to(rocketRef.current, {
        y: 10, // Move the rocket 10 pixels vertically
        rotation: 5, // Slightly rotate the rocket by 5 degrees
        yoyo: true, // Reverse the animation after each cycle for a smooth oscillation
        repeat: -1, // Repeat indefinitely
        ease: 'sine.inOut', // Use sine easing for a smooth oscillation
        duration: 3, // Duration of 3 seconds per cycle
      })
    }

    // Create a paused timeline for the rocket's flight animation
    timelineRef.current = gsap
      .timeline({ paused: true })
      // Flight animation: move the rocket across the screen
      .to(rocketRef.current, {
        x: 800, // Move the rocket 800 pixels to the right
        y: -400, // Move the rocket 400 pixels upward (negative y direction)
        scale: 0.5, // Scale down the rocket to 50% of its size to simulate distance
        rotation: 45, // Rotate the rocket to 45 degrees for dramatic effect
        duration: 2, // Duration of 2 seconds for this part of the flight
        ease: 'power2.in', // Use power2 easing for a quick acceleration
      })
      // Fade out the rocket as it completes its flight
      .to(rocketRef.current, {
        opacity: 0, // Gradually change the rocket's opacity to 0 (fade out)
        duration: 0.5, // Duration of 0.5 seconds for the fade-out effect
        onComplete: () => {
          if (rocketRef.current) {
            // Reset the rocket's properties for a new flight cycle
            gsap.set(rocketRef.current, {
              x: 0, // Reset horizontal position
              y: 0, // Reset vertical position
              rotation: 0, // Reset rotation to 0 degrees
              scale: 1, // Reset scale to original size
              opacity: 1, // Reset opacity to fully visible
            })
            // Reapply the continuous floating animation to the rocket
            gsap.to(rocketRef.current, {
              y: 10, // Continue floating 10 pixels vertically
              rotation: 5, // Maintain slight oscillation with 5 degrees rotation
              yoyo: true, // Reverse the animation for continuous oscillation
              repeat: -1, // Repeat indefinitely
              ease: 'sine.inOut', // Use smooth sine easing
              duration: 3, // Duration of 3 seconds per oscillation cycle
            })
          }
        },
      })

    // Cleanup function to kill all GSAP animations when the component unmounts
    return () => {
      if (moonRef.current) gsap.killTweensOf(moonRef.current)
      if (rocketRef.current) gsap.killTweensOf(rocketRef.current)
      if (timelineRef.current) timelineRef.current.kill()
    }
  }, [])

  // Return the refs and the trigger function to control the animation externally
  return { containerRef, moonRef, rocketRef, triggerAnimation }
}
