#!/usr/bin/env node

const termcolorized = require('../src/index');

async function runDemo() {
  console.log('\n🎨 TermColorized Demo - Terminal Text Styling & Animation Library\n');

  // Wait between sections
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. Basic Colors
  console.log('1️⃣  Basic Colors:');
  console.log(termcolorized.red('Red text'));
  console.log(termcolorized.green('Green text'));
  console.log(termcolorized.blue('Blue text'));
  console.log(termcolorized.yellow('Yellow text'));
  console.log(termcolorized.magenta('Magenta text'));
  console.log(termcolorized.cyan('Cyan text'));
  console.log(termcolorized.white('White text'));
  console.log(termcolorized.gray('Gray text'));
  console.log();

  await wait(1000);

  // 2. Background Colors
  console.log('2️⃣  Background Colors:');
  console.log(termcolorized.color('Red text on white background', 'red', 'white'));
  console.log(termcolorized.color('Green text on black background', 'green', 'black'));
  console.log(termcolorized.color('Blue text on yellow background', 'blue', 'yellow'));
  console.log();

  await wait(1000);

  // 3. Text Styles
  console.log('3️⃣  Text Styles:');
  console.log(termcolorized.bold('Bold text'));
  console.log(termcolorized.italic('Italic text'));
  console.log(termcolorized.underline('Underlined text'));
  console.log(termcolorized.strikethrough('Strikethrough text'));
  console.log(termcolorized.dim('Dim text'));
  console.log();

  await wait(1000);

  // 4. Combined Styles
  console.log('4️⃣  Combined Styles:');
  console.log(termcolorized.style('Bold red text', { color: 'red', bold: true }));
  console.log(termcolorized.style('Italic blue text with underline', { color: 'blue', italic: true, underline: true }));
  console.log(termcolorized.style('Green text with background', { color: 'green', bgColor: 'black', bold: true }));
  console.log();

  await wait(1000);

  // 5. Preset Styles
  console.log('5️⃣  Preset Styles:');
  console.log(termcolorized.error('Error message'));
  console.log(termcolorized.success('Success message'));
  console.log(termcolorized.warning('Warning message'));
  console.log(termcolorized.info('Info message'));
  console.log(termcolorized.highlight('Highlighted text'));
  console.log();

  await wait(1000);

  // 6. Hex and RGB Colors
  console.log('6️⃣  Hex and RGB Colors:');
  console.log(termcolorized.color('Hex color #ff6b6b', '#ff6b6b'));
  console.log(termcolorized.color('RGB color rgb(255, 107, 107)', 'rgb(255, 107, 107)'));
  console.log(termcolorized.color('Custom hex with background', '#4ecdc4', '#2c3e50'));
  console.log();

  await wait(1000);

  // 7. Gradients
  console.log('7️⃣  Gradients:');
  console.log(termcolorized.gradient('Rainbow gradient text', '#ff0000', '#00ff00'));
  console.log(termcolorized.gradient('Blue to purple gradient', '#3498db', '#9b59b6'));
  console.log(termcolorized.gradient('Sunset gradient', '#ff6b6b', '#feca57'));
  console.log();

  await wait(1000);

  // 8. Custom Themes
  console.log('8️⃣  Custom Themes:');
  termcolorized.useTheme('fancy', { color: '#e74c3c', bold: true, underline: true });
  termcolorized.useTheme('soft', { color: '#95a5a6', italic: true });
  termcolorized.useTheme('alert', { color: 'yellow', bgColor: 'red', bold: true, blink: true });

  console.log(termcolorized.theme('fancy', 'Fancy themed text'));
  console.log(termcolorized.theme('soft', 'Soft themed text'));
  console.log(termcolorized.theme('alert', 'Alert themed text'));
  console.log();

  await wait(1000);

  // 9. Animations
  console.log('9️⃣  Animations:');
  
  console.log('Typing animation:');
  await termcolorized.type('Hello, this is a typing animation!', 50);
  console.log('\n');

  console.log('Wave animation:');
  await termcolorized.wave('Wave effect animation!', 100);
  console.log('\n');

  console.log('Blink animation:');
  await termcolorized.blink('Blinking text!', 300);
  console.log('\n');

  console.log('Pulse animation:');
  await termcolorized.pulse('Pulsing text!', 200);
  console.log('\n');

  console.log('Bounce animation:');
  await termcolorized.bounce('Bouncing text!', 100);
  console.log('\n');

  console.log('Rainbow animation:');
  await termcolorized.rainbow('Rainbow cycling text!', 150);
  console.log('\n');

  console.log('Matrix animation:');
  await termcolorized.matrix('Matrix effect!', 30);
  console.log('\n');

  // 10. Progress Bar
  console.log('🔟 Progress Bar:');
  await termcolorized.progressBar('Loading...', 2000, 30);
  console.log('\n');

  // 11. Advanced Examples
  console.log('1️⃣1️⃣  Advanced Examples:');
  
  // Multi-line gradient
  const lines = [
    'Welcome to TermColorized!',
    'A powerful terminal styling library',
    'With colors, gradients, and animations'
  ];
  
  lines.forEach((line, index) => {
    const gradient = termcolorized.gradient(line, '#ff6b6b', '#4ecdc4');
    console.log(gradient);
  });
  console.log();

  // Complex styling
  const complexText = termcolorized.style(
    'Complex styled text with multiple effects',
    {
      color: '#e74c3c',
      bgColor: '#2c3e50',
      bold: true,
      italic: true,
      underline: true
    }
  );
  console.log(complexText);
  console.log();

  // 12. Performance Demo
  console.log('1️⃣2️⃣  Performance Demo:');
  const startTime = Date.now();
  
  for (let i = 0; i < 100; i++) {
    termcolorized.color(`Performance test ${i}`, 'green');
  }
  
  const endTime = Date.now();
  console.log(termcolorized.success(`Processed 100 color operations in ${endTime - startTime}ms`));
  console.log();

  // Final message
  console.log(termcolorized.gradient('🎉 Demo completed! Thanks for trying TermColorized! 🎉', '#ff6b6b', '#4ecdc4'));
  console.log();
  console.log(termcolorized.info('For more information, check out the documentation and examples.'));
  console.log(termcolorized.highlight('Happy coding! 🚀'));
}

// Check if terminal supports colors
const supportsColor = process.stdout.isTTY && process.env.TERM !== 'dumb';

if (!supportsColor) {
  console.log('⚠️  Your terminal may not support colors and animations properly.');
  console.log('For the best experience, use a modern terminal emulator.\n');
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n' + termcolorized.warning('Demo interrupted. Goodbye! 👋'));
  process.exit(0);
});

// Show welcome message
console.log('🚀 Starting TermColorized Demo...\n');

// Run the demo
runDemo()
  .then(() => {
    console.log('\n✨ Demo completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Demo failed:', error.message);
    process.exit(1);
  }); 