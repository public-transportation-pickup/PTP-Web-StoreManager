import { Link,useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
import classNames from "classnames";
import { TABS_ORDER } from "../../libs/constants/navigation";


const propertiesCommom='inline-block p-4 border-b-2 rounded-t-lg'
const propertiesActive=' text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
const propertiesInActivce='  border-transparent  hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
function TabsNavigate({item}){
    const {pathname}= useLocation();
    return (
        
    <Link to={item.path} className={classNames(pathname===item.path?propertiesActive : propertiesInActivce,propertiesCommom)}>
            {item.label}
    </Link>
    )
}

TabsNavigate.propTypes={
    item: PropTypes.object.isRequired
}

export default function TabOrderStatus() {
  return (
    <div className="">
        

<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex flex-wrap -px">
        <li className="me-2 flex flex-row">
            {
                TABS_ORDER.map((tab)=>(
                    <div key={tab.key}>
                        <TabsNavigate item={tab}/>
                    </div>
                    
                ))
            }
        </li>
    </ul>
</div>

    </div>
  )
}
