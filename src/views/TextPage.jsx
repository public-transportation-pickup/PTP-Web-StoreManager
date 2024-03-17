import { getOrder } from "../api/order-api"


export default function TextPage() {
    const handleClick= async ()=>{
        const response= await getOrder('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        console.log("Return text page",response);
    }
  return (
    <div>
        <button type="button" onClick={handleClick} >Text button</button>
    </div>
  )
}
