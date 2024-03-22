
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import {AuthProvider} from './views/auth/AuthProvider';
import Dashboard from "./views/admin/Dashboard";
import Maps from "./views/admin/Maps";
import Settings from "./views/admin/Settings";
import Menus from "./views/admin/Menus";
import Products from "./views/admin/Products";
import PrivateRoutes from './views/auth/PrivateRoute';
import CreateMenuPage from "./views/menu/CreateMenuPage";
import OrderMainPage from "./views/order/OrderMainPage";
import CreateProductPage from "./components/Products/CreateProductPage";
//import OrderTableList from "./views/order/OrderTableList";
import OrderConfirmTable from "./views/order/OrderConfirmTable";
import OrderPrepareTable from "./views/order/OrderPrepareTable";
import OrderDeliveryTable from "./views/order/OrderDeliveryTable";
import OrderCompleteTable from "./views/order/OrderCompleteTable";
import OrderCancelTable from "./views/order/OrderCancelTable";
import OrderAllTable from "./views/order/OrderAllTable";
import TextPage from "./views/TextPage";
import OrderDetailPage from "./views/order/OrderDetailPage";


function App() {
  
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/auth/login" element={<Auth />} />
            <Route element={<PrivateRoutes/>}>
              <Route path="/" exact element={<Admin />}>
                <Route path="/" index element={<Dashboard />} />
                <Route path="/admin/maps" element={<Maps />} />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path="/admin/products" element={<Products />} />
                <Route path="/admin/menus" element={<Menus />} >
                  
                </Route>
                {/* <Route path="/create" element={<CreateMenu/>}/> */}
                {/* url order */}
                <Route path="order" element={<OrderMainPage/>}>
                  <Route path="confirming" element={<OrderConfirmTable/>}/>
                  <Route path="preparing" element={<OrderPrepareTable/>}/>
                  <Route path="delivering" element={<OrderDeliveryTable/>}/>
                  <Route path="completed" element={<OrderCompleteTable/>}/>
                  <Route path="reject" element={<OrderCancelTable/>}/>
                  <Route path="all" element={<OrderAllTable/>}/>
                </Route>
                <Route path="order/:orderId" element={<OrderDetailPage/>}/>
              </Route>
            </Route>
            {/* <Route path="/productitemtemp" element={<CreateProductPage/>}/> */}
            <Route path="/menu" element={<CreateMenuPage/>}/>
            <Route path="/textpage" element={<TextPage/>}/>
            <Route path="/testpage" element={<OrderDetailPage/>}/>
           
          </Routes>
        </AuthProvider>
        
      </Router>
      
    </div>
  )
}

export default App
