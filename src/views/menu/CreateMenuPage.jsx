import { useState ,useEffect } from "react";
import { useFormik } from "formik";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAPIRequest,Actions } from "../../libs/Commons/api-request";
import { CreateMenu } from "../../api/menu-api";
import { useNavigate } from "react-router";

export const initialMenu = {
    name: "",
    description: "",
    startTime: "06:00",
    endTime: "22:00",
    startDate: "",
    endDate: "",
    dateApply: "",
    status: "Active",
    storeId:"",
  }

export default function CreateMenuPage() {
   //#region Api Request
    const[createState,requestCreate]=useAPIRequest(CreateMenu);
   //#endregion
   const [toastLoading, setToastLoading]=useState(false);
    const[dateApply,setDayApply]=useState([]);
    const navigate=useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...initialMenu },
    validate: (values) => {
      let errors = {};
      if (!values.name || values.name.trim().length === 0) {
        errors.name =  "Thông tin bắt buộc";
      }
    //   if (!values.description || values.description.trim().length === 0) {
    //     errors.description =  "Thông tin bắt buộc";
    //   }
      if (!values.dateApply || values.dateApply.trim().length === 0) {
        errors.dateApply =  "Thông tin bắt buộc";
      }
      if (!values.startTime ) {
        errors.startTime =  "Thông tin bắt buộc";
      }
      if (!values.endTime ) {
        errors.endTime = "Thông tin bắt buộc";
      }
      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
        requestCreate(values);
    },
  });
  useEffect(()=>{
       
    if (createState.status!==Actions.loading ) {
        formik.setSubmitting(false);
    }

    if ( createState.status === Actions.success  ) {
        toast.success("Thêm lịch bán thành công!",{autoClose:900});
        setToastLoading(true);
        // navigate(`../`);
    }
    else if( createState.status === Actions.failure ){
        toast.warning("Tạo lịch bán thất bại!",{autoClose:900})
        console.log(createState.error);
    }
    
},[createState]);

