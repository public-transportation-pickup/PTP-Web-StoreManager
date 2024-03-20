import axios from "axios";
import { BASE_URL } from "../libs/constants";

const instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 500) {
          localStorage.removeItem('accessToken');
          window.location.replace("auth/login")
      }
    }
    return Promise.reject(err);
  }
);

export const refresh = async (oldToken) => {
  const response = await instance.post("/auth/refresh-token", { oldToken });
  return response.data;
};
