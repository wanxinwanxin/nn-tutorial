const puppeteer = require('puppeteer');

async function quickEvaluate() {
    console.log('🚀 Quick Neural Network Tutorial Evaluation...\n');
    
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        // Test Homepage
        console.log('📋 Testing Homepage...');
        await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
        
        const title = await page.title();
        const chapterLinks = await page.$$eval('a[href*="/chapters/"]', links => links.length);
        const mainHeading = await page.$eval('h1', h1 => h1.textContent);
        
        console.log(`✅ Title: ${title}`);
        console.log(`✅ Chapter links: ${chapterLinks}`);
        console.log(`✅ Main heading: ${mainHeading}`);
        
        await page.screenshot({ path: 'homepage_quick.png', fullPage: true });
        
        // Test Chapter 1
        console.log('\n📚 Testing Chapter 1...');
        await page.goto('http://localhost:3000/chapters/1', { waitUntil: 'domcontentloaded', timeout: 15000 });
        
        const hasContent = await page.$('main') !== null;
        const hasCodeEditor = await page.$('.monaco-editor') !== null;
        const hasButtons = await page.$$eval('button', buttons => buttons.length);
        
        console.log(`✅ Has main content: ${hasContent}`);
        console.log(`✅ Has code editor: ${hasCodeEditor}`);
        console.log(`✅ Number of buttons: ${hasButtons}`);
        
        await page.screenshot({ path: 'chapter1_quick.png', fullPage: true });
        
        // Test Chapter 2
        console.log('\n📚 Testing Chapter 2...');
        await page.goto('http://localhost:3000/chapters/2', { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.screenshot({ path: 'chapter2_quick.png', fullPage: true });
        
        console.log('✅ Chapter 2 loaded and captured');
        
        console.log('\n🎯 Quick evaluation complete!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await browser.close();
    }
}

quickEvaluate();