
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import {AuthProvider} from './views/auth/AuthProvider';
import Dashboard from "./views/admin/Dashboard";
import Maps from "./views/admin/Maps";
import Settings from "./views/admin/Settings";
import Tables from "./views/admin/Tables";
import PrivateRoutes from './views/auth/PrivateRoute';
import ProductItemTemp from "./components/menus/ProductItemTemp";
import CreateMenuPage from "./views/menu/CreateMenuPage";
import OrderMainPage from "./views/order/OrderMainPage";
import OrderTableList from "./views/order/OrderTableList";
import OrderConfirmTable from "./views/order/OrderConfirmTable";


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
                <Route path="/admin/tables" element={<Tables />} />
              </Route>
            </Route>
            <Route path="/productitemtemp" element={<ProductItemTemp/>}/>
            <Route path="/menu" element={<CreateMenuPage/>}/>
            <Route path="/order" element={<OrderMainPage/>}>
              <Route path="confirming" index element={<OrderConfirmTable/>}/>
              <Route path="preparing" element={<OrderTableList/>}/>
              <Route path="delivering" element={<OrderTableList/>}/>
              <Route path="completed" element={<OrderTableList/>}/>
              <Route path="reject" element={<OrderTableList/>}/>
            </Route>
          </Routes>
        </AuthProvider>
        
      </Router>
      
    </div>
  )
}

export default App
