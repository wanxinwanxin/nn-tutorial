const puppeteer = require('puppeteer');

async function evaluateNeuralNetworkTutorial() {
    console.log('🚀 Starting Neural Network Tutorial Evaluation...\n');
    
    const browser = await puppeteer.launch({
        headless: false, // Show browser for visibility
        defaultViewport: { width: 1200, height: 800 },
        slowMo: 1000 // Slow down for better observation
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    const results = {
        homepage: {},
        chapters: {},
        interactivity: {},
        usability: {},
        performance: {}
    };
    
    try {
        // 1. Test Homepage
        console.log('📋 Testing Homepage...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
        
        results.homepage.title = await page.title();
        results.homepage.hasChapterLinks = await page.$$eval('a[href*="/chapters/"]', links => links.length);
        results.homepage.mainHeading = await page.$eval('h1', h1 => h1.textContent);
        
        await page.screenshot({ path: 'homepage_evaluation.png', fullPage: true });
        console.log('✅ Homepage captured');
        
        // 2. Test Chapter Navigation
        console.log('\n📚 Testing Chapter Navigation...');
        const chapterLinks = await page.$$('a[href*="/chapters/"]');
        
        for (let i = 0; i < Math.min(3, chapterLinks.length); i++) {
            const chapterNumber = i + 1;
            console.log(`   Testing Chapter ${chapterNumber}...`);
            
            await page.click(`a[href="/chapters/${chapterNumber}"]`);
            await page.waitForLoadState?.('networkidle') || await page.waitForTimeout(3000);
            
            // Check for key elements
            const hasCodeEditor = await page.$('.monaco-editor') !== null;
            const hasContent = await page.$('main') !== null;
            const hasVisualization = await page.$('[id*="plotly"]') !== null || 
                                   await page.$('[class*="plot"]') !== null ||
                                   await page.$('canvas') !== null;
            
            results.chapters[`chapter${chapterNumber}`] = {
                loads: true,
                hasCodeEditor,
                hasContent,
                hasVisualization,
                url: page.url()
            };
            
            await page.screenshot({ 
                path: `chapter${chapterNumber}_evaluation.png`, 
                fullPage: true 
            });
            
            // Test resizable panels if available
            const resizableHandle = await page.$('[data-panel-resize-handle]') || 
                                  await page.$('[class*="resize"]') ||
                                  await page.$('[style*="resize"]');
            
            if (resizableHandle) {
                console.log(`   Found resizable panels in Chapter ${chapterNumber}`);
                results.chapters[`chapter${chapterNumber}`].hasResizablePanels = true;
            }
            
            // Go back to homepage for next iteration
            await page.goto('http://localhost:3000');
            await page.waitForTimeout(1000);
        }
        
        // 3. Deep dive into Chapter 1 for interactivity testing
        console.log('\n🔬 Deep Testing Chapter 1 Interactivity...');
        await page.goto('http://localhost:3000/chapters/1');
        await page.waitForTimeout(5000); // Wait for Pyodide to load
        
        // Look for run button or code execution
        const runButton = await page.$('button[class*="run"]') || 
                         await page.$('button:has-text("Run")') ||
                         await page.$('button[title*="run" i]') ||
                         await page.$('button[aria-label*="run" i]');
        
        results.interactivity.hasRunButton = runButton !== null;
        
        if (runButton) {
            console.log('   Found run button, testing code execution...');
            await runButton.click();
            await page.waitForTimeout(8000); // Wait for Python execution
            
            // Check for output
            const hasOutput = await page.$('.code-output') !== null ||
                            await page.$('[class*="output"]') !== null ||
                            await page.$('pre') !== null;
            
            results.interactivity.codeExecutes = hasOutput;
            
            if (hasOutput) {
                console.log('   ✅ Code execution detected');
            } else {
                console.log('   ⚠️ No visible output after run button click');
            }
        }
        
        // 4. Performance and Loading Tests
        console.log('\n⚡ Testing Performance...');
        const performanceMetrics = await page.evaluate(() => {
            const nav = performance.getEntriesByType('navigation')[0];
            return {
                loadTime: nav.loadEventEnd - nav.loadEventStart,
                domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint')?.startTime
            };
        });
        
        results.performance = performanceMetrics;
        
        // 5. Accessibility and Usability
        console.log('\n♿ Testing Accessibility...');
        const accessibilityFeatures = await page.evaluate(() => {
            const hasAriaLabels = document.querySelectorAll('[aria-label]').length > 0;
            const hasHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0;
            const hasAltTexts = Array.from(document.querySelectorAll('img')).every(img => 
                img.hasAttribute('alt') || img.getAttribute('role') === 'presentation'
            );
            const hasSkipLinks = document.querySelectorAll('[href*="#"]').length > 0;
            
            return {
                hasAriaLabels,
                hasHeadings,
                hasAltTexts,
                hasSkipLinks
            };
        });
        
        results.usability = accessibilityFeatures;
        
        // 6. Mobile Responsiveness Test
        console.log('\n📱 Testing Mobile Responsiveness...');
        await page.setViewport({ width: 375, height: 812 }); // iPhone X dimensions
        await page.reload();
        await page.waitForTimeout(2000);
        
        const mobileLayout = await page.evaluate(() => {
            const body = document.body;
            const hasHorizontalScroll = body.scrollWidth > body.clientWidth;
            const elementsVisible = document.querySelectorAll('*').length > 0;
            
            return {
                hasHorizontalScroll,
                elementsVisible
            };
        });
        
        results.usability.mobile = mobileLayout;
        await page.screenshot({ path: 'mobile_view_evaluation.png', fullPage: true });
        
        console.log('\n🎯 Evaluation Complete!');
        
    } catch (error) {
        console.error('❌ Error during evaluation:', error.message);
        results.error = error.message;
    } finally {
        await browser.close();
    }
    
    return results;
}

// Run the evaluation
evaluateNeuralNetworkTutorial().then(results => {
    console.log('\n📊 EVALUATION RESULTS:');
    console.log('═══════════════════════════');
    console.log(JSON.stringify(results, null, 2));
    
    // Generate summary
    console.log('\n📋 QUICK SUMMARY:');
    console.log('────────────────────');
    console.log(`✓ Homepage loads: ${results.homepage.title ? 'YES' : 'NO'}`);
    console.log(`✓ Chapters available: ${results.homepage.hasChapterLinks || 0}`);
    console.log(`✓ Code interactivity: ${results.interactivity.codeExecutes ? 'YES' : 'UNKNOWN'}`);
    console.log(`✓ Mobile responsive: ${!results.usability.mobile?.hasHorizontalScroll ? 'YES' : 'NEEDS WORK'}`);
    console.log(`✓ Load time: ${results.performance.loadTime || 'N/A'}ms`);
    
}).catch(console.error);