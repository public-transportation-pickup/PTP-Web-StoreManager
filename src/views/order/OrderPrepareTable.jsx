import { useCallback, useEffect, useState } from "react";
import Note from "../../components/shared/Note";
import {useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from "react-redux";
import { selectOrder,fetchOrders } from "../../redux/features/orderSlice.js";
import NumberFormat from "../../libs/Commons/NumberFormat.jsx";
import DateTimeFormat from "../../libs/Commons/DateTimeFormat.jsx";
import {UpdateOrder} from "../../api/order-api.js"
import { useAPIRequest,Actions } from "../../libs/Commons/api-request.js";
import PaginationButton from "../../components/Pagination/PaginationButton.jsx";

export default function OrderPrepareTable() {
    //waiting -> preparing sẽ qua đây 
    //status send Prepared
    //#region Call api
        const [updateState,requestUpdate]=useAPIRequest(UpdateOrder);
    //#endregion

    const [listPrepareOrder,setlist] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);

    const dispatch = useDispatch();
    useEffect(() => {
        // Dispatch the fetchOrders action when the component mounts
        dispatch(fetchOrders({
            pageNumber:currentPage,
            status:'Preparing'
        }));
    }, [dispatch,updateState,currentPage]);

    var value= useSelector(selectOrder);
    // console.log(value);
    useEffect(()=>{
        setlist(value.items!==undefined?value.items:[]);
        setCurrentPage(value.pageIndex);
        setTotalPage(value.totalPagesCount);
    },[value]);
   
    const navigate= useNavigate();
    const handleOnclickRow=(orderId)=>{
        navigate(`/order/${orderId}`);
    }

    const handleConfirm=async(idOrder)=>{
        requestUpdate({
            id:idOrder,
            cancelReason:'',
            status:'Prepared'
        });
    }

    const handleDelete=async(value)=>{
        console.log("Reason value on order confirm table:",value);
        requestUpdate({
            id:value.id,
            canceledReason:value.reason,
            status:'Canceled'
        });
    }

    useEffect(() => {
        if(updateState.status==Actions.success){
            toast("Cập nhật đơn hàng thành công!",{autoClose:900});
        }
        if(updateState.status==Actions.failure){
            toast("Cập nhật đơn hàng thất bại!",{autoClose:900});
        }
    }, [updateState]);
    
  return (
    <>
    <ToastContainer className="w-100 h-10"/>
    <div className="flex flex-col gap-4">
    <div>
        <h2 className="pb-4 text-center text-2xl">Danh sách đơn hàng cần chuẩn bị</h2>
        <div className="relative overflow-x-auto">
            {listPrepareOrder.length > 0? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3 border border-slate-300 items-center">
                            </th>
                            <th scope="col" className="px-6 py-3 items-center justify-center border border-slate-300">
                                Thông tin
                            </th>
                            <th scope="col" className="px-6 py-3 border border-slate-300">
                                Tổng thanh toán
                            </th>
                            <th scope="col" className="px-4 py-3 border border-slate-300">
                                Thời gian nhận hàng
                            </th>
                            <th scope="col" className="px-6 py-3 border border-slate-300">
                                Ghi chú
                            </th>
                            <th scope="col" className="px-6 py-3 border border-slate-300">
                            </th>
                        </tr>
                    </thead>
                <tbody >
                        {listPrepareOrder.length >0 ? (listPrepareOrder.map((item,index)=>(
                           
                           <tr key={item.id}  className="bg-white border-b h-20 dark:bg-gray-800 dark:border-gray-700 border border-slate-300 ">
                                <td className="px-6 py-2 border border-slate-300">
                                    {index+1}
                                </td>
                                <td className="px-6 py-2 border border-slate-300">
                                    <p>{item.name}</p>
                                    <p>{item.phoneNumber}</p>
                                </td>
                                
                                <td className="px-6 py-2 border border-slate-300">
                                <NumberFormat number={item.total} /> VNĐ
                                </td>
                                <td className="px-6 py-4 border border-slate-300">
                                    <DateTimeFormat date={item.pickUpTime} />
                                </td>
                                <td onClick={()=>handleOnclickRow(item.id)} className="px-2 py-2 border border-slate-300 hover:bg-slate-200">
                                        {/* {console.log(item.orderDetails[0])} */}
                                        <div  className="flex flex-row gap-2">
                                            <p className="text-sm font-bold	"  >-</p>
                                                <p>{item.orderDetails===undefined?"": item.orderDetails[0].productName}</p>
                                                <p>x{item.orderDetails===undefined?"": item.orderDetails[0].quantity}</p>
                                                <p><strong className="pl-1"> <NumberFormat number={item.orderDetails===undefined?3000: item.orderDetails[0].productPrice} /> VNĐ</strong></p>  
                                        </div>
                                        {item.orderDetails!==undefined&&item.orderDetails[1]!==undefined ?
                                            <div  className="flex flex-row gap-2">
                                                <p className="text-sm font-bold	"  >-</p>
                                                <p>{item.orderDetails[0].productName}</p>
                                                <p>x{item.orderDetails[0].quantity}</p>
                                                <p><strong className="pl-1"> <NumberFormat number={item.orderDetails[0].productPrice} /> VNĐ</strong></p>  
                                            </div>:<></>
                                        }
                                        {item.orderDetails!==undefined&&item.orderDetails[2]!==undefined ?
                                            <div  className="gap-2  border-0 border-red-600">
                                                <p className="text-sm font-bold	"  >...</p>
                                            </div>:<></>
                                        }
                                        
                                </td>
                                <td className="px-2 py-2 border border-slate-300">
                                    <div className="flex gap-2">
                                        <button type="button" onClick={()=>handleConfirm(item.id)} className="bg-indigo-500 hover:opacity-80 rounded-lg text-black p-3 py-1 text-sm">Sẵn sàng</button>
                                        {/* {console.log("Order id",item.id)} */}
                                        <Note button="Hủy đơn" noteStringFunc={handleDelete} id={item.id}/>
                                    </div>
                                </td>
                            </tr>
                       ))
                           
                       ):(<></>)}
                
                </tbody>
            </table>
            ):(
                <></>
            )}
             { listPrepareOrder.length >0?
                    <div className="bg-white items-center border-b align-middle dark:bg-gray-800 dark:border-gray-700 border border-slate-300 ">
                        <PaginationButton
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            totalPages={totalPage}/>
                    </div>
                    :<></> 
                }
        </div>
    </div>
    </div>
    </>
  )
}
