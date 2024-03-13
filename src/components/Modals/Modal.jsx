
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


export default function CreateModal({ title, isOpen, onClose = () => {}, children }){
console.log(isOpen);

    return(
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="w-1/3 h-full fixed top-0 right-0 border-2 bg-slate-200 border-red-500"
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
                            className="inline-block w-full py-3  px-6  overflow-hidden
                            text-left align-middle transition-all transform bg-white shadow-xl rounded-md
                            border-2  border-red-500">
                        <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold leading-6 text-gray-700 mb-3"
                        >
                            {title}
                        </Dialog.Title>

                        {children}
                        </div>
                    </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            
        </>
    );
}