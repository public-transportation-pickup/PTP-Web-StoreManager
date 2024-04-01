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

export async function GetStoreReport() {
  let STOREID = CURRENT_USER.user.storeId;
  // http://localhost:5066/api/stores/43CB0D2A-172A-49A1-BCC1-195F559B335A?isReport=true
  var url = BASE_URL + "/stores/" + STOREID + "?isReport=true";
  var response = await axios.get(url, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response.data;
}
