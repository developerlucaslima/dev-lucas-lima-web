export const skillBadgeStyles = {
  trigger:
    'group absolute top-0 left-0 z-10 flex h-[120px] w-[120px] cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 text-inherit focus-visible:outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2',
  badge:
    'fd-surface-glass flex h-20 w-20 items-center justify-center rounded-xl border text-primary transition duration-150 ease-in-out group-hover:-translate-y-1 group-hover:scale-102 group-hover:opacity-100 group-focus-visible:opacity-100 data-[is-organized=false]:opacity-30 data-[is-organized=true]:opacity-100',
  icon: 'group-hover:hidden group-focus-visible:hidden',
  name: 'hidden text-xs group-hover:block group-focus-visible:block',
  tooltip: 'text-foreground font-normal normal-case',
} as const
