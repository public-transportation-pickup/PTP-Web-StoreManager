import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";

// http://localhost:5066/api/users/04188636-94d8-4b2d-8877-27f0554909c8/stores
export async function getStoreByUserId() {
  var response = await axios
    .get(BASE_URL + "/users/" + CURRENT_USER.user.id + "/stores", {
      headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
    })
    .catch((err) => {
      console.log(err.message);
    });
  return response.data;
}
