import { Clock, Clover, HandHelping, SmilePlus } from 'lucide-react'

export const philosophyConfig = {
  title: 'philosophy',
  cards: [
    {
      icon: SmilePlus,
      title: 'Kaizen ',
      description: [
        'Continuous, incremental improvement in every aspect of life and work.',
      ],
      footer: '改善',
    },
    {
      icon: Clover,
      title: 'Ikigai ',
      description: [
        'Where passion, mission, vocation, and profession converge to give life meaning.',
      ],
      footer: '生き甲斐',
    },
    {
      icon: HandHelping,
      title: 'Omoiyari',
      description: [
        'Genuine empathy and proactive care for others, foster harmony, respect, and deeper connections.',
      ],
      footer: '思いやり',
    },
    {
      icon: Clock,
      title: 'Shikata ga nai',
      description: [
        'Embraces the inevitable flow of time and the acceptance of circumstances that cannot be changed.',
      ],
      footer: '仕方がない',
    },
  ],
}
