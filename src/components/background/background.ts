/**
 * Background component for drawing circular backgrounds in badge generation.
 * Handles the creation of circular background shapes with customizable colors and sizes.
 */

import { CanvasRenderingContext2D } from 'canvas'

/**
 * Configuration object for drawing a circular background.
 */
export interface BackgroundConfig {
  /** The total size of the canvas */
  size: number
  /** The scale factor for the circle diameter relative to canvas size */
  scale: number
  /** The canvas rendering context to draw on */
  ctx: CanvasRenderingContext2D
  /** The background color in hex format */
  color: string
}

/**
 * Background component responsible for drawing circular backgrounds.
 */
export class Background {
  /**
   * Draws a circular background on the canvas.
   * @param config - The background configuration object
   * @returns An object containing the circle dimensions and center coordinates
   */
  static draw({ size, scale, ctx, color }: BackgroundConfig) {
    const circleDiameter = size * scale
    const circleRadius = circleDiameter / 2
    const centerX = size / 2
    const centerY = circleDiameter / 2

    ctx.beginPath()
    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    return { circleDiameter, centerX, centerY, circleRadius }
  }
}
