import { TextBox } from '../components/textbox/textbox'
import { createCanvas, type CanvasRenderingContext2D } from 'canvas'
import { describe, it, expect, jest } from '@jest/globals'

describe('TextBox', () => {
  let ctx: CanvasRenderingContext2D

  beforeEach(() => {
    const canvas = createCanvas(200, 200)
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    jest.spyOn(ctx, 'fillRect')
    jest.spyOn(ctx, 'fillText')
    jest.spyOn(ctx, 'measureText').mockReturnValue({
      width: 100,
      actualBoundingBoxAscent: 0,
      actualBoundingBoxDescent: 0,
      actualBoundingBoxLeft: 0,
      actualBoundingBoxRight: 0,
      fontBoundingBoxAscent: 0,
      fontBoundingBoxDescent: 0,
    })
  })

  it('should draw text box with correct dimensions', () => {
    TextBox.draw({
      size: 200,
      circleDiameter: 170,
      ctx,
      text: 'Hello',
      color: '#FF6B6B',
    })

    // Verify the text was centered
    expect(ctx.fillText).toHaveBeenCalledWith('Hello', 50, 190)
  })

  it('should draw text with correct color', () => {
    TextBox.draw({
      size: 200,
      circleDiameter: 170,
      ctx,
      text: 'Test Badge',
      color: '#FF6B6B',
    })

    // Verify the text was drawn with the correct color
    expect(ctx.fillStyle).toBe('#000000')
  })

  it('should draw textbox with shadow', () => {
    TextBox.draw({
      size: 200,
      circleDiameter: 170,
      ctx,
      text: 'Test Badge',
      color: '#FF6B6B',
    })

    // Verify shadow properties were set
    expect(ctx.shadowColor).toBe('rgba(0, 0, 0, 0.00)')
    expect(ctx.shadowBlur).toBe(0)
    expect(ctx.shadowOffsetX).toBe(0)
    expect(ctx.shadowOffsetY).toBe(0)
  })
})
