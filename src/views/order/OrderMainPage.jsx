import { Outlet } from "react-router";
import TabOrderStatus from "../../components/orders/TabOrderStatus";


export default function OrderMainPage() {
  return (
    <div className="">
        <div>
            <TabOrderStatus/>
        </div>
        <div className="pt-8">
            <Outlet/>

        </div>
    </div>
  )
}
