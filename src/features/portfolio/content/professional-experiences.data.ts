import type { ProfessionalExperience } from './portfolio-content.types'

// Ordered by start date. Overlapping periods reflect the source records.
export const professionalExperiences = [
  { id: 'wefit', company: 'WeFit — Digital Service Design', start: '2025-09' },
  { id: 'chaozao', company: 'Chãozão', start: '2025-05', end: '2025-09' },
  {
    id: 'startu',
    company: 'StartU',
    start: '2024-09',
    end: '2025-02',
    href: 'https://startu.com.br/',
  },
  {
    id: 'visite-ai',
    company: 'Visite AI',
    start: '2024-06',
    end: '2025-04',
    href: 'https://visiteai.com.br',
  },
  {
    id: 'declink',
    company: 'Declink',
    start: '2023-05',
    end: '2024-05',
    href: 'https://declink.com.br/',
  },
  {
    id: 'santagroup',
    company: 'SantaGroup',
    start: '2022-07',
    end: '2023-07',
    href: 'https://www.santagroup.com.br/',
  },
  {
    id: 'freelance-design',
    company: 'Freelancer',
    start: '2019-10',
    end: '2023-01',
    href: 'https://www.behance.net/developerlucaslima',
  },
  {
    id: 'rota-sul',
    company: 'Rota Sul',
    start: '2015-06',
    end: '2022-03',
  },
  {
    id: 'rz-arquitetura',
    company: 'RZ Arquitetura',
    start: '2015-03',
    end: '2015-06',
    href: 'https://www.rzarquitetura.com.br/',
  },
  {
    id: 'sierra-moveis',
    company: 'Sierra Móveis',
    start: '2012-01',
    end: '2015-03',
    href: 'https://www.sierra.com.br/',
  },
] as const satisfies readonly ProfessionalExperience[]
