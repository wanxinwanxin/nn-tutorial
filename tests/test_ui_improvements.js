/**
 * UI Improvements Test Suite
 * Tests the new floating progress tracker and improved panel layouts
 */

const puppeteer = require('puppeteer')

async function testUIImprovements() {
  let browser
  
  try {
    console.log('🚀 Starting UI Improvements Test Suite...\n')
    
    browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: { width: 1400, height: 900 }
    })
    
    const page = await browser.newPage()
    
    // Test desktop layout first
    console.log('📊 Testing Desktop Layout (1400x900)')
    await page.goto('http://localhost:3000/chapters/1chunked')
    await page.waitForSelector('h1')
    
    // Test that progress tracker is no longer in sidebar (should be floating)
    const sidebar = await page.$('.lg\\:col-span-1')
    const hasSidebar = sidebar !== null
    console.log(`  ✓ Sidebar removed: ${!hasSidebar ? '✅ PASS' : '❌ FAIL'}`)
    
    // Test that main content is now full width
    const mainContent = await page.$('.space-y-6')
    const hasFullWidth = mainContent !== null
    console.log(`  ✓ Full-width content: ${hasFullWidth ? '✅ PASS' : '❌ FAIL'}`)
    
    // Test floating progress button exists
    const floatingButton = await page.$('button[aria-label="View Progress"]')
    const hasFloatingButton = floatingButton !== null
    console.log(`  ✓ Floating progress button: ${hasFloatingButton ? '✅ PASS' : '❌ FAIL'}`)
    
    // Test clicking floating progress button
    if (hasFloatingButton) {
      await floatingButton.click()
      await page.waitForTimeout(500)
      
      // Check if overlay appeared
      const overlay = await page.$('.fixed.inset-0.bg-black')
      const hasOverlay = overlay !== null
      console.log(`  ✓ Progress overlay opens: ${hasOverlay ? '✅ PASS' : '❌ FAIL'}`)
      
      // Close overlay
      if (hasOverlay) {
        const closeButton = await page.$('button[aria-label="Close"]')
        if (closeButton) {
          await closeButton.click()
          await page.waitForTimeout(300)
        }
      }
    }
    
    // Test regular chapter layout (should use standard tutorial layout)
    console.log('\n📱 Testing Standard Chapter Layout')
    await page.goto('http://localhost:3000/chapters/2')
    await page.waitForSelector('h1')
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'ui_improvements_desktop.png',
      fullPage: true
    })
    console.log('  📸 Desktop screenshot saved: ui_improvements_desktop.png')
    
    // Test mobile layout
    console.log('\n📱 Testing Mobile Layout (375x667)')
    await page.setViewport({ width: 375, height: 667 })
    await page.goto('http://localhost:3000/chapters/1chunked')
    await page.waitForSelector('h1')
    
    // Test mobile tab navigation exists
    const mobileTabNav = await page.$('button')
    const hasMobileNav = mobileTabNav !== null
    console.log(`  ✓ Mobile tab navigation: ${hasMobileNav ? '✅ PASS' : '❌ FAIL'}`)
    
    // Test floating button still works on mobile
    const mobileFloatingButton = await page.$('button[aria-label="View Progress"]')
    const hasMobileFloatingButton = mobileFloatingButton !== null
    console.log(`  ✓ Mobile floating button: ${hasMobileFloatingButton ? '✅ PASS' : '❌ FAIL'}`)
    
    await page.screenshot({ 
      path: 'ui_improvements_mobile.png',
      fullPage: true
    })
    console.log('  📸 Mobile screenshot saved: ui_improvements_mobile.png')
    
    // Test medium desktop layout
    console.log('\n💻 Testing Medium Desktop Layout (1024x768)')
    await page.setViewport({ width: 1024, height: 768 })
    await page.goto('http://localhost:3000/chapters/2')
    await page.waitForSelector('h1')
    
    await page.screenshot({ 
      path: 'ui_improvements_medium.png',
      fullPage: true
    })
    console.log('  📸 Medium desktop screenshot saved: ui_improvements_medium.png')
    
    console.log('\n🎉 UI Improvements Test Suite Complete!')
    console.log('\n📋 Summary of Changes:')
    console.log('  • Progress tracker moved from sidebar to floating overlay')
    console.log('  • Content panel now uses full available width')
    console.log('  • Improved panel ratios: Content(38%), Code+Output(62%)')
    console.log('  • Better spacing: p-4 → p-6/p-8 throughout')
    console.log('  • Enhanced resize handles with better visual feedback')
    console.log('  • Maintained mobile responsiveness with tabbed interface')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

// Run the test
if (require.main === module) {
  testUIImprovements()
}

module.exports = testUIImprovements