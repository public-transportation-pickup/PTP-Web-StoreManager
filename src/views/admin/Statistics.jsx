import StatisticsTable from "../../components/Tables/StatisticsTable";
function Statistics() {
  return (
    <>
      <div className="flex flex-wrap mt-3 bg-[#f7f7ff] h-screen p-2 pt-2">
        <div className="w-full mb-12 px-4">
          <StatisticsTable/>
        </div>
      </div>
    </>
  );
}

export default Statistics;