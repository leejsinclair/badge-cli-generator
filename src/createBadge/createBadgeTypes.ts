export const colors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#45B7D1',
  success: '#8AC46B',
  warning: '#FFD66B',
  info: '#6B88FF',
  error: '#FF6B87',
} as const

export function getColorHex(color: ColorName): string {
  return colors[color]
}

export function isValidColor(color: ColorName): boolean {
  return color in colors
}

export function getAvailableColors(): ColorName[] {
  return Object.keys(colors) as ColorName[]
}

export interface BadgeConfig {
  text: string
  color: ColorName
  output: string
  size?: number
  icon?: string
}

export type ColorName = keyof typeof colors
