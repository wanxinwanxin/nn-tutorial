const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting Puppeteer tests...');
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Test 1: Home page loads
    console.log('Testing home page...');
    await page.goto('http://localhost:3000');
    await page.waitForSelector('h1');
    
    const title = await page.$eval('h1', el => el.textContent);
    console.log(`✓ Home page loaded with title: "${title}"`);
    
    // Test 2: Check if all chapter links exist
    console.log('Testing chapter navigation...');
    const chapterLinks = await page.$$eval('a[href^="/chapters/"]', links => 
      links.map(link => link.href)
    );
    console.log(`✓ Found ${chapterLinks.length} chapter links`);
    
    // Test 3: Navigate to first chapter
    console.log('Testing chapter page...');
    await page.click('a[href="/chapters/1"]');
    await page.waitForSelector('h1');
    
    const chapterTitle = await page.$eval('h1', el => el.textContent);
    console.log(`✓ Chapter page loaded: "${chapterTitle}"`);
    
    console.log('✅ All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();