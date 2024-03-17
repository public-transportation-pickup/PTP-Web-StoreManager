// components

//import CardTable from "../../components/Cards/CardTable";
import ProductTable from "../../components/Tables/ProductTable";

function Products() {
  return (
    <>
      <div className="flex flex-wrap mt-36 bg-[#f7f7ff] p-2 h-screen">
        <div className="w-full mb-12 px-2 ">
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