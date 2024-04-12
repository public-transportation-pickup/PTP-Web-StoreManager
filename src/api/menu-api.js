import axios from "axios";
import { BASE_URL } from "../libs/constants";

export async function GetMenuByStoreId() {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  let STOREID = CURRENT_USER.user.storeId;
  // console.log(STOREID);
  let url = BASE_URL + "/stores/" + STOREID + "/menus";

  var response = await axios.get(url, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response.data;
}
export async function GetMenuById(id) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  // http://localhost:5066/api/menus/8d005159-e576-4027-901a-3150838d76ae
  let url = BASE_URL + "/menus/" + id;
  var response = await axios.get(url, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response.data;
}

export async function CreateMenu(param) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  param.storeId = CURRENT_USER.user.storeId;
  var menu = {
    name: param.name,
    description: param.description,
    startTime: param.startTime,
    endTime: param.endTime,
    dateApply: param.dateApply,
    status: "Active",
    storeId: param.storeId,
  };
  if (param.startDate === "" && param.endDate == "") {
    param = menu;
  }
  const response = await axios.post(BASE_URL + "/menus", param, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CURRENT_USER.token}`,
    },
  });

  return response;
}

export async function UpdateMenu(param) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  // console.log(param);
  const response = await axios.put(BASE_URL + "/menus/" + param.id, param, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CURRENT_USER.token}`,
    },
  });

  return response;
}

export async function DeleteMenu(id) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  const response = await axios.delete(BASE_URL + "/menus/" + id, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response;
}
