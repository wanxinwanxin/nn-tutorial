const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing matplotlib plotting with fixed implementation...');
  
  // Navigate to Chapter 1
  await page.goto('http://localhost:3000/chapters/1');
  await page.waitForSelector('.monaco-editor', { timeout: 10000 });
  
  // Wait for Python environment to be ready - look for the "Loading Python..." to disappear
  console.log('Waiting for Python environment to load...');
  
  // Wait up to 60 seconds for Pyodide to load
  try {
    await page.waitForFunction(() => {
      const loadingText = document.querySelector('*:contains("Loading Python...")');
      const runButton = document.querySelector('button[disabled]');
      // Python is ready when "Loading Python..." is gone and run button is enabled
      return !document.querySelector('span:contains("Loading Python...")') && 
             document.querySelector('button:not([disabled]):contains("Run")');
    }, { timeout: 60000 });
    console.log('Python environment ready!');
  } catch (e) {
    console.log('Timeout waiting for Python, continuing anyway...');
  }
  
  // Clear the editor and add simple plot code
  await page.click('.monaco-editor');
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  
  const plotCode = `
import matplotlib.pyplot as plt
import numpy as np

# Create simple test plot
x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', linewidth=2, label='sin(x)')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Test Sine Wave Plot')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print("Plot executed successfully!")
`;
  
  await page.keyboard.type(plotCode);
  
  // Execute the code
  console.log('Executing plot code...');
  await page.click('button[contains(text(), "Run")]');
  
  // Wait for execution and check output
  await page.waitForTimeout(8000); // Give more time for plot generation
  
  // Check if there's any output
  const outputText = await page.evaluate(() => {
    const outputPanel = document.querySelector('.code-output') || 
                       document.querySelector('[class*="output"]') ||
                       document.querySelector('pre');
    return outputPanel ? outputPanel.textContent : 'No output found';
  });
  
  console.log('Text Output:', outputText);
  
  // Check if there's any plot image displayed
  const plotImages = await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    const plotSection = document.querySelector('[class*="green-50"]'); // Plot section has green background
    const hasPlotSection = !!plotSection;
    
    return {
      totalImages: images.length,
      plotSectionExists: hasPlotSection,
      imageDetails: Array.from(images).map(img => ({
        src: img.src.substring(0, 50) + '...', // First 50 chars of src
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight
      }))
    };
  });
  
  console.log('Plot Images Found:', JSON.stringify(plotImages, null, 2));
  
  // Check for any error messages
  const errorMessages = await page.evaluate(() => {
    const errorElements = document.querySelectorAll('[class*="red-"]');
    return Array.from(errorElements).map(el => el.textContent).filter(text => text?.trim());
  });
  
  if (errorMessages.length > 0) {
    console.log('Error messages found:', errorMessages);
  }
  
  // Take a screenshot for manual verification
  await page.screenshot({ path: 'plot_test_result.png', fullPage: true });
  console.log('Screenshot saved as plot_test_result.png');
  
  await page.waitForTimeout(3000);
  await browser.close();
  
  // Summary
  console.log('\n=== PLOT TEST SUMMARY ===');
  console.log(`Images found: ${plotImages.totalImages}`);
  console.log(`Plot section exists: ${plotImages.plotSectionExists}`);
  console.log(`Has errors: ${errorMessages.length > 0}`);
  console.log('=========================');
})();