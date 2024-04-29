import axios from "axios";
import { BASE_URL } from "../libs/constants";
export async function getStoreByUserId() {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  var response = await axios.get(BASE_URL + "/users/" + CURRENT_USER.user.id + "/stores", {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response.data;
}

export async function GetStoreReport() {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  let STOREID = CURRENT_USER.user.storeId;
  var url = BASE_URL + "/stores/" + STOREID + "?isReport=true";
  var response = await axios.get(url, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response.data;
}

export async function GetDateReport(param) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  let STOREID = CURRENT_USER.user.storeId;
  var url = BASE_URL + "/stores/" + STOREID + "/reports";
  if(param.startDate!==null && param.endDate!==null){
    url = BASE_URL + "/stores/" + STOREID + "/reports?" +`ValidFrom=${param.startDate}&ValidTo=${param.endDate}`;
  }
  var response = await axios.get(url);
  return response.data;
}
