

export default function OrderConfirmItem() {
  return (
    <div>
        <div>
            Hướng dẫn chung cho page:
            <p>Vui lòng xác nhận đơn hàng trước <strong>10:00</strong></p>
        </div>
        <div>
            

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Số thứ tự
                </th>
                <th scope="col" className="px-6 py-3">
                    STT sp
                </th>
                <th scope="col" className="px-6 py-3">
                    Tên sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                    Số lượng
                </th>
                <th scope="col" className="px-6 py-3">
                    Đơn giá
                </th>
                <th scope="col" className="px-6 py-3">
                    Tổng thanh toán
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                    1
                </td>
                <tr>
                    <td className="px-6 py-4">
                        1 Stt product
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17&quot;
                    </th>
                    <td className="px-6 py-4">
                        x2
                    </td>
                    <td className="px-6 py-4">
                        60000
                    </td>
                </tr>
                <td className="px-6 py-4">
                        Tổng giá
                </td>
                <td className="px-6 py-4">
                    <button className="bg-indigo-500 hover:opacity-80 rounded-lg">Xác nhận</button>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>

        </div>
    </div>
  )
}
