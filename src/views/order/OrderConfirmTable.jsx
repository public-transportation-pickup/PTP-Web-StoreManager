

export default function OrderConfirmTable() {
  return (
    <div className="flex flex-col gap-4">
        <div className="w-full">
            <div className="border border-indigo-300 p-4 rounded-lg flex flex-col justify-between">
            <p>Hướng dẫn chung cho page:</p>
            <p>Vui lòng xác nhận các đơn hàng trước <strong>10:00</strong></p>
            </div>   
        </div>
        <div>
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
                            </td>
                            <td className="px-6 py-4 border border-slate-300">
                                <div className="flex gap-3">
                                    <button className="bg-indigo-500 hover:opacity-80 rounded-lg text-black p-3 py-1 text-sm">Xác nhận</button>
                                    <button className="bg-indigo-500 hover:opacity-80 rounded-lg text-black p-3 py-1 text-sm">Hủy đơn</button>

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
