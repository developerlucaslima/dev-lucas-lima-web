import 'server-only'

import type { AppLocale } from '@/i18n/config'
import { appMessages } from '@/i18n/messages'

import { education, englishCertificate } from './education.data'
import {
  formatProfessionalDate,
  formatProfessionalPeriod,
} from './format-professional-period'
import { personalProjects } from './personal-projects.data'
import type {
  PortfolioContent,
  ProfessionalExperience,
} from './portfolio-content.types'
import {
  hardSkills,
  portfolioProfile,
  skillGroups,
} from './portfolio-profile.data'
import { professionalExperiences } from './professional-experiences.data'

export function getPortfolioContent(locale: AppLocale): PortfolioContent {
  const copy = appMessages[locale].Portfolio
  return {
    navigation: {
      label: copy.navigation.label,
      links: (
        ['about', 'products', 'journey', 'skills', 'contact'] as const
      ).map((id) => ({ id, label: copy.navigation.links[id] })),
    },
    hero: { ...copy.hero, sectionTitle: portfolioProfile.name },
    about: {
      sectionTitle: copy.about.sectionTitle,
      paragraphs: Object.values(copy.about.paragraphs),
      image: { ...portfolioProfile.image, alt: copy.about.imageAlt },
      aboutCard: {
        title: portfolioProfile.name,
        links: portfolioProfile.socialLinks.map((link) => ({
          ...link,
          accessibleName: copy.about.socialLabels[link.iconKey],
        })),
      },
    },
    philosophy: {
      sectionTitle: copy.philosophy.sectionTitle,
      cards: [
        { ...copy.philosophy.cards[0], iconKey: 'smilePlus' },
        { ...copy.philosophy.cards[1], iconKey: 'clover' },
        { ...copy.philosophy.cards[2], iconKey: 'handHelping' },
        { ...copy.philosophy.cards[3], iconKey: 'clock' },
      ],
    },
    journey: {
      sectionTitle: copy.journey.sectionTitle,
      detailsLabel: copy.journey.detailsLabel,
      companyLinkLabel: copy.journey.companyLinkLabel,
      cards: professionalExperiences.map((experience) => {
        const facts: ProfessionalExperience = experience
        return {
          id: facts.id,
          company: facts.company,
          href: facts.href,
          date: formatProfessionalPeriod(
            facts.start,
            facts.end,
            locale,
            copy.journey.present,
          ),
          ...copy.journey.experiences[experience.id],
        }
      }),
    },
    hardSkills,
    products: {
      sectionTitle: copy.products.sectionTitle,
      linkLabel: copy.products.linkLabel,
      cards: personalProjects.map((project) => ({
        ...project,
        ...copy.products.items[project.id],
        date: formatProfessionalPeriod(
          project.start,
          undefined,
          locale,
          copy.journey.present,
        ),
        status: copy.products.statuses[project.status],
      })),
    },
    professionalSummary: {
      sectionTitle: copy.professionalSummary.sectionTitle,
      groups: skillGroups.map((group) => {
        const groupCopy = copy.professionalSummary.groups[group.id]
        return {
          id: group.id,
          title: groupCopy.title,
          description: groupCopy.description,
          technologies: [
            ...group.technologies,
            ...('additionalSkills' in groupCopy
              ? groupCopy.additionalSkills
              : []),
          ],
        }
      }),
      education: {
        sectionTitle: copy.professionalSummary.education.sectionTitle,
        course: copy.professionalSummary.education.course,
        institution: education.institution,
        completion: `${copy.professionalSummary.education.completed} ${formatProfessionalDate(education.completedIn, locale)}`,
        complementary: {
          title: `${copy.professionalSummary.education.complementary.title} — ${education.complementary.institution}`,
          courses: education.complementary.courses.map(
            ({ id, completedIn }) => ({
              id,
              label:
                copy.professionalSummary.education.complementary.courses[id],
              completion: `${copy.professionalSummary.education.completed} ${formatProfessionalDate(completedIn, locale)}`,
            }),
          ),
        },
      },
      languages: {
        title: copy.professionalSummary.languages.title,
        items: copy.professionalSummary.languages.items,
        certificate: {
          title: `${englishCertificate.name} · ${englishCertificate.score} · ${englishCertificate.level}`,
          scope: copy.professionalSummary.languages.certificate.scope,
          issued: `${copy.professionalSummary.languages.certificate.issued} ${formatProfessionalDate(englishCertificate.issuedIn, locale)}`,
          href: englishCertificate.href,
          linkLabel: copy.professionalSummary.languages.certificate.linkLabel,
        },
      },
    },
  }
}
