export const BASE_URL = "http://ptp-srv.ddns.net:5000/api";
import { useSelector } from "react-redux";

//export const BASE_URL = "http://localhost:5066/api";

// const { currentUser } = useSelector((state) => state.user);

const TOKEN = () => {
  var user = localStorage.getItem("persist:root");
  return user;
};

export default function GetCurrentUser() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.stsTokenManager.accessToken);
  return currentUser.stsTokenManager.accessToken;
  // bỏ vô đây nè
}

export const BEAR_TOKEN = TOKEN();
