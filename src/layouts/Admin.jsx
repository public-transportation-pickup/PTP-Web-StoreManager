import { Outlet, useLocation } from "react-router-dom";

// components
import Connector from "../libs/constants/signalr-connection.ts";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect } from "react";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
//import FooterAdmin from "../components/Footers/FooterAdmin";

// views

// import Dashboard from "views/admin/Dashboard.js";
// import Maps from "views/admin/Maps.js";
// import Settings from "views/admin/Settings.js";
// import Tables from "views/admin/Tables.js";

function Admin() {
  const {pathname}=useLocation();
   //#region SignalR
   var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
   let STOREID = CURRENT_USER.user.storeId;
   const { newMessage, events } = Connector();
  //  const [message, setMessage] = useState("");
   useEffect(() => {
       events((username, message) => {
           if(username==="CreateOrder" && message===STOREID){
            // setMessage(message)
            toast("Bạn có đơn hàng mới trong hàng chờ!",{autoClose:2000});
           }
       });
   },[]);


   //#endregion
  return (
    <>
    {/* <ToastContainer className="w-100 h-10"/> */}
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
    </>
  );
}
export default Admin;