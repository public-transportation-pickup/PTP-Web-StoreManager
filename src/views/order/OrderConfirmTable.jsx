import { useCallback, useEffect, useState } from "react";
import Note from "../../components/shared/Note";
import { useNavigate } from "react-router-dom";
import { getOrdersByStoreId } from "../../api/store-api";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CURRENT_USER } from "../../libs/constants";
import { updateOrder } from "../../api/order-api";

export default function OrderConfirmTable() {
    //status preparing
    const [orderConfirmModal,setOrderConfirmModal]=useState({
        id:'',
        cancelReason:'',
        status:''
    })
    
    const [listConfirmOrder, setListConfirmOrder]=useState([]);
    console.log("List order confirm : ",listConfirmOrder);

    const handleConfirm=async(idOrder)=>{
        await console.log("Id order update", idOrder)
       
        try {
           
            setOrderConfirmModal({...orderConfirmModal,status:"Preparing"})
            setOrderConfirmModal({...orderConfirmModal,id:idOrder,});
            console.log("orderConfirmModal",orderConfirmModal);
            const reqAPI= await updateOrder(orderConfirmModal);
            console.log("Req API", reqAPI);
            await typeof reqAPI ==='string' ? toast("Xác nhận đơn thất bại"): toast("Xác nhận đơn hàng thành công");
            
        } catch (error) {
            console.log("handleConfirm button exception", error)
        }
        

    }

    const handleReason=async(value)=>{
        console.log("Reason value on order confirm table:",value);
        await setOrderConfirmModal({...orderConfirmModal, cancelReason:value})
        
    }
    const navigate= useNavigate();
    const handleOnclickRow=(orderId)=>{
        navigate(`/order/${orderId}`);
    }
    
    const fetchData= useCallback(
        async ()=>{
            const responseAPI= await getOrdersByStoreId(CURRENT_USER.user.storeId,"Waiting");
            setListConfirmOrder(responseAPI);
            console.log("ResponseAPI:",responseAPI);
        },[listConfirmOrder]
    ) 

    useEffect(()=>{
        fetchData();
    },[])
    
  return (
    <div className="flex flex-col gap-4">
        <div className="w-full">
            <div className="border border-indigo-300 p-4 rounded-lg flex flex-col justify-between">
            <p className="text-xl underline">Hướng dẫn chung:</p>
            {/* <p>Vui lòng xác nhận các đơn hàng trước <strong>10:00</strong></p> */}
            <p>- Nên xác nhận đơn hàng <span className="text-red-600 font-bold uppercase">trước thời gian được gợi ý ở cột thời gian lấy ước tính</span> nếu không đơn hàng sẽ tự động được xác nhận hoặc hủy dựa vào số lượng sản phẩm còn lại</p>
            </div>   
        </div>
        <div>
            <h2 className="pb-4 text-center text-2xl">Danh sách đơn hàng cần xác nhận</h2>
            <div className="relative overflow-x-auto">
                {listConfirmOrder.length >0 ?(
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3 border border-slate-300 items-center">
                                Số thứ tự
                            </th>
                            <th scope="col" className="px-6 py-3 items-center justify-center border border-slate-300">
                                Thông tin tóm tắt
                            </th>
                            <th scope="col" className="px-6 py-3 border border-slate-300">
                                Tổng thanh toán
                            </th>
                            <th scope="col" className="px-6 py-3 border border-slate-300">
                                Thời gian lấy ước tính
                            </th>
                            <th scope="col" className="px-6 py-3 border border-slate-300">
                                Ghi chú
                            </th>
                            <th scope="col" className="px-6 py-3 border border-slate-300">
                                Xác nhận
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {/* <Link to={`order/orderid`}> */}
                        {listConfirmOrder.length >0 ? (listConfirmOrder.map((item,index)=>(
                           
                            <tr key={item.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-slate-300 ">
                                <td className="px-6 py-4 border border-slate-300">
                                    {index+1}
                                </td>
                                <td onClick={()=>handleOnclickRow(item.id)} className="px-6 py-4 border border-slate-300 hover:bg-slate-200">
                                    
                                    {/* <div className="flex flex-row gap-2">
                                        <p>1. </p>
                                        <p>Bánh táo</p>
                                        <p>x2</p>
                                        <p><strong className="pl-1">60000</strong></p>
                                    </div> */}
                                    Thông tin
                                    
                                </td>
                                <td className="px-6 py-4 border border-slate-300">
                                        {item.total}
                                </td>
                                <td className="px-6 py-4 border border-slate-300">
                                    {item.pickUpTime}
                                    <p>Nên xác nhận trước 08:00</p>
                                </td>
                                <td className="px-6 py-4 border border-slate-300">
                                    <p>Số đt người đặt: {item.phoneNumber}</p>
                                    <p>Note</p>
                                </td>
                                <td className="px-6 py-4 border border-slate-300">
                                    <div className="flex gap-3">
                                        <button type="button" onClick={()=>handleConfirm(item.id)} className="bg-indigo-500 hover:opacity-80 rounded-lg text-black p-3 py-1 text-sm">Xác nhận</button>
                                        {console.log("Order id",item.id)}
                                        <Note button="Hủy đơn" noteStringFunc={handleReason}/>
                                    </div>
                                </td>
                            </tr>
                        ))
                            
                        ):(<></>)}
                        
                    {/* </Link> */}
                    </tbody>
                </table>
                 ):(<ToastContainer />)}
                
            </div>
        </div>
    </div>
  )
}
