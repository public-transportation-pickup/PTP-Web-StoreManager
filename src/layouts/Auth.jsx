import { Outlet } from "react-router-dom";

// components

import Navbar from "../components/Navbars/AuthNavbar.jsx";
import FooterSmall from "../components/Footers/FooterSmall.jsx";


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
                <Outlet/>
                <FooterSmall absolute />
            </section>
          </main>
        </>
      );
}
