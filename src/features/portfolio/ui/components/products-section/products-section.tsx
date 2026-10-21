import { Badge } from '@fradelli/ui/badge'
import { Card } from '@fradelli/ui/card'
import Image from 'next/image'

import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'

import { productsSectionStyles as styles } from './products-section.styles'
import type { ProductsSectionProps } from './products-section.types'
export function ProductsSection({ content }: ProductsSectionProps) {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className={styles.section}
    >
      <ScrollReveal className={styles.headingReveal}>
        <h2 id="products-heading" className={styles.heading}>
          {content.sectionTitle}
        </h2>
        <div className={styles.rule} />
      </ScrollReveal>
      <div className={styles.cards}>
        {content.cards.map((product) => (
          <ScrollReveal key={product.id}>
            <article aria-labelledby={`product-${product.id}`}>
              <Card className={styles.card}>
                <div className={styles.header}>
                  <div className={styles.identity}>
                    {product.logo && (
                      <Image
                        src={product.logo.src}
                        width={product.logo.width}
                        height={product.logo.height}
                        alt=""
                        sizes="96px"
                        className={styles.logo}
                      />
                    )}
                    <h3 id={`product-${product.id}`} className={styles.name}>
                      {product.name}
                    </h3>
                  </div>
                  <Badge variant={product.statusTone} className={styles.status}>
                    {product.status}
                  </Badge>
                </div>
                <p className={styles.role}>{product.role}</p>
                {product.date && <p className={styles.role}>{product.date}</p>}
                <p className={styles.summary}>{product.summary}</p>
                <ul className={styles.technologies}>
                  {product.technologies.map((technology) => (
                    <li key={technology}>
                      <Badge variant="secondary" className={styles.technology}>
                        {technology}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <div className={styles.actions}>
                  {product.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </Card>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
