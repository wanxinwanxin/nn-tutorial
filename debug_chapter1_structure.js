const puppeteer = require('puppeteer');

async function debugChapter1Structure() {
  console.log('🔍 Debugging Chapter 1 Structure...');
  
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
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('🔍 Analyzing page structure...');
    
    // Check for CodeExercise components
    const codeExerciseElements = await page.evaluate(() => {
      // Look for various selectors that might indicate CodeExercise components
      const selectors = [
        '[data-testid*="code-exercise"]',
        '.code-exercise',
        '[class*="CodeExercise"]',
        '[class*="code-exercise"]'
      ];
      
      let found = [];
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          found.push(`Found ${elements.length} elements with selector: ${selector}`);
        }
      });
      
      return found;
    });
    
    console.log('CodeExercise elements:', codeExerciseElements);
    
    // Look for any button elements and their text
    const allButtons = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.map(btn => ({
        text: btn.textContent.trim(),
        classes: btn.className,
        visible: !btn.hidden && btn.offsetParent !== null
      }));
    });
    
    console.log('All buttons found:');
    allButtons.forEach((btn, i) => {
      console.log(`  ${i + 1}. "${btn.text}" (visible: ${btn.visible}) - classes: ${btn.classes}`);
    });
    
    // Look for specific content patterns
    const pageContent = await page.evaluate(() => {
      return {
        hasLoadInEditorText: document.body.textContent.includes('Load in Editor'),
        hasMonacoEditor: document.querySelector('.monaco-editor') !== null,
        hasCodeTemplate: document.body.textContent.includes('def neuron_output'),
        hasExerciseTitle: document.body.textContent.includes('Calculate the Neuron Output'),
        hasChunkedContent: document.body.textContent.includes('Chunk 1: What is a Neuron'),
      };
    });
    
    console.log('Page content analysis:');
    Object.entries(pageContent).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    
    // Check for specific div structures that might contain exercises
    const exerciseStructure = await page.evaluate(() => {
      // Look for common exercise container patterns
      const containers = document.querySelectorAll('div');
      let exerciseContainers = 0;
      let potentialExercises = [];
      
      containers.forEach((div, i) => {
        const text = div.textContent;
        if (text.includes('Exercise') || text.includes('Calculate') || text.includes('Challenge')) {
          exerciseContainers++;
          potentialExercises.push(`Container ${i}: ${text.substring(0, 100)}...`);
        }
      });
      
      return {
        totalDivs: containers.length,
        exerciseContainers,
        potentialExercises: potentialExercises.slice(0, 3) // First 3
      };
    });
    
    console.log('Exercise structure analysis:');
    console.log(`  Total divs: ${exerciseStructure.totalDivs}`);
    console.log(`  Exercise containers: ${exerciseStructure.exerciseContainers}`);
    exerciseStructure.potentialExercises.forEach(ex => {
      console.log(`  ${ex}`);
    });
    
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: 'chapter1_structure_debug.png', 
      fullPage: true 
    });
    
    console.log('✅ Debug analysis completed!');
    
  } catch (error) {
    console.error('❌ Error during debugging:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the debug
debugChapter1Structure().catch(console.error);