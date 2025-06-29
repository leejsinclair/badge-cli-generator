import { createCanvas, Image, type CanvasRenderingContext2D } from 'canvas';
import * as fs from 'fs/promises';
import * as path from 'path';
import { DOMParser, XMLSerializer } from 'xmldom';
import { writeFileSync } from 'fs-extra';
import { BadgeConfig } from './createBadge/createBadgeTypes';

export class BadgeGenerator {
  public static colors: { [key: string]: string } = {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#45B7D1',
    success: '#8AC46B',
    warning: '#FFD66B',
    info: '#6B88FF',
    error: '#FF6B87'
  };

  private defaultSize: number = 200;

  constructor() { }

  async createBadge(config: BadgeConfig): Promise<string | null> {
    if (!this.isValidColor(config.color)) {
      throw new Error(`Invalid color. Choose from: ${Object.keys(BadgeGenerator.colors).join(', ')}`);
    }

    // Convert color name to hex
    const colorHex = this.getColorHex(config.color);

    const size = config.size || this.defaultSize;
    const scale = 0.85
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Draw circular background
    const { circleDiameter, centerX, centerY } = this.drawBackground(size, scale, ctx, colorHex);

    // Draw icon if provided
    await this.drawIcon(config, circleDiameter, centerX, centerY, ctx);

    // Draw text box
    this.drawTextBox(size, circleDiameter, ctx, config, colorHex);

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

  private drawTextBox(size: number, circleDiameter: number, ctx: CanvasRenderingContext2D, config: BadgeConfig, colorHex: string) {
    const textBoxWidth = size * 0.8;
    const textBoxHeight = size * 0.2;
    const textBoxX = (size - textBoxWidth) / 2;
    const textBoxY = circleDiameter - textBoxHeight * 0.3; // Move up to overlap circle


    // Draw rounded rectangle
    const cornerRadius = textBoxHeight * 0.3; // 30% of box height
    ctx.beginPath();
    ctx.moveTo(textBoxX + cornerRadius, textBoxY);
    ctx.lineTo(textBoxX + textBoxWidth - cornerRadius, textBoxY);
    ctx.quadraticCurveTo(textBoxX + textBoxWidth, textBoxY, textBoxX + textBoxWidth, textBoxY + cornerRadius);
    ctx.lineTo(textBoxX + textBoxWidth, textBoxY + textBoxHeight - cornerRadius);
    ctx.quadraticCurveTo(textBoxX + textBoxWidth, textBoxY + textBoxHeight, textBoxX + textBoxWidth - cornerRadius, textBoxY + textBoxHeight);
    ctx.lineTo(textBoxX + cornerRadius, textBoxY + textBoxHeight);
    ctx.quadraticCurveTo(textBoxX, textBoxY + textBoxHeight, textBoxX, textBoxY + textBoxHeight - cornerRadius);
    ctx.lineTo(textBoxX, textBoxY + cornerRadius);
    ctx.quadraticCurveTo(textBoxX, textBoxY, textBoxX + cornerRadius, textBoxY);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Draw text
    ctx.font = `bold ${textBoxHeight * 0.8}px Arial`;
    const text = config.text;
    const workingTextWidth = ctx.measureText(text).width;
    const textX = textBoxX + (textBoxWidth - workingTextWidth) / 2;
    const textY = textBoxY + textBoxHeight * 0.8;
    ctx.fillStyle = colorHex;
    ctx.fillText(text, textX, textY);

    // Add subtle shadow
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.1;
    ctx.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
    ctx.globalAlpha = 1;
  }

  private async drawIcon(config: BadgeConfig, circleDiameter: number, centerX: number, centerY: number, ctx: CanvasRenderingContext2D) {
    if (config.icon) {
      try {
        // Handle SVG icon
        const iconPath = path.join(__dirname, '../dist/icons', config.icon);
        const svgData = await fs.readFile(iconPath, 'utf8');

        // Calculate icon dimensions (85% of circle diameter)
        const iconSize = circleDiameter * 0.85;

        // Create temporary canvas for SVG rendering
        const tempCanvas = createCanvas(iconSize, iconSize);
        const tempCtx = tempCanvas.getContext('2d');

        // Parse SVG data to get dimensions
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgData, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;

        // Get SVG dimensions
        const svgWidth = svgElement.getAttribute('width') || '24';
        const svgHeight = svgElement.getAttribute('height') || '24';

        // Scale SVG to fit within circle
        const scale = Math.min(iconSize / parseFloat(svgWidth), iconSize / parseFloat(svgHeight));

        // Create a new SVG element with scaled dimensions
        const viewBox = svgElement.getAttribute('viewBox') || '0 0 24 24';
        const [vx, vy, vw, vh] = viewBox.split(' ').map(Number);
        const newViewBox = `${vx} ${vy} ${vw * scale} ${vh * scale}`;

        // Extract SVG content
        const serializer = new XMLSerializer();
        const svgContent = serializer.serializeToString(svgElement)
          .replace(/<svg[^>]*>/, '') // Remove opening tag
          .replace(/<\/svg>/, ''); // Remove closing tag


        // Copy attributes from original SVG (excluding manual ones)
        const manualAttributes = ['xmlns', 'viewBox', 'width', 'height'];
        const attributes = Array.from(svgElement.attributes)
          .filter(attr => !manualAttributes.includes(attr.name))
          .map(attr => `${attr.name}="${attr.value}"`)
          .join(' ');

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
        `.trim();

        await writeFileSync('test.txt', scaledSvg);

        // Create image from scaled SVG
        const img = new Image();
        img.onload = () => {
          tempCtx.drawImage(img, 0, 0);
          const png = tempCanvas.toBuffer('image/png');

          // Create image from PNG
          const finalImg = new Image();
          finalImg.onload = () => {
            // Center the icon
            const x = centerX - (iconSize / 2);
            const y = centerY - (iconSize / 2);
            ctx.drawImage(finalImg, x, y, iconSize, iconSize);
          };
          finalImg.src = `data:image/png;base64,${png.toString('base64')}`;
        };
        img.src = `data:image/svg+xml;base64,${Buffer.from(scaledSvg).toString('base64')}`;
      } catch (error) {
        console.error(`Error loading SVG icon:`, error);
        throw new Error(`Failed to load SVG icon: ${config.icon}`);
      }
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

  private isValidColor(color: string): boolean {
    return Object.keys(BadgeGenerator.colors).includes(color);
  }

  private getColorHex(color: string): string {
    return BadgeGenerator.colors[color];
  }
}
