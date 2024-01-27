import { HiOutlineViewGrid,
    HiClipboardList,
    HiViewList,
    HiExclamationCircle,
    HiBadgeCheck,
    HiBan,
    HiCreditCard
 } from "react-icons/hi";

export const STORE_SIDE_BAR_LINK=[
    {
        key:'Dashboard',
        label:'Dashboard',
        path:'/dashboard',
        icon:<HiOutlineViewGrid/>
    },
    {
        key:'Menu',
        label:'Menu',
        path:'/menu',
        icon:<HiClipboardList/>
    },
    {
        key:'Product',
        label:'Product',
        path:'/product',
        icon:<HiViewList/>
    },
    {
        key:'Inprocess_order',
        label:'Inprocess Order',
        path:'inprocess-order',
        icon: <HiExclamationCircle/>
    },
    {
        key:'Completed_order',
        label:'Completed Order',
        path:'completed-order',
        icon: <HiBadgeCheck/>
    },
    {
        key:'Cancelled_order',
        label:'Cancelled Order',
        path:'cancelled-order',
        icon: <HiBan/>
    },
    {
        key:'Wallet',
        label:'Wallet',
        path:'/wallet',
        icon:<HiCreditCard/>
    }
]