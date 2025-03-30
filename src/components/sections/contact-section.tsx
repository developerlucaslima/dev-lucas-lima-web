'use client'

import { gsap } from 'gsap'
import { Send } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const characterRef = useRef<SVGSVGElement>(null)
  const leftEyeRef = useRef<SVGCircleElement>(null)
  const rightEyeRef = useRef<SVGCircleElement>(null)
  const antennaRef = useRef<SVGPathElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Animate form elements on scroll
    const formElements =
      formRef.current?.querySelectorAll('.form-element') || []

    if (formElements.length > 0) {
      gsap.fromTo(
        formElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        },
      )
    }

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
  }, [])

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div className="container px-4 py-20 md:px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Form Side */}
          <div className="w-full lg:w-1/2">
            <Card className="mx-auto w-full max-w-md">
              <CardHeader>
                <CardTitle className="form-element text-2xl">
                  Get In Touch
                </CardTitle>
                <CardDescription className="form-element">
                  Send me a message and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={formRef} className="space-y-4">
                  <div className="form-element space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="form-element space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="form-element space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      className="min-h-[120px]"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="form-element w-full" type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Character Side */}
          <div className="flex w-full items-center justify-center lg:w-1/2">
            <svg
              ref={characterRef}
              width="250"
              height="300"
              viewBox="0 0 250 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xl"
            >
              {/* Body */}
              <ellipse cx="125" cy="180" rx="70" ry="90" fill="#6366F1" />

              {/* Head */}
              <circle cx="125" cy="100" r="60" fill="#818CF8" />

              {/* Antenna */}
              <path
                ref={antennaRef}
                d="M125 40 L125 10 Q130 0 135 10 L135 20"
                stroke="#C7D2FE"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="135" cy="10" r="6" fill="#E0E7FF" />

              {/* Eyes */}
              <circle cx="105" cy="90" r="15" fill="white" />
              <circle cx="145" cy="90" r="15" fill="white" />
              <circle ref={leftEyeRef} cx="105" cy="90" r="7" fill="#1E293B" />
              <circle ref={rightEyeRef} cx="145" cy="90" r="7" fill="#1E293B" />

              {/* Mouth */}
              <path
                d="M105 120 Q125 140 145 120"
                stroke="#1E293B"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Arms */}
              <path
                d="M55 160 Q35 180 45 210"
                stroke="#818CF8"
                strokeWidth="12"
                strokeLinecap="round"
                className="origin-[55px_160px] animate-[wave_2s_ease-in-out_infinite]"
              />
              <path
                d="M195 160 Q215 180 205 210"
                stroke="#818CF8"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Legs */}
              <path
                d="M95 260 L85 290"
                stroke="#818CF8"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M155 260 L165 290"
                stroke="#818CF8"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Add wave animation for the arm */}
      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(20deg);
          }
        }
      `}</style>
    </div>
  )
}
