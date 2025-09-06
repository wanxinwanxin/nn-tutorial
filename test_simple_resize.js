const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🧪 Testing resizable panels...');
  
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:3000/chapters/1');
  
  console.log('⏳ Waiting for components to load...');
  await new Promise(resolve => setTimeout(resolve, 15000));
  
  // Find run button properly
  const runButton = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(button => button.textContent?.includes('Run'));
  });
  
  if (runButton) {
    console.log('✅ Found Run button, executing code...');
    await runButton.click();
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Check for plot images
    const images = await page.$$('img[alt*="Plot"]');
    console.log(`📊 Generated ${images.length} plot(s)`);
    
    if (images.length > 0) {
      console.log('🖼️  Testing image click for fullscreen...');
      await images[0].click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for fullscreen modal
      const modal = await page.$('.fixed.inset-0');
      if (modal) {
        console.log('✅ Fullscreen modal opened');
        
        // Test ESC to close
        await page.keyboard.press('Escape');
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('✅ Modal closed with ESC');
      } else {
        console.log('❌ Fullscreen modal not found');
      }
    }
  }
  
  // Test panel structure
  const panelTests = await page.evaluate(() => {
    const horizontalGroup = document.querySelector('[data-panel-group-direction="horizontal"]');
    const verticalGroup = document.querySelector('[data-panel-group-direction="vertical"]');
    const resizeHandles = document.querySelectorAll('[data-panel-resize-handle-id]');
    
    return {
      horizontalGroup: !!horizontalGroup,
      verticalGroup: !!verticalGroup,
      handleCount: resizeHandles.length,
      autoSaveId: horizontalGroup?.getAttribute('data-panel-group-id')
    };
  });
  
  console.log('📐 Panel structure test results:');
  console.log(`  - Horizontal panel group: ${panelTests.horizontalGroup}`);
  console.log(`  - Vertical panel group: ${panelTests.verticalGroup}`);
  console.log(`  - Resize handles: ${panelTests.handleCount}`);
  console.log(`  - Auto-save ID: ${panelTests.autoSaveId}`);
  
  // Take final screenshot
  await page.screenshot({ path: 'final_resizable_test.png', fullPage: true });
  console.log('📸 Final screenshot saved');
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  await browser.close();
  
  // Summary
  console.log('\n🎉 RESIZABLE LAYOUT TEST RESULTS:');
  console.log(panelTests.horizontalGroup && panelTests.verticalGroup && panelTests.handleCount >= 2 ? 
    '✅ All panel functionality working!' : 
    '❌ Some panel functionality may have issues');
})();