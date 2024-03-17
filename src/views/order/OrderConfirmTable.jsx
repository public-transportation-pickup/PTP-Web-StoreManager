import { useState } from "react";
import Note from "../../components/shared/Note";


export default function OrderConfirmTable() {
    //status preparing
    const [orderConfirmModal,setOrderConfirmModal]=useState({
        id:'',
        cancelReason:'',
        status:''
    })
    console.log("orderConfirmModal",orderConfirmModal);
    const handleReason=async(value)=>{
        console.log("Reason value on order confirm table:",value);
        await setOrderConfirmModal({...orderConfirmModal, cancelReason:value})
        
    }
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
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
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
                                09:00
                                <p>Nên xác nhận trước 08:00</p>
                            </td>
                            <td className="px-6 py-4 border border-slate-300">
                                <p>Số đt người đặt</p>
                                <p>Note</p>
                            </td>
                            <td className="px-6 py-4 border border-slate-300">
                                <div className="flex gap-3">
                                    <button className="bg-indigo-500 hover:opacity-80 rounded-lg text-black p-3 py-1 text-sm">Xác nhận</button>
                                    {/* <button className="bg-indigo-500 hover:opacity-80 rounded-lg text-black p-3 py-1 text-sm">Hủy đơn</button> */}
                                    <Note button="Hủy đơn" noteStringFunc={handleReason}/>
                                </div>
                            </td>
                        </tr>
                    
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
