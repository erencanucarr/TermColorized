const { Colorizer } = require('./styles');
const { Gradient } = require('./gradients');
const { Animator } = require('./animations');

class TermColorized {
  constructor() {
    this.colorizer = new Colorizer();
    this.gradientHelper = new Gradient();
    this.animator = new Animator();
    this.themes = new Map();
  }

  // Color methods
  color(text, color, bgColor) {
    return this.colorizer.color(text, color, bgColor);
  }

  // Style methods
  bold(text) {
    return this.colorizer.bold(text);
  }

  italic(text) {
    return this.colorizer.italic(text);
  }

  underline(text) {
    return this.colorizer.underline(text);
  }

  strikethrough(text) {
    return this.colorizer.strikethrough(text);
  }

  dim(text) {
    return this.colorizer.dim(text);
  }

  // Combined styling
  style(text, options = {}) {
    return this.colorizer.style(text, options);
  }

  // Gradient methods
  gradient(text, startColor, endColor) {
    return this.gradientHelper.create(text, startColor, endColor);
  }

  // Gradient helper methods
  createGradient(text, startColor, endColor) {
    return this.gradientHelper.create(text, startColor, endColor);
  }

  // Additional gradient methods
  rainbow(text) {
    return this.gradientHelper.rainbow(text);
  }

  multiColor(text, colors) {
    return this.gradientHelper.multiColor(text, colors);
  }

  // Animation methods
  async type(text, speed = 100) {
    return this.animator.type(text, speed);
  }

  async wave(text, speed = 200) {
    return this.animator.wave(text, speed);
  }

  async blink(text, speed = 500) {
    return this.animator.blink(text, speed);
  }

  async pulse(text, speed = 300) {
    return this.animator.pulse(text, speed);
  }

  async bounce(text, speed = 150) {
    return this.animator.bounce(text, speed);
  }

  async rainbow(text, speed = 200) {
    return this.animator.rainbow(text, speed);
  }

  async matrix(text, speed = 50) {
    return this.animator.matrix(text, speed);
  }

  async progressBar(text, duration = 3000, width = 40) {
    return this.animator.progressBar(text, duration, width);
  }

  // Theme methods
  useTheme(name, config) {
    this.themes.set(name, config);
  }

  theme(name, text) {
    const theme = this.themes.get(name);
    if (!theme) {
      throw new Error(`Theme "${name}" not found`);
    }
    return this.colorizer.style(text, theme);
  }

  // Utility methods
  log(text, options = {}) {
    const styledText = this.colorizer.style(text, options);
    console.log(styledText);
    return styledText;
  }

  // Preset colors
  red(text) { return this.color(text, 'red'); }
  green(text) { return this.color(text, 'green'); }
  blue(text) { return this.color(text, 'blue'); }
  yellow(text) { return this.color(text, 'yellow'); }
  magenta(text) { return this.color(text, 'magenta'); }
  cyan(text) { return this.color(text, 'cyan'); }
  white(text) { return this.color(text, 'white'); }
  black(text) { return this.color(text, 'black'); }
  gray(text) { return this.color(text, 'gray'); }

  // Preset styles
  error(text) { return this.style(text, { color: 'red', bold: true }); }
  success(text) { return this.style(text, { color: 'green', bold: true }); }
  warning(text) { return this.style(text, { color: 'yellow', bold: true }); }
  info(text) { return this.style(text, { color: 'blue', bold: true }); }
  highlight(text) { return this.style(text, { color: 'cyan', bold: true, underline: true }); }
}

// Create default instance
const termcolorized = new TermColorized();

// Export both the class and the instance
module.exports = termcolorized;
module.exports.TermColorized = TermColorized;
module.exports.Colorizer = Colorizer;
module.exports.Gradient = Gradient;
module.exports.Animator = Animator; 