'use client'

import { gsap } from 'gsap'
import { useCallback, useEffect, useRef } from 'react'

import {
  SKILL_BADGE_SIZE,
  SKILL_FLOATING_CONFIG,
} from '../skills-field.constants'
import {
  advanceSkillFloatingState,
  createSkillFloatingStates,
  getSkillFloatingBounds,
  resizeSkillFloatingState,
} from '../skills-field.utils'
import type {
  SkillFloatingActor,
  SkillFloatingController,
  UseFloatHardSkillsProps,
} from './use-float-hard-skills.types'

export function useFloatHardSkills({
  hardSkills,
  hardSkillsSectionRef,
}: UseFloatHardSkillsProps) {
  const controllerRef = useRef<SkillFloatingController | null>(null)
  const hasInitializedRef = useRef(false)

  const stopFloating = useCallback(() => {
    controllerRef.current?.stop()
    controllerRef.current = null
  }, [])

  const floatHardSkills = useCallback(() => {
    const container = hardSkillsSectionRef.current
    if (!container) return
    if (controllerRef.current) {
      controllerRef.current.resize()
      return
    }

    const measureBounds = () =>
      getSkillFloatingBounds({
        containerWidth: container.clientWidth,
        containerHeight: container.clientHeight,
        skillSize: SKILL_BADGE_SIZE,
      })
    let bounds = measureBounds()
    const initialStates = createSkillFloatingStates({
      containerWidth: container.clientWidth,
      containerHeight: container.clientHeight,
      skillCount: hardSkills.length,
      skillSize: SKILL_BADGE_SIZE,
      config: SKILL_FLOATING_CONFIG,
      random: Math.random,
    })
    const actors: SkillFloatingActor[] = hardSkills.flatMap((skill, index) => {
      const element = document.getElementById(`hard-skill-${skill.id}`)
      if (!element) return []

      gsap.killTweensOf(element)
      const state = hasInitializedRef.current
        ? {
            ...initialStates[index],
            x: Number(gsap.getProperty(element, 'x')) || 0,
            y: Number(gsap.getProperty(element, 'y')) || 0,
          }
        : initialStates[index]
      gsap.set(element, { x: state.x, y: state.y })
      const setX = gsap.quickSetter(element, 'x', 'px')
      const setY = gsap.quickSetter(element, 'y', 'px')
      return [
        {
          element,
          state,
          setX: (value: number) => setX(value),
          setY: (value: number) => setY(value),
        },
      ]
    })
    hasInitializedRef.current = true

    const renderActor = (actor: SkillFloatingActor) => {
      actor.setX(actor.state.x)
      actor.setY(actor.state.y)
    }
    const resize = () => {
      const nextBounds = measureBounds()
      if (nextBounds.maxX === bounds.maxX && nextBounds.maxY === bounds.maxY) {
        return
      }
      actors.forEach((actor) => {
        actor.state = resizeSkillFloatingState({
          state: actor.state,
          previousBounds: bounds,
          bounds: nextBounds,
        })
        renderActor(actor)
      })
      bounds = nextBounds
    }

    let lastTime: number | null = null
    const resetClock = () => {
      lastTime = null
    }
    const tick = (time: number) => {
      if (document.hidden || lastTime === null) {
        lastTime = document.hidden ? null : time
        return
      }
      const deltaSeconds = time - lastTime
      lastTime = time
      actors.forEach((actor) => {
        if (actor.element.matches(':hover, :focus-visible')) {
          return
        }
        actor.state = advanceSkillFloatingState({
          state: actor.state,
          bounds,
          deltaSeconds,
          config: SKILL_FLOATING_CONFIG,
          random: Math.random,
        })
        renderActor(actor)
      })
    }

    const observer = new ResizeObserver(resize)
    observer.observe(container)
    document.addEventListener('visibilitychange', resetClock)
    gsap.ticker.add(tick)
    controllerRef.current = {
      resize,
      stop: () => {
        gsap.ticker.remove(tick)
        observer.disconnect()
        document.removeEventListener('visibilitychange', resetClock)
      },
    }
  }, [hardSkills, hardSkillsSectionRef])

  useEffect(() => stopFloating, [stopFloating])

  return { floatHardSkills, stopFloating }
}
