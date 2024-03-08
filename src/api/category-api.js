import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";
import { GetLocalValue } from "../libs/Commons/UseLocalStorage";

export async function getCategories() {
  //let user = await GetCurrentUser();
  // console.log("Get All Categories!");
  var response = await axios
    .get(BASE_URL + "/categories?pageNumber=0&pageSize=10")
    .catch((err) => {
      console.log(err.message);
    });
  // console.log(response.data);
  return response.data;
}
