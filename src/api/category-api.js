import axios from "axios";
import { BASE_URL } from "../libs/constants";
export async function getCategories() {
  var response = await axios.get(
    BASE_URL + "/categories?pageNumber=0&pageSize=10"
  );
  // .catch((err) => {
  //   console.log(err.message);
  // });
  // console.log(response.data);
  return response.data;
}
