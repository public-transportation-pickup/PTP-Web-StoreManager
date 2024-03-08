import React from "react";

// components

import CardTable from "../../components/Cards/CardTable";
import ProductTable from "../../components/Tables/ProductTable";

function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {/* <CardTable /> */}
          <ProductTable/>
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}

export default Tables;