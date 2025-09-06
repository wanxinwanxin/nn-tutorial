const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🧪 Testing Chapter 2: Activation Functions...');
  
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:3001/chapters/2');
  
  console.log('⏳ Waiting for page to load...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Check if the chapter title is correct
  const title = await page.$eval('h1', el => el.textContent);
  console.log(`📖 Page title: ${title}`);
  
  // Check if content has been updated (not "Coming Soon")
  const hasComingSoon = await page.evaluate(() => {
    return document.body.textContent.includes('Coming Soon!');
  });
  
  if (!hasComingSoon) {
    console.log('✅ Chapter 2 content has been implemented (no "Coming Soon" message)');
  } else {
    console.log('❌ Chapter 2 still shows "Coming Soon" message');
  }
  
  // Check for activation function mentions
  const hasActivationFunctions = await page.evaluate(() => {
    const text = document.body.textContent;
    return text.includes('ReLU') && text.includes('Sigmoid') && text.includes('Tanh');
  });
  
  if (hasActivationFunctions) {
    console.log('✅ Chapter 2 mentions all three activation functions (ReLU, Sigmoid, Tanh)');
  } else {
    console.log('❌ Chapter 2 missing activation function content');
  }
  
  // Wait for Pyodide to load
  console.log('⏳ Waiting for Python environment...');
  await new Promise(resolve => setTimeout(resolve, 15000));
  
  // Try to run the code
  const runButton = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(button => button.textContent?.includes('Run'));
  });
  
  if (runButton) {
    console.log('✅ Found Run button, executing activation functions code...');
    await runButton.click();
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Check for plot output
    const images = await page.$$('img[alt*="Plot"]');
    console.log(`📊 Generated ${images.length} plot(s)`);
    
    // Check for text output with activation function results
    const outputText = await page.evaluate(() => {
      const outputDiv = document.querySelector('.bg-gray-50');
      return outputDiv ? outputDiv.textContent : '';
    });
    
    if (outputText.includes('ReLU') || outputText.includes('Sigmoid') || outputText.includes('Tanh')) {
      console.log('✅ Activation function code executed successfully');
    } else {
      console.log('⚠️ Code executed but may not have expected activation function output');
    }
    
    if (images.length > 0) {
      console.log('✅ Visualization plots generated successfully');
    } else {
      console.log('❌ No visualization plots found');
    }
  } else {
    console.log('❌ Run button not found');
  }
  
  // Take screenshot for verification
  await page.screenshot({ path: 'chapter2_test.png', fullPage: true });
  console.log('📸 Screenshot saved as chapter2_test.png');
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  await browser.close();
  
  console.log('\n🎉 Chapter 2 test completed!');
})();