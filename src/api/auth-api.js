import axios from "axios";
import { BASE_URL } from "../libs/constants";

export async function authentication(token) {
  // console.log(token);
  const response = await axios.post(BASE_URL + "/auth", {
    token: token
  });
  //console.log(response.data);
  return response.data;
}
