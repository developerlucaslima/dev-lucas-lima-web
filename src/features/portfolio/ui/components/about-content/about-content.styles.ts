export const aboutContentStyles = {
  root: 'mx-auto py-12',
  headingReveal: 'mb-16 text-center',
  heading: 'mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl',
  headingRule: 'bg-foreground mx-auto h-0.5 w-20',
  contentContainer: 'container mx-auto max-w-5xl',
  contentRow: 'flex flex-wrap-reverse items-center justify-center gap-8 px-4',
  biography: 'flex w-full min-w-0 flex-col justify-center md:flex-1',
  paragraph: 'text-foreground/80 mb-6 text-base leading-relaxed sm:text-lg',
  profile: 'mb-24 flex h-96 w-full items-center justify-center md:flex-1',
  imageFrame:
    'border-ring/30 h-64 w-64 sm:h-80 sm:w-80 overflow-hidden rounded-full border-1',
  profileImage: 'relative h-full',
  aboutCardPosition: 'absolute top-52 right-0 sm:top-64',
  aboutCard: 'max-w-sm',
  codeIcon: 'text-foreground mr-2',
  links: 'text-foreground/80 hover:text-foreground mt-4',
  subtitle: 'overflow-hidden',
} as const
