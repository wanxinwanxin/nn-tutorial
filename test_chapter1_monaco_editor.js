const puppeteer = require('puppeteer');
const path = require('path');

async function testChapter1MonacoEditor() {
  console.log('🚀 Testing Chapter 1 Monaco Editor Integration...');
  
  const browser = await puppeteer.launch({ 
    headless: false, 
    devtools: false,
    defaultViewport: { width: 1366, height: 768 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Set up console logging
    page.on('console', msg => console.log('Browser console:', msg.text()));
    page.on('pageerror', error => console.error('Page error:', error.message));
    
    console.log('📍 Navigating to Chapter 1...');
    await page.goto('http://localhost:3000/chapters/1', { 
      waitUntil: 'networkidle0', 
      timeout: 30000 
    });
    
    // Wait for the page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('🔍 Looking for Monaco editor in code exercises...');
    
    // Look for Monaco editor containers
    const monacoEditors = await page.$$('.monaco-editor');
    console.log(`Found ${monacoEditors.length} Monaco editor instances`);
    
    if (monacoEditors.length === 0) {
      console.log('⚠️  No Monaco editors found. Looking for code exercise components...');
      
      // Look for code exercise components
      const codeExercises = await page.$$('[data-testid*="code-exercise"], .code-exercise, [class*="CodeExercise"]');
      console.log(`Found ${codeExercises.length} code exercise components`);
      
      // Look for any textareas that might be temporary fallbacks
      const textareas = await page.$$('textarea');
      console.log(`Found ${textareas.length} textarea elements`);
      
      // Check if CodeExercise components are present in HTML
      const pageHTML = await page.content();
      const hasCodeExercise = pageHTML.includes('CodeExercise') || pageHTML.includes('code-exercise');
      console.log(`Page contains CodeExercise components: ${hasCodeExercise}`);
      
      return;
    }
    
    // Test first Monaco editor if found
    console.log('✨ Testing Monaco editor functionality...');
    const firstEditor = monacoEditors[0];
    
    // Click on the editor to focus it
    await firstEditor.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Try to type in the editor
    console.log('⌨️  Testing typing in Monaco editor...');
    await page.keyboard.type('# Test code\nprint("Hello from Monaco!")');
    
    // Look for a run button
    const runButtons = await page.$$('button');
    let runButton = null;
    
    for (let button of runButtons) {
      const text = await page.evaluate(el => el.textContent, button);
      if (text.includes('Run') || text.includes('Execute')) {
        runButton = button;
        break;
      }
    }
    
    if (runButton) {
      console.log('▶️  Found run button, testing execution...');
      await runButton.click();
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for Pyodide to execute
      
      // Look for output
      const outputElements = await page.$$('.code-output, [class*="output"], pre');
      console.log(`Found ${outputElements.length} potential output elements`);
      
      for (let i = 0; i < outputElements.length && i < 3; i++) {
        const text = await page.evaluate(el => el.textContent, outputElements[i]);
        if (text.trim()) {
          console.log(`Output ${i + 1}:`, text.trim());
        }
      }
    } else {
      console.log('⚠️  No run button found');
    }
    
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: 'chapter1_monaco_test.png', 
      fullPage: true 
    });
    
    console.log('✅ Monaco editor test completed!');
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testChapter1MonacoEditor().catch(console.error);