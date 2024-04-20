import { useRef, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from "react-redux";
import { selectOrder,fetchOrders } from "../../redux/features/orderSlice.js";
import NumberFormat from "../../libs/Commons/NumberFormat.jsx";
import DateTimeFormat from "../../libs/Commons/DateTimeFormat.jsx";
import PaginationButton from "../../components/Pagination/PaginationButton.jsx";
import { GetOrderByStoreIdV2 } from '../../api/order-api.js';
import { useAPIRequest,Actions } from '../../libs/Commons/api-request.js';

export default function OrderCompleteTable() {
    const navigate= useNavigate();
    const handleOnclickRow=(orderId)=>{
        navigate(`../${orderId}`);
    }
    const [ordersState,requestOrder]= useAPIRequest(GetOrderByStoreIdV2);
    const [listCompletedOrder,setlist] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [phoneNumber, setPhoneNumer] = useState('');

    useEffect(()=>{
        requestOrder({
            status:'Completed'
        });
    },[]);

    useEffect(()=>{
        if(ordersState.status==Actions.success){
            setlist(ordersState.payload.items);
        }
        if(ordersState.status==Actions.failure){
            console.log(ordersState);
        }
    },[ordersState])

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     // Dispatch the fetchOrders action when the component mounts
    //     dispatch(fetchOrders({
    //         phoneNumber:phoneNumber,
    //         pageNumber:currentPage!==undefined?currentPage:0,
    //         status:'Completed'
    //     }));
    // }, [dispatch,currentPage,phoneNumber]);

    // var value= useSelector(selectOrder);
    // // console.log(value);
    // useEffect(()=>{
    //     setlist(value.items!==undefined?value.items:[]);
    //     setCurrentPage(value.pageIndex);
    //     setTotalPage(value.totalPagesCount);
    // },[value]);

    const phoneNumberRegex = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    const inputRef = useRef();
    const handleSearch= async ()=>{
        const searchTerm = inputRef.current.value.trim();
        const isValid = phoneNumberRegex.test(searchTerm);
        if(searchTerm!=''){
            if(isValid){
                // setPhoneNumer(searchTerm);
                var filter= listCompletedOrder.filter((order) =>
                  order.phoneNumber
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(searchTerm.toLowerCase().replace(/\s+/g, ''))
                );
                console.log(filter);
                if(filter.length>0){
                    setlist(filter);
                  }else{
                    toast.warning(`Sản phẩm không tồn tại`,{autoClose:900});
                    var data= await GetOrderByStoreIdV2({ status:'Completed'})
                    setlist(data.items);
                  }
            }
            else{
                toast.warning("Phone is incorrect format",{autoClose:900});
            }
        }else{
            // console.log('non');
            var data= await GetOrderByStoreIdV2({ status:'Completed'})
            setlist(data.items);
        }
    }


  return (
    <>
    <ToastContainer className="w-100 h-10"/>
    <div className="flex flex-col gap-4">
        <div>
            <h2 className="pb-0 text-center text-2xl">Danh sách đơn hàng đã hoàn thành</h2>

            <div className="w-full my-4">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="number" ref={inputRef} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập số điện thoại . . ." required />
                    <button type="button" 
                        onClick={()=>handleSearch()}
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm kiếm</button>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                {listCompletedOrder.length > 0 ? (
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
                                <th scope="col" className="px-2 py-3 border border-slate-300">
                                </th>
                            </tr>
                        </thead>
                    <tbody >
                    {listCompletedOrder.length >0 && listCompletedOrder.slice(currentPage*5, currentPage*5+5).map((item,index)=>(
                        <tr key={item.id}  className="bg-white h-20 border-b dark:bg-gray-800 dark:border-gray-700 border border-slate-300 ">
                            <td className="px-6 py-2 h-20 border border-slate-300">
                                {index+1 +currentPage*5}
                            </td>
                            <td className="px-6 py-2  h-20 w-64 border border-slate-300">
                                <p>{item.name}</p>
                                <p>{item.phoneNumber}</p>
                            </td>
                            
                            <td className="px-6 py-2 border h-20 w-44 border-slate-300">
                            <NumberFormat number={item.total} /> VNĐ
                            </td>
                            <td className="px-6 py-2 border border-slate-300">
                                <DateTimeFormat date={item.pickUpTime} />
                            </td>
                            <td onClick={()=>handleOnclickRow(item.id)} className="px-6 py-2  h-20 w-72 border border-slate-300 hover:bg-slate-200">
                                
                                <div  className="flex flex-row gap-2">
                                    <p className="text-sm font-bold	"  >-</p>
                                        <p>{item.orderDetails===undefined?"": item.orderDetails[0].productName}</p>
                                        <p>x{item.orderDetails===undefined?"": item.orderDetails[0].quantity}</p>
                                        <p><strong className="pl-1"> <NumberFormat number={item.orderDetails===undefined?3000: item.orderDetails[0].productPrice} /> VNĐ</strong></p>  
                                </div>
                                {item.orderDetails!==undefined&&item.orderDetails[1]!==undefined ?
                                    <div  className="flex flex-row gap-2">
                                        <p className="text-sm font-bold	"  >-</p>
                                        <p>{item.orderDetails[1].productName}</p>
                                        <p>x{item.orderDetails[1].quantity}</p>
                                        <p><strong className="pl-1"> <NumberFormat number={item.orderDetails[1].productPrice} /> VNĐ</strong></p>  
                                    </div>:<></>
                                }
                                {item.orderDetails!==undefined&&item.orderDetails[2]!==undefined ?
                                    <div  className="gap-2  border-0 border-red-600">
                                        <p className="text-sm font-bold	"  >...</p>
                                    </div>:<></>
                                }
                                    
                            </td>
                            <td className="px-6 py-2  h-20 w-64 border border-slate-300">
                                <p>{item.status==="Completed"?"Đã giao hàng":""} vào lúc </p> <DateTimeFormat date={item.modificationDate} />
                            </td>
                            {/* <td className="px-2 py-4 border border-slate-300">
                                <div className="flex gap-2">
                                    <button type="button" onClick={()=>handleConfirm(item.id)} className="bg-indigo-500 hover:opacity-80 rounded-lg text-black p-3 py-1 text-sm">Đã giao</button>
                                    <Note button="Hủy đơn" noteStringFunc={handleDelete} id={item.id} />
                                </div>
                            </td> */}
                        </tr>
                    ))}
                    </tbody>
                </table>
                ): ( <></>)}  
                 { listCompletedOrder.length >0?
                    <div className="bg-white items-center border-b align-middle dark:bg-gray-800 dark:border-gray-700 border border-slate-300 ">
                        <PaginationButton
                             setCurrentPage={setCurrentPage}
                             currentPage={currentPage}
                             totalPages={Math.ceil(listCompletedOrder.length/5)}/>
                    </div>
                    :<></> 
                } 
            </div>
        </div>
    </div>
    </>
  )
}
