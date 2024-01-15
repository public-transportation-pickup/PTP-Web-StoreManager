
import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom';
import Admin from "./layouts/Admin.jsx";
import Auth from "./layouts/Auth.jsx";

// views without layouts

import Landing from "./views/Landing.jsx";
import Profile from "./views/Profile.jsx";
import Index from "./views/Index.jsx";

// views

import Dashboard from "./views/admin/Dashboard.jsx";
import Maps from "./views/admin/Maps.jsx";
import Settings from "./views/admin/Settings.jsx";
import Tables from "./views/admin/Tables.jsx";


// views

import Login from "./views/auth/Login.jsx";
import Register from "./views/auth/Register.jsx";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* add routes with layouts */}
      <Route path="/admin" element={<Admin/>}>
        <Route path="dashboard" exact element={<Dashboard/>} />
        <Route path="maps" exact element={<Maps/>} />
        <Route path="settings" exact element={<Settings/>} />
        <Route path="tables" exact element={<Tables/>} />
      </Route>
      <Route path="/auth" element={<Auth/>}>
        <Route path="login" exact element={<Login/>} />
        <Route path="register" exact component={<Register/>} />
        <Route path="" element={<Navigate to="/auth/login" replace />}/>
      </Route>
      {/* add routes without layouts */}
      <Route path="/landing" exact element={<Landing/>} />
      <Route path="/profile" exact element={<Profile/>} />
      <Route path="/" exact element={<Index/>} />
      {/* add redirect for first page */}
      {/* <Redirect from="*" to="/" /> */}
    </Routes>
  </BrowserRouter>
  )
}
