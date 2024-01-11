
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Admin from "./layouts/Admin.jsx";
import Auth from "./layouts/Auth.jsx";

// views without layouts

import Landing from "./views/Landing.jsx";
import Profile from "./views/Profile.jsx";
import Index from "./views/Index.jsx";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* add routes with layouts */}
      <Route path="/admin" element={<Admin/>} />
      <Route path="/auth" element={<Auth/>} />
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
