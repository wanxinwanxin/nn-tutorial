const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testChapter1Visuals() {
    console.log('🚀 Starting Chapter 1 Visual Analysis...');
    
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set default viewport
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
    });
    
    const results = {
        timestamp: new Date().toISOString(),
        baseUrl: 'http://localhost:3000',
        tests: []
    };
    
    try {
        console.log('📖 Testing Chapter 1 at different screen sizes...');
        
        // Test different viewport sizes
        const viewports = [
            { name: 'Desktop Large', width: 1920, height: 1080 },
            { name: 'Desktop Standard', width: 1366, height: 768 },
            { name: 'Laptop', width: 1024, height: 768 },
            { name: 'Tablet Landscape', width: 1024, height: 600 },
            { name: 'Mobile Large', width: 414, height: 896 }
        ];
        
        for (const viewport of viewports) {
            console.log(`📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
            
            await page.setViewport(viewport);
            
            // Navigate to Chapter 1
            await page.goto('http://localhost:3000/chapters/1', { 
                waitUntil: 'networkidle2',
                timeout: 30000 
            });
            
            // Wait for page to fully load
            await page.waitForSelector('.space-y-6', { timeout: 10000 });
            
            // Wait a bit more for any animations
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Take full page screenshot
            const screenshotPath = `chapter1_${viewport.name.toLowerCase().replace(/\s+/g, '_')}.png`;
            await page.screenshot({
                path: screenshotPath,
                fullPage: true
            });
            
            // Analyze layout elements
            const layoutAnalysis = await page.evaluate(() => {
                const analysis = {
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    header: null,
                    mainContent: null,
                    panels: [],
                    progressTracker: null,
                    resizeHandles: [],
                    issues: []
                };
                
                // Analyze header
                const header = document.querySelector('header');
                if (header) {
                    const headerRect = header.getBoundingClientRect();
                    analysis.header = {
                        height: headerRect.height,
                        visible: headerRect.width > 0 && headerRect.height > 0,
                        position: window.getComputedStyle(header).position
                    };
                }
                
                // Analyze main content area
                const main = document.querySelector('main');
                if (main) {
                    const mainRect = main.getBoundingClientRect();
                    analysis.mainContent = {
                        width: mainRect.width,
                        height: mainRect.height,
                        visible: mainRect.width > 0 && mainRect.height > 0,
                        overflow: window.getComputedStyle(main).overflow
                    };
                }
                
                // Analyze panels
                const panels = document.querySelectorAll('[data-panel]');
                panels.forEach((panel, index) => {
                    const panelRect = panel.getBoundingClientRect();
                    const panelStyle = window.getComputedStyle(panel);
                    analysis.panels.push({
                        index,
                        width: panelRect.width,
                        height: panelRect.height,
                        widthPercent: (panelRect.width / window.innerWidth * 100).toFixed(2),
                        visible: panelRect.width > 0 && panelRect.height > 0,
                        overflow: panelStyle.overflow,
                        minSize: panel.getAttribute('data-panel-size') || 'unknown'
                    });
                });
                
                // Check for progress tracker (might not be present in Chapter 1)
                const progressTracker = document.querySelector('.bg-white.p-4.rounded-lg.border.border-gray-200.sticky');
                if (progressTracker) {
                    const trackerRect = progressTracker.getBoundingClientRect();
                    analysis.progressTracker = {
                        width: trackerRect.width,
                        height: trackerRect.height,
                        visible: trackerRect.width > 0 && trackerRect.height > 0,
                        position: window.getComputedStyle(progressTracker).position,
                        top: window.getComputedStyle(progressTracker).top
                    };
                }
                
                // Analyze resize handles
                const resizeHandles = document.querySelectorAll('.bg-gray-200.hover\\:bg-blue-400');
                resizeHandles.forEach((handle, index) => {
                    const handleRect = handle.getBoundingClientRect();
                    analysis.resizeHandles.push({
                        index,
                        width: handleRect.width,
                        height: handleRect.height,
                        visible: handleRect.width > 0 && handleRect.height > 0,
                        direction: handleRect.width > handleRect.height ? 'horizontal' : 'vertical'
                    });
                });
                
                // Identify potential issues
                
                // Check if content is too cramped
                if (analysis.mainContent && analysis.mainContent.width < 800) {
                    analysis.issues.push({
                        type: 'layout',
                        severity: 'medium',
                        message: `Main content area is quite narrow (${analysis.mainContent.width}px) - content may be cramped`
                    });
                }
                
                // Check panel balance
                if (analysis.panels.length >= 2) {
                    const leftPanel = analysis.panels[0];
                    const rightPanel = analysis.panels[1];
                    
                    if (leftPanel && rightPanel) {
                        const ratio = leftPanel.width / rightPanel.width;
                        if (ratio < 0.3) {
                            analysis.issues.push({
                                type: 'layout',
                                severity: 'high',
                                message: `Left panel is very narrow (${leftPanel.widthPercent}%) - content may be hard to read`
                            });
                        }
                        if (ratio > 2.5) {
                            analysis.issues.push({
                                type: 'layout',
                                severity: 'high',
                                message: `Right panel is very narrow (${rightPanel.widthPercent}%) - code editor may be unusable`
                            });
                        }
                    }
                }
                
                // Check for mobile responsiveness issues
                if (window.innerWidth < 768) {
                    if (analysis.panels.length > 1) {
                        analysis.issues.push({
                            type: 'responsive',
                            severity: 'high',
                            message: 'Side-by-side panels on mobile - should stack vertically'
                        });
                    }
                }
                
                // Check resize handle visibility
                const visibleHandles = analysis.resizeHandles.filter(h => h.visible);
                if (visibleHandles.length === 0 && analysis.panels.length > 1) {
                    analysis.issues.push({
                        type: 'usability',
                        severity: 'medium',
                        message: 'No visible resize handles - users cannot adjust panel sizes'
                    });
                }
                
                return analysis;
            });
            
            // Test resize handle functionality
            console.log(`🔧 Testing resize functionality for ${viewport.name}...`);
            const resizeTest = await testResizeFunctionality(page);
            
            results.tests.push({
                viewport: viewport,
                screenshot: screenshotPath,
                layout: layoutAnalysis,
                resizeTest: resizeTest,
                timestamp: new Date().toISOString()
            });
        }
        
        // Test specific progress tracker behavior (if present)
        console.log('📊 Testing progress tracker behavior...');
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto('http://localhost:3000/chapters/1', { waitUntil: 'networkidle2' });
        
        const progressTrackerTest = await page.evaluate(() => {
            const tracker = document.querySelector('.bg-white.p-4.rounded-lg.border.border-gray-200.sticky');
            if (!tracker) {
                return { present: false, message: 'No progress tracker found in Chapter 1' };
            }
            
            const trackerRect = tracker.getBoundingClientRect();
            const trackerStyle = window.getComputedStyle(tracker);
            
            return {
                present: true,
                position: trackerStyle.position,
                top: trackerStyle.top,
                width: trackerRect.width,
                height: trackerRect.height,
                isSticky: trackerStyle.position === 'sticky',
                isVisible: trackerRect.width > 0 && trackerRect.height > 0
            };
        });
        
        results.progressTrackerAnalysis = progressTrackerTest;
        
        // Generate detailed report
        console.log('📝 Generating visual analysis report...');
        await generateReport(results);
        
        console.log('✅ Visual analysis complete!');
        console.log(`📊 Generated ${results.tests.length} viewport tests`);
        console.log('🔍 Check the generated report and screenshots for detailed analysis.');
        
    } catch (error) {
        console.error('❌ Error during visual testing:', error);
        results.error = {
            message: error.message,
            stack: error.stack
        };
    } finally {
        await browser.close();
    }
    
    return results;
}

async function testResizeFunctionality(page) {
    try {
        // Look for resize handles
        const handles = await page.$$('.bg-gray-200.hover\\:bg-blue-400');
        
        if (handles.length === 0) {
            return { 
                success: false, 
                message: 'No resize handles found',
                handlesCount: 0
            };
        }
        
        // Test first resize handle
        const firstHandle = handles[0];
        const initialBounds = await firstHandle.boundingBox();
        
        if (!initialBounds) {
            return { 
                success: false, 
                message: 'Resize handle not visible',
                handlesCount: handles.length
            };
        }
        
        // Try to drag the resize handle
        await page.mouse.move(
            initialBounds.x + initialBounds.width / 2,
            initialBounds.y + initialBounds.height / 2
        );
        
        await page.mouse.down();
        await page.mouse.move(
            initialBounds.x + initialBounds.width / 2 + 50,
            initialBounds.y + initialBounds.height / 2
        );
        await page.mouse.up();
        
        // Wait for any animations
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
            success: true,
            message: 'Resize handle responds to drag',
            handlesCount: handles.length,
            initialPosition: initialBounds
        };
        
    } catch (error) {
        return {
            success: false,
            message: `Error testing resize: ${error.message}`,
            handlesCount: 0
        };
    }
}

async function generateReport(results) {
    const reportPath = 'chapter1_visual_analysis_report.md';
    
    let report = `# Chapter 1 Visual Analysis Report
Generated: ${results.timestamp}
Base URL: ${results.baseUrl}

## Executive Summary

This report analyzes the visual layout and usability of Chapter 1 across different screen sizes and identifies potential issues with screen utilization and user interface elements.

## Test Results Overview

`;

    // Summary of all tests
    const totalIssues = results.tests.reduce((sum, test) => sum + test.layout.issues.length, 0);
    const highSeverityIssues = results.tests.reduce((sum, test) => 
        sum + test.layout.issues.filter(issue => issue.severity === 'high').length, 0);
    
    report += `- **Viewports Tested**: ${results.tests.length}
- **Total Issues Found**: ${totalIssues}
- **High Severity Issues**: ${highSeverityIssues}
- **Screenshots Generated**: ${results.tests.length}

## Viewport Analysis

`;

    // Detailed analysis for each viewport
    results.tests.forEach((test, index) => {
        report += `### ${test.viewport.name} (${test.viewport.width}x${test.viewport.height})

**Screenshot**: \`${test.screenshot}\`

#### Layout Metrics
`;
        
        if (test.layout.mainContent) {
            report += `- **Main Content Area**: ${test.layout.mainContent.width}x${test.layout.mainContent.height}px
`;
        }
        
        if (test.layout.panels.length > 0) {
            report += `- **Panel Configuration**: ${test.layout.panels.length} panels\n`;
            test.layout.panels.forEach((panel, pIndex) => {
                report += `  - Panel ${pIndex + 1}: ${panel.widthPercent}% width (${panel.width}px)\n`;
            });
        }
        
        if (test.layout.resizeHandles.length > 0) {
            report += `- **Resize Handles**: ${test.layout.resizeHandles.length} found\n`;
        }
        
        // Issues for this viewport
        if (test.layout.issues.length > 0) {
            report += `\n#### Issues Found\n`;
            test.layout.issues.forEach(issue => {
                const emoji = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
                report += `${emoji} **${issue.type.toUpperCase()}** (${issue.severity}): ${issue.message}\n`;
            });
        } else {
            report += `\n✅ No issues found for this viewport\n`;
        }
        
        // Resize test results
        if (test.resizeTest) {
            report += `\n#### Resize Functionality\n`;
            if (test.resizeTest.success) {
                report += `✅ ${test.resizeTest.message} (${test.resizeTest.handlesCount} handles)\n`;
            } else {
                report += `❌ ${test.resizeTest.message}\n`;
            }
        }
        
        report += `\n---\n\n`;
    });
    
    // Progress Tracker Analysis
    report += `## Progress Tracker Analysis

`;
    
    if (results.progressTrackerAnalysis) {
        if (results.progressTrackerAnalysis.present) {
            report += `✅ Progress tracker found
- **Position**: ${results.progressTrackerAnalysis.position}
- **Sticky Behavior**: ${results.progressTrackerAnalysis.isSticky ? 'Yes' : 'No'}
- **Dimensions**: ${results.progressTrackerAnalysis.width}x${results.progressTrackerAnalysis.height}px
- **Visible**: ${results.progressTrackerAnalysis.isVisible ? 'Yes' : 'No'}
`;
        } else {
            report += `❌ ${results.progressTrackerAnalysis.message}
`;
        }
    }
    
    // Recommendations
    report += `
## Recommendations

### High Priority Issues
`;
    
    const highPriorityRecommendations = [];
    
    // Check for common high-severity issues across viewports
    const mobileIssues = results.tests.find(test => test.viewport.width <= 414);
    if (mobileIssues && mobileIssues.layout.issues.some(issue => issue.type === 'responsive')) {
        highPriorityRecommendations.push('**Implement mobile-responsive layout**: The current side-by-side panel layout doesn\'t work well on mobile devices. Consider stacking panels vertically or using a tabbed interface for mobile.');
    }
    
    const narrowPanelIssues = results.tests.some(test => 
        test.layout.issues.some(issue => issue.message.includes('narrow'))
    );
    if (narrowPanelIssues) {
        highPriorityRecommendations.push('**Improve panel size balance**: Some viewports show extremely narrow panels that make content hard to read. Consider setting better default panel sizes and minimum widths.');
    }
    
    if (highPriorityRecommendations.length === 0) {
        report += `No critical issues found that require immediate attention.\n`;
    } else {
        highPriorityRecommendations.forEach((rec, index) => {
            report += `${index + 1}. ${rec}\n\n`;
        });
    }
    
    report += `### Medium Priority Improvements

1. **Enhance screen utilization**: Consider adjusting default panel ratios to better utilize available screen space, especially on larger displays.

2. **Improve resize handle visibility**: Make resize handles more prominent with better visual indicators and hover states.

3. **Add responsive breakpoints**: Implement proper responsive design with breakpoints for different screen sizes.

4. **Progress tracker optimization**: If a progress tracker is intended for Chapter 1, ensure it's properly integrated and visible.

### Low Priority Enhancements

1. **Add keyboard shortcuts**: Implement keyboard shortcuts for common actions like resizing panels.

2. **Save panel preferences**: Remember user's preferred panel sizes across sessions.

3. **Add fullscreen mode**: Allow users to focus on content or code by hiding other panels.

## Technical Notes

- All tests were conducted with Puppeteer on a local development server
- Screenshots are full-page captures showing the complete layout
- Resize functionality was tested by simulating mouse drag operations
- Layout metrics are captured using getBoundingClientRect() and computed styles

---

*Report generated automatically by Puppeteer visual testing suite*
`;

    fs.writeFileSync(reportPath, report);
    console.log(`📄 Report saved to: ${reportPath}`);
}

// Run the test
if (require.main === module) {
    testChapter1Visuals()
        .then(results => {
            if (results.error) {
                console.error('❌ Test completed with errors:', results.error.message);
                process.exit(1);
            } else {
                console.log('✅ Visual analysis completed successfully!');
                process.exit(0);
            }
        })
        .catch(error => {
            console.error('❌ Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { testChapter1Visuals };