export const journeySectionStyles = {
  section: 'container mx-auto flex max-w-5xl scroll-mt-8 flex-col px-6 py-16',
  headingReveal: 'mb-12 text-center',
  heading: 'fd-text-section mb-4',
  headingRule: 'bg-primary mx-auto h-0.5 w-12 rounded-full',
  timeline:
    'relative flex list-none flex-col gap-6 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-px md:before:bg-border',
  timelineEntry: 'group relative flex',
  leftEntry: 'md:justify-start',
  rightEntry: 'md:justify-end',
  timelineDot:
    'absolute top-10 left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-primary md:block',
  cardReveal: 'w-full min-w-0 md:w-[calc(50%-1.5rem)]',
} as const
