import { type Canvas, type CanvasRenderingContext2D } from 'canvas';
import { jest } from '@jest/globals';

// Mock canvas
const canvas = {
  type: 'image/png',
  width: 200,
  height: 200,
  getContext: jest.fn(() => ({
    fillStyle: '',
    fill: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    closePath: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn(() => ({
      width: 100
    })),
    drawImage: jest.fn(),
    toBuffer: jest.fn()
  })) as unknown as CanvasRenderingContext2D,
  toBuffer: jest.fn()
} as unknown as Canvas;

// Extend global type
declare global {
  var createCanvas: () => Canvas;
  interface Window {
    Image: typeof MockImage;
  }
}

// Mock createCanvas
global.createCanvas = jest.fn(() => canvas);

class MockImage {
  onload: () => void;
  src: string;
  constructor() {
    this.onload = () => {};
    this.src = '';
  }
}

// Add Image to global window
(global as any).Image = MockImage;
