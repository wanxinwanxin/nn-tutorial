const puppeteer = require('puppeteer');

async function testLoadInEditorButton() {
  console.log('🔍 Testing "Load in Editor" Button Functionality...');
  
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
    
    // Wait for the page to load completely
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('🔍 Looking for "Load in Editor" buttons...');
    
    // Look for "Load in Editor" buttons
    const loadButtons = await page.$$('button');
    let foundLoadButtons = [];
    
    for (let button of loadButtons) {
      const text = await page.evaluate(el => el.textContent, button);
      if (text.includes('Load in Editor')) {
        foundLoadButtons.push(button);
        console.log(`Found button with text: "${text}"`);
      }
    }
    
    console.log(`Found ${foundLoadButtons.length} "Load in Editor" buttons`);
    
    if (foundLoadButtons.length === 0) {
      console.log('❌ No "Load in Editor" buttons found');
      return;
    }
    
    // Test clicking the first Load in Editor button
    console.log('🖱️  Testing click on first "Load in Editor" button...');
    const firstButton = foundLoadButtons[0];
    
    // Get the Monaco editor content before clicking
    const editorsBefore = await page.$$('.monaco-editor');
    let editorContentBefore = '';
    if (editorsBefore.length > 0) {
      // Try to get editor content
      try {
        editorContentBefore = await page.evaluate(() => {
          const editor = window.monaco?.editor?.getEditors?.()?.[0];
          return editor ? editor.getValue() : 'No editor content found';
        });
      } catch (e) {
        console.log('Could not get editor content:', e.message);
      }
    }
    
    console.log('📝 Editor content before click:', editorContentBefore.substring(0, 100) + '...');
    
    // Click the button
    await firstButton.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if editor content changed
    const editorsAfter = await page.$$('.monaco-editor');
    let editorContentAfter = '';
    if (editorsAfter.length > 0) {
      try {
        editorContentAfter = await page.evaluate(() => {
          const editor = window.monaco?.editor?.getEditors?.()?.[0];
          return editor ? editor.getValue() : 'No editor content found';
        });
      } catch (e) {
        console.log('Could not get editor content after:', e.message);
      }
    }
    
    console.log('📝 Editor content after click:', editorContentAfter.substring(0, 100) + '...');
    
    // Check if content changed
    if (editorContentBefore !== editorContentAfter) {
      console.log('✅ Button works! Editor content changed');
    } else {
      console.log('❌ Button does NOT work! Editor content unchanged');
    }
    
    // Look for any visual feedback
    const successMessages = await page.$$('.text-green-800, .text-green-600, .bg-green-50');
    if (successMessages.length > 0) {
      console.log('🎉 Found success/feedback elements');
      for (let msg of successMessages) {
        const text = await page.evaluate(el => el.textContent, msg);
        if (text.includes('loaded') || text.includes('editor')) {
          console.log(`Success message: "${text}"`);
        }
      }
    }
    
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: 'load_in_editor_test.png', 
      fullPage: true 
    });
    
    console.log('✅ Load in Editor button test completed!');
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testLoadInEditorButton().catch(console.error);