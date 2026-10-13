import type { IconType } from 'react-icons'
import { FaCss3, FaGithub, FaNodeJs, FaReact } from 'react-icons/fa'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiGraphql,
  SiJavascript,
  SiPostgresql,
  SiTypescript,
} from 'react-icons/si'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type {
  HardSkillContent,
  HardSkillIconKey,
} from '@/features/portfolio/content/portfolio-content.types'

const hardSkillIcons: Record<HardSkillIconKey, IconType> = {
  css: FaCss3,
  github: FaGithub,
  graphql: SiGraphql,
  javascript: SiJavascript,
  next: RiNextjsFill,
  node: FaNodeJs,
  postgresql: SiPostgresql,
  react: FaReact,
  tailwind: RiTailwindCssFill,
  typescript: SiTypescript,
}

export interface HardSkillProps extends HardSkillContent {
  onClick: () => void
  isOrganized: boolean
}

export function HardSkill({
  id,
  name,
  iconKey,
  onClick,
  isOrganized,
}: HardSkillProps) {
  const Icon = hardSkillIcons[iconKey]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            id={`hard-skill-${id}`}
            aria-label={`Toggle skills layout (${name})`}
            aria-pressed={isOrganized}
            className="focus-visible:outline-ring absolute top-0 left-0 z-10 flex h-[120px] w-[120px] cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 text-inherit focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={onClick}
          >
            <div
              data-is-organized={isOrganized}
              className="group text-foreground flex h-20 w-20 max-w-sm items-center justify-center rounded-xl bg-teal-500/10 shadow-md backdrop-blur-md transition delay-50 duration-150 ease-in-out hover:-translate-y-1 hover:scale-102 hover:opacity-100 hover:shadow-xs hover:shadow-teal-500/30 data-[is-organized=false]:opacity-30 data-[is-organized=true]:opacity-100"
            >
              <Icon
                aria-hidden="true"
                className="group-hover:hidden"
                size={25}
              />
              <span
                aria-hidden="true"
                className="hidden text-xs group-hover:block"
              >
                {name}
              </span>
            </div>
          </button>
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
