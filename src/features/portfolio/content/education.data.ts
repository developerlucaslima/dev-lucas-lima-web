export const education = {
  institution: 'Descomplica Faculdade Digital',
  completedIn: '2025',
  status: 'completed',
  complementary: {
    institution: 'Rocketseat',
    courses: [
      { id: 'backend-node', completedIn: '2024' },
      { id: 'frontend-next', completedIn: '2024' },
      { id: 'backend-java', completedIn: '2024' },
      { id: 'go-fundamentals', completedIn: '2024' },
      { id: 'aws-fundamentals', completedIn: '2025' },
    ],
  },
} as const

export const englishCertificate = {
  name: 'EF SET',
  score: '66/100',
  level: 'C1 Advanced',
  issuedIn: '2024-08',
  href: 'https://cert.efset.org/XGQjqF',
} as const
