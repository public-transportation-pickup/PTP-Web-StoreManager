// components
import { useState,useEffect } from "react";
import NumberFormat from "../../libs/Commons/NumberFormat.jsx";
import DateTimeFormat from "../../libs/Commons/DateTimeFormat.jsx";
import {Actions, useAPIRequest } from '../../libs/Commons/api-request.js';
import { getTransactions } from "../../api/transaction-api.js";
import { useNavigate } from 'react-router';
import { IoWalletOutline } from "react-icons/io5";
import PaginationButton from "../../components/Pagination/PaginationButton.jsx";

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
      console.log(transState);

    if(transState.status===Actions.success){
      setTransactions(transState.payload.transactions);
      setAmount(transState.payload.amount);
    }
    if(transState.status===Actions.failure){
      console.log(transState.error);
    }

  },[transState]);

  // console.log(transactions);
  return (
    <>
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
                    <div className="bg-white items-center border-b align-middle dark:bg-gray-800 dark:border-gray-700 border border-slate-300 ">
                        <PaginationButton
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            totalPages={transactions.length/10}/>
                    </div>
                    :<></> 
                }
        </div>
      </div>
    </>
  );
}
export default TransactionTable;
