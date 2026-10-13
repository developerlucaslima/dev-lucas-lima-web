export const aboutContentStyles = {
  root: 'm-8 mx-auto',
  headingReveal: 'mb-16 text-center',
  heading: 'mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl',
  headingRule: 'bg-foreground mx-auto h-0.5 w-20',
  contentContainer: 'container mx-auto max-w-5xl',
  contentRow: 'flex flex-wrap-reverse items-center justify-center gap-8 px-4',
  biography: 'flex flex-1 flex-col justify-center px-4',
  paragraph:
    'text-muted-foreground mb-6 text-justify indent-8 text-lg leading-relaxed hyphens-none',
  profile: 'mb-32 flex h-96 flex-1 items-center justify-center',
  imageFrame: 'border-ring/30 h-80 w-80 overflow-hidden rounded-full border-1',
  profileImage: 'relative h-full',
  aboutCardPosition: 'absolute top-64 right-0',
  aboutCard: 'max-w-sm',
  codeIcon: 'text-foreground mr-2',
  links: 'text-foreground/80 hover:text-foreground mt-4',
  subtitle: 'overflow-hidden',
} as const
