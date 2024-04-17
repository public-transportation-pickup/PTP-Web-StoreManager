// components
import { useState,useEffect,useRef } from "react";
import NumberFormat from "../../libs/Commons/NumberFormat.jsx";
import DateTimeFormat from "../../libs/Commons/DateTimeFormat.jsx";
import {Actions, useAPIRequest } from '../../libs/Commons/api-request.js';
import { getTransactions } from "../../api/transaction-api.js";
import { useNavigate } from 'react-router';
import { IoWalletOutline } from "react-icons/io5";
import PaginationButton from "../../components/Pagination/PaginationButton.jsx";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function TransactionTable() {
  //#region api request
  const [transState,requestTrans]=useAPIRequest(getTransactions);
  //#endregion
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [transactions,setTransactions]= useState([]);
  const [amount,setAmount]= useState(0);
  useEffect(()=>{
    requestTrans();
  },[])

  useEffect(()=>{
      // console.log(transState);

    if(transState.status===Actions.success){
      setTransactions(transState.payload.transactions);
      setAmount(transState.payload.amount);
    }
    if(transState.status===Actions.failure){
      console.log(transState.error);
    }

  },[transState]);

  const phoneNumberRegex = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    const inputRef = useRef();
    const handleSearch= async ()=>{
        const searchTerm = inputRef.current.value.trim();
        const isValid = phoneNumberRegex.test(searchTerm);
        if(searchTerm!=''){
            if(isValid){
                // setPhoneNumer(searchTerm);
                var filter= transactions.filter((tran) =>
                  tran.phoneNumber
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(searchTerm.toLowerCase().replace(/\s+/g, ''))
                );
                // console.log(filter);
                if(filter.length>0){
                    setTransactions(filter);
                  }else{
                    var data= await getTransactions()
                    setTransactions(data.transactions);
                    toast.warning(`Số điện thoại không tồn tại`,{autoClose:900});
                  }
            }
            else{
                toast.warning("Phone is incorrect format",{autoClose:900});
            }
        }else{
            // console.log('non');
            var data= await getTransactions()
            setTransactions(data.transactions);
        }
    }
  // console.log(transactions);
  return (
    <>
    <ToastContainer className="w-100 h-10"/>
      <div className="w-full my-2">   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="number"
               ref={inputRef}
               id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập số điện thoại . . ." required />
              <button type="button" 
                  onClick={()=>handleSearch()}
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm kiếm</button>
          </div>
      </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-0 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-2 border-0 bg-amber-300">
          <div className="flex flex-wrap items-center  bg-amber-300">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
              <h3 className="font-semibold text-lg text-slate-700 ">
              Lịch sử giao dịch
              </h3>
            </div>
            <div className="w-fit px-12 text-right border-0 border-red-600">
                <div className="inline-flex border-0 border-red-600 h-full mt-2"> 
                    <IoWalletOutline  size={28}/>
                    <p className="border-0 pl-2 mt-1 text-slate-600  text-[15px] underline font-semibold ">Số dư: <NumberFormat number={amount}/> VNĐ</p>
                </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Loại giao dịch
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Nội dung
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Số điện thoại
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Số tiền
                </th>
                
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Hình thức
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Thời gian
                </th>
                
              </tr>
            </thead>
            <tbody>
              {transactions.length>0 ?(transactions.slice(currentPage*10, currentPage*10+10).map((item,index)=>(
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {index +1 + currentPage*10}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.transactionType==='Receive'?'Thanh toán':'Hoàn tiền'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <a
                        className="text-blue-500 underline hidden lg:inline-block font-bold"
                        href={"../orders/"+item.orderId}
                    >
                      {item.transactionType==='Receive'?'Thanh toán cho đơn hàng':'Hoàn tiền cho đơn hàng'} của {item.name}
                    </a>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.phoneNumber}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <NumberFormat number={item.amount}/> VNĐ
                  </td>
                  
                  
                  <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Thanh toán ví
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      <DateTimeFormat date={item.creationDate}/>
                  </td>
                </tr>

              ))):(<></>)}
            </tbody>
          </table>
          { transactions.length >0?
                    <div className="bg-white items-center border-b border-t align-middle dark:bg-gray-800 dark:border-gray-700 border-0 border-slate-300 ">
                        <PaginationButton
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            totalPages={Math.ceil(transactions.length/10)}/>
                    </div>
                    :<></> 
                }
        </div>
      </div>
    </>
  );
}
export default TransactionTable;
