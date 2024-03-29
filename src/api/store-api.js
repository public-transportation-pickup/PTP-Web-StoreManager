import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";



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
  let url = statusFilter ===null ? BASE_URL+'/stores/'+storeId+'/orders' : (statusFilter==="Cancel"?BASE_URL+'/stores/'+storeId+'/orders?pageNumber=0&pageSize=10&Status='+statusFilter+'&roleName=StoreManager':BASE_URL+'/stores/'+storeId+'/orders?pageNumber=0&pageSize=10&Status='+statusFilter ) ;
  try {
    console.log("getOrdersByStoreId - store Id",storeId)
    const res= await axios.get(url,{
      headers:{ Authorization: `Bearer ${CURRENT_USER.token}`}
    }).then(response=>console.log(response))
      const data= await res.data;
      console.log("Get order by storeid data",data);
      return data;
 // } 
    
  } catch (error) {
    console.error("Get order by storeid exception: ",error);
    //console.error("Get order by storeid exception status: ",error.response.status);
    //return [];
  }
}