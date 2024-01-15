import React from "react";
import { Outlet } from "react-router-dom";
import pic1 from "../assets/img/register_bg_2.png"

// components

import Navbar from "../components/Navbars/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

// views

// import Login from "views/auth/Login.js";
// import Register from "views/auth/Register.js";

function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + pic1 + ")",
            }}
          ></div>
          {/* <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch> */}
          <Outlet/>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
export default Auth;