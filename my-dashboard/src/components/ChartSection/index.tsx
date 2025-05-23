/* eslint-disable @typescript-eslint/no-explicit-any */
import { Line } from "react-chartjs-2";
import type { FinanceEntry } from "../components.types";
import { MONTHS, OPTIONS } from "./ChartSection.config";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

interface ChartSectionProps {
  data: FinanceEntry[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ data }) => {
  const grouped = data.reduce((acc: any, entry: any) => {
    const date = new Date(entry.date);
    const month = date.getMonth();
    if (!acc[month])
      acc[month] = { revenue: 0, expanses: 0, income: 0, debt: 0 };
    acc[month][entry.type] += parseInt(entry.amount);
    return acc;
  }, {});

  const chartData = {
    labels: MONTHS,
    datasets: [
      {
        label: "Выручка",
        data: MONTHS.map((_, i) => grouped[i]?.revenue || 0),
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Затраты",
        data: MONTHS.map((_, i) => grouped[i]?.expanses || 0),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Прибыль",
        data: MONTHS.map((_, i) => grouped[i]?.income || 0),
        borderColor: "#8b5cf6",
        backgroundColor: "#8b5cf6",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Задолженность",
        data: MONTHS.map((_, i) => grouped[i]?.debt || 0),
        borderColor: "#f43f5e",
        backgroundColor: "#f43f5e",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#2D4258]">
          Общая статистика
        </h2>
        <div className="flex gap-2">
          <button className="text-gray-500 hover:text-black">Неделя</button>
          <button className="text-gray-500 hover:text-black">Месяц</button>
          <button className="text-black border-b-2 border-teal-400">Год</button>
        </div>
      </div>

      <Line data={chartData} options={OPTIONS} />

      <div className="grid grid-cols-5 gap-2 mt-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#4CAF50]"></span>
          <div>Выручка</div>
          <div className="ml-auto font-medium">₽ 8 615 253</div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#2196F3]"></span>
          <div>Затраты</div>
          <div className="ml-auto font-medium">₽ 10 157 764</div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#3F51B5]"></span>
          <div>Прибыль</div>
          <div className="ml-auto font-medium">₽ -1 542 511</div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#FFD700]"></span>
          <div>Задолженность</div>
          <div className="ml-auto font-medium">₽ 0</div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#9C27B0]"></span>
          <div>Итог</div>
          <div className="ml-auto font-medium">₽ 10 157 764</div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
