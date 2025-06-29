import { createCanvas, type CanvasRenderingContext2D } from 'canvas';
import * as fs from 'fs/promises';
import { writeFileSync } from 'fs';
import { Background } from './components/background/background';
import { TextBox } from './components/textbox/textbox';
import { Icon } from './components/icon/icon';
import { colors, BadgeConfig, isValidColor, getColorHex, ColorName } from './createBadge/createBadgeTypes';

export class BadgeGenerator {
  private static readonly colors = colors;
  private readonly defaultSize = 200;

  constructor() { }

  async createBadge(config: BadgeConfig): Promise<string | null> {
    if (!isValidColor(config.color)) {
      throw new Error(`Invalid color. Choose from: ${Object.keys(colors).join(', ')}`);
    }

    // Convert color name to hex
    const colorHex = getColorHex(config.color);

    const size = config.size || this.defaultSize;
    const scale = 0.85;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Draw circular background
    const { circleDiameter, centerX, centerY } = Background.draw({
      size,
      scale,
      ctx,
      color: colorHex
    });

    // Draw icon if provided
    if (config.icon) {
      await Icon.draw(
        config.icon,
        circleDiameter,
        centerX,
        centerY,
        ctx
      );
    }

    // Draw text box
    TextBox.draw({
      size,
      circleDiameter,
      ctx,
      text: config.text,
      color: colorHex
    });

    // Save the image
    try {
      const buffer = canvas.toBuffer('image/png');
      writeFileSync(config.output, buffer);
      return config.output;
    } catch (error) {
      console.error('Error saving badge:', error);
      return null;
    }
  }

  private drawBackground(size: number, scale: number, ctx: CanvasRenderingContext2D, colorHex: string) {
    const circleDiameter = size * scale;
    const circleRadius = circleDiameter / 2;
    const centerX = size / 2;
    const centerY = circleDiameter / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = colorHex;
    ctx.fill();
    return { circleDiameter, centerX, centerY, circleRadius };
  }

  private isValidColor(color: ColorName): boolean {
    return color in BadgeGenerator.colors;
  }

  private getColorHex(color: ColorName): string {
    return BadgeGenerator.colors[color];
  }
}
