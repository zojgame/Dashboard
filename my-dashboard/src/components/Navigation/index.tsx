import { useCallback, useState } from "react";
import "../../App.scss";
import { NAVIGATION_TABS } from "./Navigation.config";
import type { TNavTab } from "./Navigation.types";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState<TNavTab | null>(null);

  const handleOnClick = useCallback(
    (tab: TNavTab) => {
      return () => {
        setActiveTab(tab);
      };
    },
    [setActiveTab]
  );

  return (
    <nav className="flex flex-col justify-center px-[32px] gap-[84px]">
      <img src="logo.svg" alt="logo h2o" className="pt-[55px]" />

      <ul className="flex flex-col gap-[46px] px-[10px] ">
        {NAVIGATION_TABS.map((tab) => {
          const { id, title } = tab;
          const active = id === activeTab?.id ? "nav_tab__active" : "";

          return (
            <button
              className={`nav_tab ${active}`}
              onClick={handleOnClick(tab)}
            >
              <li key={id} className={`icon icon__${title}`} />
            </button>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
