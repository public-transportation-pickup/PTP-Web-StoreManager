import React from "react";

// components

import CardTable from "../../components/Cards/CardTable";
import ProductTable from "../../components/Tables/ProductTable";
import ScheduleMenuPage from "../../components/Tables/MenuTable";
function Menus() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ScheduleMenuPage/>
        </div>
      </div>
    </>
  );
}

export default Menus;