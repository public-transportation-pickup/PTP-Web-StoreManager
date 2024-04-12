// components
import { GetStoreReport } from "../../api/store-api.jsx";
// import CardLineChart from "../../components/Cards/CardLineChart";
import { ToastContainer,toast } from "react-toastify";
import { useEffect, useState,useContext } from "react";
import CardBarChart from "../../components/Cards/CardBarChart";
import CardLineChart from "../../components/Cards/CardLineChart";
import CardPageVisits from "../../components/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";
import HeaderStats from "../../components/Headers/HeaderStats";
import CardPageTransactions from "../../components/Cards/CardPageTransactions.jsx";
import {Actions, useAPIRequest } from '../../libs/Commons/api-request.js';

// import { useAuth } from "../auth/AuthProvider.jsx";

function Dashboard() {
  //#region Api request
  const [reportState,requestReport]=useAPIRequest(GetStoreReport);
  //#endregion
  // const { user } = useAuth();
  // console.log(user);
  const [report,setReport]= useState();

  useEffect(()=>{
    requestReport();
  },[])

  useEffect(()=>{
    // console.log(reportState);
    if(reportState.status==Actions.success){
      setReport(reportState.payload);
    }
    if(reportState.status==Actions.failure){
      toast.warning("Lỗi!",{autoClose:900});
    }
  },[reportState])


  return (
    <>
     <ToastContainer className="w-100 h-10"/>
      <HeaderStats param={report} />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mt-16 mb-12 xl:mb-0 px-4">
          <CardLineChart param={report}/>
          {/* App1 */}
        </div>
        <div className="w-full h-fit xl:w-4/12 mt-16 px-4">
          <CardBarChart param={report} />
          {/* App2 */}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 pt-8">
          <CardPageVisits param={report!==undefined?report.productMosts:[]}/>
          {/* App3 */}
        </div>
        <div className="w-full xl:w-4/12 px-4 pt-8">
          <CardSocialTraffic  param={report!==undefined?report.customerMosts:[]}/>
          {/* App4   */}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full  mb-12 xl:mb-0 px-4 pt-8">
          <CardPageTransactions/>
          {/* App3 */}
        </div>
      </div>
    </>
  );
}
export default Dashboard;