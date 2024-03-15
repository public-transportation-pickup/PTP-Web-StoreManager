import { useEffect,useState } from "react";
import { useFormik } from "formik";
import { ToastContainer,toast } from "react-toastify";
import {Actions, useAPIRequest } from '../../libs/Commons/api-request.js';
//#region  Components
import { getCategories } from '../../api/category-api.js';

//#endregion
export default function CreateProductPage({product}) {
    console.log(product);
    //#region Call api

    const [categoriesState, requestCategories] = useAPIRequest(getCategories);

    //#endregion

    //#region Set List
    const [categories,setCategories]=useState([]);

    //#endregion

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


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { ...product },
        validate: (values) => {
          let errors = {};
          if (!values.name || values.name.trim().length === 0) {
            errors.name = "Please enter category name.";
          }
          return errors;
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
          requestSave(values);
        },
      });


    return (
    <div className="flex flex-row ">
        <div className="w-full ">
            <section className="bg-white dark:bg-gray-900 h-screen overflow-y-scroll  ">
                <h2 className="mb-0 py-2 px-4 text-xl font-bold text-gray-900 dark:text-white sticky top-0 bg-slate-200 ">{product===null? 'Tạo mới sản phẩm':'Cập nhật thông tin sản phẩm'}</h2>
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-6  ">       
                    <form  onSubmit={formik.handleSubmit} >
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
                                <input 
                                    type="text"
                                    name="name" 
                                    id="name" 
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tên sản phẩm . . ." required=""/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    id="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}    
                                    min={0} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập giá tiền . . ." required=""/>
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thể loại</label>
                                <select id="categoryId" 
                                    name="categoryId"
                                    value={formik.values.categoryId}
                                    onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option>Select category</option>
                                    {
                                        categories.map((c)=>{
                                            return(
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            )
                                        }
                                    )}
                                </select>
                            </div>
                            
                            <div className="w-full">
                                <label htmlFor="ManufacturingDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày sản xuất</label>
                                <input 
                                    type="datetime-local" 
                                    name="manufacturingDate" 
                                    id="ManufacturingDate" 
                                    value={formik.values.manufacturingDate}
                                    onChange={formik.handleChange}   
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1-1-1999" required=""/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="ExpirationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày hết hạn</label>
                                <input 
                                    type="datetime-local" 
                                    name="expirationDate" 
                                    id="ExpirationDate" 
                                    value={formik.values.expirationDate}
                                    onChange={formik.handleChange}   
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1-2-2002" required=""/>
                            </div>

                            <div className="w-full">
                                <label htmlFor="preparetime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian chuẩn bị</label>
                                <input type="number" 
                                    min={1} 
                                    name="preparationTime" 
                                    id="preparetime" 
                                    value={formik.values.preparationTime}
                                    onChange={formik.handleChange}   
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập số phút . . ." required=""/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="NumOfProcessParallel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xử lý song song</label>
                                <input type="number" 
                                    name="numProcessParallel" 
                                    id="numProcessParallel" 
                                    min={0} 
                                    value={formik.values.numProcessParallel}
                                    onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập số lượng . . ." required=""/>
                            </div>
                           
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                                <textarea 
                                    id="description" 
                                    rows="4" 
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full pt-9 ">
                            <label htmlFor="dropzone-file" className=" flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center py-5 ">
                                    <svg className="w-8 h-8 mb-4  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor"  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                                Hình ảnh
                            </label>
                        </div> 

                        <button type="button" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-blue-50 bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Add product
                        </button>
                    </form>
                </div>
            </section>
                {/* </div> */}
                {/* <div className="w-1/2 pt-24"> */}
        
        </div>
    </div>
    )
}
  