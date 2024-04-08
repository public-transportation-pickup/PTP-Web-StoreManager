const convertStatus = (status) => {
    const mapping = {
        Waiting: "Chờ xác nhận",
        Preparing:"Đang chuẩn bị",
        Prepared:"Sẵn sàng giao hàng",
        Completed: "Giao hàng thành công",
        Canceled: "Đơn hàng đã bị hủy",
        Other: "",
    };
  
    return mapping[status];
  };

const convertStatusStyle = (status) => {
    const mapping = {
        Waiting: "pl-1 font-bold text-orange-400",
        Preparing:"pl-1 font-bold text-blue-600",
        Prepared:"pl-1 font-bold text-purple-600",
        Completed: "pl-1 font-bold text-green-600",
        Canceled: "pl-1 font-bold text-red-500",
        Other: "",
    };
  
    return mapping[status];
  };
  
  export const GetStatusFormat = ({status}) => {

    const result = convertStatus(status);
    const style= convertStatusStyle(status);
  
    return  <p className="pl-6 text-slate-600 ">Trạng thái:  
            <span className={style}>{result}</span>
            </p>;
  };
  

  const convertPayment = (payment) => {
    const mapping = {
        Wallet: "Thanh toán ví",
        Other: ""
    };
  
    return mapping[payment];
  };
  const convertPaymentStatus = (status) => {
    const mapping = {
        Paid: "Đã thanh toán",
        Other: ""
    };
  
    return mapping[status];
  };

  export const GetPaymentFormat = ({type,status}) => {

    const paymentType = convertPayment(type);
    const paymentStatus= convertPaymentStatus(status);
  
  return    (<div>
              <p className="pl-6 text-slate-600">Phương thức: {paymentType}</p>
              {status==="Paid"?
                <p className="pl-6 text-slate-600"> Trạng thái: <span className="text-green-600 font-bold">{paymentStatus} </span> </p>
                :
                <p className="pl-6 text-slate-600"> Trạng thái: <span className="text-red-600 font-bold">{paymentStatus} </span></p>
              }
              
            </div>);
  };

