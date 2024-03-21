import api from "./api";
import { CURRENT_USER } from "../libs/constants";
export const getMenus = async () => {
    let STOREID = CURRENT_USER.user.storeId;
    
    const response = await api.get("/stores/" +
    STOREID +
    "/menus?dateApply=2024-03-29T00:00:00");
    // console.log(response.data);
    return response.data;
  };