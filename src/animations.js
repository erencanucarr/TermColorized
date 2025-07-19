const { Colorizer } = require('./styles');

class Animator {
  constructor() {
    this.colorizer = new Colorizer();
    this.isRunning = false;
  }

  // Sleep utility
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Clear line and move cursor to beginning
  clearLine() {
    process.stdout.write('\r\x1b[K');
  }

  // Move cursor to beginning of line
  moveToStart() {
    process.stdout.write('\r');
  }

  // Type animation - characters appear one by one
  async type(text, speed = 100) {
    if (this.isRunning) return;
    this.isRunning = true;

    const chars = text.split('');
    let currentText = '';

    for (let i = 0; i < chars.length; i++) {
      if (!this.isRunning) break;
      
      currentText += chars[i];
      this.clearLine();
      process.stdout.write(currentText);
      
      await this.sleep(speed);
    }

    this.isRunning = false;
    return text;
  }

  // Wave animation - text appears with wave effect
  async wave(text, speed = 200) {
    if (this.isRunning) return;
    this.isRunning = true;

    const chars = text.split('');
    const waveLength = 3;
    let currentText = '';

    for (let i = 0; i < chars.length; i++) {
      if (!this.isRunning) break;
      
      currentText += chars[i];
      this.clearLine();
      
      // Apply wave effect to current character
      const waveOffset = Math.sin(i * 0.5) * waveLength;
      const spaces = ' '.repeat(Math.max(0, Math.round(waveOffset)));
      
      process.stdout.write(spaces + currentText);
      
      await this.sleep(speed);
    }

    this.isRunning = false;
    return text;
  }

  // Blink animation - text blinks on and off
  async blink(text, speed = 500) {
    if (this.isRunning) return;
    this.isRunning = true;

    let visible = true;
    let iterations = 0;
    const maxIterations = 10;

    while (this.isRunning && iterations < maxIterations) {
      this.clearLine();
      
      if (visible) {
        process.stdout.write(text);
      }
      
      visible = !visible;
      iterations++;
      
      await this.sleep(speed);
    }

    // Ensure text is visible at the end
    this.clearLine();
    process.stdout.write(text);
    
    this.isRunning = false;
    return text;
  }

  // Pulse animation - text fades in and out
  async pulse(text, speed = 300) {
    if (this.isRunning) return;
    this.isRunning = true;

    const iterations = 6;
    const colors = ['dim', 'normal', 'bright'];

    for (let i = 0; i < iterations; i++) {
      if (!this.isRunning) break;
      
      this.clearLine();
      
      const colorIndex = i % colors.length;
      let styledText = text;
      
      if (colors[colorIndex] === 'dim') {
        styledText = this.colorizer.dim(text);
      } else if (colors[colorIndex] === 'bright') {
        styledText = this.colorizer.style(text, { bold: true });
      }
      
      process.stdout.write(styledText);
      
      await this.sleep(speed);
    }

    this.isRunning = false;
    return text;
  }

  // Bounce animation - text bounces up and down
  async bounce(text, speed = 150) {
    if (this.isRunning) return;
    this.isRunning = true;

    const iterations = 20;
    const bounceHeight = 2;

    for (let i = 0; i < iterations; i++) {
      if (!this.isRunning) break;
      
      this.clearLine();
      
      const bounceOffset = Math.abs(Math.sin(i * 0.5)) * bounceHeight;
      const spaces = ' '.repeat(Math.round(bounceOffset));
      
      process.stdout.write(spaces + text);
      
      await this.sleep(speed);
    }

    this.isRunning = false;
    return text;
  }

  // Rainbow animation - text cycles through colors
  async rainbow(text, speed = 200) {
    if (this.isRunning) return;
    this.isRunning = true;

    const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
    const iterations = 12;

    for (let i = 0; i < iterations; i++) {
      if (!this.isRunning) break;
      
      this.clearLine();
      
      const colorIndex = i % colors.length;
      const coloredText = this.colorizer.color(text, colors[colorIndex]);
      
      process.stdout.write(coloredText);
      
      await this.sleep(speed);
    }

    this.isRunning = false;
    return text;
  }

  // Matrix animation - characters fall like Matrix
  async matrix(text, speed = 50) {
    if (this.isRunning) return;
    this.isRunning = true;

    const chars = text.split('');
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const iterations = chars.length * 2;

    for (let i = 0; i < iterations; i++) {
      if (!this.isRunning) break;
      
      this.clearLine();
      
      let currentText = '';
      for (let j = 0; j < chars.length; j++) {
        if (i >= j) {
          if (i - j < chars.length) {
            currentText += chars[j];
          } else {
            currentText += matrixChars[Math.floor(Math.random() * matrixChars.length)];
          }
        }
      }
      
      const greenText = this.colorizer.color(currentText, 'green');
      process.stdout.write(greenText);
      
      await this.sleep(speed);
    }

    this.isRunning = false;
    return text;
  }

  // Stop all animations
  stop() {
    this.isRunning = false;
  }

  // Animate with custom function
  async animate(text, animationFn, speed = 100) {
    if (this.isRunning) return;
    this.isRunning = true;

    try {
      await animationFn(text, speed, this);
    } finally {
      this.isRunning = false;
    }

    return text;
  }

  // Progress bar animation
  async progressBar(text, duration = 3000, width = 40) {
    if (this.isRunning) return;
    this.isRunning = true;

    const startTime = Date.now();
    const endTime = startTime + duration;

    while (this.isRunning && Date.now() < endTime) {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const filledWidth = Math.round(width * progress);
      
      const bar = '█'.repeat(filledWidth) + '░'.repeat(width - filledWidth);
      const percentage = Math.round(progress * 100);
      
      this.clearLine();
      const progressText = `${text} [${bar}] ${percentage}%`;
      process.stdout.write(progressText);
      
      await this.sleep(50);
    }

    this.clearLine();
    const finalText = `${text} [${'█'.repeat(width)}] 100%`;
    process.stdout.write(finalText);
    
    this.isRunning = false;
    return finalText;
  }
}

module.exports = { Animator }; 