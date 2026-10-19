export const philosophySectionStyles = {
  section: 'container mx-auto flex max-w-5xl flex-col px-6 py-16',
  headingReveal: 'mb-16 text-center',
  heading: 'fd-text-section mb-4',
  headingRule: 'bg-primary mx-auto h-0.5 w-12 rounded-full',
  cards: 'grid gap-6 sm:grid-cols-2',
  card: 'h-full min-h-60 w-full max-w-none',
  cardTitle: 'flex items-center gap-2',
  icon: 'text-primary shrink-0',
  title: 'fd-text-card',
  footer: 'mt-auto justify-end text-sm text-muted-foreground',
  description: 'fd-text-body text-muted-foreground',
} as const
