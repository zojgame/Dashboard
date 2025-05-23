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
    const _data = generateRandomData(150);
    setData(_data);
  }, []);

  return (
    <section className="content">
      <Navigation />

      <section className="bg-white w-full rounded-[56px] rounded-b-none rounded-bl-none flex flex-col min-h-screen">
        <HeaderPanel />

        <section className="grid grid-cols-6 gap-x-10 px-10 bg-[#F8F8F8] pt-7 rounded-t-[56px] h-full">
          <h2 className="mr-auto col-span-full font-extrabold text-[#323F47] text-[28px] m-0">
            Сводный отчет
          </h2>

          <div className="grid grid-cols-6 gap-x-10 col-span-full h-[624px]">
            <div className="col-span-4 row-span-4 grid">
              <SummaryCards data={data} />

              <ChartSection data={data} />
            </div>

            <div className="col-span-2 grid">
              <ProblemZones data={data} />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default App;