useEffect(() => {
    if (toastLoading) {
      const timeout = setTimeout(() => {
        navigate(`../`);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [toastLoading]);

useEffect(()=>{
    const dateApplyString = dateApply.join(', ');
    // console.log(dateApplyString);
    formik.setFieldValue("dateApply", dateApplyString);

  },[dateApply])

  

const handleBack=()=>{
    navigate(`../`);
}

  return (
    <>
    <ToastContainer className="w-100 h-10"/>
    <div className="relative h-fit rounded-lg top-4 bg-[#f7f7ff] p-4">   
        <div className="w-full h-fit">
        <h2 className="font-bold text-center text-2xl">Tạo lịch bán mới</h2>
            <section className="bg-[#f7f7ff] dark:bg-gray-900">
                <div className="py-6 px-4 mx-auto max-w-2xl lg:py-6">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <>
                                <div className="sm:col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên (Chỉ dành cho cửa hàng)</label>
                                    <input 
                                        type="text"
                                        name="name" 
                                        id="name" 
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Tên mô tả" 
                                        required=""/>
                                        {formik.errors.name && <div className="text-red-600 px-2s">{formik.errors.name}</div>}
                                </div>

                                <div className="sm:col-span-2">
                                <label htmlFor="dateApply" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày áp dụng</label>
                                <ul className="flex flex-col sm:flex-row w-full justify-center list-none"  > 
                                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium  text-gray-600  mx-2 sm:-ml-px sm:mt-0">
                                        <div className="relative flex items-start w-full">
                                        <div className="flex items-center h-5">
                                            <input id="list-group-item-checkbox-4" name="list-group-item-checkbox-1" type="checkbox" value="Monday" className="w-5 cursor-pointer h-5 appearance-none border border-gray-300  rounded-md checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100" 
                                                // checked={"m"!=="m"?true:false}
                                                onChange ={(e)=>{  e.target.checked
                                                    ? setDayApply(prevArray => [...prevArray, e.target.value])
                                                    :setDayApply(prevArray => prevArray.filter(d => d !== e.target.value))} }/>
                                        </div>
                                        <label htmlFor="list-group-item-checkbox-4" className="ml-3.5 block text-sm font-normal text-gray-600 cursor-pointer "> T2 </label>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium  text-gray-600  mx-2 sm:-ml-px sm:mt-0">
                                        <div className="relative flex items-start w-full">
                                        <div className="flex items-center h-5">
                                            <input id="list-group-item-checkbox-5" value="Tuesday" name="list-group-item-checkbox-1" type="checkbox" className="w-5 cursor-pointer h-5 appearance-none border border-gray-300  rounded-md checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                                             onChange ={(e)=>{  e.target.checked
                                                ? setDayApply(prevArray => [...prevArray, e.target.value])
                                                :setDayApply(prevArray => prevArray.filter(d => d !== e.target.value))} }/>
                                        </div>
                                        <label htmlFor="list-group-item-checkbox-5" className="ml-3.5 block text-sm font-normal text-gray-600 cursor-pointer "> T3 </label>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium  text-gray-600  mx-2 sm:-ml-px sm:mt-0">
                                        <div className="relative flex items-start w-full">
                                        <div className="flex items-center h-5">
                                            <input id="list-group-item-checkbox-6" value="Wednesday" name="list-group-item-checkbox-1" type="checkbox" className="w-5 cursor-pointer h-5 appearance-none border border-gray-300  rounded-md checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                                             onChange ={(e)=>{  e.target.checked
                                                ? setDayApply(prevArray => [...prevArray, e.target.value])
                                                :setDayApply(prevArray => prevArray.filter(d => d !== e.target.value))} }/>
                                        </div>
                                        <label htmlFor="list-group-item-checkbox-6" className="ml-3.5 block text-sm font-normal text-gray-600 cursor-pointer "> T4 </label>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium  text-gray-600  mx-2 sm:-ml-px sm:mt-0">
                                        <div className="relative flex items-start w-full">
                                        <div className="flex items-center h-5">
                                            <input id="list-group-item-checkbox-6" value="Thursday" name="list-group-item-checkbox-1" type="checkbox" className="w-5 cursor-pointer h-5 appearance-none border border-gray-300  rounded-md checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                                             onChange ={(e)=>{  e.target.checked
                                                ? setDayApply(prevArray => [...prevArray, e.target.value])
                                                :setDayApply(prevArray => prevArray.filter(d => d !== e.target.value))} }/>
                                        </div>
                                        <label htmlFor="list-group-item-checkbox-6" className="ml-3.5 block text-sm font-normal text-gray-600 cursor-pointer "> T5 </label>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium  text-gray-600  mx-2 sm:-ml-px sm:mt-0">
                                        <div className="relative flex items-start w-full">
                                        <div className="flex items-center h-5">
                                            <input id="list-group-item-checkbox-6" value="Friday" name="list-group-item-checkbox-1" type="checkbox" className="w-5 cursor-pointer h-5 appearance-none border border-gray-300  rounded-md checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                                             onChange ={(e)=>{  e.target.checked
                                                ? setDayApply(prevArray => [...prevArray, e.target.value])
                                                :setDayApply(prevArray => prevArray.filter(d => d !== e.target.value))} }/>
                                        </div>
                                        <label htmlFor="list-group-item-checkbox-6" className="ml-3.5 block text-sm font-normal text-gray-600 cursor-pointer "> T6 </label>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium  text-gray-600  mx-2 sm:-ml-px sm:mt-0">
                                        <div className="relative flex items-start w-full">
                                        <div className="flex items-center h-5">
                                            <input id="list-group-item-checkbox-6" value="Saturday" name="list-group-item-checkbox-1" type="checkbox" className="w-5 cursor-pointer h-5 appearance-none border border-gray-300  rounded-md checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                                             onChange ={(e)=>{  e.target.checked
                                                ? setDayApply(prevArray => [...prevArray, e.target.value])
                                                :setDayApply(prevArray => prevArray.filter(d => d !== e.target.value))} }/>
                                        </div>
                                        <label htmlFor="list-group-item-checkbox-6" className="ml-3.5 block text-sm font-normal text-gray-600 cursor-pointer "> T7 </label>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium  text-gray-600  mx-2 sm:-ml-px sm:mt-0">
                                        <div className="relative flex items-start w-full">
                                        <div className="flex items-center h-5">
                                            <input id="list-group-item-checkbox-6" value="Sunday" name="list-group-item-checkbox-1" type="checkbox" className="w-5 cursor-pointer h-5 appearance-none border border-gray-300  rounded-md checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                                             onChange ={(e)=>{  e.target.checked
                                                ? setDayApply(prevArray => [...prevArray, e.target.value])
                                                :setDayApply(prevArray => prevArray.filter(d => d !== e.target.value))} }/>
                                        </div>
                                        <label htmlFor="list-group-item-checkbox-6" className="ml-3.5 block text-sm font-normal text-gray-600 cursor-pointer "> CN </label>
                                        </div>
                                    </li>
                                </ul>
                                {formik.errors.dateApply && <div className="text-red-600 px-2s">{formik.errors.dateApply}</div>}
                            </div>
                                 <div className="w-[98%]">
                                    <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giờ bắt đầu</label>
                                    <input 
                                        type="time" 
                                        name="startTime" 
                                        id="startTime" 
                                        value={formik.values.startTime}
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        required=""/>
                                    {formik.errors.startTime && <div className="text-red-600 px-2s">{formik.errors.startTime}</div>}
                                </div>
                                <div className="w-[98%]">
                                    <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giờ kết thúc</label>
                                    <input 
                                        type="time" 
                                        name="endTime" 
                                        id="endTime" 
                                        value={formik.values.endTime}
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        required=""/>
                                        {formik.errors.endTime && <div className="text-red-600 px-2s">{formik.errors.endTime}</div>}
                                </div>
                                <div className="w-[98%]">
                                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày bắt đầu (Tùy chọn)</label>
                                    <input 
                                        type="datetime-local" 
                                        name="startDate" 
                                        id="startDate" 
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                                </div>
                                <div className="w-[98%]">
                                    <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày kết thúc  (Tùy chọn)</label>
                                    <input 
                                        type="datetime-local"  
                                        name="endDate" 
                                        id="endDate" 
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                </div>
                            </>
                            
                          

                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                                <textarea 
                                    id="description" 
                                    rows="3" 
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                    placeholder="Mô tả cho lịch bán"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    ></textarea>
                                    {formik.errors.description && <div className="text-red-600 px-2s">{formik.errors.description}</div>}
                            </div>
                        </div>
                        
                        <button type="submit" className=" w-full text-center px-5 py-2 mt-4 sm:mt-6 text-base font-medium  text-green-500 border-2 border-gray-400
                                            rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-green-400 hover:text-white">
                            Tạo mới
                        </button>

                        <button 
                            type="button"
                            onClick={()=>handleBack()}
                            className=" w-full text-center px-5 py-2 mt-1 sm:mt-1 text-base font-medium  text-black border-2 border-gray-400
                                    rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-300">      
                            Hủy
                        </button>
                    </form>
                </div>
            </section>
        </div>

  </div>
    </>
  )
}
