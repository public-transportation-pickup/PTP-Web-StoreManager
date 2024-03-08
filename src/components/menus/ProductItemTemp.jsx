import { HiOutlineTrash } from "react-icons/hi";

export default function ProductItemTemp() {
    const data =[
        {
            id:
        }
    ]
  return (
    <div className="flex flex-row gap-2 ">
        <div>
            <label htmlFor="name">Tên sản phẩm</label>
            <input id="name" value={}/>
        </div>
        <div className="items-center justify-between">
            <HiOutlineTrash />
        </div>
    </div>
  )
}
