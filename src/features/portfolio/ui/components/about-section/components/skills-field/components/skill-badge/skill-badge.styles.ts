export const skillBadgeStyles = {
  trigger:
    'focus-visible:outline-ring absolute top-0 left-0 z-10 flex h-[120px] w-[120px] cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 text-inherit focus-visible:outline-2 focus-visible:outline-offset-2',
  badge:
    'group text-foreground flex h-20 w-20 max-w-sm items-center justify-center rounded-xl bg-teal-500/10 shadow-md backdrop-blur-md transition delay-50 duration-150 ease-in-out hover:-translate-y-1 hover:scale-102 hover:opacity-100 hover:shadow-xs hover:shadow-teal-500/30 data-[is-organized=false]:opacity-30 data-[is-organized=true]:opacity-100',
  icon: 'group-hover:hidden',
  name: 'hidden text-xs group-hover:block',
  tooltip: 'uppercase',
} as const
