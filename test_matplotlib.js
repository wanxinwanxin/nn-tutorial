const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing matplotlib plotting in Chapter 1...');
  
  // Navigate to Chapter 1
  await page.goto('http://localhost:3000/chapters/1');
  await page.waitForSelector('.monaco-editor', { timeout: 10000 });
  
  // Wait for Python environment to be ready
  await page.waitForFunction(() => {
    const statusElements = document.querySelectorAll('*');
    for (let el of statusElements) {
      if (el.textContent && el.textContent.includes('Python environment ready')) {
        return true;
      }
    }
    return false;
  }, { timeout: 30000 });
  
  console.log('Python environment loaded, testing plot code...');
  
  // Clear the editor and add simple plot code
  await page.click('.monaco-editor');
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  
  const plotCode = `
import matplotlib.pyplot as plt
import numpy as np

# Simple test plot
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(8, 6))
plt.plot(x, y, 'b-', linewidth=2, label='sin(x)')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Test Plot')
plt.legend()
plt.grid(True)
plt.show()

print("Plot should be displayed above")
`;
  
  await page.keyboard.type(plotCode);
  
  // Execute the code
  await page.click('button:has-text("Run")');
  
  // Wait for execution and check output
  await page.waitForTimeout(5000);
  
  // Check if there's any output
  const outputText = await page.evaluate(() => {
    const outputPanel = document.querySelector('.code-output') || 
                       document.querySelector('[class*="output"]') ||
                       document.querySelector('pre');
    return outputPanel ? outputPanel.textContent : 'No output found';
  });
  
  console.log('Output:', outputText);
  
  // Check if there's any image displayed
  const hasImage = await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    return images.length > 0;
  });
  
  console.log('Images found:', hasImage);
  
  await page.waitForTimeout(3000);
  await browser.close();
})();