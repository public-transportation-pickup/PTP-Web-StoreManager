import axios from "axios";
import { BASE_URL } from "../libs/constants";

export async function authentication(token, role) {
  //console.log(token);
  const response = await axios.post(BASE_URL + "/auth", {
    token: token,
    role: role,
  });
  //console.log(response.data);
  return response.data;
}
