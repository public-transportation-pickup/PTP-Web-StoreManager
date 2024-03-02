import { useSelector } from "react-redux"
import {Outlet,Navigate} from 'react-router-dom'

export default function PrivateRoute() {
   var checkUser=localStorage.getItem("User");
    // const {currentUser}= useSelector(state=>state.user);
    return (
      checkUser!==null ?<Outlet/>:<Navigate to={'/auth/login'}/>
    )
}
