import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";
import { GetLocalValue } from "../libs/Commons/UseLocalStorage";

export async function getProductByStoreId(pageNumber) {
  console.log(CURRENT_USER.token);
  let STOREID = GetLocalValue("store").id;
  var response = await axios
    .get(
      BASE_URL +
        "/stores/" +
        STOREID +
        "/products?pageNumber=" +
        pageNumber +
        "&pageSize=5",
      {
        headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
      }
    )
    .catch((err) => {
      console.log(err.message);
    });
  // console.log(response.data);
  return response.data;
}
