import api from "./api";
import { CURRENT_USER } from "../libs/constants";
export const getMenus = async () => {
    let STOREID = CURRENT_USER.user.storeId;
    
    const response = await api.get("/stores/" +
    STOREID +
    "/menus");
    // console.log(response.data);
    return response.data;
  };