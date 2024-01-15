
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

// views without layouts

import Landing from "./views/Landing";
import Profile from "./views/Profile";
import Index from "./views/Index";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Dashboard from "./views/admin/Dashboard";
import Maps from "./views/admin/Maps";
import Settings from "./views/admin/Settings";
import Tables from "./views/admin/Tables";


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          {/* add routes with layouts */}
          {/* add routes without layouts */}
          <Route path="*" exact element={<Index />} />
          <Route path="/landing" exact element={<Landing />} />
          <Route path="/profile" exact element={<Profile />} />
          {/* add redirect for first page */}

          {/* admin */}
          <Route path="/admin" exact element={<Admin />}>
            <Route path="/admin/dashboard" index element={<Dashboard />} />
            <Route path="/admin/maps" element={<Maps />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/tables" element={<Tables />} />
          </Route>

          {/* auth */}
          <Route path="/auth" exact element={<Auth />} >
            <Route path="/auth/login" index element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
