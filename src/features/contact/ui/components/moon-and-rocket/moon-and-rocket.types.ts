import type { RefObject } from 'react'

export interface MoonAndRocketProps {
  readonly moonRef: RefObject<SVGSVGElement | null>
  readonly rocketRef: RefObject<SVGSVGElement | null>
}
