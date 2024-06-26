import axios from "axios";
import { BASE_URL } from "../libs/constants";

export async function GetOrderByStoreId(param) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  let STOREID = CURRENT_USER.user.storeId;

  var url =
    BASE_URL +
    "/stores/" +
    STOREID +
    "/orders?pageSize=5&pageNumber=" +
    param.pageNumber +
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
export async function GetOrderByStoreIdV2(param) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  let STOREID = CURRENT_USER.user.storeId;

  var url =
    BASE_URL + "/stores/" + STOREID + "/orders?" + "Status=" + param.status;
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

export async function GetOrderByStoreIdWithPhone(param) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  let STOREID = CURRENT_USER.user.storeId;

  var url =
    BASE_URL +
    "/stores/" +
    STOREID +
    "/orders?pageSize=5&pageNumber=" +
    param.pageNumber +
    "&Status=" +
    param.status +
    "&phoneNumber=" +
    param.phoneNumber;
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
export async function GetBasicOrder() {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  let STOREID = CURRENT_USER.user.storeId;
  // http://localhost:5066/api/order?storeId=096746f0-8c6e-409d-9026-8140314f24a1

  var url = BASE_URL + "/order?storeId=" + STOREID;
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
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  var url = BASE_URL + "/order/" + id;
  var response = await axios.get(url);
  return response.data;
}

export async function UpdateOrder(param) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  // console.log(param);
  // 'http://localhost:5066/api/order/2156df9d-ed97-4fe8-a453-81a6d2501b9b'
  var url = BASE_URL + "/order/" + param.id;
  var response = await axios.put(url, param, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response;
}
