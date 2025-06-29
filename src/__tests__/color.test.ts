import {
  colors,
  getColorHex,
  isValidColor,
  getAvailableColors,
  type ColorName,
} from '../createBadge/createBadgeTypes'
import { describe, it, expect } from '@jest/globals'

describe('Color Utils', () => {
  it('should have correct color definitions', () => {
    expect(colors).toEqual({
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#45B7D1',
      success: '#8AC46B',
      warning: '#FFD66B',
      info: '#6B88FF',
      error: '#FF6B87',
    })
  })

  it('should return correct hex color', () => {
    expect(getColorHex('primary' as ColorName)).toBe('#FF6B6B')
    expect(getColorHex('secondary' as ColorName)).toBe('#4ECDC4')
    expect(getColorHex('accent' as ColorName)).toBe('#45B7D1')
    expect(getColorHex('success' as ColorName)).toBe('#8AC46B')
    expect(getColorHex('warning' as ColorName)).toBe('#FFD66B')
    expect(getColorHex('info' as ColorName)).toBe('#6B88FF')
    expect(getColorHex('error' as ColorName)).toBe('#FF6B87')
  })

  it('should validate colors correctly', () => {
    expect(isValidColor('primary' as ColorName)).toBe(true)
    expect(isValidColor('secondary' as ColorName)).toBe(true)
    expect(isValidColor('invalid' as ColorName)).toBe(false)
  })

  it('should return all available colors', () => {
    expect(getAvailableColors()).toEqual([
      'primary',
      'secondary',
      'accent',
      'success',
      'warning',
      'info',
      'error',
    ])
  })
})
