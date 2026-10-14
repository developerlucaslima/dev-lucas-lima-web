export const productsSectionStyles = {
  section: 'container mx-auto max-w-5xl scroll-mt-8 px-6 py-16',
  headingReveal: 'mb-12 text-center',
  heading: 'mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl',
  rule: 'mx-auto h-0.5 w-20 bg-foreground',
  card: 'relative max-w-none overflow-hidden border border-teal-500/30 p-6 sm:p-10',
  header: 'flex flex-wrap items-center justify-between gap-4',
  name: 'text-3xl font-light sm:text-4xl',
  status:
    'rounded-full border border-teal-500/30 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-300',
  role: 'text-sm font-medium text-foreground/70',
  summary: 'max-w-3xl text-lg leading-relaxed text-foreground/85',
  technologies: 'flex list-none flex-wrap gap-2 py-2',
  technology: 'rounded-md bg-teal-500/10 px-3 py-1 text-xs text-foreground/80',
  link: 'self-start rounded-sm text-sm font-medium underline underline-offset-4 hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 dark:hover:text-teal-300',
} as const
