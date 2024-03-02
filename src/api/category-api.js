import axios from "axios";
import { BASE_URL, BEAR_TOKEN } from "../libs/constants";
import GetCurrentUser from "../libs/constants";

export async function getCategories() {
  var user = GetCurrentUser();
  console.log(user.stsTokenManager.accessToken);

  //console.log(BEAR_TOKEN);
  //   console.log("Get All Categories!");
  //   var response = await axios
  //     .get(BASE_URL + "/categories?pageNumber=0&pageSize=10", {
  //       headers: { Authorization: `Bearer ${BEAR_TOKEN}` },
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  //   return response.data;
}
