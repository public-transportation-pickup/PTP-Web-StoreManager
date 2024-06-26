import { Outlet } from "react-router";
import TabOrderStatus from "../../components/orders/TabOrderStatus";


export default function OrderMainPage() {
  return (
    <div className="relative h-screen rounded-lg top-4  bg-[#f7f7ff] px-4">
        <div className="flex justify-center bg-[#f7f7ff]">
            <TabOrderStatus/>
        </div>
        <div className="pt-2 bg-[#f7f7ff]">
            <Outlet/>
        </div>
    </div>
  )
}
