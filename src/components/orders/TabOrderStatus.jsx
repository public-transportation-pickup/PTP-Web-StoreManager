import { Link,useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
import classNames from "classnames";
import { TABS_ORDER } from "../../libs/constants/navigation";


const propertiesActive='inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500'
const propertiesInActivce='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
function TabsNavigate({item}){
    const {pathName}= useLocation();
    return (
        
    <Link to={item.path} className={classNames(pathName===item.path?propertiesActive : propertiesInActivce)}>
            {item.label}
            {console.log("TCheck:",pathName===item.path?'true':'false')}
    </Link>
    )
}

TabsNavigate.propTypes={
    item: PropTypes.object.isRequired
}

export default function TabOrderStatus() {
  return (
    <div>
        

<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
            {
                TABS_ORDER.map((tab)=>(
                    <TabsNavigate key={tab.key} item={tab}/>
                ))
            }
        </li>
        {/* <li className="me-2">
            <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Đã xác nhận</a>
        </li>
        <li className="me-2">
            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Đã hoàn thành</a>
        </li>
        <li className="me-2">
            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Tất cả đơn</a>
        </li>
        <li>
            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
        </li> */}
    </ul>
</div>

    </div>
  )
}
