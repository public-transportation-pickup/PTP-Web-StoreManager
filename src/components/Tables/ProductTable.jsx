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
import { useEffect } from "react";
import PaginationButton from "../../components/Pagination/PaginationButton";
import TableDropdown from "../Dropdowns/TableDropdown";
import { Actions,useAPIRequest } from '../../libs/Commons/api-request.js';
import { getCategories } from '../../api/category-api.js';


function ProductTable() {
  const [listState, requestCategories] = useAPIRequest(getCategories);

  useEffect(() => {
    requestCategories();
    return(console.log("oke"));
  }, []);

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" 
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
                    "w-80 px-9 align-middle border border-solid py-3 uppercase border-l-0  border-r-2 whitespace-nowrap font-semibold text-left bg-amber-300 text-slate-700 border-gray-200"
                  }
                >
                  Danh Mục
                </th>
                <th
                  className={
                    "px-20 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-amber-300 text-slate-700 border-slate-100"
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
                      has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                      onClick={()=>document.getElementById('my_modal_2').showModal()}>
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

{/* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button> */}
<dialog id="my_modal_2" className="modal w-max h-screen">
  <div
    className="mb-2 border-2 bg-slate-200 border-red-500 w-1/3 h-full fixed top-0 right-0"
  >
    <div className="modal-box">
      <h3 className="font-bold text-lg">Hello!</h3>
      <p className="py-4">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </div>
</dialog>
    </>
  );
}


export default ProductTable;