const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (index.html and styles.css)
app.use(express.static(path.join(__dirname, "public")));

// Puppeteer screenshot function
async function captureFullPageScreenshot(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.waitForSelector("body", { timeout: 10000 });

  // Scroll down the page to trigger lazy loading or animations
  await page.evaluate(async () => {
    const distance = 100;
    const delay = 100;
    const totalHeight = document.body.scrollHeight;
    for (let i = 0; i < totalHeight; i += distance) {
      window.scrollBy(0, distance);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  if (!fs.existsSync("screenshots")) {
    fs.mkdirSync("screenshots");
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .split("T")[0];
  const randomNumber = Math.floor(Math.random() * 10000);
  const filename = `screenshots/screenshot_${timestamp}_${randomNumber}.png`;

  await page.screenshot({ path: filename, fullPage: true });
  await browser.close();

  return filename;
}

// Handle form POST request
app.post("/screenshot", async (req, res) => {
  try {
    const url = req.body.url;
    if (!url) return res.status(400).send("No URL provided");

    const filepath = await captureFullPageScreenshot(url);
    res.send(`
      <p>Screenshot saved as: <strong>${filepath}</strong></p>
      <p><a href="/">Take another screenshot</a></p>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error taking screenshot");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
