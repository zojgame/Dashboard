import type { Chart, TooltipModel } from "chart.js";

type TooltipContext = {
  chart: Chart;
  tooltip: TooltipModel<"line">;
};

const customTooltip = (context: TooltipContext) => {
  const { chart, tooltip } = context;

  let tooltipEl = chart.canvas.parentNode?.querySelector(
    "div.chartjs-tooltip"
  ) as HTMLDivElement;

  // Создаем контейнер при первом рендере
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.classList.add("chartjs-tooltip");
    tooltipEl.innerHTML = `<div class="tooltip-content"></div><div class="tooltip-arrow"></div>`;
    tooltipEl.style.position = "absolute";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.transition = "all 0.1s ease";
    chart.canvas.parentNode?.appendChild(tooltipEl);
  }

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  const value = tooltip.dataPoints?.[0]?.formattedValue;
  const color = tooltip.labelColors?.[0]?.borderColor || "#000";

  tooltipEl.querySelector(".tooltip-content")!.innerHTML = `
    <div style="
      background: white;
      border: 2px solid ${color};
      color: #323F47;
      font-weight: 600;
      border-radius: 6px;
      padding: 6px 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      font-family: 'Proxima Nova', sans-serif;
    ">₽ ${value}</div>
  `;

  (
    tooltipEl.querySelector(".tooltip-arrow") as HTMLDivElement
  ).style.cssText = `
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
     border-top: 6px solid ${color};
    margin: 0 auto;
  `;

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
  tooltipEl.style.left = positionX + tooltip.caretX - 47 + "px";
  tooltipEl.style.top = positionY + tooltip.caretY - 55 + "px";
  tooltipEl.style.opacity = "1";
};

export const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: customTooltip,
    },
  },
  interaction: {
    mode: "nearest" as const,
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
        drawTicks: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};

export const MONTHS = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];
