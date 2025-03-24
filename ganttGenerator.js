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
          color: #ffffff;
          font-size: 11px;
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
      color: #ffffff;
      font-size: 11px;
      text-align:left;
    ">Deliverable</th>`;

  for (let w = minWeek; w <= maxWeek; w++) {
    secondRowCells += `
        <th style="
          border:1px solid #ccc;
          background:#001f5f;
          min-width:30px;
          text-align:left;
          color: #ffffff
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
        let color = "#ffffff";
        if (coverage === 1) {
          color = "#41bbda";
        } else if (coverage === 2) {
          color = "#49c9ea";
        } else if (coverage === 3) {
          color = "#49c9ea";
        } else if (coverage === 4) {
          color = "#49c9ea";
        } else {
          color = "#41bbda";
        }

        let boxesHTML = "";
        for (let i = 0; i < itemsThisWeek.length; i++) {
          boxesHTML += `
              <div style="
                margin:2px 0;
                padding:2px;
                background: ${color};
                width:auto; 
                font-size:0; 
                line-height:1;
                height:18px; 
              ">

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
  <html style="margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial, sans-serif;
        font-size: 11px;
        background:#ffffff;
        color: #111111;
        width:100%;
        min-width: 1000px
        ">
  <head>
    <style>
      table.gantt-table th {
        border:1px solid #ccc;
        background:#001f5f;
        color: #ffffff;
      }
      table.gantt-table td {
        border:1px solid #ccc;
        text-align:center;
      }
    </style>
  </head>
  <body style="margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial, sans-serif;
        background:#ffffff;
        color: #111111;
        width: 100%;
        min-width:1000px;">
    <div style="width:100%;
        margin:20px auto;
        padding:10px;
        overflow-x:auto; ">
      <table style="border-collapse: collapse;
        width:auto;">
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
            fill="#49c9ea"
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
            <div"
                 style="
                   font-size:11px;
                   color:#000000;
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
          style="background:#ffffff"
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
  <html style="margin:0; 
        padding:0; 
        box-sizing:border-box;
        font-family: Arial, sans-serif;
        background:#ffff;
        width: 100%;
        min-width:1000px;
        height:100%;">
  <head>
    <meta charset="UTF-8" />
    <style>

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
  <body style="margin:0; 
        padding:0; 
        box-sizing:border-box;
        font-family: Arial, sans-serif;
        background:#ffff;
        width:100%;
        min-width: 1000px;
        height:100%;">
    <div style="width:100%;
        margin:20px auto;
        padding:10px;
        overflow-x:auto;">
      <table style=" width:100%;
        border-collapse: collapse;
        table-layout: fixed; ">
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
function generateWeekByWeekHTMLWithDistinctItemColors(data) {
  const stageMap = {};
  const allItems = [];

  data.forEach((item) => {
    const stage = item.Stage || 0;
    if (!stageMap[stage]) {
      stageMap[stage] = [];
    }
    stageMap[stage].push(item);
    allItems.push(item);
  });

  const sortedStages = Object.keys(stageMap)
    .map((x) => parseInt(x, 10))
    .sort((a, b) => a - b);

  let minWeek = Infinity;
  let maxWeek = -Infinity;
  allItems.forEach((i) => {
    if (i.WeekFrom < minWeek) minWeek = i.WeekFrom;
    if (i.WeekTo > maxWeek) maxWeek = i.WeekTo;
  });
  if (minWeek === Infinity) {
    return "<h3>No valid items</h3>";
  }

  const colorPalette = ["#41bbda", "#49c9ea", "#078db0"];

  let itemIndex = 0;
  allItems.forEach((item) => {
    if (!item.color) {
      item.color = colorPalette[itemIndex % colorPalette.length];
      itemIndex++;
    }
  });

  let rowsHTML = "";

  sortedStages.forEach((st) => {
    const intervals = stageMap[st] || [];
    const deliverableSet = new Set();
    intervals.forEach((it) => {
      deliverableSet.add(it.Deliverable || " ");
    });
    const deliverableHTML = [...deliverableSet]
      .map((d) => `<div>${d}</div>`)
      .join("");

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
        let boxesHTML = "";
        itemsThisWeek.forEach((it) => {
          boxesHTML += `
              <div style="
             gap:10;
                margin-top:5px;
                margin-bottom:5px;
                padding:2px;
                background: ${it.color};
                width:auto; 
                font-size:0; 
                line-height:4;
                height:18px; 
              ">
              
              </div>
            `;
        });

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

    rowsHTML += `
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
  });

  return `

  <html style="margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial, sans-serif;
        font-size: 11px;
        background:#ffffff;
        Width: 100%
    >
  <head>

    <style>
      html, body {
        
      }
      table.gantt-table th,
      table.gantt-table td {
        border:1px solid #ccc;
        text-align:center;
      }
    </style>
  </head>
  <body style="margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial, sans-serif;
        font-size:11px;
        background:#ffffff;>
    <div style=" min-width:1000px; width: 100%;
        margin:20px auto;
        padding:10px;
        overflow-x:auto;">
      <table style="border-collapse:collapse;
        ">
        <thead>
          <tr>
            <th colspan="${1 + (maxWeek - minWeek + 1)}" style="
              background:#001f5f;
              font-weight:bold;
              text-align:center;
              color: #ffffff"
              padding:8px;
            ">
            Timeline (${data[0]?.TimeUnit} ${minWeek} to ${maxWeek})
            </th>
          </tr>
          <tr>
            <th style="
              width:200px;
              background:#001f5f;
              color: #ffffff;
              text-align:left;
              padding:4px;
              font-weight:bold;
            ">Deliverable</th>
            ${Array.from({ length: maxWeek - minWeek + 1 }, (_, i) => {
              const w = minWeek + i;
              console.log(100 / (maxWeek - minWeek));
              return `
                  <th style="
                    background:#001f5f;
                    min-width: 30px;
                    text-align:center;
                    font-weight:bold;
                    color: #ffffff"
                    padding:4px;
                  ">
                    ${w}
                  </th>
                `;
            }).join("")}
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
}

module.exports = {
  GeneratedGanttChart1,
  GeneratedGanttChart2,
  generateWeekByWeekHTMLWithDistinctItemColors,
};
