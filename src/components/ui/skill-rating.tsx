import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface SkillRatingProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  skill: string
  icon: string
  min?: number
  max?: number
  rating: number
  className?: string
}

function SkillRatingBadge({
  icon,
  className,
  ...props
}: {
  icon: string
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-background dark:bg-input/30 dark:border-input flex h-9 items-center justify-center rounded-sm border p-2 shadow-xs',
        className,
      )}
      {...props}
    >
      <span className="text-foreground font-bold">{icon}</span>
    </div>
  )
}

function SkillRatingLabel({
  skill,
  rating,
  max = 5,
  className,
  ...props
}: {
  skill: string
  rating: number
  max: number
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'text-secondary-foreground my-0 flex items-center justify-between text-sm',
        className,
      )}
      {...props}
    >
      <span>{skill}</span>
      <span>
        {rating} / {max}
      </span>
    </div>
  )
}

function SkillRatingBar({
  min = 0,
  max = 5,
  rating,
  className,
  ...props
}: Pick<SkillRatingProps, 'min' | 'max' | 'rating' | 'className'> &
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>) {
  const progressPercentage = ((rating - min) / (max - min)) * 100
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-primary/20 relative my-0 h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full transition-all"
        style={{ width: `${progressPercentage}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

export function SkillRating({
  skill,
  icon,
  min = 0,
  max = 5,
  rating,
  className,
  ...props
}: SkillRatingProps) {
  return (
    <div className={cn('flex items-center space-x-4', className)}>
      <SkillRatingBadge icon={icon} />
      <div className="w-full max-w-md min-w-xs space-y-2">
        <SkillRatingLabel skill={skill} rating={rating} max={max} />
        <SkillRatingBar min={min} max={max} rating={rating} {...props} />
      </div>
    </div>
  )
}
