
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


export default function CreateModal({ title, isOpen, onClose = () => {}, children }){
// console.log(isOpen);

    return(
        <>
            <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="w-1/3 h-full top-0 right-0 border-2 bg-slate-200 border-red-500 fixed z-[10]"
                        onClose={onClose}
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40 "  />
                        <div className="min-h-screen  px-0 text-center">
                        <span
                            className="inline-block h-screen align-top"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                        
                        >
                            <div 
                                className="inline-block w-full py-0  px-0  overflow-hidden
                                text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                            {/* <Dialog.Title
                                as="h3"
                                className="text-xl font-semibold leading-6 text-gray-700 mb-3"
                            >
                                {title}
                            </Dialog.Title> */}

                            {children}
                            </div>
                        </Transition.Child>
                        </div>
                    </Dialog>
            </Transition>
            
        </>
    );


}


export function ConfirmModal({isOpen,onClose = () => {},children}){
    return(
        <>  

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
            <div className="flex min-h-fit mt-20  justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                    {children}
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
        </>
    );
}


