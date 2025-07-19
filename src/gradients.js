const { Colorizer } = require('./styles');

class Gradient {
  constructor() {
    this.colorizer = new Colorizer();
  }

  // Interpolate between two colors
  interpolateColor(color1, color2, factor) {
    const rgb1 = this.parseColor(color1);
    const rgb2 = this.parseColor(color2);
    
    if (!rgb1 || !rgb2) return color1;

    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  }

  // Parse color to RGB
  parseColor(color) {
    if (typeof color !== 'string') return null;

    // Handle hex colors
    if (color.startsWith('#')) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
      if (result) {
        return {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        };
      }
    }

    // Handle rgb() colors
    if (color.startsWith('rgb(')) {
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        return {
          r: parseInt(match[1]),
          g: parseInt(match[2]),
          b: parseInt(match[3])
        };
      }
    }

    // Handle named colors
    const namedColors = {
      black: { r: 0, g: 0, b: 0 },
      red: { r: 255, g: 0, b: 0 },
      green: { r: 0, g: 255, b: 0 },
      blue: { r: 0, g: 0, b: 255 },
      yellow: { r: 255, g: 255, b: 0 },
      magenta: { r: 255, g: 0, b: 255 },
      cyan: { r: 0, g: 255, b: 255 },
      white: { r: 255, g: 255, b: 255 },
      gray: { r: 128, g: 128, b: 128 },
      orange: { r: 255, g: 165, b: 0 },
      purple: { r: 128, g: 0, b: 128 },
      pink: { r: 255, g: 192, b: 203 },
      brown: { r: 165, g: 42, b: 42 },
      lime: { r: 0, g: 255, b: 0 },
      navy: { r: 0, g: 0, b: 128 },
      teal: { r: 0, g: 128, b: 128 },
      olive: { r: 128, g: 128, b: 0 },
      maroon: { r: 128, g: 0, b: 0 }
    };

    return namedColors[color.toLowerCase()] || null;
  }

  // Create gradient text
  create(text, startColor, endColor) {
    if (!text || text.length === 0) return text;
    if (!startColor || !endColor) return text;

    const chars = text.split('');
    const result = [];

    for (let i = 0; i < chars.length; i++) {
      const factor = i / (chars.length - 1);
      const interpolatedColor = this.interpolateColor(startColor, endColor, factor);
      const coloredChar = this.colorizer.color(chars[i], interpolatedColor);
      result.push(coloredChar);
    }

    return result.join('');
  }

  // Create rainbow gradient
  rainbow(text) {
    if (!text || text.length === 0) return text;

    const colors = [
      '#ff0000', // red
      '#ff8000', // orange
      '#ffff00', // yellow
      '#80ff00', // lime
      '#00ff00', // green
      '#00ff80', // spring green
      '#00ffff', // cyan
      '#0080ff', // azure
      '#0000ff', // blue
      '#8000ff', // violet
      '#ff00ff', // magenta
      '#ff0080'  // rose
    ];

    const chars = text.split('');
    const result = [];

    for (let i = 0; i < chars.length; i++) {
      const colorIndex = Math.floor((i / chars.length) * colors.length);
      const color = colors[colorIndex % colors.length];
      const coloredChar = this.colorizer.color(chars[i], color);
      result.push(coloredChar);
    }

    return result.join('');
  }

  // Create multi-color gradient
  multiColor(text, colors) {
    if (!text || text.length === 0) return text;
    if (!colors || colors.length < 2) return text;

    const chars = text.split('');
    const result = [];

    for (let i = 0; i < chars.length; i++) {
      const factor = i / (chars.length - 1);
      const colorIndex = Math.floor(factor * (colors.length - 1));
      const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
      const localFactor = (factor * (colors.length - 1)) - colorIndex;
      
      const interpolatedColor = this.interpolateColor(
        colors[colorIndex], 
        colors[nextColorIndex], 
        localFactor
      );
      
      const coloredChar = this.colorizer.color(chars[i], interpolatedColor);
      result.push(coloredChar);
    }

    return result.join('');
  }

  // Create gradient with custom steps
  createWithSteps(text, colors, steps = 10) {
    if (!text || text.length === 0) return text;
    if (!colors || colors.length < 2) return text;

    const chars = text.split('');
    const result = [];

    for (let i = 0; i < chars.length; i++) {
      const step = Math.floor((i / chars.length) * steps);
      const colorIndex = Math.floor((step / steps) * (colors.length - 1));
      const color = colors[colorIndex];
      
      const coloredChar = this.colorizer.color(chars[i], color);
      result.push(coloredChar);
    }

    return result.join('');
  }
}

module.exports = { Gradient }; 