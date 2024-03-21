import { BASE_URL } from "../libs/constants";

export const getOrder= async (orderId)=>{
    try {
        const res= await fetch(`${BASE_URL}/order/${orderId}`);
        console.log("Res",res)
        const data = await res.json();
        if(res.status===404){
            console.log("Data.error",data.error);
            return data.error;
        }else return data;
    } catch (error) {
        console.log("getAllOrder exception:",error);
    }
}

export const updateOrder = async (orderModel)=>{
    try {
        const res =await fetch(`${BASE_URL}/order/${orderModel.Id}`,{
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderModel),
        });
        const data= await res.json();
        console.log
        if(res.status===400 && res.status===500) return "Lỗi truy cập hệ thống"
        else if (res.status ===401) return "Vui lòng đăng nhập để sử dụng tính năng này"
        else return data;
    } catch (error) {
        console.log("update Order exception: ",error);
    }
}