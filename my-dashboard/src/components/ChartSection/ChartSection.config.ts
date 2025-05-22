export const OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      mode: "nearest" as const,
      intersect: false,
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
