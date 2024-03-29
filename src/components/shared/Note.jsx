import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import PropTypes from "prop-types"
import { reasonsCancelOrderData } from '../../libs/constants/ReasonCancelData';

export default function Note({button,id,noteStringFunc}) {
    let [isOpen, setIsOpen] = useState(false)
    const [note,setNote]=useState([]);
    // console.log("Note: ",note)

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
    
    const handleYesDialog=async()=>{
        let completeNote=note.join(',');
        await noteStringFunc({reason:completeNote,id:id});
        // console.log("note.join(',') ",completeNote);
        setIsOpen(false);
    }

    const handleSuggestReason=async(event)=>{
        // console.log("value",event)
        const textContent = event.target.textContent;
        // console.log("textContext: ", textContent)
        await setNote((preNote)=>[...preNote,textContent]);
        
        
    }
  
    return (
      <>
        <div className="">
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            {button}
          </button>
        </div>
  
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-medium leading-6 text-gray-900"
                    >
                      Nếu chắc chắn muốn hủy đơn hãy nhập Lý do và Xác nhận hủy đơn
                    </Dialog.Title>
                    <div className="flex flex-col gap-2 mt-2">
                      {/* <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent
                        you an email with all of the details of your order.
                      </p> */}
                      <input className='rounded-lg w-full' name='note' value={note.length>0?note:""} onChange={(e)=>setNote(e.target.value)}/>
                      <div className=''>
                        {reasonsCancelOrderData.map((item)=>(
                        <p key={item.key} onClick={handleSuggestReason} className='p-1 inline-block'><span className='inline-block hover:bg-indigo-400 text-sm border border-indigo-200 p-1 rounded-xl'>{item.reason}</span></p>

                        ))}
                        
                        
                        {/* <p onClick={handleSuggestReason} className='p-1 inline-block'><span className='inline-block hover:bg-indigo-400 text-sm border border-indigo-200 p-1 rounded-xl'>Sản phẩm hết hàng</span></p>
                        <p onClick={handleSuggestReason} className='p-1 inline-block'><span className='inline-block hover:bg-indigo-400 text-sm border border-indigo-200 p-1 rounded-xl'>Lỗi giá cả</span></p>
                        <p onClick={handleSuggestReason} className='p-1 inline-block'><span className='inline-block hover:bg-indigo-400 text-sm border border-indigo-200 p-1 rounded-xl'>Một số sản phẩm không khả dụng</span></p>
                        <p onClick={handleSuggestReason} className='p-1 inline-block'><span className='inline-block hover:bg-indigo-400 text-sm border border-indigo-200 p-1 rounded-xl'>Không đáp ứng được yêu cầu đặc biệt</span></p>
                        <p onClick={handleSuggestReason} className='p-1 inline-block'><span className='inline-block hover:bg-indigo-400 text-sm border border-indigo-200 p-1 rounded-xl'>Thông tin người dùng không được xác minh</span></p>
                        <p onClick={handleSuggestReason} className='p-1 inline-block'><span className='inline-block hover:bg-indigo-400 text-sm border border-indigo-200 p-1 rounded-xl'>Không liên hệ được với khách hàng</span></p>                     */}
                      </div>
                    </div>
  
                    <div className="flex mt-4 gap-3">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleYesDialog}
                      >
                        Chắc chắn
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Đóng
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
}

Note.propTypes={
    button:PropTypes.string.isRequired,
    noteStringFunc:PropTypes.func
}
