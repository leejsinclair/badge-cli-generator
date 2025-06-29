import { CanvasRenderingContext2D } from 'canvas'

export interface BackgroundConfig {
  size: number
  scale: number
  ctx: CanvasRenderingContext2D
  color: string
}

export class Background {
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
