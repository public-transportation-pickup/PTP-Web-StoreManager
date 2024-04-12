import axios from "axios";
import { BASE_URL } from "../libs/constants";

export async function getTransactions() {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  var USERID = CURRENT_USER.user.id;
  let url = BASE_URL + "/users/" + USERID + "/wallets";
  var response = await axios.get(url, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response.data;
}
