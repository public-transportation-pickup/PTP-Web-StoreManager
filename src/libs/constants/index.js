 export const BASE_URL = "http://ptp-srv.ddns.net:5000/api";
import { createContext } from "react";

//export const BASE_URL = "http://localhost:5066/api";

const GetUser = () => {
  var user = localStorage.getItem("user");
  //console.log(user);
  return JSON.parse(user);
};

export const CURRENT_USER = GetUser();

export const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};

export const LoadingContext = createContext({
  loading: false,
  setLoading: (value) => {},
});
