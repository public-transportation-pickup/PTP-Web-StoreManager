//import PropTypes from 'prop-types'
import { HiMiniWallet,HiMiniUserCircle } from "react-icons/hi2";
import ProductOrderItem from '../../components/products/ProductOrderItem';
import { useParams } from 'react-router';

export default function OrderDetailPage() {
    const param= useParams();
    console.log("Order detail page",param.orderId)
  return (
    <div className="pt-20 h-screen">
      <div className='flex flex-row divide-x gap-6'>
      {/* Thong tin */}
      <div className='flex flex-col divide-y px-8'>
        <div>
          <h3 className="font-semibold text-lg">Thông tin đơn hàng</h3>
          <p className="pl-6 text-slate-600">Ngày tạo đơn: createDate</p>
          <p className="pl-6 text-slate-600">Trạng thái đơn hàng: status</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Thông tin thanh toán:</h3>
          <div className='flex flex-row gap-2 items-center'>
            <HiMiniWallet />
            <div>
              <p className=" text-slate-600">Phương thức thanh toán: payment type</p>
              <p className=" text-slate-600"> Trạng thái thanh toán: payment status</p>
            </div>
          </div>
        </div>

        <div className="">
          <h3 className="font-semibold text-lg">Thông tin khách hàng:</h3>
          <div className='flex flex-row gap-2 items-center'>
            <HiMiniUserCircle className="items-center"/>
            <div>
              <p className=" text-slate-600">Tên khách hàng: name</p>
              <p className=" text-slate-600">Số điện thoại: phoneNumber</p>
            </div>
          </div>
          <p className="font-extrabold   text-slate-600">Thời gian giao hàng: pickupTime</p>
        </div>
      </div>
      {/* order items */}
      <div className='flex flex-col gap-3 pl-4'>
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg">Chi tiết đơn hàng</h2>
          <ProductOrderItem/>
          <div>
            <textarea className='w-96'/>
          </div>
        </div>
        <div className='flex flex-row'>
          <h6 className='font-semibold text-xl'>Tổng đơn</h6>
          <h6 className='pl-96 text-red-600 font-mono font-bold text-2xl'>300000 VND</h6>
        </div>
      </div>
    </div>
    </div>
    
  )
}




