import { Link,useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
import classNames from "classnames";
import { TABS_ORDER } from "../../libs/constants/navigation";
import { useEffect, useState } from "react";
import { GetBasicOrder } from "../../api/order-api";
import { useAPIRequest,Actions } from "../../libs/Commons/api-request";
import Connector from "../../libs/constants/signalr-connection.ts";
 

const propertiesCommom='inline-block p-4 border-b-2 rounded-t-lg'
const propertiesActive=' text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
const propertiesInActivce='  border-transparent  hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'

function TabsNavigate({item}){
    
    const {pathname}= useLocation();
    return (
        
    <Link to={item.path} className={classNames(pathname.includes(item.path)?propertiesActive : propertiesInActivce,propertiesCommom)}>
            {item.label}
    </Link>
    )
}

TabsNavigate.propTypes={
    item: PropTypes.object.isRequired
}

export default function TabOrderStatus() {
    const {pathname}= useLocation();
    const [orderBasic,setOrderBasic]=useState(null);
    const [orderState,requestOrder]= useAPIRequest(GetBasicOrder);

    //#region SignalR
    var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
    let STOREID = CURRENT_USER.user.storeId;
    // const [message, setMessage] = useState("initial value");
    const [title, setTitle] = useState("initial value");
    const { newMessage, events } = Connector();
    useEffect(() => {
        events((username, message) => {
            if( message===STOREID){
                // console.log("Tab-order-1: ",username);
                // setMessage(message)
                // setTitle(username);
                requestOrder();
            }
        });
    },[]);
    //#endregion

    useEffect(()=>{
        // console.log("Tab-order-2:",username);
        requestOrder();
    },[]);

    useEffect(()=>{
        if(orderState.status==Actions.success){
            setOrderBasic(orderState.payload);
            // console.log(orderState.payload);
        }
        if(orderState.status==Actions.failure){
            console.log(orderState.error);
        }
    },[orderState]);

    function GetValue (status){
        // console.log(status);
        if(orderBasic!==null){
            if(status === "confirming"){
                return orderBasic.orderWaiting;
            }
            if(status === "preparing"){
                return orderBasic.orderPreparing;
            }
            if(status === "delivering"){
                return orderBasic.orderPrepared;
            }
            if(status === "completed"){
                return orderBasic.orderCompleted;
            }
            if(status === "reject"){
                return orderBasic.orderCanceled;
            }
        }
    };
  return (
    <div className="">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -px">
                <li className="me-2 flex flex-row">
                    {
                        TABS_ORDER.map((tab)=>(
                            <div key={tab.key}>
                                {/* <TabsNavigate item={tab} data={orderBasic}/> */}
                                <Link to={tab.path} className={classNames(pathname.includes(tab.path)?propertiesActive : propertiesInActivce,propertiesCommom)}>
                                        {tab.label}({GetValue(tab.path)})
                                </Link>
                            </div>
                            
                        ))
                    }
                </li>
            </ul>
        </div>
    </div>
  )
}
