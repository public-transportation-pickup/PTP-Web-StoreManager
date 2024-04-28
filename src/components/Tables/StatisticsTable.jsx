import { useState,useEffect } from "react";
import { GetDate } from "../../libs/Commons/DateTimeFormat";
import NumberFormat from "../../libs/Commons/NumberFormat";
import { useAPIRequest,Actions } from "../../libs/Commons/api-request";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import Datepicker from "react-tailwindcss-datepicker"; 
import { GetDateReport } from "../../api/store-api";
import PaginationButton from "../Pagination/PaginationButton";
export default function StatisticsTable() {
    
    //#region Api request
    const[reportState,requestReport]= useAPIRequest(GetDateReport);
    //#endregion
    const [datepicker, setDate] = useState({ 
        startDate: null ,
        endDate: null  
        }); 
    const [currentPage, setCurrentPage] = useState(0);

    const handleValueChange = (newValue) => {
    // console.log("newValue:", newValue); 
        setDate(newValue); 
    } 
    const [reports,setReports]=useState([]);
    useEffect(() => {
      // Dispatch the fetchMenus action when the component mounts
      requestReport(datepicker);
    }, [datepicker]);
    
    
    useEffect(()=>{
        if(reportState.status===Actions.success){
            setReports(reportState.payload);
            // console.log(reportState.payload);
        }
        if(reportState.status===Actions.failure){
            console.log(reportState.error);
        }
    },[reportState])

    const navigate= useNavigate();

    const handleUpdate=(id)=>{
        navigate(`update/${id}`);
    }
    
  return (
  
    <>
        <ToastContainer className="w-100 h-10"/>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded h-fit" 
        }
      >
        <div className="justify-end  rounded-t-md bg-gray-100 px-1 max-w-full  text-black flex flex-grow flex-1 py-1 ">
            {/* <span>Xem theo ngày</span> */}
            <div className="w-1/2">
                <Datepicker 
                    toggleClassName="absolute bg-blue-300 rounded-r-lg right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed" 
                    primaryColor={"teal"} 
                    value={datepicker} 
                    useRange={true}
                    onChange={handleValueChange} 
                /> 
            </div>
        </div>
        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-amber-300">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-2 max-w-full flex-grow flex-1">
              <h3
                className={"font-semibold text-lg text-slate-700 " }>
                Doanh thu theo ngày
              </h3>
             
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto z-0">
          {/* Projects table */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Thời gian
                        </th>
                        <th scope="col" className="px-4 py-3  text-center">
                           Số đơn thành công
                        </th>
     
                        <th scope="col" className="px-6 py-3  text-center">
                            Số đơn bị hủy
                        </th>
                        <th scope="col" className="px-8 py-3 text-center">
                            Tổng doang thu
                        </th>
                        <th scope="col" className="px-3 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length>0 ?(reports.map((item,index)=>(
                    <tr key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 ">
                            {index +1}
                        </td>
                        <td scope="row" className="px-3 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <GetDate date={item.date}/>
                        </td>
                        <td className="px-4 py-4 text-center  ">
                           {item.orderCompleted}
                        </td>

                        <td className="px-6 py-4 text-center">
                            {item.orderCanceled}
                        </td>
                        <td className="px-8 text-center py-4 max-w-64">
                                <NumberFormat number={item.revenue}/> VNĐ
                        </td>
                        <td className="px-3 py-4">
                          <a
                              className="text-blue-500 underline hidden lg:inline-block font-bold"
                              href={"../statistics/"+item.date}
                          >
                            Xem chi tiết
                          </a>
                        </td>
                    </tr>
                    
                    ))):(<></>)}

                    
                </tbody>
            </table>
            { reports.length >0?
                    <div className="bg-white items-center border-b align-middle dark:bg-gray-800 dark:border-gray-700 border border-slate-300 ">
                        <PaginationButton
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            totalPages={Math.ceil(reports.length/5)}/>
                    </div>
                    :<></> 
                }
        </div>
      </div>
    </>
  )
}
