const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing matplotlib plotting (simplified)...');
  
  // Navigate to Chapter 1
  await page.goto('http://localhost:3000/chapters/1');
  await page.waitForSelector('.monaco-editor', { timeout: 10000 });
  
  console.log('Page loaded, waiting a bit for Python environment...');
  await new Promise(resolve => setTimeout(resolve, 15000)); // Wait 15 seconds for Pyodide
  
  // Find and click the run button
  const runButton = await page.$('button');
  if (runButton) {
    const buttonText = await page.evaluate(el => el.textContent, runButton);
    console.log('Found button with text:', buttonText);
    
    if (buttonText?.includes('Run')) {
      await runButton.click();
      console.log('Clicked run button, waiting for results...');
      
      // Wait for execution
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      // Check for images
      const images = await page.$$('img');
      console.log(`Found ${images.length} images on the page`);
      
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          const src = await page.evaluate(el => el.src, img);
          const alt = await page.evaluate(el => el.alt, img);
          console.log(`Image ${i + 1}: ${alt} (src starts with: ${src.substring(0, 30)}...)`);
        }
      }
      
      // Take screenshot
      await page.screenshot({ path: 'simple_plot_test.png', fullPage: true });
      console.log('Screenshot saved as simple_plot_test.png');
    }
  }
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  await browser.close();
})();