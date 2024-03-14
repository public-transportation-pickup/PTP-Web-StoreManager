import { Outlet } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";

// views

// import Dashboard from "views/admin/Dashboard.js";
// import Maps from "views/admin/Maps.js";
// import Settings from "views/admin/Settings.js";
// import Tables from "views/admin/Tables.js";

function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-[220px] bg-slate-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-28">
          <Outlet />
          <div className="fixed bottom-0">
          <FooterAdmin />
          </div>
          
        </div>
      </div>
    </>
  );
}
export default Admin;