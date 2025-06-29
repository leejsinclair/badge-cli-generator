import { createCanvas, type CanvasRenderingContext2D } from 'canvas'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { Background } from './components/background/background'
import { TextBox } from './components/textbox/textbox'
import { Icon } from './components/icon/icon'
import {
  colors,
  BadgeConfig,
  isValidColor,
  getColorHex,
} from './createBadge/createBadgeTypes'

/**
 * BadgeGenerator is responsible for creating badge images with customizable background, icon, and text.
 * It uses the Canvas API to draw the badge and saves the result as a PNG file.
 */
export class BadgeGenerator {
  private static readonly colors = colors
  private readonly defaultSize = 200

  constructor() {}

  /**
   * Creates a badge image based on the provided configuration.
   * @param config - The badge configuration object containing color, size, icon, text, and output path.
   * @returns The output file path if successful, or null if an error occurs.
   * @throws Error if the provided color is invalid.
   */
  async createBadge(config: BadgeConfig): Promise<string | null> {
    if (!isValidColor(config.color)) {
      throw new Error(`Invalid color. Choose from: ${Object.keys(colors).join(', ')}`)
    }

    // Convert color name to hex
    const colorHex = getColorHex(config.color)

    const size = config.size || this.defaultSize
    const scale = 0.85
    const canvas = createCanvas(size, size)
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    // Draw circular background
    const { circleDiameter, centerX, centerY } = Background.draw({
      size,
      scale,
      ctx,
      color: colorHex,
    })

    // Draw icon if provided
    if (config.icon) {
      await Icon.draw(config.icon, circleDiameter, centerX, centerY, ctx)
    }

    // Draw text box
    TextBox.draw({
      size,
      circleDiameter,
      ctx,
      text: config.text,
      color: colorHex,
    })

    // Save the image
    try {
      // Ensure the my-badges directory exists
      const outputPath = join('my-badges', config.output)
      const outputDir = dirname(outputPath)
      mkdirSync(outputDir, { recursive: true })
      
      const buffer = canvas.toBuffer('image/png')
      writeFileSync(outputPath, buffer)
      return outputPath
    } catch (error) {
      console.error('Error saving badge:', error)
      return null
    }
  }

  /**
   * Draws the circular background for the badge.
   * @param size - The total size of the badge canvas.
   * @param scale - The scale factor for the circle diameter.
   * @param ctx - The CanvasRenderingContext2D to draw on.
   * @param colorHex - The background color in hex format.
   * @returns An object containing circle diameter, center coordinates, and radius.
   */
  private drawBackground(
    size: number,
    scale: number,
    ctx: CanvasRenderingContext2D,
    colorHex: string
  ) {
    const circleDiameter = size * scale
    const circleRadius = circleDiameter / 2
    const centerX = size / 2
    const centerY = circleDiameter / 2

    ctx.beginPath()
    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
    ctx.fillStyle = colorHex
    ctx.fill()
    return { circleDiameter, centerX, centerY, circleRadius }
  }
}
