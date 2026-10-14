export type PhilosophyIconKey = 'clock' | 'clover' | 'handHelping' | 'smilePlus'

export type HardSkillIconKey =
  | 'css'
  | 'github'
  | 'graphql'
  | 'javascript'
  | 'next'
  | 'node'
  | 'postgresql'
  | 'react'
  | 'tailwind'
  | 'typescript'

export type SocialIconKey = 'github' | 'linkedin'

export interface HeroContent {
  readonly sectionTitle: string
  readonly subtitles: readonly string[]
  readonly scrollDown: string
}

export interface SocialLinkContent {
  readonly href: string
  readonly iconKey: SocialIconKey
  readonly accessibleName: string
}

export interface AboutSectionContent {
  readonly sectionTitle: string
  readonly paragraphs: readonly string[]
  readonly aboutCard: {
    readonly title: string
    readonly links: readonly SocialLinkContent[]
  }
  readonly image: {
    readonly src: string
    readonly alt: string
    readonly width: number
    readonly height: number
  }
}

export interface PhilosophyCardContent {
  readonly iconKey: PhilosophyIconKey
  readonly title: string
  readonly description: readonly string[]
  readonly footer: string
}

export interface PhilosophySectionContent {
  readonly sectionTitle: string
  readonly cards: readonly PhilosophyCardContent[]
}

export interface JourneyCardContent {
  readonly date: string
  readonly title: string
  readonly company: string
  readonly href: string
}

export interface JourneySectionContent {
  readonly sectionTitle: string
  readonly cards: readonly JourneyCardContent[]
}

export interface HardSkillContent {
  readonly id: number
  readonly iconKey: HardSkillIconKey
  readonly name: string
}

export interface PortfolioContent {
  readonly hero: HeroContent
  readonly about: AboutSectionContent
  readonly philosophy: PhilosophySectionContent
  readonly journey: JourneySectionContent
  readonly hardSkills: readonly HardSkillContent[]
}

export interface StaticPortfolioContent {
  readonly hero: HeroContent
  readonly about: {
    readonly sectionTitle: string
    readonly paragraphs: {
      readonly introduction: string
      readonly developerJourney: string
      readonly professionalExperience: string
    }
    readonly aboutCard: AboutSectionContent['aboutCard']
    readonly image: AboutSectionContent['image']
  }
  readonly philosophy: PhilosophySectionContent
  readonly journey: JourneySectionContent
  readonly hardSkills: readonly HardSkillContent[]
}
