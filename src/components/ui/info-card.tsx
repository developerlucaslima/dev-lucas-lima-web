import type { LucideIcon } from 'lucide-react'

import { Card, CardContent, CardFooter, CardTitle } from './card'

// TODO: change to composition pattern

interface InfoCardProps {
  Icon: LucideIcon
  title: string
  details: string[]
  footer?: React.ReactNode
}

export function InfoCard({ Icon, title, details, footer }: InfoCardProps) {
  return (
    <Card className="border-ring/30 bg-black/10 p-8 backdrop-blur-lg">
      <CardTitle className="m-0 flex items-center p-0">
        <Icon className="text-foreground mr-2" size={20} />
        <h3 className="text-lg font-semibold uppercase">{title}</h3>
      </CardTitle>
      <CardContent className="text-muted-foreground m-0 mb-auto flex flex-col gap-1 p-0 text-sm">
        {details.map((detail, index) => (
          <p key={index} className="overflow-hidden">
            {detail}
          </p>
        ))}
      </CardContent>
      {footer && (
        <CardFooter className="m-0 ml-auto flex gap-4 p-0">{footer}</CardFooter>
      )}
    </Card>
  )
}
