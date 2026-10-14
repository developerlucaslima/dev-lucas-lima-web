export const journeySectionStyles = {
  section: 'container mx-auto flex min-h-screen max-w-3xl flex-col p-16',
  headingReveal: 'mb-16 text-center',
  heading: 'mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl',
  headingRule: 'bg-foreground mx-auto h-0.5 w-20',
  timeline: 'relative flex flex-col gap-4',
  timelineLine:
    'sm:bg-ring/30 absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 transform',
  timelineEntry:
    'group relative flex transition delay-50 duration-150 ease-in-out hover:-translate-y-1 hover:scale-102',
  timelineDot:
    'sm:group-hover:bg-foreground/70 absolute top-1/2 left-1/2 z-10 flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full transition delay-50 duration-150 ease-in-out sm:bg-teal-500/30',
  card: 'group-hover:border-foreground/30 max-w-52 min-w-52 p-6',
  company: 'text-foreground/80 -mt-2',
  date: 'text-foreground/80 text-sm',
} as const
