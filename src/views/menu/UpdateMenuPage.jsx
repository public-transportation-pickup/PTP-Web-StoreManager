import { useState ,useEffect,useRef } from "react";
import { useFormik } from "formik";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAPIRequest,Actions } from "../../libs/Commons/api-request";
import { UpdateMenu,GetMenuById,DeleteMenu } from "../../api/menu-api";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { ConfirmModal } from "../../components/Modals/Modal";
import { DeleteMenuDialog } from "../../components/menus/DeleteMenu";
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

export default function UpdateMenuPage() {
   //#region Api Request
    const[updateState,requestUpdate]=useAPIRequest(UpdateMenu);
    const[menuState,requestMenu]=useAPIRequest(GetMenuById);
    const[deleteState,requestDelete]=useAPIRequest(DeleteMenu);
    const [showConfirm, setShowConfirm] = useState(false);
    const [toastLoading, setToastLoading]=useState(false);
    
   //#endregion
    const param= useParams();
    const navigate= useNavigate();

    const[menu,setMenu]=useState();
    const[dateApply,setDayApply]=useState([]);

    useEffect(()=>{
        requestMenu(param.menuId);
    },[])

    useEffect(()=>{
    
        if ( menuState.status === Actions.success  ) {
            // console.log(menuState.payload);
            setMenu(menuState.payload);
            var days=menuState.payload.dateApply.trim().split(', ');
            setDayApply(days);
        }
        else if( menuState.status === Actions.failure ){
            toast.warning("Lỗi!",{autoClose:900})
            console.log(menuState.error);
        }
    },[menuState])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...menu!==undefined?menu:initialMenu },
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
        requestUpdate(values);
    },
  });
  useEffect(()=>{
       
    if (updateState.status!==Actions.loading ) {
        formik.setSubmitting(false);
    }

    if ( updateState.status === Actions.success  ) {
        toast.success("Cập nhât thành công!",{autoClose:900});
        setToastLoading(true);
    }
    else if( updateState.status === Actions.failure ){
        toast.warning("Cập nhật thất bại!",{autoClose:900})
    }
    
},[updateState]);

useEffect(()=>{
    if(deleteState.status === Actions.success){
       toast("Xóa lịch bán thành công!",{autoClose:900});
       setToastLoading(true);
        // navigate(`/admin/menus/index`);
    } else if( deleteState.status === Actions.failure ){
        toast.warning("Xóa lịch bán thất bại!",{autoClose:900})
    }
},[deleteState]);

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

  return (
    <>
    <ToastContainer className="w-100 h-10"/>
    <div className="relative h-fit rounded-lg top-4 bg-[#f7f7ff] p-4">   
        <div className="w-full h-fit">
        <h2 className="font-bold text-center text-2xl">Cập nhật lịch bán</h2>
            <section className="bg-[#f7f7ff] dark:bg-gray-900">
                <div className="py-7 px-4 mx-auto max-w-2xl lg:py-6">
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
                                                checked={dateApply.includes("Monday")}
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
                                                 checked={dateApply.includes("Tuesday")}
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
                                                 checked={dateApply.includes("Wednesday")}
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
                                                 checked={dateApply.includes("Thursday")}
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
                                                 checked={dateApply.includes("Friday")}
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
                                                checked={dateApply.includes("Saturday")}
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
                                                checked={dateApply.includes("Sunday")}
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
                                        value={formik.values.startDate!==null?formik.values.startDate:""}
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                         dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                                </div>
                                <div className="w-[98%]">
                                    <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày kết thúc(Tùy chọn)</label>
                                    <input 
                                        type="datetime-local" 
                                        name="endDate" 
                                        id="endDate" 
                                        value={formik.values.endDate!==null?formik.values.endDate:""}
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                         dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
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
                        
                        <button type="submit" 
                            className=" w-full text-center px-5 py-2 mt-4 sm:mt-6 text-base font-medium  text-green-500 border-2 border-gray-400
                                            rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-200">
                           Lưu thông tin
                        </button>
                        <button 
                            type="button"
                            onClick={()=>setShowConfirm(true)}
                            className=" w-full text-center px-5 py-2 mt-1 sm:mt-1 text-base font-medium  text-white border-2 border-gray-400 bg-red-500
                                    rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-red-400">      
                            Xóa lịch bán
                        </button>
                    </form>
                </div>
            </section>
        </div>

  </div>
    <ConfirmModal
        isOpen={showConfirm}
        onClose={()=>{
            setShowConfirm(false)
        }}>
            <DeleteMenuDialog
                onClose={(result)=>{
                    if(result){
                        requestDelete(param.menuId);
                    }
                    setShowConfirm(false)
                }}
            />
    </ConfirmModal>
    </>
  )
}
