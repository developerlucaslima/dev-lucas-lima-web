import type { AboutSectionProps } from './about-section.types'
import { SkillsField } from './components/skills-field/skills-field'

export function AboutSection({ children, hardSkills }: AboutSectionProps) {
  return (
    <section id="about">
      <SkillsField hardSkills={hardSkills}>{children}</SkillsField>
    </section>
  )
}
