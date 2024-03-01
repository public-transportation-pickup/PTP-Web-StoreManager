import React from "react";
import PropTypes from "prop-types";
import pic1 from "../../assets/img/bootstrap.jpg"
import pic3 from "../../assets/img/team-2-800x800.jpg"
import pic2 from "../../assets/img/team-1-800x800.jpg"
import pic4 from "../../assets/img/team-3-800x800.jpg"
import pic5 from "../../assets/img/team-4-470x470.png"
import pic6 from "../../assets/img/angular.jpg"
import pic7 from "../../assets/img/sketch.jpg"
import pic8 from "../../assets/img/react.jpg"
import pic9 from "../../assets/img/vue.jpg"
// components
import PaginationButton from "../../components/Pagination/PaginationButton";
import TableDropdown from "../Dropdowns/TableDropdown";

function ProductTable({ color }) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-sky-900 text-white")
        }
      >
        {/* <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              >
                Card Tables
              </h3>
             
            </div>
          </div>
        </div> */}
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "w-80 px-9 align-middle border border-solid py-3 uppercase border-l-0  border-r-2 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-amber-300 text-slate-700 border-gray-200"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Danh Mục
                </th>
                <th
                  className={
                    "px-20 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-amber-300 text-slate-700 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Sản phẩm
                </th>
              </tr>
            </thead>
            <tbody>
               <tr className="h-[32rem]">
                <th className="w-80 h-full border-t-0 align-top border-l-0 border-r-2 text-xs border border-gray-200 whitespace-nowrap text-left ">
                  <div className="flex h-[37rem] flex-col w-full overflow-y-scroll">
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                    <label
                      className="relative flex flex-row w-full font-medium
                      border-b border-gray-200 rounded hover:bg-gray-200 
                      has-[:checked]:bg-purple-300 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                    >
                      <div className="w-full border-0 flex flex-row " >
                        <img
                          src={pic3}
                          alt="..."
                          className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                        <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                          <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >Bánh kẹo</span>
                          <div className="flex flex-row">
                            <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row "> Ăn liền khi bóc vỏ</span>
                          </div>  
                        </div>
                      </div>
                      <div className="border-0 w-fit align-right px-2"> 
                          <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                    </label>
                  </div>
                </th>
   
                <td className="border-t-2 align-top border-l-0 border-r-0 text-xs whitespace-nowrap ">
                  <div className="h-[33rem]">
                    <label
                      className=" w-full rounded-lg border-gray-200 border-b-2  dark:bg-neutral-700 flex flex-col  hover:bg-gray-200
                      has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200
                      ">
                      <div className="flex flex-row">
                        <img
                            src={pic4}
                            alt="..."
                            className="my-1 w-[6rem] h-[6.1rem] ml-3 rounded-md border-2 border-slate-50 shadow "></img>
                        <div className="w-full flex flex-row">
                          <div className="border-0 pl-3 border-red-200 w-fit flex flex-col" >
                            <span 
                              className="text-2xl px-4 pt-2 font-serif text-red-500">
                              Coca Cola
                            </span>
                            <span 
                              className="text-base pt-1 px-9 text-gray-600"> 
                              <i className="fa-regular fa-clock pr-2"> </i>
                              Thời gian chuẩn bị: 1h 30min
                            </span>
                            <span
                              className="text-base pt-1 px-9 text-gray-600">
                              <i className="fa-solid fa-money-bill pr-2"></i>
                              Giá:
                              20000 VNĐ
                            </span>
                          </div>
                          <div className="border-0 w-full flex flex-col">
                              {/* <span 
                                className="text-base pt-11 text-gray-600 flex flex-row">
                                  <p className="pr-2">Ngày sản xuất:</p> 14 - 2 - 2020
                              </span>
                              <span
                                className="text-base pt-1 text-gray-600 flex flex-row">
                                   <p className="pr-3">Ngày hết hạn:</p> 14 - 2 - 2020
                              </span> */}
                          </div>
                        </div>
                        <div className="border-0 w-fit align-right px-2"> 
                          <input name="product" type="radio" className="hidden checked:border-indigo-500" />
                        </div>
                      </div>
                    </label>
                    <label
                      className=" w-full rounded-lg border-gray-200 border-b-2  dark:bg-neutral-700 flex flex-col  hover:bg-gray-200
                      has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200
                      ">
                      <div className="flex flex-row">
                        <img
                            src={pic4}
                            alt="..."
                            className="my-1 w-[6rem] h-[6.1rem] ml-3 rounded-md border-2 border-slate-50 shadow "></img>
                        <div className="w-full flex flex-row">
                          <div className="border-0 pl-3 border-red-200 w-fit flex flex-col" >
                            <span 
                              className="text-2xl px-4 pt-2 font-serif text-red-500">
                              Coca Cola
                            </span>
                            <span 
                              className="text-base pt-1 px-9 text-gray-600"> 
                              <i className="fa-regular fa-clock pr-2"> </i>
                              Thời gian chuẩn bị: 1h 30min
                            </span>
                            <span
                              className="text-base pt-1 px-9 text-gray-600">
                              <i className="fa-solid fa-money-bill pr-2"></i>
                              Giá:
                              20000 VNĐ
                            </span>
                          </div>
                          <div className="border-0 w-full flex flex-col">
                              {/* <span 
                                className="text-base pt-11 text-gray-600 flex flex-row">
                                  <p className="pr-2">Ngày sản xuất:</p> 14 - 2 - 2020
                              </span>
                              <span
                                className="text-base pt-1 text-gray-600 flex flex-row">
                                   <p className="pr-3">Ngày hết hạn:</p> 14 - 2 - 2020
                              </span> */}
                          </div>
                        </div>
                        <div className="border-0 w-fit align-right px-2"> 
                          <input name="product" type="radio" className="hidden checked:border-indigo-500" />
                        </div>
                      </div>
                    </label>
                    <label
                      className=" w-full rounded-lg border-gray-200 border-b-2  dark:bg-neutral-700 flex flex-col  hover:bg-gray-200
                      has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200
                      ">
                      <div className="flex flex-row">
                        <img
                            src={pic4}
                            alt="..."
                            className="my-1 w-[6rem] h-[6.1rem] ml-3 rounded-md border-2 border-slate-50 shadow "></img>
                        <div className="w-full flex flex-row">
                          <div className="border-0 pl-3 border-red-200 w-fit flex flex-col" >
                            <span 
                              className="text-2xl px-4 pt-2 font-serif text-red-500">
                              Coca Cola
                            </span>
                            <span 
                              className="text-base pt-1 px-9 text-gray-600"> 
                              <i className="fa-regular fa-clock pr-2"> </i>
                              Thời gian chuẩn bị: 1h 30min
                            </span>
                            <span
                              className="text-base pt-1 px-9 text-gray-600">
                              <i className="fa-solid fa-money-bill pr-2"></i>
                              Giá:
                              20000 VNĐ
                            </span>
                          </div>
                          <div className="border-0 w-full flex flex-col">
                              {/* <span 
                                className="text-base pt-11 text-gray-600 flex flex-row">
                                  <p className="pr-2">Ngày sản xuất:</p> 14 - 2 - 2020
                              </span>
                              <span
                                className="text-base pt-1 text-gray-600 flex flex-row">
                                   <p className="pr-3">Ngày hết hạn:</p> 14 - 2 - 2020
                              </span> */}
                          </div>
                        </div>
                        <div className="border-0 w-fit align-right px-2"> 
                          <input name="product" type="radio" className="hidden checked:border-indigo-500" />
                        </div>
                      </div>
                    </label>
                    <label
                      className=" w-full rounded-lg border-gray-200 border-b-2  dark:bg-neutral-700 flex flex-col  hover:bg-gray-200
                      has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200
                      ">
                      <div className="flex flex-row">
                        <img
                            src={pic4}
                            alt="..."
                            className="my-1 w-[6rem] h-[6.1rem] ml-3 rounded-md border-2 border-slate-50 shadow "></img>
                        <div className="w-full flex flex-row">
                          <div className="border-0 pl-3 border-red-200 w-fit flex flex-col" >
                            <span 
                              className="text-2xl px-4 pt-2 font-serif text-red-500">
                              Coca Cola
                            </span>
                            <span 
                              className="text-base pt-1 px-9 text-gray-600"> 
                              <i className="fa-regular fa-clock pr-2"> </i>
                              Thời gian chuẩn bị: 1h 30min
                            </span>
                            <span
                              className="text-base pt-1 px-9 text-gray-600">
                              <i className="fa-solid fa-money-bill pr-2"></i>
                              Giá:
                              20000 VNĐ
                            </span>
                          </div>
                          <div className="border-0 w-full flex flex-col">
                              {/* <span 
                                className="text-base pt-11 text-gray-600 flex flex-row">
                                  <p className="pr-2">Ngày sản xuất:</p> 14 - 2 - 2020
                              </span>
                              <span
                                className="text-base pt-1 text-gray-600 flex flex-row">
                                   <p className="pr-3">Ngày hết hạn:</p> 14 - 2 - 2020
                              </span> */}
                          </div>
                        </div>
                        <div className="border-0 w-fit align-right px-2"> 
                          <input name="product" type="radio" className="hidden checked:border-indigo-500" />
                        </div>
                      </div>
                    </label>
                    <label
                      className=" w-full rounded-lg border-gray-200 border-b-2  dark:bg-neutral-700 flex flex-col  hover:bg-gray-200
                      has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200
                      ">
                      <div className="flex flex-row">
                        <img
                            src={pic4}
                            alt="..."
                            className="my-1 w-[6rem] h-[6.1rem] ml-3 rounded-md border-2 border-slate-50 shadow "></img>
                        <div className="w-full flex flex-row">
                          <div className="border-0 pl-3 border-red-200 w-fit flex flex-col" >
                            <span 
                              className="text-2xl px-4 pt-2 font-serif text-red-500">
                              Coca Cola
                            </span>
                            <span 
                              className="text-base pt-1 px-9 text-gray-600"> 
                              <i className="fa-regular fa-clock pr-2"> </i>
                              Thời gian chuẩn bị: 1h 30min
                            </span>
                            <span
                              className="text-base pt-1 px-9 text-gray-600">
                              <i className="fa-solid fa-money-bill pr-2"></i>
                              Giá:
                              20000 VNĐ
                            </span>
                          </div>
                          <div className="border-0 w-full flex flex-col">
                              {/* <span 
                                className="text-base pt-11 text-gray-600 flex flex-row">
                                  <p className="pr-2">Ngày sản xuất:</p> 14 - 2 - 2020
                              </span>
                              <span
                                className="text-base pt-1 text-gray-600 flex flex-row">
                                   <p className="pr-3">Ngày hết hạn:</p> 14 - 2 - 2020
                              </span> */}
                          </div>
                        </div>
                        <div className="border-0 w-fit align-right px-2"> 
                          <input name="product" type="radio" className="hidden checked:border-indigo-500" />
                      </div>
                      </div>
                    </label>

                  </div>
                  
                  {/* <div>
                    <PaginationButton
                      setCurrentPage={1}
                      currentPage={2}
                      totalPages={100}></PaginationButton>
                  </div> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <!-- Bottom Right Modal --> */}

<div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 md:rtl:space-x-reverse">
    <button data-modal-target="top-right-modal" data-modal-toggle="top-right-modal" className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Top right
    </button>
</div>


{/* <!-- Top Right Modal --> */}
<div id="top-right-modal" data-modal-placement="top-right" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Top right modal
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="top-right-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="top-right-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="top-right-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </div>
        </div>
    </div>
</div>
    </>
  );
}

ProductTable.defaultProps = {
  color: "light",
};


export default ProductTable;