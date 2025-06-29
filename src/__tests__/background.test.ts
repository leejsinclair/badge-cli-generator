import { Background } from '../components/background/background';
import { createCanvas, type CanvasRenderingContext2D } from 'canvas';
import { describe, it, expect } from '@jest/globals';

describe('Background', () => {
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    const canvas = createCanvas(200, 200);
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  });

  it('should draw circular background with correct dimensions', () => {
    const { circleDiameter, centerX, centerY } = Background.draw({
      size: 200,
      scale: 0.85,
      ctx,
      color: '#FF6B6B'
    });

    expect(circleDiameter).toBe(170);
    expect(centerX).toBe(100);
    expect(centerY).toBe(85);
  });

  it('should draw circular background with correct color', () => {
    const { circleDiameter } = Background.draw({
      size: 200,
      scale: 0.85,
      ctx,
      color: '#FF6B6B'
    });

    // Check if the circle was drawn with the correct color
    const imageData = ctx.getImageData(100, 100, 1, 1).data;
    expect(imageData[0]).toBe(255); // R
    expect(imageData[1]).toBe(107); // G
    expect(imageData[2]).toBe(107); // B
    expect(imageData[3]).toBe(255); // A
  });
});
