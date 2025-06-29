import { CanvasRenderingContext2D } from 'canvas';

export interface TextBoxConfig {
  size: number;
  circleDiameter: number;
  ctx: CanvasRenderingContext2D;
  text: string;
  color: string;
}

export class TextBox {
  static draw({ size, circleDiameter, ctx, text, color }: TextBoxConfig) {
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
    const workingTextWidth = ctx.measureText(text).width;
    const textX = textBoxX + (textBoxWidth - workingTextWidth) / 2;
    const textY = textBoxY + textBoxHeight * 0.8;
    ctx.fillStyle = color;
    ctx.fillText(text, textX, textY);

    // Add subtle shadow
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.1;
    ctx.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
    ctx.globalAlpha = 1;
  }
}
