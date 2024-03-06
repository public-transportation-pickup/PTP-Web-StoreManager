import {Outlet,Navigate} from 'react-router-dom'
import { useAuth } from "./AuthProvider";


export default function PrivateRoute() {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
}
