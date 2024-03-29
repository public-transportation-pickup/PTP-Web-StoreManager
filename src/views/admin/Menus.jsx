// components

// import CardTable from "../../components/Cards/CardTable";
// import ProductTable from "../../components/Tables/ProductTable";
// import CreateMenuPage from "../menu/CreateMenuPage";
// import ScheduleMenuPage from "../../components/Tables/MenuTable";
import MenuMainPage from "../menu/MenuMainPage";
function Menus() {
  return (
    <>
      <div className="flex flex-wrap mt-3 bg-[#f7f7ff] h-screen p-2 pt-2">
        <div className="w-full mb-12 px-4">
          <MenuMainPage/>
        </div>
      </div>
    </>
  );
}

export default Menus;