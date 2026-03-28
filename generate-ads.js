const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const adSizes = [
    { name: '300x250', width: 300, height: 250 },
    { name: '728x90', width: 728, height: 90 },
    { name: '160x600', width: 160, height: 600 },
    { name: '300x600', width: 300, height: 600 },
    { name: '320x50', width: 320, height: 50 }
];

const versions = ['a', 'b'];

async function generateAdScreenshots() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const generatedAdsDir = path.join(__dirname, 'generated-ads');
    const resultsLog = [];

    try {
        // Create generated-ads directory if it doesn't exist
        if (!fs.existsSync(generatedAdsDir)) {
            fs.mkdirSync(generatedAdsDir, { recursive: true });
        }

        for (const size of adSizes) {
            for (const version of versions) {
                const htmlFile = path.join(__dirname, 'html-ads', `ad-${size.name}-${version}.html`);
                const outputFile = path.join(generatedAdsDir, `ad-${size.name}-${version}.png`);

                if (!fs.existsSync(htmlFile)) {
                    console.warn(`⚠️  File not found: ${htmlFile}`);
                    resultsLog.push(`✗ ${size.name} v${version.toUpperCase()}: HTML file not found`);
                    continue;
                }

                try {
                    const page = await browser.newPage();

                    // Set viewport to exact ad dimensions
                    await page.setViewport({
                        width: size.width,
                        height: size.height,
                        deviceScaleFactor: 1
                    });

                    // Navigate to local HTML file
                    const fileUrl = `file://${htmlFile}`;
                    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

                    // Wait for page to render
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Screenshot at exact dimensions
                    await page.screenshot({
                        path: outputFile,
                        type: 'png',
                        omitBackground: false
                    });

                    // Verify file was created and check dimensions
                    if (fs.existsSync(outputFile)) {
                        const stats = fs.statSync(outputFile);
                        const sizeKb = (stats.size / 1024).toFixed(2);
                        
                        // Try to get actual image dimensions using puppeteer
                        const dimensions = await page.evaluate(() => {
                            const img = document.querySelector('.ad-container');
                            if (img) {
                                return {
                                    width: img.offsetWidth,
                                    height: img.offsetHeight
                                };
                            }
                            return null;
                        });

                        const expectedDim = `${size.width}x${size.height}`;
                        let dimStatus = '✓';
                        if (dimensions && (dimensions.width !== size.width || dimensions.height !== size.height)) {
                            dimStatus = `⚠️ (${dimensions.width}x${dimensions.height})`;
                        }

                        const message = `✓ ${size.name} v${version.toUpperCase()}: ${sizeKb}KB ${dimStatus}`;
                        console.log(message);
                        resultsLog.push(message);
                    } else {
                        const message = `✗ ${size.name} v${version.toUpperCase()}: Screenshot failed`;
                        console.error(message);
                        resultsLog.push(message);
                    }

                    await page.close();

                } catch (error) {
                    const message = `✗ ${size.name} v${version.toUpperCase()}: ${error.message}`;
                    console.error(message);
                    resultsLog.push(message);
                }
            }
        }

        // Print summary
        console.log('\n========================================');
        console.log('📊 Screenshot Generation Summary');
        console.log('========================================');
        resultsLog.forEach(log => console.log(log));

        // List all generated files
        console.log('\n📁 Generated ad files:');
        const files = fs.readdirSync(generatedAdsDir).sort();
        files.forEach(file => {
            const filePath = path.join(generatedAdsDir, file);
            const stats = fs.statSync(filePath);
            const sizeKb = (stats.size / 1024).toFixed(2);
            console.log(`   ${file} (${sizeKb}KB)`);
        });

    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        await browser.close();
        console.log('\n✅ Screenshot generation complete!');
    }
}

generateAdScreenshots().catch(error => {
    console.error('Script error:', error);
    process.exit(1);
});
