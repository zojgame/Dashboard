import { useAppSelector } from "../../store";
import type { FinanceEntry } from "../components.types";

interface ProblemZonesProps {
  data: FinanceEntry[];
}

const ProblemZones: React.FC<ProblemZonesProps> = ({ data }) => {
  const { currentRecord } = useAppSelector((state) => state.stats);

  const debts = data
    .filter(
      (d) =>
        d.type === "debt" &&
        (d.division === currentRecord || currentRecord === "Total")
    )
    .slice(0, 10);

  return (
    <div className="bg-white py-4 px-8 rounded-4xl h-fit">
      <h2 className="text-lg text-[#2D4258] mb-4 text-left text-[20px] font-bold leading-11">
        Проблемные зоны
      </h2>

      {debts.length > 0 ? (
        <ul className="space-y-2">
          {debts.map((item, index) => {
            const isHightDebt = Number(item.amount) > 10000;

            return (
              <li key={index} className="text-sm text-red-600 flex gap-4">
                <div
                  className={`w-[30px] h-[30px] rounded-full flex justify-between ${
                    isHightDebt ? "bg-[#FC5C65]" : "bg-[#F7B731]"
                  }`}
                >
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
                </div>
                <div className="flex flex-col gap-0.5 text-left">
                  {item?.debtType && (
                    <p className="text-[#6D7986] font-semibold text-sm">
                      {item?.debtType}
                    </p>
                  )}

                  <p className="text-[#323F47] font-bold text-[18px] leading-6">
                    ₽ {parseInt(item.amount).toLocaleString()}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">
          Серьёзных задолженностей не обнаружено.
        </p>
      )}
    </div>
  );
};

export default ProblemZones;
