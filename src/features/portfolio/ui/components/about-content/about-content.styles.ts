export const aboutContentStyles = {
  root: 'mx-auto py-12',
  headingReveal: 'mb-16 text-center',
  heading: 'fd-text-section mb-4',
  headingRule: 'bg-primary mx-auto h-0.5 w-12 rounded-full',
  contentContainer: 'container mx-auto max-w-5xl',
  contentRow: 'flex flex-wrap-reverse items-center justify-center gap-8 px-4',
  biography: 'flex w-full min-w-0 flex-col justify-center md:flex-1',
  paragraph: 'fd-text-body text-foreground/80 mb-6',
  profile: 'mb-24 flex h-96 w-full items-center justify-center md:flex-1',
  imageFrame:
    'border-border h-64 w-64 sm:h-80 sm:w-80 overflow-hidden rounded-full border-1',
  profileImage: 'relative h-full',
  aboutCardPosition: 'absolute top-52 right-0 sm:top-64',
  aboutCard: 'w-64 max-w-sm sm:w-72',
  cardTitle: 'fd-text-card flex items-center gap-2',
  cardName: 'uppercase',
  cardContent: 'text-sm text-muted-foreground',
  cardFooter: 'mt-auto justify-end gap-4 text-sm text-muted-foreground',
  codeIcon: 'text-foreground mr-2',
  links:
    'rounded-md p-2 text-muted-foreground transition-colors hover:bg-surface-interactive hover:text-primary',
  subtitle: 'overflow-hidden',
} as const
