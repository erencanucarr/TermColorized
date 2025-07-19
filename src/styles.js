class Colorizer {
  constructor() {
    this.colors = {
      // Foreground colors
      black: 30,
      red: 31,
      green: 32,
      yellow: 33,
      blue: 34,
      magenta: 35,
      cyan: 36,
      white: 37,
      gray: 90,
      brightRed: 91,
      brightGreen: 92,
      brightYellow: 93,
      brightBlue: 94,
      brightMagenta: 95,
      brightCyan: 96,
      brightWhite: 97
    };

    this.bgColors = {
      // Background colors
      black: 40,
      red: 41,
      green: 42,
      yellow: 43,
      blue: 44,
      magenta: 45,
      cyan: 46,
      white: 47,
      gray: 100,
      brightRed: 101,
      brightGreen: 102,
      brightYellow: 103,
      brightBlue: 104,
      brightMagenta: 105,
      brightCyan: 106,
      brightWhite: 107
    };

    this.styles = {
      reset: 0,
      bold: 1,
      dim: 2,
      italic: 3,
      underline: 4,
      blink: 5,
      reverse: 7,
      hidden: 8,
      strikethrough: 9
    };
  }

  // Convert hex color to RGB
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Convert RGB to ANSI 256 color code
  rgbToAnsi256(r, g, b) {
    if (r === g && g === b) {
      if (r < 8) return 16;
      if (r > 248) return 231;
      return Math.round(((r - 8) / 247) * 24) + 232;
    }
    return 16 + (36 * Math.round(r / 255 * 5)) + (6 * Math.round(g / 255 * 5)) + Math.round(b / 255 * 5);
  }

  // Get ANSI color code
  getColorCode(color, isBackground = false) {
    if (!color) return '';

    // Handle named colors
    if (typeof color === 'string') {
      if (color.startsWith('#')) {
        // Hex color
        const rgb = this.hexToRgb(color);
        if (rgb) {
          const ansi256 = this.rgbToAnsi256(rgb.r, rgb.g, rgb.b);
          return isBackground ? `\x1b[48;5;${ansi256}m` : `\x1b[38;5;${ansi256}m`;
        }
      } else if (color.startsWith('rgb(')) {
        // RGB color
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const [, r, g, b] = match.map(Number);
          const ansi256 = this.rgbToAnsi256(r, g, b);
          return isBackground ? `\x1b[48;5;${ansi256}m` : `\x1b[38;5;${ansi256}m`;
        }
      } else {
        // Named color
        const colorMap = isBackground ? this.bgColors : this.colors;
        const code = colorMap[color.toLowerCase()];
        if (code !== undefined) {
          return `\x1b[${code}m`;
        }
      }
    }

    return '';
  }

  // Apply color to text
  color(text, color, bgColor) {
    const colorCode = this.getColorCode(color, false);
    const bgColorCode = this.getColorCode(bgColor, true);
    const resetCode = '\x1b[0m';
    
    return `${colorCode}${bgColorCode}${text}${resetCode}`;
  }

  // Apply style to text
  applyStyle(text, styleCode) {
    return `\x1b[${styleCode}m${text}\x1b[0m`;
  }

  // Individual style methods
  bold(text) {
    return this.applyStyle(text, this.styles.bold);
  }

  italic(text) {
    return this.applyStyle(text, this.styles.italic);
  }

  underline(text) {
    return this.applyStyle(text, this.styles.underline);
  }

  strikethrough(text) {
    return this.applyStyle(text, this.styles.strikethrough);
  }

  dim(text) {
    return this.applyStyle(text, this.styles.dim);
  }

  blink(text) {
    return this.applyStyle(text, this.styles.blink);
  }

  reverse(text) {
    return this.applyStyle(text, this.styles.reverse);
  }

  hidden(text) {
    return this.applyStyle(text, this.styles.hidden);
  }

  // Combined styling with options
  style(text, options = {}) {
    let result = text;

    // Apply colors first
    if (options.color) {
      result = this.color(result, options.color, options.bgColor);
      // Remove the reset code from the middle
      result = result.replace(/\x1b\[0m/, '');
    } else if (options.bgColor) {
      result = this.color(result, null, options.bgColor);
      // Remove the reset code from the middle
      result = result.replace(/\x1b\[0m/, '');
    }

    // Apply styles
    if (options.bold) result = this.bold(result);
    if (options.italic) result = this.italic(result);
    if (options.underline) result = this.underline(result);
    if (options.strikethrough) result = this.strikethrough(result);
    if (options.dim) result = this.dim(result);
    if (options.blink) result = this.blink(result);
    if (options.reverse) result = this.reverse(result);
    if (options.hidden) result = this.hidden(result);

    return result;
  }

  // Remove all ANSI codes from text
  strip(text) {
    return text.replace(/\x1b\[[0-9;]*m/g, '');
  }

  // Get text length without ANSI codes
  length(text) {
    return this.strip(text).length;
  }
}

module.exports = { Colorizer }; 