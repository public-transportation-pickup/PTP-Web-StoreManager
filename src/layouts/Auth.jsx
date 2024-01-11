import { Routes, Route, Navigate } from "react-router-dom";

// components

import Navbar from "../components/Navbars/AuthNavbar.jsx";
import FooterSmall from "../components/Footers/FooterSmall.jsx";

// views

import Login from "../views/auth/Login.jsx";
import Register from "../views/auth/Register.jsx";


export default function Auth() {
    return (
        <>
          <Navbar transparent />
          <main>
            <section className="relative w-full h-full py-40 min-h-screen">
              <div
                className="absolute top-0 w-full h-full bg-cyan-800 bg-no-repeat bg-full"
                style={{
                  backgroundImage:
                    "url(" + require("../assets/img/register_bg_2.png").default + ")",
                }}
              ></div>
                <Route path="/auth/login" exact component={Login} />
                <Route path="/auth/register" exact component={Register} />
                <Route path="/auth" element={<Navigate to="/auth/login" replace />}/>
                
              <FooterSmall absolute />
            </section>
          </main>
        </>
      );
}
