
import { IoWalletOutline } from "react-icons/io5";
import UserDropdown from "../Dropdowns/UserDropdown";
import NumberFormat from "../../libs/Commons/NumberFormat";

function Navbar() {
  var auth=JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {/* Navbar */}
      <nav className=" top-0  w-full bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-5 bg-white border shadow-lg z-2 ">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4 ">
          {/* Brand */}
          <a
            className="text-black text-base uppercase hidden lg:inline-block font-bold"
            href=".."
            // onClick={(e) => e.preventDefault()}
          >
          Xin chào - {auth.user.fullName}
          </a>
          {/* Form */}
          <div className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto pt-0 mr-3 text-sm ">
            <div className=" flex w-full flex-row items-stretch">
              {/* <span className="z-10 h-full leading-snug font-normal text-center text-black bg-transparent rounded text-base items-center justify-center w-8 py-2">
                <IoWalletOutline  size={28}/>
              </span>
              <p className="border-0 px-3 py-3 text-slate-600  text-[15px] underline font-semibold w-full">Số dư: <NumberFormat number={1000000}/> VNĐ</p> */}
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </div>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
export default Navbar;