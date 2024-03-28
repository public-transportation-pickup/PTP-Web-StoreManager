
// components

// import CardLineChart from "../../components/Cards/CardLineChart";
import { ToastContainer,toast } from "react-toastify";
import { useEffect, useState,useContext } from "react";
import CardBarChart from "../../components/Cards/CardBarChart";
// import CardLineChart from "../../components/Cards/CardLineChart";
import CardPageVisits from "../../components/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";
import HeaderStats from "../../components/Headers/HeaderStats";

function Dashboard() {


  return (
    <>
      <HeaderStats/>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardLineChart /> */}
          {/* App1 */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardBarChart /> */}
          {/* App2 */}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 pt-8">
          <CardPageVisits />
          {/* App3 */}
        </div>
        <div className="w-full xl:w-4/12 px-4 pt-8">
          <CardSocialTraffic />
          {/* App4   */}
        </div>
      </div>
    </>
  );
}
export default Dashboard;