import { portfolioNavigationStyles as styles } from './portfolio-navigation.styles'
import type { PortfolioNavigationProps } from './portfolio-navigation.types'
export function PortfolioNavigation({
  label,
  links,
}: PortfolioNavigationProps) {
  return (
    <nav aria-label={label} className={styles.nav}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
