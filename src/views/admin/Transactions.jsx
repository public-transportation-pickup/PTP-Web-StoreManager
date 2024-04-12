import TransactionTable from "../../components/Tables/TransactionTable";
function Transactions() {
  return (
    <>
      <div className="flex flex-wrap mt-3 bg-[#f7f7ff] h-full p-2 pt-2">
        <div className="w-full mb-0 px-4">
          <TransactionTable/>
        </div>
      </div>
    </>
  );
}

export default Transactions;