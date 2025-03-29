import type { LucideIcon } from 'lucide-react'

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
  icon: LucideIcon
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
            className="absolute cursor-pointer"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${initialX}px, ${initialY}px)`,
              width: '80px',
              height: '80px',
              zIndex: 10,
            }}
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            <div
              data-is-organized={isOrganized}
              className="group border-ring/30 text-foreground flex h-20 w-20 max-w-sm items-center justify-center rounded-full border-1 bg-black/10 p-8 backdrop-blur-lg hover:animate-bounce hover:opacity-100 data-[is-organized=false]:opacity-30 data-[is-organized=true]:opacity-100"
            >
              <Icon className="group-hover:hidden" size={30} />
              <p className="hidden text-xs group-hover:block">{name}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to {isOrganized ? 'float' : 'organize'} bubbles</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
