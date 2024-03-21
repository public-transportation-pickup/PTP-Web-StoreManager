import { useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { getOrdersByStoreId } from '../../api/store-api';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OrderCompleteTable() {
    const navigate= useNavigate();
    const handleOnclickRow=(orderId)=>{
        navigate(`/order/${orderId}`);
    }
    
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const [listCompletedOrder, setListCompletedOrder]=useState([]);
    console.log("List order completed: ",listCompletedOrder);

    const previousValue= usePrevious(listCompletedOrder);

    useEffect(()=>{

        const fetchData= async()=>{
            try {
                let userStorage= JSON.parse(localStorage.getItem("user"));
                console.log("storeId: ", userStorage.user.id);
                const responseAPI= await getOrdersByStoreId(userStorage.user.id,"Cancel");
                console.log("Responseapi",JSON.parse(responseAPI));
                await setListCompletedOrder({ ...listCompletedOrder, responseAPI});

            } catch (error) {
                console.error("fetch data order complete table exception", error)
            }            
        } 
        fetchData();
    },[previousValue])
  return (
    <div className="flex flex-col gap-4">
    <div>
        <h2 className="pb-4 text-center text-2xl">Danh sách đơn hàng đã hoàn thành</h2>
        <div className="relative overflow-x-auto">
            {listCompletedOrder.length > 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr onClick={()=>handleOnclickRow("orderId")}>
                        <th scope="col" className="px-4 py-3 border border-slate-300 items-center">
                            Số thứ tự
                        </th>
                        <th scope="col" className="px-6 py-3 items-center justify-center border border-slate-300">
                            Thông tin sp
                        </th>
                        <th scope="col" className="px-6 py-3 border border-slate-300">
                            Tổng thanh toán
                        </th>
                        <th scope="col" className="px-6 py-3 border border-slate-300">
                            Ghi chú
                        </th>
                        <th scope="col" className="px-6 py-3 border border-slate-300">
                            Thời gian lấy ước tính
                        </th>
                        
                    </tr>
                </thead>
                <tbody >
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-slate-300">
                        <td className="px-6 py-4 border border-slate-300">
                            1
                        </td>
                        <td className="px-6 py-4 border border-slate-300">
                            <div className="flex flex-row gap-2">
                                <p>1. </p>
                                <p>Bánh táo</p>
                                <p>x2</p>
                                <p><strong className="pl-1">60000</strong></p>
                            </div>
                        </td>
                        <td className="px-6 py-4 border border-slate-300">
                                Tổng giá
                        </td>
                        <td className="px-6 py-4 border border-slate-300">
                            <p>Số đt người đặt</p>
                            <p>Note</p>
                        </td>
                        <td className="px-6 py-4 border border-slate-300">
                            09:00
                        </td>
                    </tr>
                </tbody>
            </table>
            ): (
                        <ToastContainer />
                )}
            
        </div>
    </div>
</div>
  )
}
