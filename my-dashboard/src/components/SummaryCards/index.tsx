import { useMemo } from "react";
import type { FinanceEntry } from "../components.types";

interface SummaryCardsProps {
  data: FinanceEntry[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const total = useMemo(
    () => data.reduce((acc, d) => acc + parseInt(d.amount), 0),
    [data]
  );

  const b2b = useMemo(
    () =>
      data
        .filter((d) => d.division === "B2B")
        .reduce((acc, d) => acc + parseInt(d.amount), 0),
    [data]
  );

  const b2c = useMemo(
    () =>
      data
        .filter((d) => d.division === "B2C")
        .reduce((acc, d) => acc + parseInt(d.amount), 0),
    [data]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-[#54D3C2] p-8 rounded-3xl shadow text-center cursor-pointer select-none">
        <div className="font-semibold flex justify-center w-fit gap-[7px] m-auto px-[38px] py-[6px] bg-[#F8F8F840] rounded-3xl">
          <div className="icon icon__long_arrow"></div>
          <p className="font-semibold text-white">21.5 %</p>
        </div>
        <p className="text-[28px] font-semibold text-white pt-[13px]">
          ₽ {total.toLocaleString()}
        </p>
        <p className="text-white">Итоги</p>
      </div>

      <div className="bg-[#54D3C2] p-8 rounded-3xl shadow text-center cursor-pointer select-none">
        <div className="font-semibold flex justify-center w-fit gap-[7px] m-auto px-[38px] py-[6px] bg-[#F8F8F840] rounded-3xl">
          <div className="icon icon__long_arrow"></div>
          <p className="font-semibold text-white">21.5 %</p>
        </div>
        <p className="text-[28px] font-semibold text-white pt-[13px]">
          ₽ {b2b.toLocaleString()}
        </p>
        <p className="text-white">B2B</p>
      </div>

      <div className="bg-[#54D3C2] p-8 rounded-3xl shadow text-center cursor-pointer select-none">
        <div className="font-semibold flex justify-center w-fit gap-[7px] m-auto px-[38px] py-[6px] bg-[#F8F8F840] rounded-3xl">
          <div className="icon icon__long_arrow"></div>
          <p className="font-semibold text-white">21.5 %</p>
        </div>
        <p className="text-[28px] font-semibold text-white pt-[13px]">
          ₽ {b2c.toLocaleString()}
        </p>
        <p className="text-white">B2C</p>
      </div>
    </div>
  );
};

export default SummaryCards;
