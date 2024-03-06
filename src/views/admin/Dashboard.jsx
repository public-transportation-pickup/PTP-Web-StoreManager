
// components
import { Actions,useAPIRequest } from "../../libs/Commons/api-request";
import { getStoreByUserId } from "../../api/store-api";
import { useLocalStorage } from "../../libs/Commons/UseLocalStorage";

// import CardLineChart from "../../components/Cards/CardLineChart";
import { ToastContainer,toast } from "react-toastify";
import { useEffect, useState } from "react";
import CardBarChart from "../../components/Cards/CardBarChart";
import CardPageVisits from "../../components/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";

function Dashboard() {
  const [store,setStore]=useState();
  const [storeState,requestStore]=useAPIRequest(getStoreByUserId);
  const [storeLocal, setStoreLocal] = useLocalStorage("store", null);
  

  useEffect(()=>{
    requestStore();
  },[]);

  useEffect(()=>{
    if(storeState.status==Actions.success){
      setStore(storeState.payload);
      setStoreLocal(storeState.payload);
    }
    if(storeState.status==Actions.failure){
      toast.warning("Loading store fail!",{autoClose:900});
    }
  },[storeState]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardLineChart /> */}
          {/* App1 */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
          {/* App2 */}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
          {/* App3 */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
          {/* App4   */}
        </div>
      </div>
    </>
  );
}
export default Dashboard;