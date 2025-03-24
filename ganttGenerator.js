function GeneratedGanttChart2(data) {
  function safeNumber(val, def = 0) {
    const n = parseInt(val, 10);
    return Number.isNaN(n) ? def : n;
  }

  if (!Array.isArray(data)) data = [];

  const items = data
    .map((d) => ({
      Stage: safeNumber(d.Stage),
      Deliverable: d.Deliverable || "",
      WeekFrom: safeNumber(d.WeekFrom),
      WeekTo: safeNumber(d.WeekTo),
    }))
    .filter((d) => d.WeekFrom <= d.WeekTo);

  if (!items.length) {
    return `<h3>No valid items to display in the Gantt chart.</h3>`;
  }

  const minWeek = Math.min(...items.map((i) => i.WeekFrom));
  const maxWeek = Math.max(...items.map((i) => i.WeekTo));

  const totalCols = 1 + (maxWeek - minWeek + 1);

  const stageMap = {};
  for (const it of items) {
    if (!stageMap[it.Stage]) {
      stageMap[it.Stage] = [];
    }
    stageMap[it.Stage].push(it);
  }

  function getDistinctDeliverables(intervals) {
    const s = new Set();
    for (const i of intervals) {
      s.add(i.Deliverable);
    }
    return Array.from(s);
  }

  const topHeaderRow = `
      <tr>
        <th colspan="${totalCols}" style="
          background: #001f5f;
          color: #fff;
          font-weight: bold;
          text-align: center;
          padding: 8px;
          border: 1px solid #ccc;
        ">
          Timeline ${data[0]?.TimeUnit} ${minWeek} to ${maxWeek}
        </th>
      </tr>
    `;

  let secondRowCells = `<th style="
      width:200px;
      border:1px solid #ccc;
      background:#001f5f;
      color: #fff;
      padding:4px;
      font-weight:bold;
      text-align:left;
    ">Deliverable</th>`;

  for (let w = minWeek; w <= maxWeek; w++) {
    secondRowCells += `
        <th style="
          border:1px solid #ccc;
          background:#001f5f;
          min-width:30px;
          text-align:center;
          font-weight:bold;
          padding:4px;
        ">
          ${w}
        </th>
      `;
  }

  const secondHeaderRow = `<tr>${secondRowCells}</tr>`;
  const theadHTML = `<thead>${topHeaderRow}${secondHeaderRow}</thead>`;

  const sortedStages = Object.keys(stageMap)
    .map((s) => parseInt(s, 10))
    .sort((a, b) => a - b);

  let tbodyRows = "";

  for (const st of sortedStages) {
    const intervals = stageMap[st];
    const deliverables = getDistinctDeliverables(intervals);
    const deliverableHTML = deliverables.map((d) => `<div>${d}</div>`).join("");

    let weekCells = "";

    for (let w = minWeek; w <= maxWeek; w++) {
      const itemsThisWeek = intervals.filter(
        (it) => it.WeekFrom <= w && it.WeekTo >= w
      );

      if (!itemsThisWeek.length) {
        weekCells += `
            <td style="
              border:1px solid #ccc; 
              width:30px;
              height:30px;
            ">
            </td>
          `;
      } else {
        const coverage = itemsThisWeek.length;
        let color = "#fff";
        if (coverage === 1) {
          color = "rgba(73,201,234,0.5)";
        } else if (coverage === 2) {
          color = "rgba(73,201,234,0.7)";
        } else if (coverage === 3) {
          color = "rgba(73,201,234,0.7)";
        } else if (coverage === 4) {
          color = "rgba(73,201,234,0.9)";
        } else {
          color = "rgba(73,201,234,1.0)";
        }

        let boxesHTML = "";
        for (let i = 0; i < itemsThisWeek.length; i++) {
          boxesHTML += `
              <div style="
                margin:2px 0;
                padding:2px;
                background: ${color};
                width:auto; /* fill container horizontally */
                font-size:0; /* no text, so we make it small? or 0 so no text */
                line-height:1;
                height:18px; 
              ">
                <!-- no label -->
              </div>
            `;
        }

        weekCells += `
            <td style="
              border:1px solid #ccc; 
              width:30px;
              vertical-align:top;
              padding:2px;
            ">
              ${boxesHTML}
            </td>
          `;
      }
    }

    const rowHTML = `
        <tr>
          <td style="
            border:1px solid #ccc;
            padding:8px;
            vertical-align:middle;
            text-align: left;
            width:200px;
          ">
            <div style="margin-top:6px;">
              ${deliverableHTML}
            </div>
          </td>
          ${weekCells}
        </tr>
      `;

    tbodyRows += rowHTML;
  }

  const tbodyHTML = `<tbody>${tbodyRows}</tbody>`;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      html, body {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial, sans-serif;
        background:#fff;
        color: #111;
        width:1000px;
      }
      .gantt-wrapper {
        width:100%;
        margin:20px auto;
        padding:10px;
        overflow-x:auto; /* horizontally scroll if many weeks */
      }
      table.gantt-table {
        border-collapse: collapse;
        width:auto;
      }
      table.gantt-table th {
        border:1px solid #ccc;
        background:#001f5f;
        color: #fff;
      }
      table.gantt-table td {
        border:1px solid #ccc;
        text-align:center;
      }
    </style>
  </head>
  <body>
    <div class="gantt-wrapper">
      <table class="gantt-table">
        ${theadHTML}
        ${tbodyHTML}
      </table>
    </div>
  </body>
  </html>
  `;

  return html;
}

function GeneratedGanttChart1(data) {
  const safeNumber = (val, def = 0) => {
    const num = parseInt(val, 10);
    return Number.isNaN(num) ? def : num;
  };

  if (!Array.isArray(data)) data = [];

  const items = data
    .map((d) => ({
      Stage: safeNumber(d.Stage),
      Deliverable: d.Deliverable || " ",
      WeekFrom: safeNumber(d.WeekFrom),
      WeekTo: safeNumber(d.WeekTo),
    }))
    .filter((d) => d.WeekFrom <= d.WeekTo);

  if (!items.length) {
    return `<h3>No valid items to display in Gantt chart.</h3>`;
  }

  const minWeek = Math.min(...items.map((i) => i.WeekFrom));
  const maxWeek = Math.max(...items.map((i) => i.WeekTo));
  const totalSpan = maxWeek - minWeek || 1;

  const stageMap = {};
  for (let it of items) {
    if (!stageMap[it.Stage]) {
      stageMap[it.Stage] = [];
    }
    stageMap[it.Stage].push(it);
  }

  const getDistinctDeliverables = (intervals) => {
    const s = new Set();
    intervals.forEach((i) => s.add(i.Deliverable));
    return Array.from(s);
  };

  const getWeekLabel = (from, to) => {
    if (from === to) {
      return `${data[0]?.TimeUnit} ${from}`;
    } else if (to === from + 1) {
      return `${data[0]?.TimeUnit} ${from} & ${to}`;
    }
    return `${data[0]?.TimeUnit} ${from} to ${to}`;
  };

  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 70;

  const scaleX = (week) => ((week - minWeek) / totalSpan) * SVG_WIDTH;

  let rowsHTML = "";

  const sortedStages = Object.keys(stageMap)
    .map((s) => parseInt(s, 10))
    .sort((a, b) => a - b);

  for (let st of sortedStages) {
    const intervals = stageMap[st];
    const deliverables = getDistinctDeliverables(intervals);
    const deliverableHTML = deliverables.map((d) => `<div>${d}</div>`).join("");

    let svgContent = "";

    for (let it of intervals) {
      const { Deliverable, WeekFrom, WeekTo } = it;
      const barLabel = getWeekLabel(WeekFrom, WeekTo);

      const x1 = scaleX(WeekFrom) + 5;
      const x2 = scaleX(WeekTo);
      const barW = x2 - x1;

      svgContent += `
          <rect
            x="${x1}"
            y="0"
            width="${barW}"
            height="${SVG_HEIGHT - 4}"
            fill="rgba(73,201,234,0.8)"
          >
            <title>${Deliverable} (${barLabel})</title>
          </rect>
        `;

      svgContent += `
          <foreignObject
            x="${x1 + 2}" 
            y="2"
            width="${Math.max(barW - 4, 1)}"
            height="${SVG_HEIGHT - 4}"
          >
            <div xmlns="http://www.w3.org/1999/xhtml"
                 style="
                   font-size:14px;
                   color:#000;
                   line-height:1.2; 
                   display:flex; 
                   align-items:center; 
                   justify-content:center;
                   text-align:center; 
                   height:100%; 
                   width:100%; 
                   overflow-wrap: break-word;
                   word-wrap: break-word;
                   white-space: normal;
                   padding:0 2px;
                 "
                 title="${Deliverable} (${barLabel})"
            >
              ${barLabel}
            </div>
          </foreignObject>
        `;
    }

    const svgHTML = `
        <svg
          width="100%"
          height="${SVG_HEIGHT}"
          viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}"
          style="background:#fff"
        >
          ${svgContent}
        </svg>
      `;

    rowsHTML += `
        <tr>
          <td style="
            width:200px;
            padding:8px;
            border:1px solid #ccc;
            vertical-align:middle;
            text-align: left
          ">
            <div style="margin-top:6px;">
              ${deliverableHTML}
            </div>
          </td>
          <td style="
          border:1px solid #ccc;
            padding:4px;
            width:100%;
            vertical-align:middle;
          ">
            ${svgHTML}
          </td>
        </tr>
      `;
  }

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      html, body {
        margin:0; 
        padding:0; 
        box-sizing:border-box;
        font-family: Arial, sans-serif;
        background:#ffff;
        width:1000px;
        height:100%;
      }
      .gantt-wrapper {
        width:100%;
        margin:20px auto;
        padding:10px;
        overflow-x:auto;
      }
      table.gantt-table {
        width:100%;
        border-collapse: collapse;
        table-layout: fixed; 
      }
      table.gantt-table th {
        background:#001f5f;
        color: #fff;
        font-weight:bold;
        padding:8px;
        text-align:left;
      }
    </style>
  </head>
  <body>
    <div class="gantt-wrapper">
      <table class="gantt-table">
        <thead>
          <tr>
            <th style="width:200px;">Deliverable</th>
            <th>Timeline (${data[0]?.TimeUnit} ${minWeek} to ${maxWeek})</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHTML}
        </tbody>
      </table>
    </div>
  </body>
  </html>
  `;
  return html;
}

module.exports = {
  GeneratedGanttChart1,
  GeneratedGanttChart2,
};
