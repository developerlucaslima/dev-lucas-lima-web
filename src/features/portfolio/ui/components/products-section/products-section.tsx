import { Card } from '@/components/shared/card/card'
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
      {content.cards.map((product) => (
        <ScrollReveal key={product.id}>
          <article aria-labelledby={`product-${product.id}`}>
            <Card className={styles.card}>
              <div className={styles.header}>
                <h3 id={`product-${product.id}`} className={styles.name}>
                  {product.name}
                </h3>
                <span className={styles.status}>{product.status}</span>
              </div>
              <p className={styles.role}>{product.role}</p>
              <p className={styles.role}>{product.date}</p>
              <p className={styles.summary}>{product.summary}</p>
              <ul className={styles.technologies}>
                {product.technologies.map((technology) => (
                  <li key={technology} className={styles.technology}>
                    {technology}
                  </li>
                ))}
              </ul>
              {product.href && (
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {content.linkLabel}
                </a>
              )}
            </Card>
          </article>
        </ScrollReveal>
      ))}
    </section>
  )
}
