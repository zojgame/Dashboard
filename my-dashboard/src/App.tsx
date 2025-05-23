import "./App.scss";
import Navigation from "./components/Navigation";
import HeaderPanel from "./components/HeaderPanel";
import ChartSection from "./components/ChartSection";
import { generateRandomData } from "./calc/generateRandomData";
import { useEffect, useState } from "react";
import type { FinanceEntry } from "./components/components.types";
import SummaryCards from "./components/SummaryCards";
import ProblemZones from "./components/ProblemZones";

function App() {
  const [data, setData] = useState<FinanceEntry[]>([]);

  useEffect(() => {
    const _data = generateRandomData(50);
    console.log("_data", _data);
    setData(_data);
  }, []);

  return (
    <section className="content">
      <Navigation />

      <section className="bg-white w-full rounded-[56px] rounded-b-none rounded-bl-none flex flex-col">
        <HeaderPanel />

        <section className="grid grid-cols-6 gap-x-10 px-10 bg-[#F8F8F8] pt-7 rounded-t-[56px]">
          <h2 className="mr-auto col-span-full font-extrabold text-[#323F47] text-[28px]">
            Сводный отчет
          </h2>

          <div className="col-span-4 ">
            <SummaryCards data={data} />

            <ChartSection data={data} />
          </div>

          <div className="col-span-2">
            <ProblemZones data={data} />
          </div>
        </section>
      </section>
    </section>
  );
}

export default App;
