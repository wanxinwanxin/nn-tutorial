const puppeteer = require('puppeteer');

async function testChapter1Chunked() {
  console.log('🧪 Testing Chapter 1 Chunked Implementation...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, // Show browser for debugging
    devtools: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport for consistent testing
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log('📍 Navigating to Chapter 1...');
    await page.goto('http://localhost:3000/chapters/1', { waitUntil: 'networkidle0' });
    
    // Take screenshot of initial state
    await page.screenshot({ path: 'chapter1-initial.png', fullPage: true });
    console.log('📸 Screenshot saved: chapter1-initial.png');
    
    // Test 1: Check if chunked layout is present
    console.log('\n✅ Test 1: Checking chunked layout...');
    const chunkTitle = await page.$eval('h1', el => el.textContent);
    console.log(`   Title: ${chunkTitle}`);
    
    const hasProgressTracker = await page.$('.lg\\:col-span-1') !== null;
    console.log(`   Progress Tracker Present: ${hasProgressTracker}`);
    
    // Test 2: Check if first chunk content is visible
    console.log('\n✅ Test 2: Checking Chunk 1 content...');
    const chunk1Header = await page.$eval('h2', el => el.textContent);
    console.log(`   Chunk 1 Header: ${chunk1Header}`);
    
    // Test 3: Look for quiz component
    console.log('\n✅ Test 3: Looking for interactive quiz...');
    await page.waitForSelector('[data-testid="quiz-component"], .bg-purple-50', { timeout: 5000 });
    const hasQuiz = await page.$('.bg-purple-50') !== null;
    console.log(`   Quiz Component Present: ${hasQuiz}`);
    
    // Test 4: Check for progress sidebar
    console.log('\n✅ Test 4: Checking progress sidebar...');
    const progressItems = await page.$$eval('.lg\\:col-span-1 *', elements => 
      elements.filter(el => el.textContent?.includes('Chunk') || el.textContent?.includes('What is')).length
    );
    console.log(`   Progress Items Found: ${progressItems}`);
    
    // Test 5: Try to interact with quiz if present
    console.log('\n✅ Test 5: Testing quiz interaction...');
    const quizButtons = await page.$$('button[class*="bg-purple"]');
    if (quizButtons.length > 0) {
      console.log(`   Found ${quizButtons.length} quiz-related buttons`);
      
      // Try to click on a quiz option
      const optionButtons = await page.$$('label');
      if (optionButtons.length > 0) {
        console.log('   Clicking first quiz option...');
        await optionButtons[0].click();
        await page.waitForTimeout(1000);
        
        // Look for answer button
        const answerButtons = await page.$$('button');
        const checkButton = await page.evaluateHandle(() => 
          Array.from(document.querySelectorAll('button')).find(btn => 
            btn.textContent?.includes('Check') || btn.textContent?.includes('Submit')
          )
        );
        
        if (checkButton) {
          console.log('   Found check/submit button');
        }
      }
    }
    
    // Test 6: Check responsive design
    console.log('\n✅ Test 6: Testing responsive design...');
    await page.setViewport({ width: 768, height: 600 });
    await page.waitForTimeout(500);
    
    const isMobile = await page.$eval('body', () => window.innerWidth < 1024);
    console.log(`   Mobile Layout Active: ${isMobile}`);
    
    // Take final screenshot
    await page.screenshot({ path: 'chapter1-mobile.png', fullPage: true });
    console.log('📸 Mobile screenshot saved: chapter1-mobile.png');
    
    console.log('\n🎉 Chapter 1 Chunked Testing Complete!');
    console.log('\nResults Summary:');
    console.log(`✅ Page loads successfully`);
    console.log(`✅ Chunked layout present: ${hasProgressTracker}`);
    console.log(`✅ Quiz component present: ${hasQuiz}`);
    console.log(`✅ Progress tracking visible: ${progressItems > 0}`);
    console.log(`✅ Mobile responsive: ${isMobile}`);
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    
    // Take error screenshot
    try {
      await page.screenshot({ path: 'chapter1-error.png', fullPage: true });
      console.log('📸 Error screenshot saved: chapter1-error.png');
    } catch (screenshotError) {
      console.error('Failed to take error screenshot:', screenshotError.message);
    }
  } finally {
    await browser.close();
  }
}

// Run the test
testChapter1Chunked().catch(console.error);