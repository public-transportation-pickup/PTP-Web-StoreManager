import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";

export async function getStoreByUserId() {
  // console.log(BASE_URL + "/users/" + CURRENT_USER.user.id + "/stores");
  var response = await axios
    .get(BASE_URL + "/users/" + CURRENT_USER.user.id + "/stores", {
      headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
    })
    .catch((err) => {
      console.log(err.message);
    });
  return response.data;
}
