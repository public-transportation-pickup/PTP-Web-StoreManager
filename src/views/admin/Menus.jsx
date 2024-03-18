// components

// import CardTable from "../../components/Cards/CardTable";
// import ProductTable from "../../components/Tables/ProductTable";
import ScheduleMenuPage from "../../components/Tables/MenuTable";
function Menus() {
  return (
    <>
      <div className="flex flex-wrap mt-36 bg-[#f7f7ff] h-screen p-2 pt-2">
        <div className="w-full mb-12 px-4">
          <ScheduleMenuPage/>
        </div>
      </div>
    </>
  );
}

export default Menus;