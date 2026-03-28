const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const adSizes = ['300x250', '728x90', '160x600', '300x600', '320x50'];
const versions = ['a', 'b'];

async function generateAdScreenshots() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const generatedAdsDir = path.join(__dirname, 'generated-ads');
    const adCopyPath = path.join(generatedAdsDir, 'ad-copy.json');
    const resultsLog = [];

    try {
        // Create generated-ads directory if it doesn't exist
        if (!fs.existsSync(generatedAdsDir)) {
            fs.mkdirSync(generatedAdsDir, { recursive: true });
        }

        // Load ad copy from JSON
        let adCopyData = {};
        if (fs.existsSync(adCopyPath)) {
            const copyContent = fs.readFileSync(adCopyPath, 'utf8');
            adCopyData = JSON.parse(copyContent);
        } else {
            console.warn('⚠️  ad-copy.json not found, using defaults');
        }

        const sizeMap = {
            '300x250': { width: 300, height: 250 },
            '728x90': { width: 728, height: 90 },
            '160x600': { width: 160, height: 600 },
            '300x600': { width: 300, height: 600 },
            '320x50': { width: 320, height: 50 }
        };

        for (const size of adSizes) {
            for (const version of versions) {
                const outputFile = path.join(generatedAdsDir, `ad-${size}-${version}.png`);
                const dim = sizeMap[size];

                try {
                    const page = await browser.newPage();

                    // Set viewport to exact ad dimensions
                    await page.setViewport({
                        width: dim.width,
                        height: dim.height,
                        deviceScaleFactor: 2
                    });

                    // Create template URL with query params for size and version
                    const templatePath = path.join(__dirname, 'ad-template.html');
                    const templateFile = `file://${templatePath}?size=${size}&version=${version}`;

                    // Inject ad copy data into page
                    await page.goto(templateFile, { waitUntil: 'networkidle0' });
                    
                    // Inject the ad copy data into window
                    await page.evaluateOnNewDocument((data) => {
                        window.adCopyData = data;
                    }, adCopyData);
                    
                    // Reload to apply injected data
                    await page.reload({ waitUntil: 'networkidle0' });

                    // Wait for rendering
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Screenshot at exact dimensions
                    await page.screenshot({
                        path: outputFile,
                        type: 'png',
                        omitBackground: false
                    });

                    // Verify file
                    if (fs.existsSync(outputFile)) {
                        const stats = fs.statSync(outputFile);
                        const sizeKb = (stats.size / 1024).toFixed(2);
                        const message = `✓ ${size} v${version.toUpperCase()}: ${sizeKb}KB`;
                        console.log(message);
                        resultsLog.push(message);
                    } else {
                        const message = `✗ ${size} v${version.toUpperCase()}: Screenshot failed`;
                        console.error(message);
                        resultsLog.push(message);
                    }

                    await page.close();

                } catch (error) {
                    const message = `✗ ${size} v${version.toUpperCase()}: ${error.message}`;
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

        // List generated PNG files
        console.log('\n📁 Generated PNG files:');
        const pngFiles = fs.readdirSync(generatedAdsDir).filter(f => f.endsWith('.png')).sort();
        pngFiles.forEach(file => {
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
