import { ShootingStars } from './shooting-stars/shooting-stars'
import { spaceBackgroundStyles } from './space-background.styles'
import { StarField } from './star-field/star-field'

export function SpaceBackground() {
  return (
    <div aria-hidden="true" className={spaceBackgroundStyles.root}>
      <StarField />
      <ShootingStars />
    </div>
  )
}
