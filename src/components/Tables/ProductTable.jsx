import  { useState ,useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from "react-redux";
import { selectProduct,fetchProducts } from "../../redux/features/productSlice.js";
// components
import PaginationButton from "../Pagination/PaginationButton.jsx";
import { toHoursAndMinutes } from "../../libs/constants/index.js";
import {Actions, useAPIRequest } from '../../libs/Commons/api-request.js';
import { getCategories } from '../../api/category-api.js';
import { getProductByStoreId } from "../../api/product-api.js";
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
  quantityInDay:1
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
                className=" text-base font-medium bg-gray-50 text-gray-400  py-[0.4rem] px-4 border border-gray-300 hover:border-blue-400 rounded mx-5">
                Thêm mới
              </button>   
              <ComboBox setMenuId={setMenuId}/>
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
                            <div className="w-full border-0 flex flex-row " >
                              <img
                                src={c.imageURL}
                                alt="..."
                                className="my-1 w-11 h-11 ml-3 rounded-full border-2 border-slate-50 shadow "></img>

                              <div className="w-full h-full border-0 flex flex-col text-left hover:text-blue-700" >
                                <span className="text-base text-gray-900 truncate dark:text-white px-4 pt-1" >{c.name}</span>
                                <div className="flex flex-row">
                                  <i className="fa-solid fa-bookmark  text-sm text-gray-500 truncate dark:text-gray-400 pb-1 pl-7" ></i>
                                  <span className="text-sm text-gray-500 truncate dark:text-gray-400 pl-2 pb-1 flex-row ">{c.description}</span>
                                </div>  
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