import { HiOutlineTrash } from "react-icons/hi";
import sketch from "../../assets/img/sketch.jpg";

export default function ProductItemTemp() {
    const data =[
        {
            Id:1,
            Name:"product 1"
        }
    ]
  return (
    <div className="flex flex-row gap-2 ">
        <div> 
            {data.map((item)=>(
                <div key={item.Id} className="flex flex-row items-center gap-3">
                    <img src={sketch}/>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input key={item.Id} id="name" value={item.Name}/>
                        <label htmlFor="quantity">Số lượng</label>
                        <input id="quantity" required/>
                    </div>
                    <div className="items-center">
                        <HiOutlineTrash className="size-4"/>
                    </div>
                </div>
                
            ))}
        </div>
        
    </div>
  )
}
