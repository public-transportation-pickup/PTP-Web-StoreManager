import { HiOutlineViewGrid,
    HiClipboardList,
    HiViewList,
    HiCreditCard,
    HiLogout 
 } from "react-icons/hi";
    import { FaShopify } from "react-icons/fa";

    import { HiMiniCog6Tooth } from "react-icons/hi2";
//HiExclamationCircle,HiBadgeCheck,HiBan,
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
        key:'Order',
        label:'Order',
        path:'/order',
        icon:<HiViewList/>
    },
    {
        key:'Product',
        label:'Product',
        path:'/product',
        icon:<FaShopify/>
    },
    // {
    //     key:'Inprocess_order',
    //     label:'Inprocess Order',
    //     path:'inprocess-order',
    //     icon: <HiExclamationCircle/>
    // },
    // {
    //     key:'Completed_order',
    //     label:'Completed Order',
    //     path:'completed-order',
    //     icon: <HiBadgeCheck/>
    // },
    // {
    //     key:'Cancelled_order',
    //     label:'Cancelled Order',
    //     path:'cancelled-order',
    //     icon: <HiBan/>
    // },
    {
        key:'Wallet',
        label:'Wallet',
        path:'/wallet',
        icon:<HiCreditCard/>
    }
]

export const STORE_BOTTOM_SIDE_BAR_LINK=[
    {
        key:'Setting',
        label:'Setting',
        path:'/setting',
        icon:<HiMiniCog6Tooth />
    },
    {
        key:'Logout',
        label:'Logout',
        path:'/logout',
        icon:<HiLogout />
    }
]