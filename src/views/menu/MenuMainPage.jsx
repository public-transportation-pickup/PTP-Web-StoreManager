import { useState,useEffect,useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { selectMenu,fetchMenus } from "../../redux/features/menuSlice";
import { GetDate,GetDayOfWeek } from "../../libs/Commons/DateTimeFormat";
import { FormatTime } from "../../libs/Commons/TimeFormat";
import { ConfirmModal } from "../../components/Modals/Modal";
import { DeleteMenuDialog } from "../../components/menus/DeleteMenu";
import { DeleteMenu,GetMenuByStoreId } from "../../api/menu-api";
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
        // console.log(value);
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

    const inputRef = useRef();
    const handleSearch= async ()=>{
        // console.log(menus);
        const searchTerm = inputRef.current.value.trim();
        if(searchTerm!==''){
            var filter= menus.filter((menu) =>
                    menu.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(searchTerm.toLowerCase().replace(/\s+/g, ''))
                );
            // console.log(filter);
            if(filter.length!==0){
              setMenus(filter);
            }else{
              toast.warning(`Lịch bán không tồn tại`,{autoClose:900});
              dispatch(fetchMenus());
            }
        }else{
          // console.log('non'); 
          dispatch(fetchMenus());
        }
        
    }
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
              <div className="w-96 md:ml-2">   
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                      </div>
                      <input 
                        ref={inputRef} 
                        type="search" id="default-search" className="block w-full px-4 py-[0.85rem] ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên sản phẩm..." required />
                      <button 
                        onClick={()=>handleSearch()}
                        type="button" className="text-white absolute end-2.5 bottom-[0.4rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm kiếm</button>
                  </div>
              </div> 
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
                            Ngày cụ thể
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
                        <td className="px-6 py-4 ">
                            {index +1}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                        </td>
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
                                {item.startDate!==null && item.endDate !==null?(
                                    <>
                                        <GetDate date={item.startDate}/> 
                                        <span className="px-4"> - </span> 
                                        <GetDate date={item.endDate}/>
                                    </>
                                ):(<></>)}
                                
                            </div>
                        </td>
                        <td className="px-6 py-4 max-w-64">
                            {item.description}
                        </td>
                        <td className="px-3 py-4">
                            {!item.name.includes('Tất cả các buổi')?
                            <div className=" flex flex-row">
                                <p 
                                    onClick={()=>handleUpdate(item.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Cập nhật</p>
                                <span className="px-1">|</span>
                                <p 
                                    onClick={()=>handleDelete(item)}
                                    className="font-medium text-red-600 dark:text-red-600 hover:underline">Xóa</p>
                            </div>
                            :
                            <></>
                            }
                            
                            
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
                <DeleteMenuDialog
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
