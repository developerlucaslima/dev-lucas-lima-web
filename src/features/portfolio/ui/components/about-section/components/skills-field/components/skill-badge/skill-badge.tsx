import { Tooltip } from '@/components/shared/tooltip/tooltip'
import { TooltipContent } from '@/components/shared/tooltip-content/tooltip-content'
import { TooltipTrigger } from '@/components/shared/tooltip-trigger/tooltip-trigger'

import { hardSkillIcons } from './skill-badge.constants'
import { skillBadgeStyles } from './skill-badge.styles'
import type { SkillBadgeProps } from './skill-badge.types'

export function SkillBadge({
  id,
  name,
  iconKey,
  onClick,
  isOrganized,
  isMotionDisabled = false,
}: SkillBadgeProps) {
  const Icon = hardSkillIcons[iconKey]

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          disabled={isMotionDisabled}
          id={`hard-skill-${id}`}
          aria-label={`Toggle skills layout (${name})`}
          aria-pressed={isOrganized}
          className={skillBadgeStyles.trigger}
          onClick={onClick}
        >
          <div
            data-is-organized={isOrganized}
            className={skillBadgeStyles.badge}
          >
            <Icon
              aria-hidden="true"
              className={skillBadgeStyles.icon}
              size={25}
            />
            <span aria-hidden="true" className={skillBadgeStyles.name}>
              {name}
            </span>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p className={skillBadgeStyles.tooltip}>
          {isMotionDisabled
            ? 'Motion disabled by preference'
            : isOrganized
              ? 'Disable Gravity'
              : 'Enable Gravity'}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
