

export default function OrderAllTable() {
  return (
    <div className="flex flex-col gap-4">
        <div>
            <h2 className="pb-4 text-center text-2xl">Danh sách tất cả đơn hàng</h2>
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
                                Ghi chú
                            </th>
                            <th scope="col" className="px-6 py-3 border border-slate-300">
                                Trạng thái
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
                                <p><span className='bg-green-300 p-2 rounded-lg'>Completed</span></p>
                            </td>
                            
                        </tr>
                    
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}