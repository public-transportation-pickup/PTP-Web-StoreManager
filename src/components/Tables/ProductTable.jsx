import  { useState ,useEffect,useRef} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from "react-redux";
import { selectProduct,fetchProducts } from "../../redux/features/productSlice.js";
// components
import PaginationButton from "../Pagination/PaginationButton.jsx";
import { toHoursAndMinutes } from "../../libs/constants/index.js";
import {Actions, useAPIRequest } from '../../libs/Commons/api-request.js';
import { getCategories } from '../../api/category-api.js';
import { getAllProductByStoreId } from "../../api/product-api.js";
import { ToastContainer,toast } from "react-toastify";
import CreateModal from "../Modals/Modal.jsx";
import CreateProductPage from "../Products/CreateProductPage.jsx";
import ComboBox from "../ComboBox/comboBox.jsx";

export const initialProductData = {
  categoryId:undefined,
  name:'',
  numProcessParallel:1,
  preparationTime:1,
  price:1,
  expirationDate:'2024-03-23T00:00:00',
  manufacturingDate:'2024-03-23T00:00:00',
  id:undefined,
  description:'',
  imageURL:null,
  menuId:undefined,
  quantityInDay:1,
  status:''
};



function ProductTable() {
  //#region  Call Api
  const [categoriesState, requestCategories] = useAPIRequest(getCategories);
  // const [productsState, requestProducts] = useAPIRequest(getProductByStoreId);
 //#endregion
 
 //#region Set List
  const [categories,setCategories]=useState([]);
  const [products,setProducts]=useState([]);
 //#endregion
  const [product,setProduct]=useState(null);
  const [cateName,setCateName]=useState(null);
  const [menuId,setMenuId]=useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  //#region Load page
  // useEffect(()=>{
  //   console.log('menuId: ',menuId);
  // },[menuId])

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchProducts({
        menuId:menuId,
        cateName:cateName,
        pageNumber:currentPage
      }));
  }, [dispatch,currentPage,cateName,menuId]);


  var productsData= useSelector(selectProduct);
  useEffect(()=>{
    // console.log(productsData);
      setProducts(productsData.items!==undefined?productsData.items:[]);
      setCurrentPage(productsData.pageIndex!==undefined? productsData.pageIndex: 0);
      setTotalPage(productsData.totalPagesCount!==undefined?productsData.totalPagesCount: 1);
  },[productsData]);


  useEffect(() => {
      requestCategories();
  }, []);


 useEffect(()=>{
    if(categoriesState.status==Actions.success){
      setCategories(categoriesState.payload??[]);
    }
    if(categoriesState.status==Actions.failure){
      toast.warning("Loading categories fail!",{autoClose:900});
    }
 },[categoriesState]);
  
const handleEdit=(product)=>{
  setShowModal(true);
  setProduct(product);
};

const handleAdd=()=>{
  setShowModal(true);
  setProduct(initialProductData);
};

const inputRef = useRef();
const handleSearch= async ()=>{
    const searchTerm = inputRef.current.value.trim();
    if(searchTerm!=''){
        var data= await getAllProductByStoreId({
          pageNumber:currentPage
        });
        var filter= data.items.filter((product) =>
              product.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(searchTerm.toLowerCase().replace(/\s+/g, ''))
            );
        // console.log(filter);
        if(filter.length!==0){
          setProducts(filter);
        }else{
          toast.warning(`Sản phẩm không tồn tại`,{autoClose:900});
          dispatch(fetchProducts({
            menuId:menuId,
            cateName:null,
            pageNumber:0
          }));
        }
    }else{
      // console.log('non'); 
      dispatch(fetchProducts({
        menuId:menuId,
        cateName:null,
        pageNumber:0
      }));
    }
    
}

