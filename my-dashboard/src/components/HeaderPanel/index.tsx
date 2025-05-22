import { useCallback, useEffect, useState } from "react";
import "../../App.scss";
import { TABS } from "./HeaderPanel.config";
import type { TTabSetion } from "./HeaderPanel.types";

const HeaderPanel = () => {
  const [activeTab, setActiveTab] = useState<TTabSetion["href"]>("");
  const [arrowActive, setArrowActive] = useState(false);

  useEffect(() => {
    const tabHash = window.location.hash;

    setActiveTab(tabHash);
  }, []);

  const handleOnTabClick = useCallback((tab: TTabSetion) => {
    return () => {
      setActiveTab(tab.href);
    };
  }, []);

  const handleOnRightClick = useCallback(() => {
    let updatedTab = "";

    const currentIndex = TABS.findIndex((tab) => tab.href === activeTab);

    if (currentIndex !== -1) {
      if (currentIndex < TABS.length - 1) {
        updatedTab = TABS[currentIndex + 1].href;
      } else {
        updatedTab = TABS[0].href;
      }
    } else {
      updatedTab = TABS[0].href;
    }

    setActiveTab(updatedTab);
  }, [activeTab]);

  const handleOnLeftClick = useCallback(() => {
    let updatedTab = "";

    const currentIndex = TABS.findIndex((tab) => tab.href === activeTab);

    if (currentIndex !== -1) {
      if (currentIndex > 0) {
        updatedTab = TABS[currentIndex - 1].href;
      } else {
        updatedTab = TABS[TABS.length - 1].href;
      }
    } else {
      updatedTab = TABS[0].href;
    }

    setActiveTab(updatedTab);
  }, [activeTab]);

  const handleOnArrowClick = useCallback(() => {
    setArrowActive((prev) => !prev);
  }, []);

  return (
    <header className="flex py-[49px] gap-20 px-10">
      <div className="flex gap-10 items-center w-full">
        <div className="flex gap-2 items-center">
          <button
            className="shadow-2xl shadow-black arrow_button"
            onClick={handleOnLeftClick}
          >
            <div className=" icon icon__arrow"></div>
          </button>

          <button className="shadow-2xl shadow-black arrow_button">
            <div
              className="icon icon__arrow rotate-180"
              onClick={handleOnRightClick}
            ></div>
          </button>
        </div>

        <nav className="flex border-b-[#D2D1D1] border-b-[1.5px] gap-10">
          {TABS.map((tab) => {
            const { href, title, id } = tab;

            return (
              <a
                className={`pb-[14px] font-semibold transition-all ease-in-out duration-500 ${
                  href === activeTab ? "active_tab" : "tab"
                }`}
                href={href}
                key={id}
                onClick={handleOnTabClick(tab)}
              >
                {title}{" "}
              </a>
            );
          })}
        </nav>

        <div
          className="flex gap-6 flex-1 cursor-pointer pr-11"
          onClick={handleOnArrowClick}
        >
          <img
            src="manager.png"
            alt="manager"
            className="w-14 h-14 rounded-full"
          />

          <div className="flex flex-col text-start ">
            <p className="font-bold">Kristina 🐰</p>
            <p className="font-medium text-sm text-[#989FA3]">
              менеджер продаж
            </p>
          </div>

          <div
            className={`icon icon__triangle transition-all ease-in-out w-fit  ${
              arrowActive ? "rotate-180" : "rotate-0"
            }`}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPanel;
