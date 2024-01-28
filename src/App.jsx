
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

// views without layouts
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Dashboard from "./views/admin/Dashboard";
import Maps from "./views/admin/Maps";
import Settings from "./views/admin/Settings";
import Tables from "./views/admin/Tables";
import PrivateRoute from './views/auth/PrivateRoute';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute/>}>
              {/* admin */}
            <Route path="/" exact element={<Admin />}>
              <Route path="/" index element={<Dashboard />} />
              <Route path="/admin/maps" element={<Maps />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/tables" element={<Tables />} />
            </Route>
          </Route>
          {/* auth */}
          {/* <Route path="/auth" exact element={<Auth />} > */}
            <Route path="/auth/login" index element={<Auth />} />
            <Route path="/auth/register" element={<Register />} />
          {/* </Route> */}


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
