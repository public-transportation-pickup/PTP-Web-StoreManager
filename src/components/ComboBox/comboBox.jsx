import { Fragment, useState,useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useAPIRequest,Actions } from '../../libs/Commons/api-request'
import { GetMenuByStoreId } from '../../api/menu-api'
import { useNavigate } from 'react-router'

export default function ComboBox({setMenuId}) {
  const navigate = useNavigate();

  const handleClick=()=>{
    navigate("../menus/create");
  }

  const [menuState,requestMenu]=useAPIRequest(GetMenuByStoreId);
  const [menus,setMenus]=useState([]);
  const [selected, setSelected] = useState("")

  useEffect(()=>{
    requestMenu();
  },[])

  useEffect(()=>{
    if(menuState.status===Actions.success){
      // console.log(menuState.payload);
      setMenus(menuState.payload);
      setSelected(menuState.payload[menuState.payload.length-1])
    }

  },[menuState]);
  
useEffect(()=>{
  setMenuId(selected!==undefined?selected.id:undefined);
},[selected])
  
  const [query, setQuery] = useState('')
  const filteredMenu =
    query === ''
      ? menus
      : menus.filter((menu) =>
          menu.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
  return (
    <div className=" w-80">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
        {/* bg-transparent text-base font-medium  text-gray-400  py-[0.4rem] px-4 border border-gray-300 hover:border-blue-400 rounded mx-5 */}
          <div className="relative z-10 py-[0.33rem] w-full cursor-default  overflow-hidden rounded bg-gray-50 text-left shadow-md focus:outline-none focus-visible:ring-2 
          focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border border-gray-300">
            <Combobox.Input
              className="w-full border-none bg-gray-50 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(menu) => menu.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
         
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredMenu.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredMenu.map((menu) => (
                  <Combobox.Option
                    key={menu.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 pl-10 pr-4 z-10 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={menu}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {menu.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}                  
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}

              <Combobox.Button 
                onClick={handleClick}
                className="relative cursor-default text-left select-none py-3 pl-10 pr-4 z-10 w-full hover:bg-teal-600 hover:text-white text-gray-900">
                  <span className="inline-block truncate  font-bold ">
                    <p>Tạo mới</p>
                  </span>

                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                  </span>
              </Combobox.Button>
              
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
