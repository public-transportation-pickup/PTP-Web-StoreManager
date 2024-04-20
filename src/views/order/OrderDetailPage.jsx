//import PropTypes from 'prop-types'
import { HiMiniWallet,HiMiniUserCircle  } from "react-icons/hi2";
import { RiInformationFill } from "react-icons/ri";
import ProductOrderItem from "../../components/Products/ProductOrderItem.jsx";
import { useParams } from 'react-router';
import { useEffect, useState } from "react";
import { UpdateOrder,GetOrderById } from "../../api/order-api";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Note from "../../components/shared/Note";
import { useAPIRequest,Actions } from "../../libs/Commons/api-request";
import { DateFormat } from "../../libs/Commons/DateTimeFormat";
import NumberFormat from "../../libs/Commons/NumberFormat";
import { GetStatusFormat,GetPaymentFormat } from "../../libs/Commons/ConvertString";

export default function OrderDetailPage() {
    const param= useParams();
    // console.log("Order detail page",param.orderId)
    const [orderDetailInfo, setDetailOrderInfo]=useState(null);
    const [orderState,requestOrder]=useAPIRequest(GetOrderById);
    const [updateState,requestUpdate]=useAPIRequest(UpdateOrder);

   useEffect(()=>{
    requestOrder(param.orderId);
   },[updateState]);
    
    useEffect(()=>{

      if(orderState.status==Actions.success){
        setDetailOrderInfo(orderState.payload);
        // console.log("Order detail info",orderState.payload);
      }
      else if(orderState.status==Actions.failure){
        toast.warning("Lỗi!",{autoClose:900});
      }
    },[orderState])



    const [orderModal,setOrderModal]=useState({
      id:'',
      cancelReason:'',
      status:''
  })
  // console.log("orderConfirmModal",orderModal);
  const handleDelete=async(value)=>{
    console.log(value);
    requestUpdate({
        id:value.id,
        canceledReason:value.reason,
        status:'Canceled'
    });
      
  }
  const handleConfirm=async()=>{
    var status="";
    if(orderDetailInfo.status==="Waiting") status="Preparing";
    if(orderDetailInfo.status==="Preparing") status="Prepared";
    if(orderDetailInfo.status==="Prepared") status="Completed";

    requestUpdate({
        id:orderDetailInfo.id,
        canceledReason:'',
        status:status
    });
  };

  useEffect(() => {
    if(updateState.status==Actions.success){
        toast("Cập nhật đơn hàng thành công!",{autoClose:900});
    }
    if(updateState.status==Actions.failure){
        toast("Cập nhật đơn hàng thất bại!",{autoClose:900});
    }
  }, [updateState]);

  const getButton=()=>{
    if(orderDetailInfo!==null){
      if(orderDetailInfo.status==="Canceled" || orderDetailInfo.status==="Completed"){
        // console.log(orderDetailInfo.status);
        return(
          <></>
        )
      }else{
        // console.log(orderDetailInfo.status);
        return(
          <div className="inline-flex">
            <button onClick={()=>handleConfirm()} type="button"
              className=" py-[0.4rem] w-[14%] text-center text-sm font-medium  text-green-500 border-2 border-gray-400
              rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mr-3">Xác nhận</button>
              
              <Note button="Hủy đơn" noteStringFunc={handleDelete} id={orderDetailInfo.id} />
            
          </div>
        )
      }
    }
  }


  return (
    <>
      <ToastContainer className="w-100 h-10"/>
      <div className=" h-screen">
        <h2 className="pb-4 text-center text-2xl">Chi tiết đơn hàng</h2>
        <div className='flex flex-row divide-x gap-6'>
        <div className='flex flex-col divide-y px-5 max-w-md'>
          <div className="">
              <div className='flex flex-row gap-2 items-center'>
              <HiMiniUserCircle className="items-center"/>
                <h3 className="font-semibold text-lg">Thông tin khách hàng:</h3>
              </div>
              <div className='flex flex-row gap-2 items-center'>
                <div>
            
                  <div className="pl-6 text-slate-600">Tên khách hàng: {orderDetailInfo!==null? orderDetailInfo.name:""}</div>
                  <p className="pl-6 text-slate-600">Số điện thoại: {orderDetailInfo!==null? orderDetailInfo.phoneNumber:""}</p>
                </div>
              </div>
              {/* <p className="font-extrabold   text-slate-600">Thời gian giao hàng: {orderDetailInfo.pickUpTime}</p> */}
          </div>
          <div>
            <div className='flex flex-row gap-2 items-center'>
              <RiInformationFill />
              <h3 className="font-semibold text-lg">Thông tin đơn hàng</h3>
            </div>
            <div className="flex flex-row">           
               <p className="pl-6 text-slate-600">Ngày tạo: </p> <DateFormat date={ orderDetailInfo!==null? orderDetailInfo.creationDate:"2024-03-24T10:52:50.8804394"} />
            </div>
            <GetStatusFormat status={orderDetailInfo!==null? orderDetailInfo.status:"Other"}/>
            { orderDetailInfo!==null?(
              orderDetailInfo.status=="Canceled"?<>
              <p className="pl-6 text-slate-600 ">Đã hoàn:  <NumberFormat number= {orderDetailInfo.returnAmount!==null? orderDetailInfo.returnAmount:0}/> VNĐ</p>
              <p className="pl-6 text-slate-600 ">Lý do: {orderDetailInfo.canceledReason!==null? orderDetailInfo.canceledReason:""} </p>
              </>
            :<></>
            ):<></>}
            
            {/* <p className="pl-6 text-slate-600">Trạng thái: {orderDetailInfo!==null? orderDetailInfo.status:""} </p> */}
          </div>

          <div>
            <div className='flex flex-row gap-2 items-center'>
            <HiMiniWallet />
            <h3 className="font-semibold text-lg">Thông tin thanh toán:</h3>
            </div>
          
            <div className='flex flex-row gap-2 items-center'>
              <GetPaymentFormat 
                type={orderDetailInfo!==null? orderDetailInfo.paymentType:"Other"}
                status={orderDetailInfo!==null? orderDetailInfo.paymentStatus:"Other"}
              />
              {/* <div>
                <p className="pl-6 text-slate-600">Phương thức: {orderDetailInfo!==null? orderDetailInfo.paymentType:""}</p>
                <p className="pl-6 text-slate-600"> Trạng thái: {orderDetailInfo!==null? orderDetailInfo.paymentStatus:""}</p>
              </div> */}
            </div>
          </div>

          <div className="flex flex-row">
            { orderDetailInfo!==null?(
              orderDetailInfo.status==="Canceled"?
              <>
                <p className="font-bold  text-slate-600 ">Đơn hàng bị hủy vào: </p><DateFormat date={ orderDetailInfo!==null? orderDetailInfo.modificationDate:"2024-03-24T10:52:50.8804394"} />
              </>
              :
              orderDetailInfo.status=="Completed"?
                <>
                  <p className="font-bold  text-slate-600 ">Đã hoàn thành vào: </p><DateFormat date={ orderDetailInfo!==null? orderDetailInfo.modificationDate:"2024-03-24T10:52:50.8804394"} />
                </>
                :
                <>
                  <p className="font-bold  text-slate-600 ">Thời gian nhận hàng: </p><DateFormat date={ orderDetailInfo!==null? orderDetailInfo.pickUpTime:"2024-03-24T10:52:50.8804394"} />
                </>
            ):<></>}
          </div>

          
        </div>
        {/* order items */}
        <div className='flex flex-col gap-3 pl-4'>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-lg">Chi tiết đơn hàng</h2>
            <div className=" overflow-y-auto h-[28rem]">
              {orderDetailInfo!==null?
              (orderDetailInfo.orderDetails.map((item,index)=>(
                <div key={index}>
                  <ProductOrderItem item={item} /> 
                </div>
              )))
              :
              (<><h2>Null</h2></>)}
            </div>
           

            {/* <div>
              <textarea className='w-96'/>
            </div> */}
          </div>
          <div className='flex flex-row'>
            <h6 className='font-semibold text-xl'>Tổng đơn:</h6>
            <h6 className='pl-96 text-red-600 font-mono font-bold text-2xl'><NumberFormat number= {orderDetailInfo!==null? orderDetailInfo.total:30000}/> VNĐ</h6>
          </div>
          {getButton()}
        </div>
      </div>
      </div>
    </>
    
    
  )
}




