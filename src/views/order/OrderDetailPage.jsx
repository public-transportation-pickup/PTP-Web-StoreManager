import PropTypes from 'prop-types'
import { HiMiniWallet,HiMiniUserCircle } from "react-icons/hi2";

export default function OrderDetailPage({orderId}) {
    console.log("Order detail page",orderId)
  return (
    <div className='flex flex-row divide-x'>
      {/* Thong tin */}
      <div className='flex flex-col divide-y'>
        <div>
          <h3>Thông tin đơn hàng</h3>
          <p>Ngày tạo đơn: createDate</p>
          <p>Trạng thái đơn hàng: status</p>
        </div>

        <div>
          <h3>Thông tin thanh toán:</h3>
          <div className='flex flex-row gap-2'>
            <HiMiniWallet />
            <div>
              <p>Phương thức thanh toán: payment type</p>
              <p> Trạng thái thanh toán: payment status</p>
            </div>
          </div>
        </div>

        <div>
          <h3>Thông tin khách hàng:</h3>
          <div className='flex flex-row gap-2'>
          <HiMiniUserCircle />
          <div>
            
          </div>
          </div>
        </div>
      </div>
      {/* order items */}
      <div></div>
    </div>
  )
}

OrderDetailPage.propTypes={
    orderId:PropTypes.string,
}


