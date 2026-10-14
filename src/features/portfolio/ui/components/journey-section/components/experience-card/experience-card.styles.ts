export const experienceCardStyles = {
  card: 'max-w-none border border-border p-6 transition-colors hover:border-primary/50',
  date: 'text-sm text-foreground/70',
  company: 'portfolio-card-title',
  role: 'text-sm font-medium text-primary',
  summary: 'text-foreground/85 text-base leading-relaxed',
  details: 'border-t border-border pt-4',
  trigger:
    'cursor-pointer rounded-sm text-sm font-medium text-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring',
  contributions:
    'mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-foreground/80',
  link: 'self-start rounded-sm text-sm underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring',
} as const
