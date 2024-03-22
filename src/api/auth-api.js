import axios from "axios";
import { BASE_URL } from "../libs/constants";
import { useState } from "react";


export async function authentication(token) {
  // console.log(token);
  const response = await axios
    .post(BASE_URL + "/auth", {
      token: token,
    })
    .catch((err) => {
      console.log(err);
    });
  return response.data;
}
//console.log("authen v1",await authentication((JSON.parse(localStorage.getItem("user"))).token));



export const authenticationV2=async () => {
  try{
  if(localStorage.getItem("user")){
    let token = (JSON.parse(localStorage.getItem("user"))).token;
  console.log("Token local storage",token)
    const storeAuth=({
      token:token,
      role:'StoreManager'
    })
    console.log("Store auth", storeAuth);
  // try {
    
    const res= await fetch(`${BASE_URL}/auth`,{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storeAuth)
    });
    const data= await res.json();
    console.log("Res authentication v2", res);
    console.log("Data authentication v2",data)
    return data;
  }
  
  } catch (error) {
    console.log("authentication v2 exception",error);
  }
}
