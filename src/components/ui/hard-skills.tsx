import type { IconType } from 'react-icons'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export type HardSkillType = {
  id: number
  name: string
  icon: IconType
}

export interface HardSkillsProps extends HardSkillType {
  onClick: () => void
  isOrganized: boolean
}

export function HardSkills({
  id,
  name,
  icon: Icon,
  onClick,
  isOrganized,
}: HardSkillsProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            id={`hard-skill-${id}`}
            className="W-[120px] absolute top-0 left-0 z-10 flex h-[120px] cursor-pointer items-center justify-center"
            onClick={() => onClick()}
          >
            <div
              data-is-organized={isOrganized}
              className="group text-foreground flex h-20 w-20 max-w-sm items-center justify-center rounded-xl bg-teal-500/10 shadow-md backdrop-blur-md transition delay-50 duration-150 ease-in-out hover:-translate-y-1 hover:scale-102 hover:opacity-100 hover:shadow-xs hover:shadow-teal-500/30 data-[is-organized=false]:opacity-30 data-[is-organized=true]:opacity-100"
            >
              <Icon className="group-hover:hidden" size={25} />
              <p className="hidden text-xs group-hover:block">{name}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="uppercase">
            {isOrganized ? 'Disable Gravity' : 'Enable Gravity'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
