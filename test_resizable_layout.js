const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  console.log('🧪 Testing resizable layout and fullscreen modal...');
  
  // Set viewport to test responsiveness
  await page.setViewport({ width: 1200, height: 800 });
  
  try {
    // Navigate to Chapter 1
    await page.goto('http://localhost:3000/chapters/1', { waitUntil: 'networkidle2' });
    console.log('✅ Page loaded');
    
    // Wait for Python environment
    console.log('⏳ Waiting for Python environment...');
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Check if resizable panels are present
    const panelGroups = await page.$$('[data-panel-group]');
    console.log(`✅ Found ${panelGroups.length} panel groups`);
    
    // Check if resize handles are present
    const resizeHandles = await page.$$('[data-panel-resize-handle-id]');
    console.log(`✅ Found ${resizeHandles.length} resize handles`);
    
    // Run code to generate a plot
    console.log('🐍 Running Python code to generate plot...');
    const runButton = await page.$('button:has-text("Run")');
    if (runButton) {
      await runButton.click();
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for execution
      
      // Check if plot was generated
      const plotImages = await page.$$('img[alt*="Plot"]');
      console.log(`✅ Generated ${plotImages.length} plot(s)`);
      
      if (plotImages.length > 0) {
        // Test clicking on image to open fullscreen
        console.log('🖼️  Testing fullscreen modal...');
        await plotImages[0].click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if modal appeared
        const modal = await page.$('.fixed.inset-0.bg-black');
        if (modal) {
          console.log('✅ Fullscreen modal opened');
          
          // Test ESC key to close modal
          await page.keyboard.press('Escape');
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Check if modal closed
          const modalAfterEsc = await page.$('.fixed.inset-0.bg-black');
          if (!modalAfterEsc) {
            console.log('✅ Modal closed with ESC key');
          } else {
            console.log('❌ Modal did not close with ESC key');
          }
        } else {
          console.log('❌ Fullscreen modal did not open');
        }
        
        // Test expand button
        console.log('🔍 Testing expand button...');
        const expandButton = await page.$('button:has-text("Expand")');
        if (expandButton) {
          await expandButton.click();
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const modal2 = await page.$('.fixed.inset-0.bg-black');
          if (modal2) {
            console.log('✅ Expand button opens fullscreen modal');
            
            // Click outside to close
            await page.click('.fixed.inset-0.bg-black');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const modalAfterClick = await page.$('.fixed.inset-0.bg-black');
            if (!modalAfterClick) {
              console.log('✅ Modal closed by clicking outside');
            }
          } else {
            console.log('❌ Expand button did not open modal');
          }
        }
      }
    } else {
      console.log('❌ Run button not found');
    }
    
    // Test panel resizing by checking if panels have the expected classes and data attributes
    console.log('📐 Testing panel structure...');
    
    const horizontalPanelGroup = await page.$('[data-panel-group-direction="horizontal"]');
    const verticalPanelGroup = await page.$('[data-panel-group-direction="vertical"]');
    
    console.log(`✅ Horizontal panel group: ${!!horizontalPanelGroup}`);
    console.log(`✅ Vertical panel group: ${!!verticalPanelGroup}`);
    
    // Take screenshot for manual verification
    await page.screenshot({ 
      path: 'resizable_layout_test.png', 
      fullPage: true 
    });
    console.log('📸 Screenshot saved as resizable_layout_test.png');
    
    // Test responsiveness - change viewport size
    console.log('📱 Testing responsiveness...');
    await page.setViewport({ width: 768, height: 600 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await page.screenshot({ 
      path: 'resizable_layout_mobile.png', 
      fullPage: true 
    });
    console.log('📸 Mobile screenshot saved');
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  await browser.close();
  
  console.log('\n🏁 Resizable layout test completed!');
})();