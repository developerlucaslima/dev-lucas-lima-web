import type { RefObject } from 'react'

export interface MoonAndRocketProps {
  readonly moonRef: RefObject<SVGSVGElement | null>
  readonly moonTitle: string
  readonly rocketTitle: string
  readonly rocketRef: RefObject<SVGSVGElement | null>
}
