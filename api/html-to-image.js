const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const generateCustomGanttHTML = require("../../ganttGenerator");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data, chartType } = req.body;

  let html = "";
  if (chartType == 1) {
    html = generateCustomGanttHTML.GeneratedGanttChart1(data);
  } else if (chartType == 2) {
    html = generateCustomGanttHTML.GeneratedGanttChart2(data);
  } else {
    html = "<p>No valid chart type selected.</p>";
  }

  if (!html) {
    return res.status(400).json({ error: "Missing HTML input" });
  }

  try {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
      defaultViewport: chrome.defaultViewport,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const buffer = await page.screenshot({ type: "png", fullPage: true });
    await browser.close();

    const base64Image = buffer.toString("base64");
    res.status(200).json({ image: base64Image });
  } catch (error) {
    console.error("Image generation failed:", error);
    res.status(500).json({ error: "Image generation failed." });
  }
};
