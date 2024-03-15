import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";
import { GetLocalValue } from "../libs/Commons/UseLocalStorage";

export async function getProductByStoreId(param) {
  let STOREID = GetLocalValue("store").id;
  let url =
    BASE_URL +
    "/stores/" +
    STOREID +
    "/products?pageNumber=0" +
    param.pageNumber +
    "&pageSize=5";

  if (param.name !== null) {
    url =
      BASE_URL +
      "/stores/" +
      STOREID +
      "/products?pageNumber=0" +
      param.pageNumber +
      "&pageSize=5" +
      "&CategoryName=" +
      param.name;
  }
  var response = await axios
    .get(url, {
      headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
    })
    .catch((err) => {
      console.log(err.message);
    });
  return response.data;
}
