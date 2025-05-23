import { Line } from "react-chartjs-2";
import type { FinanceEntry } from "../components.types";
import { OPTIONS } from "./ChartSection.config";
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
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import type { TTimePeriod } from "../../store/stats/stats.types";
import { changeTimePeriod } from "../../store/stats";
import { getChartData, groupDataByFilter } from "../../calc/getStats";
import { useMemo } from "react";

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
  const { currentRecord, timePeriod } = useAppSelector((state) => state.stats);
  const dispatch = useDispatch();
  const filteredData = data.filter(
    (d) => d.division === currentRecord || currentRecord === "Total"
  );
  const grouped = useMemo(
    () => groupDataByFilter(filteredData, timePeriod),
    [timePeriod, filteredData]
  );
  const chartData = useMemo(
    () => getChartData(timePeriod, grouped),
    [timePeriod, grouped]
  );

  const handleOnPeriodChange = (period: TTimePeriod) => {
    return () => {
      dispatch(changeTimePeriod(period));
    };
  };

  const revenue = useMemo(
    () =>
      new Intl.NumberFormat("ru-RU").format(
        filteredData
          .filter((d) => d.type === "revenue")
          .reduce((acc, curr) => acc + Number(curr.amount), 0)
      ),
    [filteredData]
  );

  const debt = useMemo(
    () =>
      new Intl.NumberFormat("ru-RU").format(
        filteredData
          .filter((d) => d.type === "debt")
          .reduce((acc, curr) => acc + Number(curr.amount), 0)
      ),
    [filteredData]
  );

  const expanses = useMemo(
    () =>
      new Intl.NumberFormat("ru-RU").format(
        filteredData
          .filter((d) => d.type === "expanses")
          .reduce((acc, curr) => acc + Number(curr.amount), 0)
      ),
    [filteredData]
  );

  const income = useMemo(
    () =>
      new Intl.NumberFormat("ru-RU").format(
        filteredData
          .filter((d) => d.type === "income")
          .reduce((acc, curr) => acc + Number(curr.amount), 0)
      ),
    [filteredData]
  );

  const total = useMemo(
    () =>
      new Intl.NumberFormat("ru-RU").format(
        filteredData.reduce((acc, curr) => acc + Number(curr.amount), 0)
      ),
    [filteredData]
  );

  return (
    <div className="bg-white p-4 rounded-4xl h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4 pt-[25px] pb-[29px] px-8">
        <h2 className="text-[20px] font-bold text-[#2D4258] leading-11 align-middle">
          Общая статистика
        </h2>
        <div className="flex gap-5 text-[#D2D1D1] font-semibold text-[16px] transition-all ease-in-out duration-500">
          <button
            onClick={handleOnPeriodChange("Week")}
            className={
              "leading-6 cursor-pointer transition-all ease-in-out duration-500  " +
              `${timePeriod === "Week" ? "active_tab_small" : "tab_small"}`
            }
          >
            Неделя
          </button>
          <button
            onClick={handleOnPeriodChange("Months")}
            className={
              "leading-6 cursor-pointer transition-all ease-in-out duration-500 " +
              `${timePeriod === "Months" ? "active_tab_small" : "tab_small"}`
            }
          >
            Месяц
          </button>
          <button
            onClick={handleOnPeriodChange("Years")}
            className={
              "leading-6 font-bold cursor-pointer transition-all ease-in-out duration-500 " +
              `${timePeriod === "Years" ? "active_tab_small" : "tab_small"}`
            }
          >
            Год
          </button>
        </div>
      </div>

      <div className="max-h-[216px]">
        <Line data={chartData} options={OPTIONS} />
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4 text-sm">
        <div className="flex items-center gap-[9px]">
          <span className="w-7 h-7 rounded-full bg-[#73CF7A]"></span>

          <div className="flex flex-col gap-1 text-start">
            <p className="text-[#6D7986] font-semibold text-sm">Выручка</p>

            <p className="ml-auto text-[16px] text-[#323F47] font-bold">
              ₽ {revenue}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[9px]">
          <span className="w-7 h-7 rounded-full bg-[#30C7DC] flex justify-center align-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192 512"
              className="w-[5px] mx-auto"
            >
              <path
                fill="#ffffff"
                d="M176 432c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM25.3 25.2l13.6 272C39.5 310 50 320 62.8 320h66.3c12.8 0 23.3-10 24-22.8l13.6-272C167.4 11.5 156.5 0 142.8 0H49.2C35.5 0 24.6 11.5 25.3 25.2z"
              />
            </svg>
          </span>

          <div className="flex flex-col gap-1 text-start">
            <p className="text-[#6D7986] font-semibold text-sm">Затраты</p>

            <p className="ml-auto text-[16px] text-[#323F47] font-bold">
              ₽ {expanses}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[9px]">
          <span className="w-7 h-7 rounded-full bg-[#45AAF2] flex justify-center align-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192 512"
              className="w-[5px] mx-auto"
            >
              <path
                fill="#ffffff"
                d="M176 432c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM25.3 25.2l13.6 272C39.5 310 50 320 62.8 320h66.3c12.8 0 23.3-10 24-22.8l13.6-272C167.4 11.5 156.5 0 142.8 0H49.2C35.5 0 24.6 11.5 25.3 25.2z"
              />
            </svg>
          </span>

          <div className="flex flex-col gap-1 text-start">
            <p className="text-[#6D7986] font-semibold text-sm">Прибыль</p>

            <p className="ml-auto text-[16px] text-[#323F47] font-bold">
              ₽ {income}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[9px]">
          <span className="w-7 h-7 rounded-full bg-[#F5E230]"></span>

          <div className="flex flex-col gap-1 text-start">
            <p className="text-[#6D7986] font-semibold text-sm">Задолжность</p>

            <p className="ml-auto text-[16px] text-[#323F47] font-bold">
              ₽ {debt}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[9px]">
          <span className="w-7 h-7 rounded-full bg-[#AC74FC]"></span>

          <div className="flex flex-col gap-1 text-start">
            <p className="text-[#6D7986] font-semibold text-sm">Итог</p>

            <p className="ml-auto text-[16px] text-[#323F47] font-bold">
              ₽ {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
