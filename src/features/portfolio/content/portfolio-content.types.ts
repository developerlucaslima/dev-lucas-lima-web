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
  | 'nestjs'
  | 'java'
  | 'spring'

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
  readonly id: string
  readonly date: string
  readonly title: string
  readonly company: string
  readonly href?: string
  readonly summary: string
  readonly contributions: readonly string[]
}

export interface JourneySectionContent {
  readonly sectionTitle: string
  readonly cards: readonly JourneyCardContent[]
  readonly detailsLabel: string
  readonly companyLinkLabel: string
}

export interface HardSkillContent {
  readonly id: number
  readonly iconKey: HardSkillIconKey
  readonly name: string
}

export interface ProfessionalExperience {
  readonly id: string
  readonly company: string
  readonly start: string
  readonly end?: string
  readonly href?: string
}
export interface ContentLink {
  readonly href: string
  readonly label: string
}

export interface ProductSectionContent {
  readonly sectionTitle: string
  readonly cards: readonly {
    readonly id: string
    readonly name: string
    readonly logo?: {
      readonly src: string
      readonly width: number
      readonly height: number
    }
    readonly date?: string
    readonly status: string
    readonly statusTone: 'warning' | 'success'
    readonly role: string
    readonly summary: string
    readonly technologies: readonly string[]
    readonly links: readonly ContentLink[]
  }[]
}
export interface ProfessionalSummaryContent {
  readonly sectionTitle: string
  readonly groups: readonly {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly technologies: readonly string[]
  }[]
  readonly education: {
    readonly sectionTitle: string
    readonly institution: string
    readonly course: string
    readonly completion: string
    readonly institutionLink: ContentLink
    readonly diploma?: ContentLink
    readonly complementary: {
      readonly title: string
      readonly link: ContentLink
      readonly courses: readonly {
        readonly id: string
        readonly label: string
        readonly completion: string
      }[]
    }
  }
  readonly languages: {
    readonly title: string
    readonly items: readonly string[]
    readonly certificate: {
      readonly title: string
      readonly scope: string
      readonly issued: string
      readonly href: string
      readonly linkLabel: string
    }
  }
}

export interface PortfolioContent {
  readonly navigation: {
    readonly label: string
    readonly links: readonly { readonly id: string; readonly label: string }[]
  }
  readonly hero: HeroContent
  readonly about: AboutSectionContent
  readonly philosophy: PhilosophySectionContent
  readonly journey: JourneySectionContent
  readonly hardSkills: readonly HardSkillContent[]
  readonly products: ProductSectionContent
  readonly professionalSummary: ProfessionalSummaryContent
}
