# TermColorized 🎨

A powerful terminal text styling, coloring and animation library for Node.js CLI applications.

[![npm version](https://badge.fury.io/js/termcolorized.svg)](https://badge.fury.io/js/termcolorized)
[![npm downloads](https://img.shields.io/npm/dm/termcolorized.svg)](https://www.npmjs.com/package/termcolorized)
[![npm bundle size](https://img.shields.io/bundlephobia/min/termcolorized)](https://bundlephobia.com/package/termcolorized)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://www.npmjs.com/package/termcolorized)

## ✨ Features

- 🎨 **Rich Color Support**: Named colors, hex codes, RGB values
- 🎭 **Text Styling**: Bold, italic, underline, strikethrough, and more
- 🌈 **Gradients**: Linear color transitions across text
- 🎬 **Animations**: Typing, wave, blink, pulse, bounce, rainbow, matrix effects
- 🎪 **Themes**: Custom reusable style configurations
- ⚡ **Zero Dependencies**: No external packages required
- 🔧 **Flexible API**: Both CommonJS and ES Module support
- 📦 **Lightweight**: Minimal bundle size with custom build system

## 🚀 Quick Start

### Installation

```bash
npm install termcolorized
```

### Basic Usage

```javascript
const termcolorized = require('termcolorized');

// Basic colors
console.log(termcolorized.red('Red text'));
console.log(termcolorized.green('Green text'));
console.log(termcolorized.blue('Blue text'));

// Combined styles
console.log(termcolorized.style('Bold red text', { color: 'red', bold: true }));

// Gradients
console.log(termcolorized.gradient('Rainbow text', '#ff0000', '#00ff00'));

// Animations (async)
await termcolorized.type('Typing animation!', 100);
```

### Try the Demo

```bash
npx terminal-colorizer-demo
```

## 📚 API Reference

### Colors

#### Basic Colors
```javascript
termcolorized.red('text')
termcolorized.green('text')
termcolorized.blue('text')
termcolorized.yellow('text')
termcolorized.magenta('text')
termcolorized.cyan('text')
termcolorized.white('text')
termcolorized.black('text')
termcolorized.gray('text')
```

#### Custom Colors
```javascript
// Named colors
termcolorized.color('text', 'red', 'white') // foreground, background

// Hex colors
termcolorized.color('text', '#ff0000')

// RGB colors
termcolorized.color('text', 'rgb(255, 0, 0)')
```

### Text Styles

#### Individual Styles
```javascript
termcolorized.bold('text')
termcolorized.italic('text')
termcolorized.underline('text')
termcolorized.strikethrough('text')
termcolorized.dim('text')
termcolorized.blink('text')
termcolorized.reverse('text')
termcolorized.hidden('text')
```

#### Combined Styles
```javascript
termcolorized.style('text', {
  color: 'red',
  bgColor: 'white',
  bold: true,
  italic: true,
  underline: true,
  strikethrough: false,
  dim: false,
  blink: false,
  reverse: false,
  hidden: false
})
```

### Preset Styles
```javascript
termcolorized.error('Error message')
termcolorized.success('Success message')
termcolorized.warning('Warning message')
termcolorized.info('Info message')
termcolorized.highlight('Highlighted text')
```

### Gradients

#### Linear Gradients
```javascript
termcolorized.gradient('text', '#ff0000', '#00ff00')
termcolorized.gradient('text', 'red', 'blue')
```

#### Rainbow Gradient
```javascript
termcolorized.gradient.rainbow('Rainbow text')
```

#### Multi-Color Gradients
```javascript
termcolorized.gradient.multiColor('text', ['#ff0000', '#00ff00', '#0000ff'])
```

### Animations

All animations are asynchronous and return a Promise.

#### Typing Effect
```javascript
await termcolorized.type('Hello World!', 100) // speed in ms
```

#### Wave Effect
```javascript
await termcolorized.wave('Wave animation!', 200)
```

#### Blink Effect
```javascript
await termcolorized.blink('Blinking text!', 500)
```

#### Pulse Effect
```javascript
await termcolorized.pulse('Pulsing text!', 300)
```

#### Bounce Effect
```javascript
await termcolorized.bounce('Bouncing text!', 150)
```

#### Rainbow Animation
```javascript
await termcolorized.rainbow('Rainbow cycling!', 200)
```

#### Matrix Effect
```javascript
await termcolorized.matrix('Matrix effect!', 50)
```

#### Progress Bar
```javascript
await termcolorized.progressBar('Loading...', 3000, 40) // text, duration, width
```

### Themes

#### Create Custom Themes
```javascript
termcolorized.useTheme('fancy', {
  color: '#e74c3c',
  bold: true,
  underline: true
});

termcolorized.useTheme('soft', {
  color: '#95a5a6',
  italic: true
});
```

#### Use Themes
```javascript
console.log(termcolorized.theme('fancy', 'Fancy text'));
console.log(termcolorized.theme('soft', 'Soft text'));
```

### Utility Methods

```javascript
// Log styled text directly
termcolorized.log('Styled text', { color: 'red', bold: true });

// Strip ANSI codes
const plainText = termcolorized.colorizer.strip(coloredText);

// Get text length without ANSI codes
const length = termcolorized.colorizer.length(coloredText);

// Stop animations
termcolorized.animator.stop();
```

## 🎯 Examples

### CLI Application
```javascript
#!/usr/bin/env node

const termcolorized = require('termcolorized');

async function main() {
  console.log(termcolorized.gradient('Welcome to My CLI App!', '#ff6b6b', '#4ecdc4'));
  
  console.log(termcolorized.info('Starting process...'));
  
  await termcolorized.progressBar('Processing data', 2000);
  
  console.log(termcolorized.success('Process completed successfully!'));
  
  if (error) {
    console.log(termcolorized.error('An error occurred!'));
  }
}

main().catch(console.error);
```

### Interactive Menu
```javascript
const termcolorized = require('termcolorized');

function showMenu() {
  console.log(termcolorized.highlight('=== Main Menu ==='));
  console.log(termcolorized.info('1. Option One'));
  console.log(termcolorized.info('2. Option Two'));
  console.log(termcolorized.info('3. Exit'));
  console.log(termcolorized.warning('Enter your choice:'));
}
```

### Status Updates
```javascript
const termcolorized = require('termcolorized');

function updateStatus(status, message) {
  const statusColors = {
    'success': termcolorized.success,
    'error': termcolorized.error,
    'warning': termcolorized.warning,
    'info': termcolorized.info
  };
  
  const colorFn = statusColors[status] || termcolorized.info;
  console.log(colorFn(`[${status.toUpperCase()}] ${message}`));
}

updateStatus('success', 'File uploaded successfully');
updateStatus('error', 'Connection failed');
updateStatus('warning', 'Low disk space');
updateStatus('info', 'Processing...');
```

## 🔧 Usage

### Demo
```bash
npm run demo
```

### CLI Demo
```bash
npx terminal-colorizer-demo
```

## 📦 Package Structure

```
termcolorized/
├── src/
│   ├── index.js          # Main module
│   ├── styles.js         # Color and style handling
│   ├── gradients.js      # Gradient functionality
│   └── animations.js     # Animation effects
├── bin/
│   └── demo.js           # CLI demo command
├── dist/                 # Built files (generated)
└── package.json          # Zero dependencies
```

## 🚀 Zero Dependencies

This package is built with **zero external dependencies**. Everything is implemented from scratch:

- ✅ **No build tools**: Custom build script using Node.js built-ins
- ✅ **No bundlers**: Simple file concatenation and processing
- ✅ **No minifiers**: Custom minification logic
- ✅ **No testing frameworks**: Simple test runner
- ✅ **No color libraries**: ANSI color codes implemented manually
- ✅ **No animation libraries**: Custom animation system

This ensures:
- 🎯 **Minimal bundle size**
- 🔒 **No security vulnerabilities from dependencies**
- ⚡ **Faster installation**
- 🛠️ **Easier maintenance**
- 📦 **Maximum compatibility**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by popular terminal styling libraries like `chalk` and `kleur`
- Built with performance and ease of use in mind
- **Zero dependencies** for maximum compatibility and minimal footprint
- Custom build system without external bundlers

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ for the Node.js community 