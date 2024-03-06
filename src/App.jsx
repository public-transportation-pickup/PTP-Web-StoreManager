
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import {AuthProvider} from './views/auth/AuthProvider';

// views without layouts
//import Login from "./views/auth/Login";
import Dashboard from "./views/admin/Dashboard";
import Maps from "./views/admin/Maps";
import Settings from "./views/admin/Settings";
import Tables from "./views/admin/Tables";
import PrivateRoutes from './views/auth/PrivateRoute';


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
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
