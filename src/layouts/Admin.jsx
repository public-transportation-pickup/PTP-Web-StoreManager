import { Outlet, useLocation } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
//import FooterAdmin from "../components/Footers/FooterAdmin";

// views

// import Dashboard from "views/admin/Dashboard.js";
// import Maps from "views/admin/Maps.js";
// import Settings from "views/admin/Settings.js";
// import Tables from "views/admin/Tables.js";

function Admin() {
  const {pathname}=useLocation();
  
  return (
    <div className="flex flex-row">
      <div><Sidebar /></div>
      <div className=" h-full w-screen md:ml-56 bg-[#f7f7ff]">
        <AdminNavbar />
           {/* {pathname==="/stores"?(<HeaderStats />):(<></>)} */}
          
          <div className=" mx-auto -m-28S">
            <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Admin;