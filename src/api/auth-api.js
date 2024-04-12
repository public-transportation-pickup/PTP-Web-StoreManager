import axios from "axios";
import { BASE_URL } from "../libs/constants";


export async function authentication(param) {
  // console.log(param);
  const response = await axios
    .post(BASE_URL + "/auth", {
      token: param.token,
      fcmToken: param.fcmToken,
    })
    .catch((err) => {
      console.log(err);
    });
  return response.data;
}
