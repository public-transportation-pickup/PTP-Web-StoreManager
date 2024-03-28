import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { selectMenu,fetchMenus } from "../../redux/features/menuSlice";
import { GetDate,GetDayOfWeek } from "../../libs/Commons/DateTimeFormat";
import { FormatTime } from "../../libs/Commons/TimeFormat";
import { ConfirmModal } from "../../components/Modals/Modal";
import { DeleteProductPage } from "../../components/Products/DeleteProduct";
import { DeleteMenu } from "../../api/menu-api";
import { useAPIRequest,Actions } from "../../libs/Commons/api-request";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

export default function MenuMainPage() {
    //#region Api request
    const[deleteState,requestDelete]=useAPIRequest(DeleteMenu);
    //#endregion
    const [showConfirm, setShowConfirm] = useState(false);
    const [menus,setMenus]=useState([]);
    const [menu,setMenu]=useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
      // Dispatch the fetchMenus action when the component mounts
      dispatch(fetchMenus());
    }, [dispatch]);
    
    const value = useSelector(selectMenu);

    useEffect(()=>{
        setMenus(value);
        console.log(menus);
    },[value])

    const navigate= useNavigate();

    const handleUpdate=(id)=>{
        navigate(`update/${id}`);
    }
    const handleCreate=(id)=>{
        navigate(`create`);
    }


    const handleDelete=(item)=>{
        setMenu(item);
        setShowConfirm(true);
    };

    useEffect(()=>{
        if(deleteState.status === Actions.success){
            toast.success("Xóa lịch bán thành công!",{autoClose:900});
            dispatch(fetchMenus());
        } else if( deleteState.status === Actions.failure ){
            toast.warning("Xóa lịch bán thất bại!",{autoClose:900})
        }
    },[deleteState]);
  return (
  
    <>
        <ToastContainer className="w-100 h-10"/>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded h-fit" 
        }
      >
         <div className=" justify-end rounded-t-md bg-gray-100 px-0 max-w-full flex flex-grow flex-1 py-2 ">
              <button 
                onClick={()=>handleCreate()}
                className="  text-base font-medium bg-gray-50 text-gray-400  py-[0.6rem] px-4 border border-gray-300 hover:border-blue-400 rounded">
                Thêm mới
              </button>   
            </div>
        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-amber-300">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={"font-semibold text-lg text-slate-700 " }>
                Lịch bán
              </h3>
             
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto z-0">
          {/* Projects table */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            STT
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tên mô tả
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ngày và giờ
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Thời gian
                        </th> */}
                        <th scope="col" className="px-6 py-3">
                            Khoảng thời gian cụ thể
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ghi chú
                        </th>
                        <th scope="col" className="px-3 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {menus.length>0 ?(menus.map((item,index)=>(
                    <tr key={item.id}
                     className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 flex flex-col">
                            {index}
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                        </th>
                        <td className="px-6 py-4 flex flex-col">
                            <div className="flex flex-row"> 
                                <FormatTime time={item.startTime}/> 
                                <span className="px-2"> - </span> 
                                <FormatTime time={item.endTime}/>
                            </div>

                            <GetDayOfWeek days={item.dateApply}/>
                            {/* {item.dateApply} */}
                        </td>
                        {/* <td className="px-6 py-4">
                            Laptop
                        </td> */}
                        <td className="px-6 py-4">
                           <div className="flex flex-row">
                                <GetDate date={item.startDate}/> 
                                <span className="px-4"> - </span> 
                                <GetDate date={item.endDate}/>
                            </div>
                        </td>
                        <td className="px-6 py-4 max-w-64">
                            {item.description}
                        </td>
                        <td className="px-3 py-4">
                            <div className=" flex flex-row">
                                <p 
                                    onClick={()=>handleUpdate(item.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</p>
                                <span className="px-1">|</span>
                                <p 
                                    onClick={()=>handleDelete(item)}
                                    className="font-medium text-red-600 dark:text-red-600 hover:underline">Delete</p>
                            </div>
                            
                        </td>
                    </tr>
                    
                    ))):(<></>)}

                    
                </tbody>
            </table>
        </div>
      </div>
      <ConfirmModal
            isOpen={showConfirm}
            onClose={()=>{
                setShowConfirm(false)
            }}>
                <DeleteProductPage
                    onClose={(result)=>{
                        if(result){
                            requestDelete(menu.id);
                        }
                        setMenu(null);
                        setShowConfirm(false)
                    }}
                />
       </ConfirmModal>
    </>
  )
}
