import { Icon } from '../components/icon/icon'
import { createCanvas, type CanvasRenderingContext2D } from 'canvas'
import { describe, it, expect, jest } from '@jest/globals'

const mockImage = new Image()
mockImage.onload = jest.fn()
mockImage.src = ''

const mockCanvas = createCanvas(200, 200)
const mockCtx = mockCanvas.getContext('2d') as CanvasRenderingContext2D

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}))

jest.mock('path', () => ({
  join: jest.fn((...args: string[]) => args.join('/')),
}))

// Import after mocks
import { readFile } from 'fs/promises'
const mockReadFile = readFile as jest.MockedFunction<typeof readFile>

describe('Icon', () => {
  beforeEach(() => {
    jest.spyOn(mockCtx, 'drawImage')
    jest.spyOn(global, 'Image').mockImplementation(() => mockImage)
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should draw icon with correct dimensions', async () => {
    const icon = 'star.svg'
    const circleDiameter = 170
    const centerX = 100
    const centerY = 100

    mockReadFile.mockResolvedValue(`
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#000000"/>
      </svg>
    `)

    await Icon.draw(icon, circleDiameter, centerX, centerY, mockCtx)

    // Verify the icon was drawn
    expect(mockCtx.drawImage).toHaveBeenCalled()
  })

  it.skip('should handle missing icon gracefully', async () => {
    const circleDiameter = 170
    const centerX = 100
    const centerY = 100

    mockReadFile.mockResolvedValue(
      Buffer.from(`
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#000000"/>
      </svg>
    `)
    )

    await expect(Icon.draw('', circleDiameter, centerX, centerY, mockCtx)).resolves.not.toThrow()
  })

  it.skip('should handle invalid icon path gracefully', async () => {
    const circleDiameter = 170
    const centerX = 100
    const centerY = 100

    mockReadFile.mockRejectedValue(Promise.reject(new Error('File not found')))

    await expect(
      Icon.draw('nonexistent.svg', circleDiameter, centerX, centerY, mockCtx)
    ).rejects.toThrow('Failed to load SVG icon: nonexistent.svg')
  })

  it.skip('should scale icon correctly', async () => {
    const icon = 'star.svg'
    const circleDiameter = 170
    const centerX = 100
    const centerY = 100
    const iconSize = circleDiameter * 0.85

    mockReadFile.mockResolvedValue(
      Buffer.from(`
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#000000"/>
      </svg>
    `)
    )

    await Icon.draw(icon, circleDiameter, centerX, centerY, mockCtx)

    // Verify the icon was scaled correctly
    expect(mockCtx.drawImage).toHaveBeenCalledWith(
      expect.any(Object), // image
      0, // sourceX
      0, // sourceY
      iconSize, // sourceWidth
      iconSize, // sourceHeight
      centerX - iconSize / 2, // destX
      centerY - iconSize / 2, // destY
      iconSize, // destWidth
      iconSize // destHeight
    )
  })
})
