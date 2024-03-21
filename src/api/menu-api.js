import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";

export async function GetMenuByStoreId() {
  let STOREID = CURRENT_USER.user.storeId;
  console.log(STOREID);
  let url =
    BASE_URL +
    "/stores/" +
    STOREID +
    "/menus?dateApply=2024-03-22T00%3A00%3A00";

  var response = await axios.get(url, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response.data;
}
