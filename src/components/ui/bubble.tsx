import type { IconType } from 'react-icons'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface BubbleProps {
  id: number
  initialX: number
  initialY: number
  name: string
  icon: IconType
  onClick: () => void
  isOrganized: boolean
}

export function Bubble({
  id,
  initialX,
  initialY,
  onClick,
  name,
  icon: Icon,
  isOrganized,
}: BubbleProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            id={`bubble-${id}`}
            className="W-[120px] absolute top-0 left-0 z-10 flex h-[120px] cursor-pointer items-center justify-center"
            style={{
              transform: `translate(${initialX}px, ${initialY}px)`,
            }}
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            <div
              data-is-organized={isOrganized}
              className="group border-ring/30 text-foreground flex h-20 w-20 max-w-sm items-center justify-center rounded-full border-1 bg-black/10 backdrop-blur-lg hover:opacity-100 data-[is-organized=false]:opacity-30 data-[is-organized=true]:opacity-100"
            >
              <Icon className="group-hover:hidden" size={25} />
              <p className="hidden text-xs group-hover:block">{name}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="uppercase">
            click to {isOrganized ? 'release' : 'click  '}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
