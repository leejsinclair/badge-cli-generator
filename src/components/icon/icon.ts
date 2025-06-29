import { createCanvas, Image, type CanvasRenderingContext2D } from 'canvas'
import * as fs from 'fs/promises'
import * as path from 'path'
import { DOMParser, XMLSerializer } from 'xmldom'

export interface IconConfig {
  icon: string
  circleDiameter: number
  centerX: number
  centerY: number
  ctx: CanvasRenderingContext2D
}

export class Icon {
  static async draw(
    icon: string,
    circleDiameter: number,
    centerX: number,
    centerY: number,
    ctx: CanvasRenderingContext2D
  ) {
    try {
      // Handle SVG icon
      const iconPath = path.join(__dirname, '../../../dist/icons', icon)
      const svgData = await fs.readFile(iconPath, 'utf8')

      // Calculate icon dimensions (85% of circle diameter)
      const iconSize = circleDiameter * 0.85

      // Create temporary canvas for SVG rendering
      const tempCanvas = createCanvas(iconSize, iconSize)
      const tempCtx = tempCanvas.getContext('2d')

      // Parse SVG data to get dimensions
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgData, 'image/svg+xml')
      const svgElement = svgDoc.documentElement

      // Get SVG dimensions
      const svgWidth = svgElement.getAttribute('width') || '24'
      const svgHeight = svgElement.getAttribute('height') || '24'

      // Scale SVG to fit within circle
      const scale = Math.min(iconSize / parseFloat(svgWidth), iconSize / parseFloat(svgHeight))

      // Create a new SVG element with scaled dimensions
      const viewBox = svgElement.getAttribute('viewBox') || '0 0 24 24'
      const [vx, vy, vw, vh] = viewBox.split(' ').map(Number)
      const newViewBox = `${vx} ${vy} ${vw * scale} ${vh * scale}`

      // Extract SVG content
      const serializer = new XMLSerializer()
      const svgContent = serializer
        .serializeToString(svgElement)
        .replace(/<svg[^>]*>/, '') // Remove opening tag
        .replace(/<\/svg>/, '') // Remove closing tag

      // Copy attributes from original SVG (excluding manual ones)
      const manualAttributes = ['xmlns', 'viewBox', 'width', 'height']
      const attributes = Array.from(svgElement.attributes)
        .filter(attr => !manualAttributes.includes(attr.name))
        .map(attr => `${attr.name}="${attr.value}"`)
        .join(' ')

      // Create new SVG string with scaled dimensions
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

      // Create image from scaled SVG
      const img = new Image()
      img.onload = () => {
        tempCtx.drawImage(img, 0, 0)
        const png = tempCanvas.toBuffer('image/png')

        // Create image from PNG
        const finalImg = new Image()
        finalImg.onload = () => {
          // Center the icon
          const x = centerX - iconSize / 2
          const y = centerY - iconSize / 2
          ctx.drawImage(finalImg, x, y, iconSize, iconSize)
        }
        finalImg.src = `data:image/png;base64,${png.toString('base64')}`
      }
      img.src = `data:image/svg+xml;base64,${Buffer.from(scaledSvg).toString('base64')}`
    } catch (error) {
      console.error(`Error loading SVG icon:`, error)
      throw new Error(`Failed to load SVG icon: ${icon}`)
    }
  }
}
