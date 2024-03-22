import {Outlet,Navigate} from 'react-router-dom'
import { useAuth } from "./AuthProvider";
import { useSelector } from 'react-redux';
// import { selectUserInfor } from '../../redux/features/authSlice';
import { CURRENT_USER } from '../../libs/constants';

export default function PrivateRoute() {
  // const userInfor=useSelector(selectUserInfor);
  // const {currentUser}= useSelector(state=>state.auth);
  // console.log(currentUser);

  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
  // return !currentUser ?<Outlet/>:<Navigate to={'/auth/login'}/>
}
