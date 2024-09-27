const puppeteer = require('puppeteer');

async function captureFullPageScreenshot(url) {
    try {
        // Ensure the URL includes the protocol (http:// or https://)
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        // Launch a browser
        const browser = await puppeteer.launch({ headless: true });

        // Open a new page
        const page = await browser.newPage();

        // Set viewport size
        await page.setViewport({
            width: 1920,
            height: 1080
        });

        // Go to the URL provided by the user
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for the page to fully load
        await page.waitForSelector('body', { timeout: 10000 });

        // Scroll through the page to trigger animations
        await page.evaluate(async () => {
            const distance = 100; // Distance to scroll each time
            const delay = 100; // Delay between scrolls (milliseconds)
            const totalHeight = document.body.scrollHeight;

            for (let i = 0; i < totalHeight; i += distance) {
                window.scrollBy(0, distance);
                await new Promise(resolve => setTimeout(resolve, delay)); // Wait between scrolls
            }

            // Allow some time for animations to complete after the last scroll
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
        });

        // Create a unique filename using timestamp and a random number
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]; // Format: YYYY-MM-DD
        const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
        const filename = `screenshot_${timestamp}_${randomNumber}.png`;

        // Capture a full-page screenshot
        await page.screenshot({ path: filename, fullPage: true });

        console.log(`Screenshot saved as ${filename}`);

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Get user input and call the function
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Please enter the URL of the website: ', url => {
    captureFullPageScreenshot(url);
    readline.close();
});
