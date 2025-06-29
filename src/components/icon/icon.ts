/**
 * Icon component for rendering SVG icons on badges.
 * Handles loading, scaling, and positioning of SVG icons within circular backgrounds.
 */

import { createCanvas, Image, type CanvasRenderingContext2D } from 'canvas'
import * as fs from 'fs/promises'
import * as path from 'path'
import { DOMParser, XMLSerializer } from 'xmldom'

/**
 * Configuration object for drawing an icon (currently unused but kept for future extensibility).
 */
export interface IconConfig {
  /** The icon filename */
  icon: string
  /** The diameter of the circular background */
  circleDiameter: number
  /** The center X coordinate */
  centerX: number
  /** The center Y coordinate */
  centerY: number
  /** The canvas rendering context to draw on */
  ctx: CanvasRenderingContext2D
}

/**
 * Icon component responsible for loading and rendering SVG icons.
 */
export class Icon {
  /**
   * Loads and draws an SVG icon on the canvas, scaled to fit within the circular background.
   * The icon is automatically scaled to 85% of the circle diameter and centered.
   * 
   * @param icon - The filename of the SVG icon (must be in dist/icons directory)
   * @param circleDiameter - The diameter of the circular background
   * @param centerX - The center X coordinate for positioning
   * @param centerY - The center Y coordinate for positioning
   * @param ctx - The canvas rendering context to draw on
   * @throws Error if the SVG icon cannot be loaded or processed
   */
  static async draw(
    icon: string,
    circleDiameter: number,
    centerX: number,
    centerY: number,
    ctx: CanvasRenderingContext2D
  ) {
    try {
      // Load SVG file from the icons directory
      const iconPath = path.join(__dirname, '../../../dist/icons', icon)
      const svgData = await fs.readFile(iconPath, 'utf8')

      // Calculate icon dimensions (85% of circle diameter for proper fit)
      const iconSize = circleDiameter * 0.85

      // Create temporary canvas for SVG-to-PNG conversion
      const tempCanvas = createCanvas(iconSize, iconSize)
      const tempCtx = tempCanvas.getContext('2d')

      // Parse SVG to extract dimensions and content
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgData, 'image/svg+xml')
      const svgElement = svgDoc.documentElement

      // Get original SVG dimensions (default to 24x24 if not specified)
      const svgWidth = svgElement.getAttribute('width') || '24'
      const svgHeight = svgElement.getAttribute('height') || '24'

      // Calculate scaling factor to fit icon within the target size
      const scale = Math.min(iconSize / parseFloat(svgWidth), iconSize / parseFloat(svgHeight))

      // Create scaled viewBox for proper SVG rendering
      const viewBox = svgElement.getAttribute('viewBox') || '0 0 24 24'
      const [vx, vy, vw, vh] = viewBox.split(' ').map(Number)
      const newViewBox = `${vx} ${vy} ${vw * scale} ${vh * scale}`

      // Extract SVG content (everything inside the <svg> tags)
      const serializer = new XMLSerializer()
      const svgContent = serializer
        .serializeToString(svgElement)
        .replace(/<svg[^>]*>/, '') // Remove opening tag
        .replace(/<\/svg>/, '') // Remove closing tag

      // Preserve original SVG attributes (excluding ones we're setting manually)
      const manualAttributes = ['xmlns', 'viewBox', 'width', 'height']
      const attributes = Array.from(svgElement.attributes)
        .filter(attr => !manualAttributes.includes(attr.name))
        .map(attr => `${attr.name}="${attr.value}"`)
        .join(' ')

      // Reconstruct SVG with new dimensions and scaling transform
      const scaledSvg = `
          <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="${newViewBox}"
            width="${iconSize}"
            height="${iconSize}"
            ${attributes}
          >
            <g transform="scale(${scale})">
              ${svgContent.trim()}
            </g>
          </svg>
        `.trim()

      // Convert SVG to image and render on canvas
      const img = new Image()
      img.onload = () => {
        // First, render to temporary canvas to create PNG buffer
        tempCtx.drawImage(img, 0, 0)
        const png = tempCanvas.toBuffer('image/png')

        // Create final image from PNG buffer for better rendering quality
        const finalImg = new Image()
        finalImg.onload = () => {
          // Calculate centered position and draw the icon
          const x = centerX - iconSize / 2
          const y = centerY - iconSize / 2
          ctx.drawImage(finalImg, x, y, iconSize, iconSize)
        }
        finalImg.src = `data:image/png;base64,${png.toString('base64')}`
      }
      // Load the scaled SVG as a data URL
      img.src = `data:image/svg+xml;base64,${Buffer.from(scaledSvg).toString('base64')}`
    } catch (error) {
      console.error(`Error loading SVG icon:`, error)
      throw new Error(`Failed to load SVG icon: ${icon}`)
    }
  }
}
