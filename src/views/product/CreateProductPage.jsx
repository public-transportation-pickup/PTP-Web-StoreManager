import { useEffect,useState,useRef } from "react";
import { useFormik } from "formik";
import { ToastContainer,toast } from "react-toastify";
import {Actions, useAPIRequest } from '../../libs/Commons/api-request.js';
//#region  Components
import { getCategories } from '../../api/category-api.js';
import { UpdateProduct } from "../../api/product-api.js";
//#endregion



  
export default function CreateProductPage({product}) {
    // console.log(product);
    //#region Call api
    const [updateState,requestUpdate]= useAPIRequest(UpdateProduct);
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
          requestUpdate(values);
        },
      });

      const uploadInputRef = useRef(null);
      const filenameLabelRef = useRef(null);
      const imagePreviewRef = useRef(null);
    
      let isEventListenerAdded = false;
    
      useEffect(() => {
        const uploadInput = uploadInputRef.current;
        const filenameLabel = filenameLabelRef.current;
        const imagePreview = imagePreviewRef.current;
    
        uploadInput.addEventListener('change', (event) => {
          const file = event.target.files[0];
    
          if (file) {
             filenameLabel.textContent = file.name;
             formik.setFieldValue("file", file)
            const reader = new FileReader();
            reader.onload = (e) => {
              imagePreview.innerHTML =
                `<img src="${e.target.result}" class="h-full rounded-lg mx-auto" alt="Image preview" />`;
              imagePreview.classList.remove('border-dashed', 'border-2', 'border-gray-400');
    
              // Add event listener for image preview only once
              if (!isEventListenerAdded) {
                imagePreview.addEventListener('click', () => {
                  uploadInput.click();
                });
    
                isEventListenerAdded = true;
              }
            };
            reader.readAsDataURL(file);
          } else {
            formik.unregisterField('file');
            filenameLabel.textContent = '';
            imagePreview.innerHTML =
              `<div class="bg-gray-200 h-full w-full my-auto  rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`;
            //imagePreview.classList.add('border-dashed', 'border-2', 'border-gray-400');
    
            // Remove the event listener when there's no image
            imagePreview.removeEventListener('click', () => {
              uploadInput.click();
            });
            
            isEventListenerAdded = false;
          }
        });
    
        uploadInput.addEventListener('click', (event) => {
          event.stopPropagation();
        });
    
        return () => {
          uploadInput.removeEventListener('change', () => {});
          uploadInput.removeEventListener('click', () => {});
          imagePreview.removeEventListener('click', () => {});
        };
      }, []);

    return (
    <div className="flex flex-row ">
        <div className="w-full ">
            <section className="bg-white dark:bg-gray-900 h-screen overflow-y-scroll  ">
                <h2 className="mb-0 py-2 px-4 text-xl font-bold text-gray-900 dark:text-white sticky top-0 bg-slate-200 ">{product.id===undefined? 'Tạo mới sản phẩm':'Cập nhật thông tin sản phẩm'}</h2>
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
                                          
                        <section className="container w-full mx-auto items-center mt-9 ">
                            <div className="w-full h-52 mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center border-dashed border-2 border-gray-400">
                                <div id="image-preview"  ref={imagePreviewRef} className="w-full h-52 p-8 mb-0 bg-gray-100  rounded-lg items-center mx-auto text-center cursor-pointer">
                                    <input id="upload" type="file" className="hidden"  accept="image/*" ref={uploadInputRef} />
                                    {product.imageURL===null?
                                        <>
                                            <label htmlFor="upload" className="cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-700 mx-auto mb-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                                </svg>
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
                                                <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-gray-600">2mb</b></p>
                                                <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.</p>
                                            </label>
                                        </>
                                        :
                                        <>
                                            <label htmlFor="upload" className="cursor-pointer">
                                                <img src={product.imageURL} className="h-full rounded-lg mx-auto" alt="Image preview" />
                                            </label>
                                        </>
                                    }

                                    
                                </div>
                            </div>
                        </section>
                        <div className="flex items-center text-center justify-center w-full pt-2" >
                            <span id="filename"  className="text-gray-500 " ref={filenameLabelRef} >{product===null?'':product.imageName}</span>
                        </div>
                        
                        {product.id===undefined?
                        <>
                            <button type="submit"
                                className=" w-full text-center px-5 py-2.5 mt-4 sm:mt-6 text-base font-medium  text-white border-2 border-gray-400 bg-green-500
                                        rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">      
                                Tạo mới sản phẩm
                            </button>
                        </>
                        :
                        <>
                            <button type="submit"
                                className=" w-full text-center px-5 py-2 mt-4 sm:mt-6 text-base font-medium  text-green-500 border-2 border-gray-400
                                        rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">      
                                Lưu thông tin
                            </button>
                            <button type="submit"
                                className=" w-full text-center px-5 py-2 mt-1 sm:mt-1 text-base font-medium  text-white border-2 border-gray-400 bg-red-500
                                        rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">      
                                Xóa sản phẩm
                            </button>
                        </>}
                    </form>
                </div>
            </section>
                {/* </div> */}
                {/* <div className="w-1/2 pt-24"> */}
        
        </div>
    </div>
    

    )
}

