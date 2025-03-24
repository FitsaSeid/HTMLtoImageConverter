const express = require("express");
const puppeteer = require("puppeteer");

const generateCustomGanttHTML = require("./ganttGenerator");
const app = express();

app.use(express.json({ limit: "10mb" }));

app.post("/html-to-image", async (req, res) => {
  const { data, chartType } = req.body;

  if (chartType == 1) {
    html = generateCustomGanttHTML.GeneratedGanttChart1(data);
  } else if (chartType == 2) {
    html =
      generateCustomGanttHTML.generateWeekByWeekHTMLWithDistinctItemColors(
        data
      );
  } else {
    html = "<p>No valid chart type selected.</p>";
  }

  if (!html) {
    return res.status(400).json({ error: "Missing HTML input" });
  }
  res.setHeader("Content-Type", "text/html");
  res.send(html);

  /*
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const buffer = await page.screenshot({ type: "png", fullPage: true });
    await browser.close();

    const base64Image = Buffer.from(buffer).toString("base64");

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ image: base64Image }));
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Image generation failed." });
  }*/
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
