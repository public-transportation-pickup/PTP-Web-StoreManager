import {Outlet,Navigate} from 'react-router-dom'
import { useAuth } from "./AuthProvider";
import { useSelector } from 'react-redux';
// import { selectUserInfor } from '../../redux/features/authSlice';

export default function PrivateRoute() {
  // const userInfor=useSelector(selectUserInfor);
  // const {currentUser}= useSelector(state=>state.auth);

  const { user } = useAuth();
  // console.log(user);

  if (!user) {
    // user is not authenticated
    return <Navigate to="/sign-in" />;
  }
  return <Outlet />;
  // return !currentUser ?<Outlet/>:<Navigate to={'/auth/login'}/>
}
