import { useMemo } from "react";
import type { FinanceEntry } from "../components.types";
import {
  getB2b,
  getB2c,
  getRandomPercent,
  getStyleType,
  getTotal,
} from "../../calc/getStats";
import { useAppSelector } from "../../store";
import { PERCENT_BG_STYLE, PERCENT_FONT_STYLE } from "./SummaryCards.config";
import type { TRecordType } from "../../store/stats/stats.types";
import { useDispatch } from "react-redux";
import { changeRecordType } from "../../store/stats";

interface SummaryCardsProps {
  data: FinanceEntry[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const { currentRecord } = useAppSelector((state) => state.stats);
  const dispatch = useDispatch();
  const total = useMemo(() => getTotal(data), [data]);
  const b2b = useMemo(() => getB2b(data), [data]);
  const b2c = useMemo(() => getB2c(data), [data]);

  const totalPercent = useMemo(() => getRandomPercent(), []);
  const b2bPercent = useMemo(() => getRandomPercent(), []);
  const b2cPercent = useMemo(() => getRandomPercent(), []);

  const totalStyleType = useMemo(
    () => getStyleType(totalPercent, currentRecord === "Total"),
    [totalPercent, currentRecord]
  );
  const b2bStyleType = useMemo(
    () => getStyleType(b2bPercent, currentRecord === "B2B"),
    [b2bPercent, currentRecord]
  );
  const b2cStyleType = useMemo(
    () => getStyleType(b2cPercent, currentRecord === "B2C"),
    [b2cPercent, currentRecord]
  );

  const handleOnRecordTypeChange = (record: TRecordType) => {
    return () => {
      dispatch(changeRecordType(record));
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div
        className={`${
          currentRecord === "Total" ? "bg-[#54D3C2] text-white" : "bg-[#fff]"
        }  p-8 rounded-3xl text-center cursor-pointer select-none transition-all ease-in-out`}
        onClick={handleOnRecordTypeChange("Total")}
      >
        <div
          className={
            "font-semibold flex justify-center w-fit gap-[7px] m-auto px-[38px] py-[6px] rounded-3xl transition-all ease-in-out " +
            `${PERCENT_BG_STYLE[totalStyleType]}`
          }
        >
          <div
            className={`icon icon__long_arrow transition-all ease-in-out ${
              totalStyleType === "less_active" ||
              totalStyleType === "less_inactive"
                ? "rotate-180"
                : "rotate-0"
            }`}
            style={{ backgroundColor: PERCENT_FONT_STYLE[totalStyleType] }}
          ></div>
          <p
            style={{ color: PERCENT_FONT_STYLE[totalStyleType] }}
            className={`font-semibold transition-all ease-in-out`}
          >
            {totalPercent} %
          </p>
        </div>
        <p className="text-[28px] font-semibold pt-[13px]">
          ₽ {total.toLocaleString()}
        </p>
        <p className="text-[16px] font-semibold">Итоги</p>
      </div>

      <div
        className={`${
          currentRecord === "B2B" ? "bg-[#54D3C2] text-white" : "bg-[#fff]"
        }  p-8 rounded-3xl text-center cursor-pointer select-none transition-all ease-in-out`}
        onClick={handleOnRecordTypeChange("B2B")}
      >
        <div
          className={
            "font-semibold transition-all ease-in-out flex justify-center w-fit gap-[7px] m-auto px-[38px] py-[6px] rounded-3xl " +
            `${PERCENT_BG_STYLE[b2bStyleType]}`
          }
        >
          <div
            className={`icon icon__long_arrow transition-all ease-in-out ${
              b2bStyleType === "less_active" || b2bStyleType === "less_inactive"
                ? "rotate-180"
                : "rotate-0"
            }`}
            style={{ backgroundColor: PERCENT_FONT_STYLE[b2bStyleType] }}
          ></div>
          <p
            style={{ color: PERCENT_FONT_STYLE[b2bStyleType] }}
            className={`transition-all ease-in-out font-semibold`}
          >
            {b2bPercent} %
          </p>
        </div>
        <p className="text-[28px] font-semibold pt-[13px]">
          ₽ {b2b.toLocaleString()}
        </p>
        <p className="text-[16px] font-semibold">B2B</p>
      </div>

      <div
        className={`${
          currentRecord === "B2C" ? "bg-[#54D3C2] text-white" : "bg-[#fff]"
        }  p-8 rounded-3xl text-center cursor-pointer select-none transition-all ease-in-out`}
        onClick={handleOnRecordTypeChange("B2C")}
      >
        <div
          className={
            "transition-all ease-in-out font-semibold flex justify-center w-fit gap-[7px] m-auto px-[38px] py-[6px] rounded-3xl " +
            `${PERCENT_BG_STYLE[b2cStyleType]}`
          }
        >
          <div
            className={`icon icon__long_arrow transition-all ease-in-out ${
              b2cStyleType === "less_active" || b2cStyleType === "less_inactive"
                ? "rotate-180"
                : "rotate-0"
            }`}
            style={{ backgroundColor: PERCENT_FONT_STYLE[b2cStyleType] }}
          ></div>
          <p
            style={{ color: PERCENT_FONT_STYLE[b2cStyleType] }}
            className={`font-semibold transition-all ease-in-out`}
          >
            {b2cPercent} %
          </p>
        </div>
        <p className="text-[28px] font-semibold pt-[13px]">
          ₽ {b2c.toLocaleString()}
        </p>
        <p className="text-[16px] font-semibold">B2C</p>
      </div>
    </div>
  );
};

export default SummaryCards;
