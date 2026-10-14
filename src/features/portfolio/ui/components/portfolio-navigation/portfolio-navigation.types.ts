export interface PortfolioNavigationProps {
  readonly label: string
  readonly links: readonly { readonly id: string; readonly label: string }[]
}
