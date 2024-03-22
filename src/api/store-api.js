import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";
import { toast } from 'react-toastify';


export async function getStoreByUserId() {
  // console.log(BASE_URL + "/users/" + CURRENT_USER.user.id + "/stores");
  var response = await axios.get(
    BASE_URL + "/users/" + CURRENT_USER.user.id + "/stores",
    {
      headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
    }
  );
  return response.data;
}

export const getOrdersByStoreId=async (storeId,statusFilter) =>{
  let url = statusFilter ===null ? BASE_URL+'/stores/'+storeId+'/orders' : BASE_URL+'/stores/'+storeId+'/orders?pageNumber=0&pageSize=10&Status='+statusFilter+'&roleName=StoreManager';
  try {
    console.log("getOrdersByStoreId - store Id",storeId)
    const res= await fetch(url,{
      headers:{ Authorization: `Bearer ${CURRENT_USER.token}`}
    }
    );
    
    if(res.status===401) toast("Vui lòng đăng nhập để sử dụng chức năng này")
    else if (res.status===400) toast("Danh sách đơn trống")
    else if (res.status===404) toast("Đường dẫn không hợp lệ")
    else if (res.status===500) toast("Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau")
    else{
      const data= await res.json();
      console.log("Get order by storeid data",data);
      return data;
  } 
    
  } catch (error) {
    console.error("Get order by storeid exception: ",error);
  }
}