import OrderTable from "../../components/Tables/OrderTable";
function Orders() {
  return (
    <>
      <div className="flex flex-wrap mt-3 bg-[#f7f7ff] p-2 h-screen">
        <div className="w-full mb-12 px-2 ">
          <OrderTable/>
        </div>

      </div>
    </>
  );
}

export default Orders;