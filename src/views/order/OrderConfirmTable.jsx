import { useState,useEffect,useRef } from "react";
import Note from "../../components/shared/Note";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Actions, useAPIRequest } from "../../libs/Commons/api-request";
import { useDispatch,useSelector } from "react-redux";
import { selectOrder,fetchOrders } from "../../redux/features/orderSlice.js";
//Component
import { useNavigate } from "react-router-dom";
import {UpdateOrder,GetOrderByStoreIdV2} from "../../api/order-api.js"
import NumberFormat from "../../libs/Commons/NumberFormat.jsx";
import DateTimeFormat from "../../libs/Commons/DateTimeFormat.jsx";
import PaginationButton from "../../components/Pagination/PaginationButton.jsx";
import {requestForToken, onMessageListener } from "../../firebase.js"; 
export default function OrderConfirmTable() {
    
    //#region Call api
    const [ordersState,requestOrder]= useAPIRequest(GetOrderByStoreIdV2);
    const [updateState,requestUpdate]=useAPIRequest(UpdateOrder);
    //#endregion

    //#region List
    const [notification, setNotification] = useState({title: '', body: ''});
    // const [listConfirmOrder, setListConfirmOrder]=useState([]);

    //#endregion
    const [listConfirmOrder,setlist] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [phoneNumber, setPhoneNumer] = useState('');
    useEffect(()=>{
        requestOrder({
            status:'Waiting'
        });
    },[updateState,notification]);

    useEffect(()=>{
        if(ordersState.status==Actions.success){
            setlist(ordersState.payload.items);
        }
        if(ordersState.status==Actions.failure){
            console.log(ordersState);
        }
    },[ordersState])

    requestForToken().then((value)=>console.log(value));

    onMessageListener()
    .then((payload) => {
        console.log(payload);
      setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
    })
    .catch((err) => console.log('failed: ', err));


    // const dispatch = useDispatch();
    // useEffect(() => {
    //     // Dispatch the fetchOrders action when the component mounts
    //     dispatch(fetchOrders({
    //         phoneNumber:phoneNumber,
    //         pageNumber:currentPage!==undefined?currentPage:0,
    //         status:'Waiting'
    //     }));
        
    // }, [dispatch,updateState,currentPage,phoneNumber]);
    // //#region component
    
    // var value= useSelector(selectOrder);
    // // console.log(value);
    // useEffect(()=>{
    //     // console.log(value.items);
    //     // console.log(value.items!==undefined? value.items[0].orderDetails : []);
    //     setlist(value.items!==undefined?value.items:[]);
    //     setCurrentPage(value.pageIndex);
    //     setTotalPage(value.totalPagesCount);
    // },[value]);

    const navigate= useNavigate();

    const handleOnclickRow=(orderId)=>{
        navigate(`../${orderId}`);
    }

    const handleConfirm=async(idOrder)=>{
        requestUpdate({
            id:idOrder,
            canceledReason:'',
            status:'Preparing'
        });
    };

    const handleDelete=async(value)=>{
        // console.log(value);
        requestUpdate({
            id:value.id,
            canceledReason:value.reason,
            status:'Canceled'
        });
    }

    useEffect(() => {
        // console.log(updateState);
        if(updateState.status==Actions.success){
            toast("Cập nhật đơn hàng thành công!",{autoClose:900});
        }
        if(updateState.status==Actions.failure){
            toast("Cập nhật đơn hàng thất bại!",{autoClose:900});
        }
    }, [updateState]);
    //#endregion

    const phoneNumberRegex = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    const inputRef = useRef();
    const handleSearch= async ()=>{
        const searchTerm = inputRef.current.value.trim();
        const isValid = phoneNumberRegex.test(searchTerm);
        if(searchTerm!=''){
            if(isValid){
                // setPhoneNumer(searchTerm);
                var filter= listDeliveryOrder.filter((order) =>
                  order.phoneNumber
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(searchTerm.toLowerCase().replace(/\s+/g, ''))
                );
                // console.log(filter);
                if(filter.length>0){
                    setlist(filter);
                  }else{
                    var data= await GetOrderByStoreIdV2({ status:'Waiting'})
                    setlist(data.items);
                    toast.warning(`Sản phẩm không tồn tại`,{autoClose:900});
                  }
            }
            else{
                toast.warning("Phone is incorrect format",{autoClose:900});
            }
        }else{
            // console.log('non');
            var data= await GetOrderByStoreIdV2({ status:'Waiting'})
            setlist(data.items);
        }
    }
  return (
    <>
    <ToastContainer className="w-100 h-10"/>
    <div className="flex flex-col gap-4">
       
        <div>
            <h2 className=" text-center text-2xl">Danh sách đơn hàng cần xác nhận</h2>
            
            <div className="w-full my-4">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="number" ref={inputRef} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by phone . . ." required />
                    <button type="button" 
                        onClick={()=>handleSearch()}
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                {  listConfirmOrder.length >0 ?(
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
                                <th scope="col" className="px-2 py-3 border border-slate-300">
                                    Ghi chú
                                </th>
                                <th scope="col" className="px-6 py-3 border border-slate-300">
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {listConfirmOrder.length >0 ? (listConfirmOrder.slice(currentPage*5, currentPage*5+5).map((item,index)=>(
                                <tr key={item.id}  className="bg-white border-b h-20 dark:bg-gray-800 dark:border-gray-700 border border-slate-300 ">
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
                                    <td className="px-6 py-4 border h-20 w-44 border-slate-300">
                                        <DateTimeFormat date={item.pickUpTime} />
                                    </td>
                                    <td onClick={()=>handleOnclickRow(item.id)} className="px-2 py-2 border h-20 w-72 border-slate-300 hover:bg-slate-200">
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
                                    <td className="px-2 py-2   h-20 w-72 border border-slate-300">
                                        <div className="flex gap-2">
                                            <button type="button" onClick={()=>handleConfirm(item.id)} className="bg-indigo-500 hover:opacity-80 rounded-lg text-black p-3 py-1 text-sm">Xác nhận</button>
                                            {/* {console.log("Order id",item.id)} */}
                                            <Note button="Hủy đơn" noteStringFunc={handleDelete} id={item.id}/>
                                        </div>
                                    </td>
                                </tr>
                            ))
                                
                            ):(<></>)}
                        {/* </Link> */}
                        </tbody>   
                    </table>
                 ):(<></>)}
                 { listConfirmOrder.length >0?
                    <div className="bg-white items-center border-b align-middle dark:bg-gray-800 dark:border-gray-700 border border-slate-300 ">
                        <PaginationButton
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            totalPages={Math.ceil(listConfirmOrder.length/5)}/>
                    </div>
                    :<></> 
                }
                 
            </div>
        </div>
        <div className="w-full">
            <div className="border border-indigo-300 p-4 rounded-lg flex flex-col justify-between">
            <p className="text-xl underline">Hướng dẫn chung:</p>
            {/* <p>Vui lòng xác nhận các đơn hàng trước <strong>10:00</strong></p> */}
            <p>- Nên xác nhận đơn hàng <span className="text-red-600 font-bold uppercase">trước thời gian được gợi ý ở cột thời gian lấy ước tính</span> nếu không đơn hàng sẽ tự động được xác nhận hoặc hủy dựa vào số lượng sản phẩm còn lại</p>
            </div>   
        </div>
    </div>
    </>
  )
}
