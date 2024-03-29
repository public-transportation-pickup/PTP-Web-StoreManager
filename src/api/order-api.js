import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";
import axios from "axios";

export async function GetOrderByStoreId(param) {
  let STOREID = CURRENT_USER.user.storeId;

  var url =
    BASE_URL +
    "/stores/" +
    STOREID +
    "/orders?pageSize=5&pageNumber=0" +
    // param.pageNumber +
    "&Status=" +
    param.status;
  // console.log(url);
  var response = await axios
    .get(url, {
      headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(response.data);
  return response.data;
}

export async function GetOrderById(id) {
  var url = BASE_URL + "/order/" + id;
  var response = await axios.get(url);
  return response.data;
}

export async function UpdateOrder(param) {
  console.log(param);
  // 'http://localhost:5066/api/order/2156df9d-ed97-4fe8-a453-81a6d2501b9b'
  var url = BASE_URL + "/order/" + param.id;
  var response = await axios.put(url, param, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response;
}
