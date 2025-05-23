import type { ChartData } from "chart.js";
import { MONTHS } from "../components/ChartSection/ChartSection.config";
import type { FinanceEntry } from "../components/components.types";
import type {
  EntryType,
  TEntry,
  TGroupedData,
  TStyleType,
  TTimePeriod,
} from "../store/stats/stats.types";

export const getTotal = (data: FinanceEntry[]) =>
  data.reduce((acc, d) => acc + parseInt(d.amount), 0);

export const getB2b = (data: FinanceEntry[]) =>
  data
    .filter((d) => d.division === "B2B")
    .reduce((acc, d) => acc + parseInt(d.amount), 0);

export const getB2c = (data: FinanceEntry[]) =>
  data
    .filter((d) => d.division === "B2C")
    .reduce((acc, d) => acc + parseInt(d.amount), 0);

export const getRandomPercent = () => {
  return Math.round((Math.random() - Math.random()) * 1000) / 10;
};

export const getStyleType = (
  totalPercent: number,
  isActive: boolean
): TStyleType => {
  if (totalPercent < 0) {
    if (isActive) {
      return "less_active";
    } else {
      return "less_inactive";
    }
  } else {
    if (isActive) {
      return "more_active";
    } else {
      return "more_inactive";
    }
  }
};

export const getLabels = (filter: TTimePeriod): string[] => {
  const now = new Date();

  if (filter === "Years") {
    return MONTHS;
  }

  if (filter === "Months") {
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const step = Math.floor(daysInMonth / 12);
    const labels: string[] = [];

    for (let i = 0; i < 12; i++) {
      const day = i * step + 1;
      if (day > daysInMonth) break;
      labels.push(`${day} ${MONTHS[month]}`);
    }

    return labels;
  }

  if (filter === "Week") {
    const currentDay = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - currentDay + 1); // Monday start

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
    });
  }

  return [];
};

export const getChartData = (
  filter: TTimePeriod,
  groupedData: TGroupedData
): ChartData<"line", number[], string> => {
  const labels = getLabels(filter);

  return {
    labels,
    datasets: [
      {
        label: "Выручка",
        data: labels.map((_, i) => groupedData[i]?.revenue || 0),
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Затраты",
        data: labels.map((_, i) => groupedData[i]?.expanses || 0),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Прибыль",
        data: labels.map((_, i) => groupedData[i]?.income || 0),
        borderColor: "#8b5cf6",
        backgroundColor: "#8b5cf6",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Задолженность",
        data: labels.map((_, i) => groupedData[i]?.debt || 0),
        borderColor: "#f43f5e",
        backgroundColor: "#f43f5e",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };
};

const getMonthlyDayIndices = () => {
  const now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  const step = Math.floor(daysInMonth / 12);

  return Array.from({ length: 12 }, (_, i) => i * step + 1);
};

export const groupDataByFilter = (
  filteredData: TEntry[],
  filter: TTimePeriod
): TGroupedData => {
  const now = new Date();
  const grouped: TGroupedData = {};

  filteredData.forEach((entry) => {
    const date = new Date(entry.date);
    let key: number;

    if (filter === "Years") {
      key = date.getMonth(); // Янв = 0 ... Дек = 11
    } else if (filter === "Months") {
      if (
        date.getMonth() !== now.getMonth() ||
        date.getFullYear() !== now.getFullYear()
      )
        return;

      const dayIndices = getMonthlyDayIndices();

      const closest = dayIndices.reduce((prev, curr) =>
        Math.abs(curr - date.getDate()) < Math.abs(prev - date.getDate())
          ? curr
          : prev
      );

      key = dayIndices.indexOf(closest);
    } else if (filter === "Week") {
      const monday = new Date(now);
      monday.setDate(now.getDate() - now.getDay() + 1);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      if (date < monday || date > sunday) return;

      key = (date.getDay() + 6) % 7;
    } else {
      return;
    }

    if (!grouped[key]) {
      grouped[key] = {
        revenue: 0,
        expanses: 0,
        income: 0,
        debt: 0,
      };
    }

    const type = entry.type as EntryType;

    grouped[key][type] += parseInt(entry.amount, 10);
  });

  return grouped;
};
