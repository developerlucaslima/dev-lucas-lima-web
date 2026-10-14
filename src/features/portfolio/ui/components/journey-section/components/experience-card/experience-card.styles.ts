export const experienceCardStyles = {
  card: 'max-w-none border border-teal-500/20 p-6 transition-colors hover:border-teal-500/50',
  date: 'text-sm text-foreground/70',
  company: 'text-xl font-medium leading-snug',
  role: 'text-sm font-medium text-teal-700 dark:text-teal-300',
  summary: 'text-foreground/85 text-base leading-relaxed',
  details: 'border-t border-teal-500/20 pt-4',
  trigger:
    'cursor-pointer rounded-sm text-sm font-medium text-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500',
  contributions:
    'mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-foreground/80',
  link: 'self-start rounded-sm text-sm underline underline-offset-4 hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 dark:hover:text-teal-300',
} as const
