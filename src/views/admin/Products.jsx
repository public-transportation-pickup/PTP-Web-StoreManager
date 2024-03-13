import React from "react";

// components

import CardTable from "../../components/Cards/CardTable";
import ProductTable from "../../components/Tables/ProductTable";

function Products() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 px-2">
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

export default Products;