//#endregion

  return (
    <>
        <ToastContainer className="w-100 h-10"/>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded h-fit" 
        }
      >
            <div className="relative  rounded-t-md bg-gray-100 px-2 max-w-full flex flex-grow flex-1 py-2">
              <button 
                onClick={()=>handleAdd()}
                className=" text-base font-medium bg-gray-50 text-gray-400 h-12 w-[110px] py-[0.4rem] px-4 border border-gray-300 hover:border-blue-400 rounded mx-2">
                Thêm mới
              </button>   
              <ComboBox setMenuId={setMenuId}/>

              <div className="w-96 md:ml-96">   
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                      </div>
                      <input 
                        ref={inputRef} 
                        type="search" id="default-search" className="block w-full px-4 py-[0.85rem] ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by name..." required />
                      <button 
                        onClick={()=>handleSearch()}
                        type="button" className="text-white absolute end-2.5 bottom-[0.4rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                  </div>
              </div>
            </div>
            
        <div className="block w-full overflow-x-auto z-0">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse h-fit">
            <thead>
              <tr>
                <th
                  className={
                    "w-80 px-9 align-middle border border-solid py-3 uppercase border-l-0  border-r-2 whitespace-nowrap font-semibold text-left  bg-amber-300 text-slate-700 border-gray-200"
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
               <tr className="h-96 bg-white">
                <th className="w-80 h-full border-t-0 align-top border-l-0 border-r-2 text-xs border border-gray-200 whitespace-nowrap text-left ">
                  <div className="flex h-[37rem] flex-col w-full overflow-y-scroll">
                    {categories.map((c)=>{
                      return(
                          <label
                            key={c.id}
                            className="relative flex flex-row w-full font-medium
                            border-b border-gray-200 rounded hover:bg-gray-200
                            has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                            onClick={()=>setCateName(c.name)}
                         >
                            <div className="w-full border-0 h-13 flex flex-row " >
                              <div className="mr-3">
                                <img
                                  src={c.imageURL}
                                  alt="..."
                                  className="my-1 w-12 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>
                              </div>

                              <div className="w-full h-full border-0 flex flex-col pt-3 text-left hover:text-blue-700" >
                                <span className="text-lg text-gray-900 border-0  truncate dark:text-white px-4 " >{c.name}</span>
                                {/* <div className="flex flex-row">
                                  <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                                  <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row ">{c.description}</span>
                                </div>   */}
                              </div>
                            </div>
                            <div className="border-0 w-fit align-right px-2"> 
                                <input name="category" type="radio" className="hidden checked:border-indigo-500" />
                            </div>
                          </label>
                      )
                    })}
                   
                    

                  </div>
                </th>
   
                <td className="border-t-2 align-top border-l-0 border-r-0 text-xs whitespace-nowrap ">
                  <div className="h-[33rem]">
                    {products.map((p)=>{
                      return(
                        <label
                          key={p.id}
                          className=" w-full rounded-lg border-gray-200 border-b-2  dark:bg-neutral-700 flex flex-col  hover:bg-gray-200
                          has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                          onClick={()=>handleEdit(p)}
                          >
                          <div className="flex flex-row">
                            <img
                                src={p.imageURL}
                                alt="..."
                                className="my-1 w-[6rem] h-[6.1rem] ml-3 rounded-md border-2 border-slate-50 shadow "></img>
                            <div className="w-full flex flex-row">
                              <div className="border-0 pl-3 border-red-200 w-fit flex flex-col" >
                                <span 
                                  className="text-2xl px-4 pt-2 font-serif text-red-500">
                                  {p.name}
                                </span>
                                <span 
                                  className="text-base pt-1 px-9 text-gray-600"> 
                                  <i className="fa-regular fa-clock pr-2"> </i>
                                  Thời gian chuẩn bị: {toHoursAndMinutes(p.preparationTime)}
                                </span>
                                <span
                                  className="text-base pt-1 px-9 text-gray-600">
                                  <i className="fa-solid fa-money-bill pr-2"></i>
                                  Giá:
                                  {p.price} VNĐ
                                </span>
                              </div>
                              <div className="border-0 w-full flex flex-col">
                                  <span 
                                    className="text-base pt-11 text-gray-600 flex flex-row">
                                      Đã bán (Trong ngày):<p className="pl-2"> {p.quantityUsed} / {p.quantityInDay}</p>
                                  </span>
                                  <span
                                    className="text-base pt-1 text-gray-600 flex flex-row">
                                      Trạng thái:
                                      <p className={(p.status==="Active"?'text-green-700 pl-3':'text-red-600 pl-3')}>
                                        {p.status==='Active'?'Sẵn sàng phục vụ':"Tạm ngưng phục vụ"}
                                      </p> 
                                  </span>
                              </div>
                            </div>
                            <div className="border-0 w-fit align-right px-2"> 
                              <input name="product" type="radio" className="hidden checked:border-indigo-500" />
                            </div>
                          </div>
                        </label>
                      )
                    })}
                    
                  </div>
                  
                  <div>
                    <PaginationButton
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                      totalPages={totalPage}/>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
       <div className="w-full my-4">
            <div className="border border-indigo-300 p-4 rounded-lg flex flex-col justify-between">
            <p className="text-xl underline">Hướng dẫn chung:</p>
            <p>-  Chọn <span className="text-red-600 font-bold uppercase">món ăn</span> để xem chi tiết</p>
            <p>- <span className="text-red-600 font-bold uppercase">Trạng thái</span> và số  <span className="text-red-600 font-bold uppercase">số lượng đã bán</span> sẽ được <span className="text-red-600 font-bold uppercase">làm mới</span> mỗi ngày</p>
             {/* <span className="text-red-600 font-bold uppercase">món ăn</span> */}
            <p>-  <span className="text-red-600 font-bold uppercase">Thời gian chuẩn bị</span> và <span className="text-red-600 font-bold uppercase">xử lý song song</span> dùng 
                  để tính tổng thời gian chuẩn bị món khi đặt hàng ( VD: Món A có thể làm 5 phần trong 2 phút)</p>
            
            </div>   
        </div>
      {/* <!--  Modal --> */}
        <CreateModal 
          title={'Product'}
          isOpen={showModal}
          onClose={()=>setShowModal(false)}
          >
            <CreateProductPage
              product={product}
              handleClose={()=>{
                setShowModal(false)
                dispatch(fetchProducts({
                  menuId:menuId,
                  cateName:cateName,
                  pageNumber:currentPage
                }));
              }}
            />
        </CreateModal>
        
    </>
  );
}


export default ProductTable;